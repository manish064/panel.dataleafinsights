const express = require('express');
const { Op } = require('sequelize');
const { AuditLog, Admin, User } = require('../models');
const { authenticateAdmin, requirePermission } = require('../middleware/adminAuth');
const router = express.Router();

// Get all audit logs with filtering and pagination
router.get('/', authenticateAdmin, requirePermission('audit_logs', 'read'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      action = '',
      level = '',
      adminId = '',
      userId = '',
      resource = '',
      dateFrom = '',
      dateTo = '',
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    // Search filter
    if (search) {
      whereClause[Op.or] = [
        { action: { [Op.like]: `%${search}%` } },
        { resource: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { endpoint: { [Op.like]: `%${search}%` } }
      ];
    }
    
    // Action filter
    if (action) {
      whereClause.action = action;
    }
    
    // Level filter
    if (level) {
      whereClause.level = level;
    }
    
    // Admin filter
    if (adminId) {
      whereClause.adminId = adminId;
    }
    
    // User filter
    if (userId) {
      whereClause.userId = userId;
    }
    
    // Resource filter
    if (resource) {
      whereClause.resource = resource;
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
    
    const { count, rows: logs } = await AuditLog.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: Admin,
          as: 'admin',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: false
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: false
        }
      ]
    });
    
    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get audit log statistics
