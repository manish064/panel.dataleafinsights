const express = require('express');
const { Op } = require('sequelize');
const { User, Survey, SurveyResponse, UserReward, WithdrawalRequest, Reward } = require('../models');
const { authenticateAdmin, requirePermission, logAdminAction } = require('../middleware/adminAuth');
const router = express.Router();

// Get all users with filtering and pagination
router.get('/', authenticateAdmin, requirePermission('users', 'read'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      dateFrom = '',
      dateTo = ''
    } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    // Search filter
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }
    
    // Status filter
    if (status) {
      switch (status) {
        case 'active':
          whereClause.isActive = true;
          break;
        case 'inactive':
        case 'suspended':
          whereClause.isActive = false;
          break;
        case 'verified':
          whereClause.emailVerified = true;
          break;
        case 'unverified':
          whereClause.emailVerified = false;
          break;
      }
    }
    
    // Date range filter
    if (dateFrom || dateTo) {
      whereClause.createdAt = {};
      if (dateFrom) {
        whereClause.createdAt[Op.gte] = new Date(dateFrom);
      }
      if (dateTo) {
        whereClause.createdAt[Op.lte] = new Date(dateTo);
      }
    }
    
    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: SurveyResponse,
          attributes: ['id'],
          separate: true
        },
        {
          model: UserReward,
          attributes: ['id'],
          separate: true
        },
        {
          model: WithdrawalRequest,
          attributes: ['id', 'amount', 'status'],
          separate: true
        }
      ]
    });
    
    // Calculate additional stats for each user
    const usersWithStats = users.map(user => {
      const approvedWithdrawals = user.WithdrawalRequests ? 
        user.WithdrawalRequests.filter(w => w.status === 'approved') : [];
      const approvedWithdrawalAmount = approvedWithdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);
      
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        country: user.country,
        city: user.city,
        points: user.points,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLogin: user.updatedAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        surveyCount: user.SurveyResponses ? user.SurveyResponses.length : 0,
        rewardCount: user.UserRewards ? user.UserRewards.length : 0,
        approvedWithdrawalAmount: approvedWithdrawalAmount
      };
    });
    
    res.json({
      success: true,
      data: {
        users: usersWithStats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user statistics
router.get('/stats', authenticateAdmin, requirePermission('users', 'read'), async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const [totalUsers, activeUsers, newUsers, verifiedUsers, last7DaysUsers] = await Promise.all([
      User.count(),
      User.count({ where: { isActive: true } }),
      User.count({ where: { createdAt: { [Op.gte]: last30Days } } }),
      User.count({ where: { emailVerified: true } }),
      User.count({ where: { createdAt: { [Op.gte]: last7Days } } })
    ]);
    
    const inactiveUsers = totalUsers - activeUsers;
    
    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        newUsers,
        verifiedUsers,
        last7DaysUsers
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single user details
router.get('/:id', authenticateAdmin, requirePermission('users', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      include: [
        {
          model: SurveyResponse,
          as: 'SurveyResponses',
          include: [{
            model: Survey,
            attributes: ['id', 'title', 'description']
          }],
          order: [['createdAt', 'DESC']],
          limit: 10
        },
        {
          model: UserReward,
          as: 'UserRewards',
          include: [{
            model: Reward,
            attributes: ['id', 'name', 'type', 'pointsCost']
          }],
          order: [['createdAt', 'DESC']],
          limit: 10
        },
        {
          model: WithdrawalRequest,
          as: 'WithdrawalRequests',
          order: [['createdAt', 'DESC']],
          limit: 5
        }
      ]
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user
router.put('/:id', authenticateAdmin, requirePermission('users', 'update'), logAdminAction('UPDATE_USER', 'user'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,

      dateOfBirth,
      gender,
      country,
      city,
      points,
      isActive,
      emailVerified
    } = req.body;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Store original data for audit log
    req.originalData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,

      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      country: user.country,
      city: user.city,
      points: user.points,
      isActive: user.isActive,
      emailVerified: user.emailVerified
    };
    
    const updatedUser = await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,

      dateOfBirth: dateOfBirth || user.dateOfBirth,
      gender: gender || user.gender,
      country: country || user.country,
      city: city || user.city,
      points: points !== undefined ? points : user.points,
      isActive: isActive !== undefined ? isActive : user.isActive,
      emailVerified: emailVerified !== undefined ? emailVerified : user.emailVerified
    });
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Suspend user
router.post('/:id/suspend', authenticateAdmin, requirePermission('users', 'update'), logAdminAction('SUSPEND_USER', 'user'), async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    req.originalData = { isActive: user.isActive };
    req.metadata = { reason };
    
    await user.update({ isActive: false });
    
    res.json({
      success: true,
      message: 'User suspended successfully'
    });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Unsuspend user
router.post('/:id/unsuspend', authenticateAdmin, requirePermission('users', 'update'), logAdminAction('UNSUSPEND_USER', 'user'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    req.originalData = { isActive: user.isActive };
    
    await user.update({ isActive: true });
    
    res.json({
      success: true,
      message: 'User unsuspended successfully'
    });
  } catch (error) {
    console.error('Unsuspend user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Activate user
router.post('/:id/activate', authenticateAdmin, requirePermission('users', 'update'), logAdminAction('ACTIVATE_USER', 'user'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    req.originalData = { isActive: user.isActive };
    
    await user.update({ isActive: true });
    
    res.json({
      success: true,
      message: 'User activated successfully'
    });
  } catch (error) {
    console.error('Activate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Deactivate user
router.post('/:id/deactivate', authenticateAdmin, requirePermission('users', 'update'), logAdminAction('DEACTIVATE_USER', 'user'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    req.originalData = { isActive: user.isActive };
    
    await user.update({ isActive: false });
    
    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete user
router.delete('/:id', authenticateAdmin, requirePermission('users', 'delete'), logAdminAction('DELETE_USER', 'user'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Store original data for audit log
    req.originalData = user.toJSON();
    
    await user.destroy();
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Bulk operations
router.post('/bulk-action', authenticateAdmin, requirePermission('users', 'update'), logAdminAction('BULK_USER_ACTION', 'user'), async (req, res) => {
  try {
    const { action, userIds, reason } = req.body;
    
    if (!action || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Action and user IDs are required'
      });
    }
    
    const users = await User.findAll({
      where: {
        id: { [Op.in]: userIds }
      }
    });
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found'
      });
    }
    
    let updateData = {};
    let actionMessage = '';
    
    switch (action) {
      case 'activate':
        updateData = { isActive: true };
        actionMessage = 'activated';
        break;
      case 'deactivate':
        updateData = { isActive: false };
        actionMessage = 'deactivated';
        break;
      case 'suspend':
        updateData = { isActive: false };
        actionMessage = 'suspended';
        break;
      case 'unsuspend':
        updateData = { isActive: true };
        actionMessage = 'unsuspended';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action. Supported actions: activate, deactivate, suspend, unsuspend'
        });
    }
    
    // Store original data for audit log
    req.originalData = users.map(user => ({
      id: user.id,
      email: user.email,
      isActive: user.isActive
    }));
    req.metadata = { action, reason, userCount: users.length };
    
    await User.update(updateData, {
      where: {
        id: { [Op.in]: userIds }
      }
    });
    
    res.json({
      success: true,
      message: `${users.length} users ${actionMessage} successfully`
    });
  } catch (error) {
    console.error('Bulk user action error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Export users data
router.get('/export/csv', authenticateAdmin, requirePermission('users', 'read'), logAdminAction('EXPORT_USERS', 'user'), async (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    
    const users = await User.findAll({
      attributes: [
        'id', 'firstName', 'lastName', 'email', 'dateOfBirth',
        'gender', 'country', 'city', 'occupation', 'income', 'points',
        'isActive', 'emailVerified', 'createdAt'
      ],
      order: [['createdAt', 'DESC']]
    });
    
    if (format === 'csv') {
      const csvHeader = 'ID,First Name,Last Name,Email,Date of Birth,Gender,Country,City,Occupation,Income,Points,Active,Email Verified,Created At\n';
      const csvData = users.map(user => [
        user.id,
        user.firstName || '',
        user.lastName || '',
        user.email,
        user.dateOfBirth || '',
        user.gender || '',
        user.country || '',
        user.city || '',
        user.occupation || '',
        user.income || '',
        user.points,
        user.isActive,
        user.emailVerified,
        user.createdAt
      ].join(',')).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
      res.send(csvHeader + csvData);
    } else {
      res.json({
        success: true,
        data: {
          users
        }
      });
    }
  } catch (error) {
    console.error('Export users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;