const express = require('express');
const { Op } = require('sequelize');
const { User, Survey, SurveyResponse, Reward, UserReward, WithdrawalRequest, Admin, AuditLog } = require('../models');
const { authenticateAdmin, requirePermission, logAdminAction } = require('../middleware/adminAuth');
const router = express.Router();

// Get dashboard statistics
router.get('/stats', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range based on period
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
    
    // Get total counts
    const [totalUsers, totalSurveys, totalResponses, totalRewards, totalWithdrawals] = await Promise.all([
      User.count(),
      Survey.count(),
      SurveyResponse.count(),
      Reward.count(),
      WithdrawalRequest.count()
    ]);
    
    // Get period-specific counts
    const [newUsers, newSurveys, newResponses, newRewards, pendingWithdrawals] = await Promise.all([
      User.count({ where: { createdAt: { [Op.gte]: startDate } } }),
      Survey.count({ where: { createdAt: { [Op.gte]: startDate } } }),
      SurveyResponse.count({ where: { createdAt: { [Op.gte]: startDate } } }),
      Reward.count({ where: { createdAt: { [Op.gte]: startDate } } }),
      WithdrawalRequest.count({ where: { status: 'pending' } })
    ]);
    
    // Get active users (users who completed surveys in the period)
    const activeUsers = await User.count({
      include: [{
        model: SurveyResponse,
        where: { createdAt: { [Op.gte]: startDate } },
        required: true
      }],
      distinct: true
    });
    
    // Get revenue data (assuming points have monetary value)
    const totalPointsEarned = await SurveyResponse.sum('pointsEarned') || 0;
    const totalPointsRedeemed = await UserReward.sum('pointsSpent') || 0;
    const totalWithdrawalAmount = await WithdrawalRequest.sum('amount', {
      where: { status: 'approved' }
    }) || 0;
    
    // Calculate growth percentages (mock calculation for demo)
    const userGrowth = Math.round((newUsers / Math.max(totalUsers - newUsers, 1)) * 100);
    const surveyGrowth = Math.round((newSurveys / Math.max(totalSurveys - newSurveys, 1)) * 100);
    const responseGrowth = Math.round((newResponses / Math.max(totalResponses - newResponses, 1)) * 100);
    
    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalSurveys,
          totalResponses,
          totalRewards,
          activeUsers,
          pendingWithdrawals
        },
        growth: {
          users: {
            total: totalUsers,
            new: newUsers,
            growth: userGrowth
          },
          surveys: {
            total: totalSurveys,
            new: newSurveys,
            growth: surveyGrowth
          },
          responses: {
            total: totalResponses,
            new: newResponses,
            growth: responseGrowth
          }
        },
        revenue: {
          totalPointsEarned,
          totalPointsRedeemed,
          totalWithdrawalAmount,
          pointsBalance: totalPointsEarned - totalPointsRedeemed
        },
        period
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user registration chart data
router.get('/charts/user-registrations', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const now = new Date();
    let startDate, groupBy, dateFormat;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        groupBy = 'DATE(createdAt)';
        dateFormat = '%Y-%m-%d';
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        groupBy = 'DATE(createdAt)';
        dateFormat = '%Y-%m-%d';
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        groupBy = 'DATE(createdAt)';
        dateFormat = '%Y-%m-%d';
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        groupBy = 'strftime("%Y-%m", createdAt)';
        dateFormat = '%Y-%m';
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        groupBy = 'DATE(createdAt)';
        dateFormat = '%Y-%m-%d';
    }
    
    // For SQLite, we'll use a simpler approach
    const users = await User.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group users by date
    const usersByDate = {};
    users.forEach(user => {
      const date = user.createdAt.toISOString().split('T')[0];
      usersByDate[date] = (usersByDate[date] || 0) + 1;
    });
    
    // Convert to chart format
    const chartData = Object.entries(usersByDate).map(([date, count]) => ({
      date,
      users: count
    }));
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get user registrations chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get survey completions chart data
router.get('/charts/survey-completions', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    const responses = await SurveyResponse.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt', 'pointsEarned'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group responses by date
    const responsesByDate = {};
    responses.forEach(response => {
      const date = response.createdAt.toISOString().split('T')[0];
      if (!responsesByDate[date]) {
        responsesByDate[date] = { count: 0, points: 0 };
      }
      responsesByDate[date].count += 1;
      responsesByDate[date].points += response.pointsEarned || 0;
    });
    
    // Convert to chart format
    const chartData = Object.entries(responsesByDate).map(([date, data]) => ({
      date,
      completions: data.count,
      points: data.points
    }));
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get survey completions chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get reward distribution data
router.get('/charts/reward-distribution', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
  try {
    const rewardStats = await UserReward.findAll({
      include: [{
        model: Reward,
        attributes: ['name', 'type', 'brand']
      }],
      attributes: [
        [User.sequelize.fn('COUNT', User.sequelize.col('UserReward.id')), 'count'],
        [User.sequelize.fn('SUM', User.sequelize.col('UserReward.pointsSpent')), 'totalPoints']
      ],
      group: ['Reward.type'],
      raw: true
    });
    
    const chartData = rewardStats.map(stat => ({
      type: stat['Reward.type'] || 'Unknown',
      count: parseInt(stat.count) || 0,
      totalPoints: parseInt(stat.totalPoints) || 0
    }));
    
    res.json({
      success: true,
      data: {
        chartData
      }
    });
  } catch (error) {
    console.error('Get reward distribution chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get recent activity
router.get('/recent-activity', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const recentActivity = await AuditLog.getRecentActivity(parseInt(limit));
    
    res.json({
      success: true,
      data: {
        activities: recentActivity
      }
    });
  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get system health metrics
router.get('/system-health', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const [errorLogs, warningLogs, totalLogs, activeUsers] = await Promise.all([
      AuditLog.count({
        where: {
          level: 'error',
          createdAt: { [Op.gte]: last24Hours }
        }
      }),
      AuditLog.count({
        where: {
          level: 'warning',
          createdAt: { [Op.gte]: last24Hours }
        }
      }),
      AuditLog.count({
        where: {
          createdAt: { [Op.gte]: last24Hours }
        }
      }),
      User.count({
        where: {
          updatedAt: { [Op.gte]: last24Hours }
        }
      })
    ]);
    
    const systemHealth = {
      status: errorLogs > 10 ? 'critical' : errorLogs > 5 ? 'warning' : 'healthy',
      metrics: {
        errorLogs,
        warningLogs,
        totalLogs,
        activeUsers,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
      }
    };
    
    res.json({
      success: true,
      data: systemHealth
    });
  } catch (error) {
    console.error('Get system health error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get top performing surveys
router.get('/top-surveys', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    // Get all surveys first
    const surveys = await Survey.findAll({
      attributes: ['id', 'title', 'description', 'isActive', 'isPublished', 'createdAt'],
      where: { isActive: true }
    });
    
    // Get response counts for each survey
    const surveyStats = await Promise.all(surveys.map(async (survey) => {
      const responseCount = await SurveyResponse.count({
        where: { surveyId: survey.id }
      });
      
      const avgPoints = await SurveyResponse.findOne({
        attributes: [[SurveyResponse.sequelize.fn('AVG', SurveyResponse.sequelize.col('pointsEarned')), 'avgPoints']],
        where: { surveyId: survey.id },
        raw: true
      });
      
      return {
        ...survey.toJSON(),
        responseCount,
        avgPoints: parseFloat(avgPoints?.avgPoints) || 0
      };
    }));
    
    // Sort by response count and limit
    const topSurveys = surveyStats
      .sort((a, b) => b.responseCount - a.responseCount)
      .slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        surveys: topSurveys
      }
    });
  } catch (error) {
    console.error('Get top surveys error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get top rewards
router.get('/top-rewards', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    // Get all rewards first
    const rewards = await Reward.findAll({
      attributes: ['id', 'name', 'description', 'type', 'pointsCost', 'brand', 'isActive'],
      where: { isActive: true }
    });
    
    // Get redeem counts for each reward
    const rewardStats = await Promise.all(rewards.map(async (reward) => {
      const redeemCount = await UserReward.count({
        where: { rewardId: reward.id }
      });
      
      return {
        ...reward.toJSON(),
        redeemCount
      };
    }));
    
    // Sort by redeem count and limit
    const topRewards = rewardStats
      .sort((a, b) => b.redeemCount - a.redeemCount)
      .slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        rewards: topRewards
      }
    });
  } catch (error) {
    console.error('Get top rewards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user growth chart data
router.get('/charts/user-growth-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    const users = await User.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group users by date and calculate cumulative growth
    const usersByDate = {};
    let cumulativeCount = await User.count({
      where: {
        createdAt: { [Op.lt]: startDate }
      }
    });
    
    users.forEach(user => {
      const date = user.createdAt.toISOString().split('T')[0];
      usersByDate[date] = (usersByDate[date] || 0) + 1;
    });
    
    // Convert to chart format with cumulative growth
    const chartData = Object.entries(usersByDate).map(([date, count]) => {
      cumulativeCount += count;
      return {
        date,
        newUsers: count,
        totalUsers: cumulativeCount,
        growth: count
      };
    });
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get user growth chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get survey completion chart data
router.get('/charts/survey-completion-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    const responses = await SurveyResponse.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      include: [{
        model: Survey,
        attributes: ['title']
      }],
      attributes: ['createdAt', 'pointsEarned', 'surveyId'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group responses by date
    const responsesByDate = {};
    responses.forEach(response => {
      const date = response.createdAt.toISOString().split('T')[0];
      if (!responsesByDate[date]) {
        responsesByDate[date] = { completions: 0, totalPoints: 0, surveys: new Set() };
      }
      responsesByDate[date].completions += 1;
      responsesByDate[date].totalPoints += response.pointsEarned || 0;
      responsesByDate[date].surveys.add(response.surveyId);
    });
    
    // Convert to chart format
    const chartData = Object.entries(responsesByDate).map(([date, data]) => ({
      date,
      completions: data.completions,
      totalPoints: data.totalPoints,
      uniqueSurveys: data.surveys.size
    }));
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get survey completion chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get revenue chart data
router.get('/charts/revenue-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    // Get points earned from survey responses
    const responses = await SurveyResponse.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt', 'pointsEarned'],
      order: [['createdAt', 'ASC']]
    });
    
    // Get points spent on rewards
    const rewards = await UserReward.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt', 'pointsSpent'],
      order: [['createdAt', 'ASC']]
    });
    
    // Get withdrawal amounts
    const withdrawals = await WithdrawalRequest.findAll({
      where: {
        createdAt: { [Op.gte]: startDate },
        status: 'approved'
      },
      attributes: ['createdAt', 'amount'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group by date
    const revenueByDate = {};
    
    responses.forEach(response => {
      const date = response.createdAt.toISOString().split('T')[0];
      if (!revenueByDate[date]) {
        revenueByDate[date] = { earned: 0, spent: 0, withdrawn: 0 };
      }
      revenueByDate[date].earned += response.pointsEarned || 0;
    });
    
    rewards.forEach(reward => {
      const date = reward.createdAt.toISOString().split('T')[0];
      if (!revenueByDate[date]) {
        revenueByDate[date] = { earned: 0, spent: 0, withdrawn: 0 };
      }
      revenueByDate[date].spent += reward.pointsSpent || 0;
    });
    
    withdrawals.forEach(withdrawal => {
      const date = withdrawal.createdAt.toISOString().split('T')[0];
      if (!revenueByDate[date]) {
        revenueByDate[date] = { earned: 0, spent: 0, withdrawn: 0 };
      }
      revenueByDate[date].withdrawn += withdrawal.amount || 0;
    });
    
    // Convert to chart format
    const chartData = Object.entries(revenueByDate).map(([date, data]) => ({
      date,
      pointsEarned: data.earned,
      pointsSpent: data.spent,
      amountWithdrawn: data.withdrawn,
      netRevenue: data.earned - data.spent - data.withdrawn
    }));
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get revenue chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Direct chart endpoints for backward compatibility
router.get('/user-growth-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    const users = await User.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group users by date and calculate cumulative growth
    const usersByDate = {};
    let cumulativeCount = await User.count({
      where: {
        createdAt: { [Op.lt]: startDate }
      }
    });
    
    users.forEach(user => {
      const date = user.createdAt.toISOString().split('T')[0];
      usersByDate[date] = (usersByDate[date] || 0) + 1;
    });
    
    // Convert to chart format with cumulative growth
    const chartData = Object.entries(usersByDate).map(([date, count]) => {
      cumulativeCount += count;
      return {
        date,
        newUsers: count,
        totalUsers: cumulativeCount,
        growth: count
      };
    });
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get user growth chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.get('/survey-completion-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    const responses = await SurveyResponse.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      include: [{
        model: Survey,
        attributes: ['title']
      }],
      attributes: ['createdAt', 'pointsEarned', 'surveyId'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group responses by date
    const responsesByDate = {};
    responses.forEach(response => {
      const date = response.createdAt.toISOString().split('T')[0];
      if (!responsesByDate[date]) {
        responsesByDate[date] = { completions: 0, totalPoints: 0, surveys: new Set() };
      }
      responsesByDate[date].completions += 1;
      responsesByDate[date].totalPoints += response.pointsEarned || 0;
      responsesByDate[date].surveys.add(response.surveyId);
    });
    
    // Convert to chart format
    const chartData = Object.entries(responsesByDate).map(([date, data]) => ({
      date,
      completions: data.completions,
      totalPoints: data.totalPoints,
      uniqueSurveys: data.surveys.size
    }));
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get survey completion chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.get('/revenue-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    // Get points earned from survey responses
    const responses = await SurveyResponse.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt', 'pointsEarned'],
      order: [['createdAt', 'ASC']]
    });
    
    // Get points spent on rewards
    const rewards = await UserReward.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      attributes: ['createdAt', 'pointsSpent'],
      order: [['createdAt', 'ASC']]
    });
    
    // Get withdrawal amounts
    const withdrawals = await WithdrawalRequest.findAll({
      where: {
        createdAt: { [Op.gte]: startDate },
        status: 'approved'
      },
      attributes: ['createdAt', 'amount'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group by date
    const revenueByDate = {};
    
    responses.forEach(response => {
      const date = response.createdAt.toISOString().split('T')[0];
      if (!revenueByDate[date]) {
        revenueByDate[date] = { earned: 0, spent: 0, withdrawn: 0 };
      }
      revenueByDate[date].earned += response.pointsEarned || 0;
    });
    
    rewards.forEach(reward => {
      const date = reward.createdAt.toISOString().split('T')[0];
      if (!revenueByDate[date]) {
        revenueByDate[date] = { earned: 0, spent: 0, withdrawn: 0 };
      }
      revenueByDate[date].spent += reward.pointsSpent || 0;
    });
    
    withdrawals.forEach(withdrawal => {
      const date = withdrawal.createdAt.toISOString().split('T')[0];
      if (!revenueByDate[date]) {
        revenueByDate[date] = { earned: 0, spent: 0, withdrawn: 0 };
      }
      revenueByDate[date].withdrawn += withdrawal.amount || 0;
    });
    
    // Convert to chart format
    const chartData = Object.entries(revenueByDate).map(([date, data]) => ({
      date,
      pointsEarned: data.earned,
      pointsSpent: data.spent,
      amountWithdrawn: data.withdrawn,
      netRevenue: data.earned - data.spent - data.withdrawn
    }));
    
    res.json({
      success: true,
      data: {
        chartData,
        period
      }
    });
  } catch (error) {
    console.error('Get revenue chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

router.get('/reward-distribution-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    // Get reward redemptions grouped by reward
    const userRewards = await UserReward.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      include: [{
        model: Reward,
        attributes: ['name', 'type', 'pointsCost']
      }],
      attributes: ['createdAt', 'pointsSpent', 'rewardId'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group by reward type and calculate distribution
    const rewardDistribution = {};
    const rewardsByType = {};
    
    userRewards.forEach(userReward => {
      const reward = userReward.Reward;
      if (reward) {
        const type = reward.type || 'other';
        const name = reward.name;
        
        if (!rewardDistribution[name]) {
          rewardDistribution[name] = {
            name,
            type,
            count: 0,
            totalPoints: 0,
            pointsCost: reward.pointsCost
          };
        }
        
        if (!rewardsByType[type]) {
          rewardsByType[type] = {
            type,
            count: 0,
            totalPoints: 0
          };
        }
        
        rewardDistribution[name].count += 1;
        rewardDistribution[name].totalPoints += userReward.pointsSpent || 0;
        
        rewardsByType[type].count += 1;
        rewardsByType[type].totalPoints += userReward.pointsSpent || 0;
      }
    });
    
    // Convert to chart format
    const chartData = {
      byReward: Object.values(rewardDistribution).sort((a, b) => b.count - a.count),
      byType: Object.values(rewardsByType).sort((a, b) => b.count - a.count),
      period
    };
    
    res.json({
      success: true,
      data: chartData
    });
  } catch (error) {
    console.error('Get reward distribution chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get reward distribution chart data
router.get('/charts/reward-distribution-chart', authenticateAdmin, requirePermission('dashboard', 'read'), async (req, res) => {
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
    
    // Get reward redemptions grouped by reward
    const userRewards = await UserReward.findAll({
      where: {
        createdAt: { [Op.gte]: startDate }
      },
      include: [{
        model: Reward,
        attributes: ['name', 'type', 'pointsCost']
      }],
      attributes: ['createdAt', 'pointsSpent', 'rewardId'],
      order: [['createdAt', 'ASC']]
    });
    
    // Group by reward type and calculate distribution
    const rewardDistribution = {};
    const rewardsByType = {};
    
    userRewards.forEach(userReward => {
      const reward = userReward.Reward;
      if (reward) {
        const type = reward.type || 'other';
        const name = reward.name;
        
        if (!rewardDistribution[name]) {
          rewardDistribution[name] = {
            name,
            type,
            count: 0,
            totalPoints: 0,
            pointsCost: reward.pointsCost
          };
        }
        
        if (!rewardsByType[type]) {
          rewardsByType[type] = {
            type,
            count: 0,
            totalPoints: 0
          };
        }
        
        rewardDistribution[name].count += 1;
        rewardDistribution[name].totalPoints += userReward.pointsSpent || 0;
        
        rewardsByType[type].count += 1;
        rewardsByType[type].totalPoints += userReward.pointsSpent || 0;
      }
    });
    
    // Convert to chart format
    const chartData = {
      byReward: Object.values(rewardDistribution).sort((a, b) => b.count - a.count),
      byType: Object.values(rewardsByType).sort((a, b) => b.count - a.count),
      period
    };
    
    res.json({
      success: true,
      data: chartData
    });
  } catch (error) {
    console.error('Get reward distribution chart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;