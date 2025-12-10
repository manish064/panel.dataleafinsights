const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { sendVerificationEmail, sendPasswordResetEmail, verifyOTP, storeRegistrationData, getRegistrationData, clearRegistrationData } = require('../utils/emailService');

const router = express.Router();

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Configure Google OAuth Strategy (only if credentials are provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
  console.log('=== Google Strategy Callback Debug ===');
  console.log('Access Token received:', accessToken ? 'Yes' : 'No');
  console.log('Profile ID:', profile?.id);
  console.log('Profile emails:', profile?.emails);
  console.log('Profile name:', profile?.name);
  console.log('========================================');
  try {
    // Check if user exists with Google ID
    let user = await User.findOne({ where: { googleId: profile.id } });
    
    if (!user) {
      // Check if user exists with email
      const email = profile.emails[0].value;
      user = await User.findOne({ where: { email } });
      
      if (user) {
        // Link Google account to existing user
        await user.update({ 
          googleId: profile.id,
          emailVerified: true
        });
      } else {
        // Create new user
        user = await User.create({
          email,
          googleId: profile.id,
          firstName: profile.name.givenName || '',
          lastName: profile.name.familyName || '',
          emailVerified: true,
          points: 0
        });
      }
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
  }));
}

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Initialize passport
router.use(passport.initialize());

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Register - Step 1: Create user account (requires OTP verification)
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Store registration data temporarily (don't save to database yet)
    storeRegistrationData(email, {
      email,
      password,
      firstName,
      lastName,
      points: 0
    });

    // Send verification email automatically
    const emailSent = await sendVerificationEmail(email, firstName, 'email-verification');
    
    if (!emailSent) {
      // If email fails, clear stored data and return error
      clearRegistrationData(email);
      console.error('Failed to send verification email during registration');
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration initiated! Please check your email for verification code.',
      requiresVerification: true,
      email: email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Complete registration after OTP verification
router.post('/complete-registration', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }
    
    // Get stored registration data
    const registrationData = getRegistrationData(email);
    if (!registrationData) {
      return res.status(404).json({
        success: false,
        message: 'Registration data not found or expired. Please register again.'
      });
    }
    
    // Check if user already exists (in case they registered elsewhere)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      clearRegistrationData(email);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    const verification = verifyOTP(email, otp, 'registration');
    
    if (verification.valid) {
      // Create user in database now that OTP is verified
      const user = await User.create({
        email: registrationData.email,
        password: registrationData.password,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        emailVerified: true, // Already verified via OTP
        points: 0
      });
      
      // Clear stored registration data
      clearRegistrationData(email);
      
      // Generate token
      const token = generateToken(user.id);
      
      res.json({
        success: true,
        message: 'Registration completed successfully!',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          points: user.points,
          emailVerified: user.emailVerified
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: verification.message
      });
    }
  } catch (error) {
    console.error('Complete registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login - Step 1: Verify credentials
router.post('/login', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      // Send verification email
      const emailSent = await sendVerificationEmail(email, user.firstName);
      
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in. A verification code has been sent.',
        requiresVerification: true,
        email: email
      });
    }

    // For verified users with correct credentials, allow direct login
    const token = generateToken(user.id);
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Complete login with OTP
router.post('/verify-login', authLimiter, async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }
    
    const verification = verifyOTP(email, otp, 'login');
    
    if (verification.valid) {
      const token = generateToken(user.id);
      
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user
      });
    } else {
      res.status(400).json({
        success: false,
        message: verification.message
      });
    }
  } catch (error) {
    console.error('Login verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create demo user endpoint
router.post('/create-demo-user', async (req, res) => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({ where: { email: 'demo@credencuesta.com' } });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: 'Demo user already exists',
        credentials: {
          email: 'demo@credencuesta.com',
          password: 'demo123'
        }
      });
    }

    // Create demo user
    const demoUser = await User.create({
      email: 'demo@credencuesta.com',
      password: 'demo123',
      firstName: 'Demo',
      lastName: 'User',
      points: 0,
      emailVerified: true,
      profileCompleted: true,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Demo user created successfully',
      credentials: {
        email: 'demo@credencuesta.com',
        password: 'demo123'
      },
      user: demoUser
    });
  } catch (error) {
    console.error('Demo user creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create demo user'
    });
  }
});

// LinkedIn OAuth (placeholder)
router.post('/linkedin', async (req, res) => {
  try {
    const { linkedinId, email, firstName, lastName } = req.body;

    let user = await User.findOne({ where: { linkedinId } });
    
    if (!user) {
      // Check if user exists with email
      user = await User.findOne({ where: { email } });
      if (user) {
        // Link LinkedIn account
        await user.update({ linkedinId });
      } else {
        // Create new user
        user = await User.create({
          email,
          linkedinId,
          firstName,
          lastName,
          emailVerified: true,
          points: 0
        });
      }
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'LinkedIn login successful',
      token,
      user
    });
  } catch (error) {
    console.error('LinkedIn auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Google OAuth routes
router.get('/google', (req, res, next) => {
  console.log('=== Google OAuth Request Debug ===');
  console.log('Request URL:', req.url);
  console.log('Request headers:', req.headers);
  console.log('Query parameters:', req.query);
  console.log('OAuth config:', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  });
  console.log('Environment variables:');
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
  console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');
  console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);
  console.log('===================================');
  
  // Add error handling for OAuth initiation
  try {
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })(req, res, next);
  } catch (error) {
    console.error('❌ OAuth initiation error:', error);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(`${clientUrl}/login?error=oauth_init_failed&details=${encodeURIComponent(error.message)}`);
  }
});