router.get('/stats', authenticateAdmin, requirePermission('audit_logs', 'read'), async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const [totalLogs, todayLogs, last7DaysLogs, last30DaysLogs, errorLogs, warningLogs, infoLogs] = await Promise.all([
      AuditLog.count(),
      AuditLog.count({ where: { createdAt: { [Op.gte]: today } } }),
      AuditLog.count({ where: { createdAt: { [Op.gte]: last7Days } } }),
      AuditLog.count({ where: { createdAt: { [Op.gte]: last30Days } } }),
      AuditLog.count({ where: { level: 'error' } }),
      AuditLog.count({ where: { level: 'warning' } }),
      AuditLog.count({ where: { level: 'info' } })
    ]);
    
    // Get activity by action type
    const actionStats = await AuditLog.findAll({
      attributes: [
        'action',
        [AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: { [Op.gte]: last30Days }
      },
      group: ['action'],
      order: [[AuditLog.sequelize.literal('count'), 'DESC']],
      limit: 10,
      raw: true
    });
    
    // Get activity by admin
    const adminStats = await AuditLog.findAll({
      attributes: [
        'adminId',
        [AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('AuditLog.id')), 'count']
      ],
      where: {
        createdAt: { [Op.gte]: last30Days },
        adminId: { [Op.not]: null }
      },
      include: [
        {
          model: Admin,
          as: 'admin',
          attributes: ['firstName', 'lastName', 'email']
        }
      ],
      group: ['adminId', 'Admin.id'],
      order: [[AuditLog.sequelize.literal('count'), 'DESC']],
      limit: 10
    });
    
    // Get daily activity for the last 30 days
    const dailyActivity = await AuditLog.findAll({
      attributes: [
        [AuditLog.sequelize.fn('DATE', AuditLog.sequelize.col('createdAt')), 'date'],
        [AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: { [Op.gte]: last30Days }
      },
      group: [AuditLog.sequelize.fn('DATE', AuditLog.sequelize.col('createdAt'))],
      order: [[AuditLog.sequelize.fn('DATE', AuditLog.sequelize.col('createdAt')), 'ASC']],
      raw: true
    });
    
    res.json({
      success: true,
      data: {
        totalLogs,
        todayLogs,
        last7DaysLogs,
        last30DaysLogs,
        errorLogs,
        warningLogs,
        infoLogs,
        actionStats,
        adminStats,
        dailyActivity
      }
    });
  } catch (error) {
    console.error('Get audit log stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single audit log details
router.get('/:id', authenticateAdmin, requirePermission('audit_logs', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const log = await AuditLog.findByPk(id, {
      include: [
        {
          model: Admin,
          as: 'admin',
          attributes: ['id', 'firstName', 'lastName', 'email', 'role']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });
    
    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Audit log not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        log
      }
    });
  } catch (error) {
    console.error('Get audit log details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get recent activity
router.get('/recent/activity', authenticateAdmin, requirePermission('audit_logs', 'read'), async (req, res) => {
  try {
    const { limit = 20, adminId = '', level = '' } = req.query;
    
    const whereClause = {};
    
    if (adminId) {
      whereClause.adminId = adminId;
    }
    
    if (level) {
      whereClause.level = level;
    }
    
    const recentLogs = await AuditLog.findAll({
      where: whereClause,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Admin,
          as: 'admin',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });
    
    res.json({
      success: true,
      data: {
        logs: recentLogs
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

// Get activity by resource
router.get('/activity/by-resource', authenticateAdmin, requirePermission('audit_logs', 'read'), async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const resourceActivity = await AuditLog.findAll({
      attributes: [
        'resource',
        [AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: { [Op.gte]: dateFrom },
        resource: { [Op.not]: null }
      },
      group: ['resource'],
      order: [[AuditLog.sequelize.literal('count'), 'DESC']],
      raw: true
    });
    
    res.json({
      success: true,
      data: {
        resourceActivity
      }
    });
  } catch (error) {
    console.error('Get activity by resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get failed login attempts
router.get('/security/failed-logins', authenticateAdmin, requirePermission('audit_logs', 'read'), async (req, res) => {
  try {
    const { days = 7, limit = 50 } = req.query;
    const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const failedLogins = await AuditLog.findAll({
      where: {
        action: 'LOGIN_FAILED',
        createdAt: { [Op.gte]: dateFrom }
      },
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Admin,
          as: 'admin',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: false
        }
      ]
    });
    
    // Group by IP address to identify potential attacks
    const ipStats = {};
    failedLogins.forEach(log => {
      const ip = log.ipAddress;
      if (ip) {
        if (!ipStats[ip]) {
          ipStats[ip] = {
            ip,
            count: 0,
            lastAttempt: null,
            emails: new Set()
          };
        }
        ipStats[ip].count++;
        ipStats[ip].lastAttempt = log.createdAt;
        if (log.metadata && log.metadata.email) {
          ipStats[ip].emails.add(log.metadata.email);
        }
      }
    });
    
    const suspiciousIPs = Object.values(ipStats)
      .map(stat => ({
        ...stat,
        emails: Array.from(stat.emails)
      }))
      .filter(stat => stat.count >= 3)
      .sort((a, b) => b.count - a.count);
    
    res.json({
      success: true,
      data: {
        failedLogins,
        suspiciousIPs
      }
    });
  } catch (error) {
    console.error('Get failed logins error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Export audit logs
router.get('/export/csv', authenticateAdmin, requirePermission('audit_logs', 'read'), async (req, res) => {
  try {
    const {
      dateFrom = '',
      dateTo = '',
      level = '',
      action = '',
      adminId = ''
    } = req.query;
    
    const whereClause = {};
    
    if (dateFrom || dateTo) {
      whereClause.createdAt = {};
      if (dateFrom) {
        whereClause.createdAt[Op.gte] = new Date(dateFrom);
      }
      if (dateTo) {
        whereClause.createdAt[Op.lte] = new Date(dateTo);
      }
    }
    
    if (level) {
      whereClause.level = level;
    }
    
    if (action) {
      whereClause.action = action;
    }
    
    if (adminId) {
      whereClause.adminId = adminId;
    }
    
    const logs = await AuditLog.findAll({
      where: whereClause,
      include: [
        {
          model: Admin,
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10000 // Limit to prevent memory issues
    });
    
    const csvHeader = 'Timestamp,Level,Action,Resource,Admin,User,IP Address,User Agent,Method,Endpoint,Status Code,Description,Success,Duration,Session ID\n';
    const csvData = logs.map(log => {
      const adminName = log.Admin ? `${log.Admin.firstName} ${log.Admin.lastName} (${log.Admin.email})` : '';
      const userName = log.User ? `${log.User.firstName} ${log.User.lastName} (${log.User.email})` : '';
      
      return [
        log.createdAt,
        log.level,
        log.action,
        log.resource || '',
        `"${adminName}"`,
        `"${userName}"`,
        log.ipAddress || '',
        `"${(log.userAgent || '').replace(/"/g, '""')}"`,
        log.method || '',
        log.endpoint || '',
        log.statusCode || '',
        `"${(log.description || '').replace(/"/g, '""')}"`,
        log.success,
        log.duration || '',
        log.sessionId || ''
      ].join(',');
    }).join('\n');
    
    const filename = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(csvHeader + csvData);
  } catch (error) {
    console.error('Export audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete old audit logs (cleanup)
router.delete('/cleanup', authenticateAdmin, requirePermission('audit_logs', 'delete'), async (req, res) => {
  try {
    const { days = 90 } = req.body;
    
    if (days < 30) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete logs newer than 30 days'
      });
    }
    
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const deletedCount = await AuditLog.destroy({
      where: {
        createdAt: { [Op.lt]: cutoffDate }
      }
    });
    
    // Log the cleanup action
    await AuditLog.logAdminAction(
      req.admin.id,
      'CLEANUP_AUDIT_LOGS',
      'audit_log',
      null,
      req.ip,
      req.get('User-Agent'),
      'DELETE',
      req.originalUrl,
      200,
      `Deleted ${deletedCount} audit logs older than ${days} days`,
      true,
      null,
      { deletedCount, days },
      req.sessionID
    );
    
    res.json({
      success: true,
      message: `Successfully deleted ${deletedCount} old audit logs`,
      data: {
        deletedCount
      }
    });
  } catch (error) {
    console.error('Cleanup audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;