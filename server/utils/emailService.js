const axios = require('axios');
const cryptoRandomStringModule = require('crypto-random-string');
const cryptoRandomString = cryptoRandomStringModule.default;
const { User } = require('../models');

// Configure Brevo API
const brevoApiKey = process.env.BREVO_API_KEY || 'your-brevo-api-key';

// Axios instance for Brevo API
const brevoApi = axios.create({
  baseURL: 'https://api.brevo.com/v3',
  headers: {
    'api-key': brevoApiKey,
    'Content-Type': 'application/json'
  }
});

// Store OTPs temporarily (in production, use Redis or a database)
const otpStore = new Map();

// Store registration data temporarily until OTP verification
const registrationStore = new Map();

// Generate a random OTP
const generateOTP = () => {
  return cryptoRandomString({ length: 6, type: 'numeric' });
};

// Send verification email
const sendVerificationEmail = async (email, firstName, purpose = 'email-verification') => {
  try {
    const otp = generateOTP();
    
    // Store OTP with expiration (15 minutes)
    otpStore.set(email, {
      otp,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      purpose
    });
    
    let subject, title, message;
    
    if (purpose === 'login') {
      subject = 'Login Verification - Cred Encuesta';
      title = 'Login Verification';
      message = 'We received a login attempt for your account. Please use the OTP below to complete your login:';
    } else {
      subject = 'Verify Your Email - Cred Encuesta';
      title = 'Welcome to Cred Encuesta!';
      message = 'Thank you for registering with Cred Encuesta. To complete your registration, please verify your email address using the OTP below:';
    }
    
    const emailData = {
      sender: {
        name: 'Cred Encuesta',
        email: 'kumarpriyansh844@gmail.com'
      },
      to: [{
        email: email,
        name: firstName || 'User'
      }],
      subject,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">${title}</h2>
          <p>Hello ${firstName || 'there'},</p>
          <p>${message}</p>
          <div style="background-color: #f0f4f8; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
            ${otp}
          </div>
          <p>This OTP will expire in 15 minutes.</p>
          <p>If you did not request this ${purpose === 'login' ? 'login' : 'verification'}, please ignore this email.</p>
          <p>Best regards,<br>The Cred Encuesta Team</p>
        </div>
      `
    };
    
    await brevoApi.post('/smtp/email', emailData);
    return true;
  } catch (error) {
    console.error('Email sending error:', error.message);
    if (error.response) {
      console.error('Brevo API error response:', error.response.status, error.response.data);
    }
    return false;
  }
};

// Send password reset email with OTP
const sendPasswordResetEmail = async (email) => {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    const otp = generateOTP();
    
    // Store OTP with expiration (15 minutes)
    otpStore.set(email, {
      otp,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      purpose: 'password-reset'
    });
    
    const emailData = {
      sender: {
        name: 'Cred Encuesta',
        email: 'kumarpriyansh844@gmail.com'
      },
      to: [{
        email: email,
        name: user.firstName || 'User'
      }],
      subject: 'Password Reset - Cred Encuesta',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Password Reset</h2>
          <p>Hello ${user.firstName || 'there'},</p>
          <p>We received a request to reset your password. Please use the OTP below to reset your password:</p>
          <div style="background-color: #f0f4f8; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
            ${otp}
          </div>
          <p>This OTP will expire in 15 minutes.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,<br>The Cred Encuesta Team</p>
        </div>
      `
    };
    
    await brevoApi.post('/smtp/email', emailData);
    return { success: true };
  } catch (error) {
    console.error('Password reset email error:', error);
    return { success: false, message: 'Failed to send password reset email' };
  }
};

// Verify OTP
const verifyOTP = (email, otp, purpose = 'email-verification') => {
  const storedData = otpStore.get(email);
  
  if (!storedData) {
    return { valid: false, message: 'OTP not found or expired' };
  }
  
  if (Date.now() > storedData.expires) {
    otpStore.delete(email);
    return { valid: false, message: 'OTP expired' };
  }
  
  // Check if the purpose matches (for password-reset and login, purpose must match exactly)
  if ((purpose === 'password-reset' || purpose === 'login') && storedData.purpose !== purpose) {
    return { valid: false, message: 'Invalid OTP purpose' };
  }
  
  // For email-verification, accept both email-verification and no purpose (backward compatibility)
  if (purpose === 'email-verification' && storedData.purpose && storedData.purpose !== 'email-verification') {
    return { valid: false, message: 'Invalid OTP purpose' };
  }
  
  if (storedData.otp !== otp) {
    return { valid: false, message: 'Invalid OTP' };
  }
  
  // OTP is valid, remove it from store
  otpStore.delete(email);
  return { valid: true };
};

// Store registration data temporarily
const storeRegistrationData = (email, userData) => {
  registrationStore.set(email, {
    ...userData,
    expires: Date.now() + 15 * 60 * 1000 // 15 minutes
  });
};

// Get registration data
const getRegistrationData = (email) => {
  const data = registrationStore.get(email);
  if (!data) return null;
  
  if (Date.now() > data.expires) {
    registrationStore.delete(email);
    return null;
  }
  
  return data;
};

// Clear registration data
const clearRegistrationData = (email) => {
  registrationStore.delete(email);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  verifyOTP,
  storeRegistrationData,
  getRegistrationData,
  clearRegistrationData
};