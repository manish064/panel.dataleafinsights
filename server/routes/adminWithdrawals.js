const express = require('express');
const { Op, sequelize } = require('sequelize');
const { WithdrawalRequest, User, UserReward, Admin } = require('../models');
const { authenticateAdmin, requirePermission, logAdminAction } = require('../middleware/adminAuth');
const router = express.Router();

// Get all withdrawal requests
router.get('/', authenticateAdmin, requirePermission('withdrawals', 'read'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      search
    } = req.query;
    
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const whereClause = {};
    
    // Filter by status if provided
    if (status && ['pending', 'approved', 'rejected', 'processing'].includes(status)) {
      whereClause.status = status;
    }
    
    // Search functionality
    const includeClause = {
      model: User,
      attributes: ['id', 'email', 'firstName', 'lastName'],
      required: true
    };
    
    if (search) {
      includeClause.where = {
        [Op.or]: [
          { email: { [Op.like]: `%${search}%` } },
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } }
        ]
      };
    }
    
    const { count, rows: withdrawals } = await WithdrawalRequest.findAndCountAll({
      where: whereClause,
      include: [
        includeClause,
        {
          model: Admin,
          as: 'ApprovedByAdmin',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: false
        },
        {
          model: Admin,
          as: 'RejectedByAdmin',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: false
        }
      ],
      limit: parseInt(limit),
      offset,
      order: [[sortBy, sortOrder.toUpperCase()]],
      distinct: true
    });
    
    await logAdminAction(req.admin.id, 'withdrawals', 'read', 'Retrieved withdrawal requests list');
    
    res.json({
      success: true,
      data: {
        withdrawals,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / parseInt(limit)),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get withdrawal requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get withdrawal statistics (new endpoint) - MUST be before /:id route
router.get('/stats', authenticateAdmin, requirePermission('withdrawals', 'read'), async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    const [totalRequests, pendingRequests, approvedRequests, rejectedRequests, totalAmount, approvedAmount, pendingAmount] = await Promise.all([
      WithdrawalRequest.count(),
      WithdrawalRequest.count({ where: { status: 'pending' } }),
      WithdrawalRequest.count({ where: { status: 'approved' } }),
      WithdrawalRequest.count({ where: { status: 'rejected' } }),
      WithdrawalRequest.sum('amount') || 0,
      WithdrawalRequest.sum('amount', { where: { status: 'approved' } }) || 0,
      WithdrawalRequest.sum('amount', { where: { status: 'pending' } }) || 0
    ]);
    
    const periodRequests = await WithdrawalRequest.count({
      where: { createdAt: { [Op.gte]: startDate } }
    });
    
    const periodAmount = await WithdrawalRequest.sum('amount', {
      where: { createdAt: { [Op.gte]: startDate } }
    }) || 0;
    
    await logAdminAction(req.admin.id, 'withdrawals', 'read', 'Retrieved withdrawal statistics');
    
    res.json({
      success: true,
      data: {
        overview: {
          totalRequests,
          pendingRequests,
          approvedRequests,
          rejectedRequests,
          totalAmount,
          approvedAmount,
          pendingAmount
        },
        period: {
          requests: periodRequests,
          amount: periodAmount,
          timeframe: period
        }
      }
    });
  } catch (error) {
    console.error('Get withdrawal statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get withdrawal statistics (legacy endpoint)
router.get('/stats/overview', authenticateAdmin, requirePermission('withdrawals', 'read'), async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    // Get total statistics
    const totalStats = await WithdrawalRequest.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalRequests'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'pending' THEN 1 END")), 'pendingRequests'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'pending' THEN amount ELSE 0 END")), 'pendingAmount'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'approved' THEN 1 END")), 'approvedRequests'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'approved' THEN amount ELSE 0 END")), 'approvedAmount'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'rejected' THEN 1 END")), 'rejectedRequests'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'rejected' THEN amount ELSE 0 END")), 'rejectedAmount']
      ],
      raw: true
    });
    
    // Get period statistics
    const periodStats = await WithdrawalRequest.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate
        }
      },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'requests'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'amount']
      ],
      raw: true
    });
    
    const totalRequests = parseInt(totalStats[0].totalRequests) || 0;
    const totalAmount = parseFloat(totalStats[0].totalAmount) || 0;
    const pendingRequests = parseInt(totalStats[0].pendingRequests) || 0;
    const pendingAmount = parseFloat(totalStats[0].pendingAmount) || 0;
    const approvedRequests = parseInt(totalStats[0].approvedRequests) || 0;
    const approvedAmount = parseFloat(totalStats[0].approvedAmount) || 0;
    const rejectedRequests = parseInt(totalStats[0].rejectedRequests) || 0;
    const rejectedAmount = parseFloat(totalStats[0].rejectedAmount) || 0;
    
    const periodRequests = parseInt(periodStats[0].requests) || 0;
    const periodAmount = parseFloat(periodStats[0].amount) || 0;
    
    await logAdminAction(req.admin.id, 'withdrawals', 'read', 'Retrieved withdrawal statistics');
    
    res.json({
      success: true,
      data: {
        total: {
          requests: totalRequests,
          amount: totalAmount,
          pending: {
            requests: pendingRequests,
            amount: pendingAmount
          },
          approved: {
            requests: approvedRequests,
            amount: approvedAmount
          },
          rejected: {
            requests: rejectedRequests,
            amount: rejectedAmount
          }
        },
        period: {
          requests: periodRequests,
          amount: periodAmount,
          timeframe: period
        }
      }
    });
  } catch (error) {
    console.error('Get withdrawal statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get withdrawal request by ID
router.get('/:id', authenticateAdmin, requirePermission('withdrawals', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const withdrawal = await WithdrawalRequest.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName', 'createdAt']
      }]
    });
    
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal request not found'
      });
    }
    
    await logAdminAction(req.admin.id, 'withdrawals', 'read', `Retrieved withdrawal request ${id}`);
    
    res.json({
      success: true,
      data: {
        withdrawal
      }
    });
  } catch (error) {
    console.error('Get withdrawal request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Approve withdrawal request
router.post('/:id/approve', authenticateAdmin, requirePermission('withdrawals', 'write'), async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, processingMethod = 'manual' } = req.body;
    
    const withdrawal = await WithdrawalRequest.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName']
      }]
    });
    
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal request not found'
      });
    }
    
    if (withdrawal.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot approve withdrawal request with status: ${withdrawal.status}`
      });
    }
    
    // Update withdrawal status
    await withdrawal.update({
      status: 'approved',
      processedDate: new Date(),
      approvedAt: new Date(),
      approvedBy: req.admin.id,
      adminNotes: notes || ''
    });

    // Deduct points from user account (withdrawal amount represents points)
    const user = await User.findByPk(withdrawal.userId);
    if (user) {
      await user.update({
        points: Math.max(0, user.points - withdrawal.amount) // Ensure points don't go negative
      });
      
      // Emit real-time notification to user about point deduction
      if (global.io) {
        global.io.to(`user-${withdrawal.userId}`).emit('pointsUpdated', {
          newBalance: Math.max(0, user.points - withdrawal.amount),
          change: -withdrawal.amount,
          reason: 'withdrawal_approved',
          withdrawalId: withdrawal.id,
          message: `Your withdrawal request of ${withdrawal.amount} points has been approved and processed.`
        });
      }
    }

    // Get the withdrawal reward (system reward for withdrawals)
    const { Reward } = require('../models');
    const withdrawalReward = await Reward.findOne({ where: { name: 'Cash Withdrawal' } });
    
    // Create a UserReward entry to increment the user's rewards redeemed count
    // This represents the successful withdrawal/redemption
    await UserReward.create({
      userId: withdrawal.userId,
      rewardId: withdrawalReward.id, // Use the withdrawal reward ID
      pointsSpent: withdrawal.amount, // Points spent for withdrawal
      redemptionCode: `WITHDRAWAL_${withdrawal.id}`,
      status: 'completed',
      expiresAt: null
    });

    await logAdminAction(
      req.admin.id,
      'withdrawals',
      'approve',
      `Approved withdrawal request ${id} for user ${withdrawal.User.email} - Amount: ${withdrawal.amount} points deducted from user account`
    );
    
    res.json({
      success: true,
      data: {
        withdrawal: await WithdrawalRequest.findByPk(id, {
          include: [{
            model: User,
            attributes: ['id', 'email', 'firstName', 'lastName']
          }]
        }),
        message: 'Withdrawal request approved successfully'
      }
    });
  } catch (error) {
    console.error('Approve withdrawal request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Reject withdrawal request
router.post('/:id/reject', authenticateAdmin, requirePermission('withdrawals', 'write'), async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, notes } = req.body;
    
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }
    
    const withdrawal = await WithdrawalRequest.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName']
      }]
    });
    
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal request not found'
      });
    }
    
    if (withdrawal.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot reject withdrawal request with status: ${withdrawal.status}`
      });
    }
    
    // Update withdrawal status
    await withdrawal.update({
      status: 'rejected',
      rejectedAt: new Date(),
      rejectedBy: req.admin.id,
      rejectionReason: reason,
      adminNotes: notes || ''
    });

    // Add points back to user account (withdrawal amount represents points)
    const user = await User.findByPk(withdrawal.userId);
    if (user) {
      const newBalance = user.points + withdrawal.amount;
      await user.update({
        points: newBalance
      });
      
      // Emit real-time notification to user about point restoration
      if (global.io) {
        global.io.to(`user-${withdrawal.userId}`).emit('pointsUpdated', {
          newBalance: newBalance,
          change: withdrawal.amount,
          reason: 'withdrawal_rejected',
          withdrawalId: withdrawal.id,
          message: `Your withdrawal request of ${withdrawal.amount} points has been rejected. Points have been restored to your account.`
        });
      }
    }
    
    await logAdminAction(
      req.admin.id,
      'withdrawals',
      'reject',
      `Rejected withdrawal request ${id} for user ${withdrawal.User.email} - Reason: ${reason} - ${withdrawal.amount} points returned to user account`
    );
    
    res.json({
      success: true,
      data: {
        withdrawal: await WithdrawalRequest.findByPk(id, {
          include: [{
            model: User,
            attributes: ['id', 'email', 'firstName', 'lastName']
          }]
        }),
        message: 'Withdrawal request rejected successfully'
      }
    });
  } catch (error) {
    console.error('Reject withdrawal request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update withdrawal request status (for processing, completed, etc.)
router.put('/:id/status', authenticateAdmin, requirePermission('withdrawals', 'write'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const validStatuses = ['pending', 'approved', 'rejected', 'processing', 'completed', 'failed'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const withdrawal = await WithdrawalRequest.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName']
      }]
    });
    
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: 'Withdrawal request not found'
      });
    }
    
    const updateData = {
      status,
      adminNotes: notes || withdrawal.adminNotes
    };
    
    // Set appropriate timestamp based on status
    if (status === 'completed') {
      updateData.completedAt = new Date();
    } else if (status === 'processing') {
      updateData.processingStartedAt = new Date();
    }
    
    await withdrawal.update(updateData);
    
    await logAdminAction(
      req.admin.id,
      'withdrawals',
      'update',
      `Updated withdrawal request ${id} status to ${status}`
    );
    
    res.json({
      success: true,
      data: {
        withdrawal: await WithdrawalRequest.findByPk(id, {
          include: [{
            model: User,
            attributes: ['id', 'email', 'firstName', 'lastName']
          }]
        }),
        message: 'Withdrawal request status updated successfully'
      }
    });
  } catch (error) {
    console.error('Update withdrawal status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;