router.get('/google/callback', (req, res, next) => {
  console.log('=== Google OAuth Callback Debug ===');
  console.log('Callback URL:', req.url);
  console.log('Query parameters:', req.query);
  console.log('Headers:', req.headers);
  
  // Check for OAuth errors in query parameters
  if (req.query.error) {
    console.error('❌ OAuth error from Google:', {
      error: req.query.error,
      error_description: req.query.error_description,
      error_uri: req.query.error_uri,
      state: req.query.state
    });
    
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    const errorDetails = req.query.error_description || req.query.error;
    return res.redirect(`${clientUrl}/login?error=oauth_failed&details=${encodeURIComponent(errorDetails)}`);
  }
  
  console.log('=====================================');
  
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=auth_failed&details=Google%20authentication%20failed`
  })(req, res, next);
}, (req, res) => {
  try {
    console.log('✅ OAuth callback successful for user:', req.user ? req.user.id : 'No user');
    
    if (!req.user) {
      throw new Error('No user data received from Google OAuth');
    }
    
    // Generate JWT token
    const token = generateToken(req.user.id);
    
    // Redirect to client with token
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(`${clientUrl}/oauth-callback?token=${token}`);
  } catch (error) {
    console.error('❌ Google OAuth callback error:', error);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(`${clientUrl}/login?error=token_generation_failed&details=${encodeURIComponent(error.message)}`);
  }
});

// Send verification email
router.post('/send-verification-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }
    
    const sent = await sendVerificationEmail(email, user.firstName);
    
    if (sent) {
      res.json({
        success: true,
        message: 'Verification email sent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send verification email'
      });
    }
  } catch (error) {
    console.error('Send verification email error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify email with OTP
router.post('/verify-email', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }
    
    const verification = verifyOTP(email, otp);
    
    if (verification.valid) {
      // Update user's email verification status
      await user.update({ emailVerified: true });
      
      // Generate token
      const token = generateToken(user.id);
      
      res.json({
        success: true,
        message: 'Email verified successfully',
        token,
        user
      });
    } else {
      res.status(400).json({
        success: false,
        message: verification.message
      });
    }
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Forgot password - send reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    const result = await sendPasswordResetEmail(email);
    
    // Always return success to prevent email enumeration
    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset OTP has been sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Reset password with OTP
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const verification = verifyOTP(email, otp, 'password-reset');
    
    if (verification.valid) {
      // Update user's password
      await user.update({ password: newPassword });
      
      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: verification.message
      });
    }
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Set password for Google OAuth users after email verification
router.post('/set-password-google', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if user is a Google OAuth user
    if (!user.googleId) {
      return res.status(400).json({
        success: false,
        message: 'This endpoint is only for Google OAuth users'
      });
    }
    
    const verification = verifyOTP(email, otp, 'password-reset');
    
    if (verification.valid) {
      // Set password for Google OAuth user
      await user.update({ password: newPassword });
      
      res.json({
        success: true,
        message: 'Password set successfully. You can now login with email and password.'
      });
    } else {
      res.status(400).json({
        success: false,
        message: verification.message
      });
    }
  } catch (error) {
    console.error('Set password for Google user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Check if user is a Google OAuth user (for forgot password flow)
router.post('/check-user-type', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        success: true,
        isGoogleUser: false
      });
    }
    
    res.json({
      success: true,
      isGoogleUser: !!user.googleId
    });
  } catch (error) {
    console.error('Check user type error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Link Google account to existing user
router.post('/link-google', authenticateToken, async (req, res) => {
  try {
    const { googleId, googleEmail } = req.body;
    
    if (!googleId || !googleEmail) {
      return res.status(400).json({
        success: false,
        message: 'Google ID and email are required'
      });
    }
    
    // Check if user already has a Google account linked
    if (req.user.googleId) {
      return res.status(400).json({
        success: false,
        message: 'Google account is already linked to this user'
      });
    }
    
    // Check if the Google email matches the user's email
    if (req.user.email !== googleEmail) {
      return res.status(400).json({
        success: false,
        message: 'Google account email must match your account email'
      });
    }
    
    // Check if this Google ID is already linked to another user
    const existingGoogleUser = await User.findOne({ where: { googleId } });
    if (existingGoogleUser) {
      return res.status(400).json({
        success: false,
        message: 'This Google account is already linked to another user'
      });
    }
    
    // Link the Google account
    await req.user.update({ googleId });
    
    res.json({
      success: true,
      message: 'Google account linked successfully'
    });
  } catch (error) {
    console.error('Link Google account error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;