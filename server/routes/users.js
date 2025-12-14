const express = require('express');
const { User, UserReward, Reward, SurveyResponse, Survey, WithdrawalRequest, RewardVoucher, turso } = require('../models');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiter for bank details operations
const bankDetailsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // limit each IP to 50 bank details requests per windowMs
  message: {
    success: false,
    message: 'Too many bank details requests, please try again later.',
    retryAfter: '5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use both IP and user ID for more granular limiting
    return `${req.ip}-${req.user?.id || 'anonymous'}`;
  }
});

// Enhanced input sanitization function
const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return input;

  return input
    .trim()
    .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 200); // Limit length
};

// Database health check function
const checkDatabaseHealth = async (sequelize) => {
  const startTime = Date.now();
  await sequelize.authenticate();
  const responseTime = Date.now() - startTime;

  if (responseTime > 5000) {
    throw new Error(`Database response time too slow: ${responseTime}ms`);
  }

  return responseTime;
};

// Middleware to verify JWT token
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

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Check if user has a password set (before it gets removed by toJSON)
    const hasPassword = req.user.password !== null && req.user.password !== undefined;

    res.json({
      success: true,
      user: req.user,
      hasPassword: hasPassword
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, [
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('phone').optional().isMobilePhone(),
  body('dateOfBirth').optional().isISO8601(),
  body('gender').optional().isIn(['male', 'female', 'other', 'prefer_not_to_say']),
  body('country').optional().trim().isLength({ min: 1 }),
  body('city').optional().trim().isLength({ min: 1 }),
  body('occupation').optional().trim().isLength({ min: 1 }),
  body('education').optional().isIn(['high_school', 'bachelor', 'master', 'phd', 'other'])
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

    const allowedFields = [
      'firstName', 'lastName', 'phone', 'dateOfBirth', 'gender',
      'country', 'city', 'occupation', 'education'
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    await req.user.update(updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: req.user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Change password
router.put('/password', authenticateToken, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 })
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

    // Check if user signed up with Google OAuth and hasn't set a password
    if (req.user.googleId && !req.user.password) {
      return res.status(400).json({
        success: false,
        message: 'You need to set a password first. Use the "Set Password" option in your profile.'
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isCurrentPasswordValid = await req.user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    await req.user.update({ password: newPassword });

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user dashboard stats
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Use raw Turso SQL for aggregates - Sequelize aggregates don't work reliably with custom Turso adapter in production
    const countResult = await turso.execute({
      sql: 'SELECT COUNT(*) as count FROM SurveyResponses WHERE userId = ? AND isCompleted = 1',
      args: [Number(req.user.id)]
    });
    const totalSurveys = Number(countResult.rows[0]?.count || 0);

    const sumResult = await turso.execute({
      sql: 'SELECT COALESCE(SUM(pointsEarned), 0) as total FROM SurveyResponses WHERE userId = ? AND isCompleted = 1',
      args: [Number(req.user.id)]
    });
    const totalPointsEarned = Number(sumResult.rows[0]?.total || 0);

    console.log(`[DASHBOARD] User ${req.user.id}: totalSurveys=${totalSurveys}, totalPointsEarned=${totalPointsEarned}`);

    // Get recent completed survey responses (last 5)
    const recentCompletedSurveys = await SurveyResponse.findAll({
      where: {
        userId: req.user.id,
        isCompleted: true
      },
      include: [{
        model: Survey,
        attributes: ['title', 'category', 'pointsReward']
      }],
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    console.log('Recent completed surveys from DB:', JSON.stringify(recentCompletedSurveys, null, 2));
    if (recentCompletedSurveys.length > 0) {
      console.log('First survey response structure:', JSON.stringify(recentCompletedSurveys[0], null, 2));
      console.log('Survey object in first response:', JSON.stringify(recentCompletedSurveys[0].Survey, null, 2));
    }

    // Get completed survey IDs for progressive unlock logic
    const completedSurveyIds = await SurveyResponse.findAll({
      where: {
        userId: req.user.id,
        isCompleted: true
      },
      attributes: ['surveyId']
    }).then(responses => responses.map(r => r.surveyId));

    console.log(`[DASHBOARD DEBUG] User ${req.user.id} completed survey IDs:`, completedSurveyIds);

    // Get all surveys in creation order (progressive unlock order)
    const allSurveys = await Survey.findAll({
      where: {
        isActive: true,
        isPublished: true
      },
      order: [['id', 'ASC']] // Use ID order as creation order
    });

    console.log(`[DASHBOARD DEBUG] All available surveys:`, allSurveys.map(s => ({ id: s.id, title: s.title, category: s.category })));

    // Progressive unlock logic: only show the next available survey
    let recentOpenSurveys = [];

    if (completedSurveyIds.length === 0) {
      // Show first survey
      recentOpenSurveys = [allSurveys[0]];
      console.log(`[DASHBOARD DEBUG] No surveys completed, showing first survey:`, allSurveys[0] ? { id: allSurveys[0].id, title: allSurveys[0].title } : 'None available');
    } else if (completedSurveyIds.length < allSurveys.length) {
      // Show next survey in sequence
      const nextSurveyIndex = completedSurveyIds.length;
      recentOpenSurveys = [allSurveys[nextSurveyIndex]];
      console.log(`[DASHBOARD DEBUG] ${completedSurveyIds.length} surveys completed, showing next survey at index ${nextSurveyIndex}:`, allSurveys[nextSurveyIndex] ? { id: allSurveys[nextSurveyIndex].id, title: allSurveys[nextSurveyIndex].title } : 'None available');
    } else {
      // All surveys completed
      recentOpenSurveys = [];
      console.log(`[DASHBOARD DEBUG] All ${allSurveys.length} surveys completed, no available surveys`);
    }

    console.log(`[DASHBOARD DEBUG] Final recentOpenSurveys:`, recentOpenSurveys.map(s => ({ id: s.id, title: s.title, category: s.category })));

    // Get reward redemptions
    const rewardStats = await UserReward.findAll({
      where: {
        userId: req.user.id
      },
      attributes: [
        [req.user.sequelize.fn('COUNT', req.user.sequelize.col('id')), 'totalRedemptions'],
        [req.user.sequelize.fn('SUM', req.user.sequelize.col('pointsSpent')), 'totalPointsSpent']
      ],
      raw: true
    });

    // Get withdrawal statistics
    const withdrawalStats = await WithdrawalRequest.findAll({
      where: {
        userId: req.user.id
      },
      attributes: [
        [req.user.sequelize.fn('COUNT', req.user.sequelize.col('id')), 'totalWithdrawals'],
        [req.user.sequelize.fn('SUM', req.user.sequelize.col('amount')), 'totalWithdrawalAmount'],
        [req.user.sequelize.fn('COUNT', req.user.sequelize.literal("CASE WHEN status = 'approved' THEN 1 END")), 'approvedWithdrawals'],
        [req.user.sequelize.fn('SUM', req.user.sequelize.literal("CASE WHEN status = 'approved' THEN amount ELSE 0 END")), 'approvedWithdrawalAmount']
      ],
      raw: true
    });

    res.json({
      success: true,
      dashboard: {
        user: req.user,
        stats: {
          totalSurveys: totalSurveys,
          totalPointsEarned: totalPointsEarned,
          totalRedemptions: rewardStats[0]?.totalRedemptions || 0,
          totalPointsSpent: rewardStats[0]?.totalPointsSpent || 0,
          totalWithdrawals: withdrawalStats[0]?.totalWithdrawals || 0,
          totalWithdrawalAmount: withdrawalStats[0]?.totalWithdrawalAmount || 0,
          approvedWithdrawals: withdrawalStats[0]?.approvedWithdrawals || 0,
          approvedWithdrawalAmount: withdrawalStats[0]?.approvedWithdrawalAmount || 0,
          currentPoints: req.user.points
        },
        recentCompletedSurveys,
        recentOpenSurveys
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user stats for profile page
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Get survey stats
    const surveyStats = await SurveyResponse.findAll({
      where: {
        userId: req.user.id,
        isCompleted: true
      },
      attributes: [
        [req.user.sequelize.fn('COUNT', req.user.sequelize.col('id')), 'totalSurveys'],
        [req.user.sequelize.fn('SUM', req.user.sequelize.col('pointsEarned')), 'totalPointsEarned']
      ],
      raw: true
    });

    // Get reward redemptions
    const rewardStats = await UserReward.findAll({
      where: {
        userId: req.user.id
      },
      attributes: [
        [req.user.sequelize.fn('COUNT', req.user.sequelize.col('id')), 'totalRedemptions']
      ],
      raw: true
    });

    // Calculate member since date
    const memberSince = req.user.createdAt ? new Date(req.user.createdAt).toLocaleDateString() : 'N/A';

    res.json({
      totalSurveys: surveyStats[0]?.totalSurveys || 0,
      totalPoints: req.user.points || 0,
      totalRewards: rewardStats[0]?.totalRedemptions || 0,
      memberSince: memberSince
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get available rewards
router.get('/rewards', authenticateToken, async (req, res) => {
  try {
    const { category, type, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      isActive: true
    };

    if (category) {
      whereClause.category = category;
    }

    if (type) {
      whereClause.type = type;
    }

    const rewards = await Reward.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['featured', 'DESC'], ['pointsCost', 'ASC']]
    });

    res.json({
      success: true,
      rewards: rewards.rows,
      pagination: {
        total: rewards.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(rewards.count / limit)
      }
    });
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Redeem reward
router.post('/rewards/:id/redeem', authenticateToken, async (req, res) => {
  try {
    const reward = await Reward.findOne({
      where: {
        id: req.params.id,
        isActive: true
      }
    });

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }

    // Check if user has enough points
    if (req.user.points < reward.pointsCost) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient points'
      });
    }

    // Check stock quantity
    if (reward.stockQuantity !== null && reward.stockQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Reward out of stock'
      });
    }

    // Check max redemptions per user
    if (reward.maxRedemptionsPerUser) {
      const userRedemptions = await UserReward.count({
        where: {
          userId: req.user.id,
          rewardId: reward.id
        }
      });

      if (userRedemptions >= reward.maxRedemptionsPerUser) {
        return res.status(400).json({
          success: false,
          message: 'Maximum redemptions reached for this reward'
        });
      }
    }

    // Generate redemption code
    const redemptionCode = `RWD${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Calculate expiry date
    let expiresAt = null;
    if (reward.expiryDays) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + reward.expiryDays);
    }

    // Create user reward
    const userReward = await UserReward.create({
      userId: req.user.id,
      rewardId: reward.id,
      pointsSpent: reward.pointsCost,
      redemptionCode,
      expiresAt
    });

    // Deduct points from user
    await req.user.decrement('points', { by: reward.pointsCost });

    // Update stock quantity
    if (reward.stockQuantity !== null) {
      await reward.decrement('stockQuantity', { by: 1 });
    }

    res.json({
      success: true,
      message: 'Reward redeemed successfully',
      redemption: userReward
    });
  } catch (error) {
    console.error('Redeem reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's reward history
router.get('/rewards/history', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const redemptions = await UserReward.findAndCountAll({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: Reward,
          attributes: ['name', 'type', 'brand', 'image']
        },
        // Include linked voucher record to provide a fallback code if voucherCode is missing
        {
          model: RewardVoucher,
          as: 'voucher',
          attributes: ['code', 'status']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      redemptions: redemptions.rows,
      pagination: {
        total: redemptions.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(redemptions.count / limit)
      }
    });
  } catch (error) {
    console.error('Get reward history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get bank account details
router.get('/bank-details', authenticateToken, bankDetailsLimiter, async (req, res) => {
  const requestId = `GET-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  console.log(`🏦 BANK API [${requestId}]: GET /api/users/bank-details - Starting request`);
  console.log(`🏦 BANK API [${requestId}]: User ID: ${req.user.id}, Email: ${req.user.email}`);

  try {
    // Check database connection and health
    console.log(`🏦 BANK API [${requestId}]: Checking database connection and health...`);
    const dbResponseTime = await checkDatabaseHealth(req.user.sequelize);
    console.log(`🏦 BANK API [${requestId}]: Database connection verified (${dbResponseTime}ms)`);

    // Fetch fresh user data
    console.log(`🏦 BANK API [${requestId}]: Fetching fresh user data from database...`);
    const freshUser = await User.findByPk(req.user.id);

    if (!freshUser) {
      console.log(`🏦 BANK API [${requestId}]: User not found in database`);
      return res.status(404).json({
        success: false,
        message: 'User not found',
        requestId
      });
    }

    console.log(`🏦 BANK API [${requestId}]: Raw user bank data:`, {
      accountHolderName: freshUser.accountHolderName,
      accountNumber: freshUser.accountNumber,
      ifscCode: freshUser.ifscCode
    });

    const bankDetails = {
      accountHolderName: freshUser.accountHolderName || null,
      accountNumber: freshUser.accountNumber || null,
      ifscCode: freshUser.ifscCode || null
    };

    console.log(`🏦 BANK API [${requestId}]: Processed bank details:`, bankDetails);
    console.log(`🏦 BANK API [${requestId}]: GET request completed successfully`);

    res.json({
      success: true,
      bankDetails,
      requestId
    });
  } catch (error) {
    console.error(`🏦 BANK API [${requestId}]: GET request failed:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error.name === 'SequelizeConnectionError') {
      statusCode = 503;
      errorMessage = 'Database connection failed';
    } else if (error.name === 'SequelizeTimeoutError') {
      statusCode = 504;
      errorMessage = 'Database query timeout';
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      requestId,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update bank account details
router.put('/bank-details', authenticateToken, bankDetailsLimiter, [
  body('accountHolderName')
    .optional({ checkFalsy: true })
    .isLength({ min: 1, max: 100 })
    .withMessage('Account holder name must be between 1 and 100 characters')
    .matches(/^[a-zA-Z0-9\s.'-]+$/)
    .withMessage('Account holder name can only contain letters, numbers, spaces, dots, apostrophes, and hyphens'),
  body('accountNumber')
    .optional({ checkFalsy: true })
    .isLength({ min: 9, max: 20 })
    .withMessage('Account number must be between 9 and 20 characters')
    .isNumeric()
    .withMessage('Account number must contain only digits'),
  body('ifscCode')
    .optional({ checkFalsy: true })
    .isLength({ min: 11, max: 11 })
    .withMessage('IFSC code must be exactly 11 characters')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage('IFSC code format is invalid (e.g., SBIN0123456)')
], async (req, res) => {
  const requestId = `PUT-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  console.log(`🏦 BANK API [${requestId}]: PUT /api/users/bank-details - Starting request`);
  console.log(`🏦 BANK API [${requestId}]: User ID: ${req.user.id}, Email: ${req.user.email}`);
  console.log(`🏦 BANK API [${requestId}]: Request body:`, req.body);
  console.log(`🏦 BANK API [${requestId}]: Request headers:`, {
    'content-type': req.headers['content-type'],
    'authorization': req.headers.authorization ? 'Bearer [PRESENT]' : 'Missing',
    'user-agent': req.headers['user-agent']
  });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(`🏦 BANK API [${requestId}]: Validation failed:`, errors.array());
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
      requestId
    });
  }

  console.log(`🏦 BANK API [${requestId}]: Validation passed`);

  try {
    const { accountHolderName, accountNumber, ifscCode } = req.body;

    // Enhanced input sanitization
    const sanitizedData = {
      accountHolderName: accountHolderName ? sanitizeInput(accountHolderName) : null,
      accountNumber: accountNumber ? sanitizeInput(accountNumber) : null,
      ifscCode: ifscCode ? sanitizeInput(ifscCode).toUpperCase() : null
    };

    // Additional validation after sanitization
    if (sanitizedData.accountHolderName && sanitizedData.accountHolderName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Account holder name too short after sanitization',
        requestId
      });
    }

    if (sanitizedData.accountNumber && !/^\d{9,20}$/.test(sanitizedData.accountNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account number format after sanitization',
        requestId
      });
    }

    if (sanitizedData.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(sanitizedData.ifscCode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid IFSC code format after sanitization',
        requestId
      });
    }

    console.log(`🏦 BANK API [${requestId}]: Sanitized data:`, sanitizedData);

    // Check database connection and health
    console.log(`🏦 BANK API [${requestId}]: Checking database connection and health...`);
    const dbResponseTime = await checkDatabaseHealth(req.user.sequelize);
    console.log(`🏦 BANK API [${requestId}]: Database connection verified (${dbResponseTime}ms)`);

    // Fetch fresh user data
    console.log(`🏦 BANK API [${requestId}]: Fetching user from database...`);
    const user = await User.findByPk(req.user.id);

    if (!user) {
      console.log(`🏦 BANK API [${requestId}]: User not found in database`);
      return res.status(404).json({
        success: false,
        message: 'User not found',
        requestId
      });
    }

    console.log(`🏦 BANK API [${requestId}]: User found, current bank details:`, {
      accountHolderName: user.accountHolderName,
      accountNumber: user.accountNumber,
      ifscCode: user.ifscCode
    });

    // Update bank details
    console.log(`🏦 BANK API [${requestId}]: Updating bank details in database...`);
    const updateStartTime = Date.now();

    await user.update({
      accountHolderName: sanitizedData.accountHolderName,
      accountNumber: sanitizedData.accountNumber,
      ifscCode: sanitizedData.ifscCode
    });

    const updateEndTime = Date.now();
    console.log(`🏦 BANK API [${requestId}]: Database update completed in ${updateEndTime - updateStartTime}ms`);

    // Verify the update
    await user.reload();
    console.log(`🏦 BANK API [${requestId}]: Updated bank details verified:`, {
      accountHolderName: user.accountHolderName,
      accountNumber: user.accountNumber,
      ifscCode: user.ifscCode
    });

    const responseData = {
      success: true,
      message: 'Bank details updated successfully',
      bankDetails: {
        accountHolderName: user.accountHolderName,
        accountNumber: user.accountNumber,
        ifscCode: user.ifscCode
      },
      requestId,
      timestamp: new Date().toISOString()
    };

    console.log(`🏦 BANK API [${requestId}]: PUT request completed successfully`);
    console.log(`🏦 BANK API [${requestId}]: Response data:`, responseData);

    res.json(responseData);
  } catch (error) {
    console.error(`🏦 BANK API [${requestId}]: PUT request failed:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      sql: error.sql
    });

    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error.name === 'SequelizeConnectionError') {
      statusCode = 503;
      errorMessage = 'Database connection failed';
    } else if (error.name === 'SequelizeTimeoutError') {
      statusCode = 504;
      errorMessage = 'Database query timeout';
    } else if (error.name === 'SequelizeValidationError') {
      statusCode = 400;
      errorMessage = 'Database validation failed';
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 409;
      errorMessage = 'Duplicate data conflict';
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      requestId,
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Withdrawal request endpoint
router.post('/withdrawal-request', authenticateToken, [
  body('amount')
    .isInt({ min: 100 })
    .withMessage('Withdrawal amount must be at least 100 points')
], async (req, res) => {
  const requestId = `WD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  console.log(`💰 WITHDRAWAL API [${requestId}]: POST /api/users/withdrawal-request - Starting request`);
  console.log(`💰 WITHDRAWAL API [${requestId}]: User ID: ${req.user.id}, Email: ${req.user.email}`);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`💰 WITHDRAWAL API [${requestId}]: Validation failed:`, errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
        requestId
      });
    }

    const { amount } = req.body;
    console.log(`💰 WITHDRAWAL API [${requestId}]: Withdrawal amount: ${amount}`);

    // Fetch fresh user data
    const user = await User.findByPk(req.user.id);
    if (!user) {
      console.log(`💰 WITHDRAWAL API [${requestId}]: User not found`);
      return res.status(404).json({
        success: false,
        message: 'User not found',
        requestId
      });
    }

    // Check if user has complete bank details
    if (!user.accountHolderName || !user.accountNumber || !user.ifscCode) {
      console.log(`💰 WITHDRAWAL API [${requestId}]: Incomplete bank details`);
      return res.status(400).json({
        success: false,
        message: 'Please complete your bank details before making a withdrawal request',
        requestId
      });
    }

    // Check if user has sufficient points
    if (user.points < amount) {
      console.log(`💰 WITHDRAWAL API [${requestId}]: Insufficient points. User has: ${user.points}, Requested: ${amount}`);
      return res.status(400).json({
        success: false,
        message: `Insufficient points. You have ${user.points} points available`,
        requestId
      });
    }

    // Create bank details snapshot
    const bankDetailsSnapshot = {
      accountHolderName: user.accountHolderName,
      accountNumber: user.accountNumber,
      ifscCode: user.ifscCode,
      capturedAt: new Date().toISOString()
    };

    console.log(`💰 WITHDRAWAL API [${requestId}]: Creating withdrawal request...`);

    // Create withdrawal request
    const withdrawalRequest = await WithdrawalRequest.create({
      userId: user.id,
      amount: amount,
      bankDetails: bankDetailsSnapshot,
      status: 'pending'
    });

    // Deduct points from user account
    console.log(`💰 WITHDRAWAL API [${requestId}]: Deducting ${amount} points from user account...`);
    await user.update({
      points: user.points - amount
    });

    console.log(`💰 WITHDRAWAL API [${requestId}]: Withdrawal request created successfully. ID: ${withdrawalRequest.id}`);

    const responseData = {
      success: true,
      message: 'Withdrawal request submitted successfully',
      withdrawalRequest: {
        id: withdrawalRequest.id,
        amount: withdrawalRequest.amount,
        status: withdrawalRequest.status,
        requestDate: withdrawalRequest.requestDate
      },
      remainingPoints: user.points - amount,
      requestId,
      timestamp: new Date().toISOString()
    };

    console.log(`💰 WITHDRAWAL API [${requestId}]: Request completed successfully`);
    res.json(responseData);

  } catch (error) {
    console.error(`💰 WITHDRAWAL API [${requestId}]: Request failed:`, {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error.name === 'SequelizeConnectionError') {
      statusCode = 503;
      errorMessage = 'Database connection failed';
    } else if (error.name === 'SequelizeTimeoutError') {
      statusCode = 504;
      errorMessage = 'Database query timeout';
    } else if (error.name === 'SequelizeValidationError') {
      statusCode = 400;
      errorMessage = 'Database validation failed';
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      requestId,
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user's withdrawal history
router.get('/withdrawal-history', authenticateToken, async (req, res) => {
  const requestId = `WH-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: GET /api/users/withdrawal-history - Starting request`);
  console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: User ID: ${req.user.id}, Email: ${req.user.email}`);

  try {
    const { page = 1, limit = 10, sortBy = 'requestDate', sortOrder = 'DESC', statusFilter } = req.query;
    const offset = (page - 1) * limit;

    console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: Query params - page: ${page}, limit: ${limit}, sortBy: ${sortBy}, sortOrder: ${sortOrder}, statusFilter: ${statusFilter}`);

    // Validate sort parameters
    const allowedSortFields = ['requestDate', 'amount', 'status', 'processedDate'];
    const allowedSortOrders = ['ASC', 'DESC'];

    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'requestDate';
    const validSortOrder = allowedSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

    console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: Using validated sort - ${validSortBy} ${validSortOrder}`);

    // Check database connection and health
    const dbResponseTime = await checkDatabaseHealth(req.user.sequelize);
    console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: Database connection verified (${dbResponseTime}ms)`);

    // Build where clause with optional status filtering
    const whereClause = {
      userId: req.user.id
    };

    // Add status filter if provided
    if (statusFilter) {
      const validStatuses = ['pending', 'approved', 'rejected', 'processed'];
      if (validStatuses.includes(statusFilter.toLowerCase())) {
        whereClause.status = statusFilter.toLowerCase();
        console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: Filtering by status: ${statusFilter}`);
      } else {
        console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: Invalid status filter: ${statusFilter}, ignoring`);
      }
    }

    // Fetch withdrawal requests with pagination
    const withdrawalRequests = await WithdrawalRequest.findAndCountAll({
      where: whereClause,
      attributes: [
        'id',
        'amount',
        'status',
        'requestDate',
        'processedDate',
        'rejectionReason',
        'transactionId',
        'notes',
        'createdAt',
        'updatedAt'
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[validSortBy, validSortOrder]]
    });

    console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: Found ${withdrawalRequests.count} total withdrawal requests, returning ${withdrawalRequests.rows.length} for current page`);

    // Format the response data
    const formattedRequests = withdrawalRequests.rows.map(request => ({
      id: request.id,
      amount: request.amount,
      status: request.status,
      requestDate: request.requestDate,
      processedDate: request.processedDate,
      rejectionReason: request.rejectionReason,
      transactionId: request.transactionId,
      notes: request.notes,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt
    }));

    const responseData = {
      success: true,
      withdrawalHistory: formattedRequests,
      pagination: {
        total: withdrawalRequests.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(withdrawalRequests.count / limit),
        hasNextPage: parseInt(page) < Math.ceil(withdrawalRequests.count / limit),
        hasPrevPage: parseInt(page) > 1
      },
      sorting: {
        sortBy: validSortBy,
        sortOrder: validSortOrder
      },
      filtering: {
        statusFilter: statusFilter || null,
        appliedFilter: whereClause.status || null
      },
      requestId,
      timestamp: new Date().toISOString()
    };

    console.log(`📋 WITHDRAWAL HISTORY API [${requestId}]: Request completed successfully`);
    res.json(responseData);

  } catch (error) {
    console.error(`📋 WITHDRAWAL HISTORY API [${requestId}]: Request failed:`, {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error.name === 'SequelizeConnectionError') {
      statusCode = 503;
      errorMessage = 'Database connection failed';
    } else if (error.name === 'SequelizeTimeoutError') {
      statusCode = 504;
      errorMessage = 'Database query timeout';
    } else if (error.name === 'SequelizeValidationError') {
      statusCode = 400;
      errorMessage = 'Database validation failed';
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      requestId,
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
