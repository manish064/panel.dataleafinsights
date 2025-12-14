const jwt = require('jsonwebtoken');
const { Admin, AuditLog } = require('../models');

// Safe wrapper for audit logging - never throws
const safeLogAudit = async (logFn, params) => {
  try {
    await logFn(params);
  } catch (error) {
    console.error('Audit log failed (non-blocking):', error.message);
  }
};

// Middleware to authenticate admin users
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      safeLogAudit(AuditLog.logSystemEvent.bind(AuditLog), {
        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        resource: 'admin_auth',
        level: 'warning',
        description: 'Admin authentication attempted without token',
        success: false
      });

      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== 'admin') {
      safeLogAudit(AuditLog.logSystemEvent.bind(AuditLog), {
        action: 'INVALID_TOKEN_TYPE',
        resource: 'admin_auth',
        level: 'warning',
        success: false
      });

      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token type.'
      });
    }

    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      safeLogAudit(AuditLog.logSystemEvent.bind(AuditLog), {
        action: 'ADMIN_NOT_FOUND',
        resource: 'admin_auth',
        level: 'warning',
        success: false
      });

      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin not found.'
      });
    }

    if (!admin.isActive) {
      safeLogAudit(AuditLog.logAdminAction.bind(AuditLog), {
        action: 'INACTIVE_ADMIN_ACCESS_ATTEMPT',
        resource: 'admin_auth',
        adminId: admin.id,
        adminEmail: admin.email,
        level: 'warning',
        success: false
      });

      return res.status(401).json({
        success: false,
        message: 'Access denied. Account is inactive.'
      });
    }

    if (admin.isLocked()) {
      safeLogAudit(AuditLog.logAdminAction.bind(AuditLog), {
        action: 'LOCKED_ADMIN_ACCESS_ATTEMPT',
        resource: 'admin_auth',
        adminId: admin.id,
        adminEmail: admin.email,
        level: 'warning',
        success: false
      });

      return res.status(401).json({
        success: false,
        message: 'Access denied. Account is temporarily locked.'
      });
    }

    req.admin = admin;
    req.adminId = admin.id;
    next();
  } catch (error) {
    safeLogAudit(AuditLog.logSystemEvent.bind(AuditLog), {
      action: 'ADMIN_AUTH_ERROR',
      resource: 'admin_auth',
      level: 'error',
      success: false,
      errorMessage: error.message
    });

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token.'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Token expired.'
      });
    }

    console.error('Admin authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
};

// Middleware to check admin permissions
const requirePermission = (resource, action) => {
  return async (req, res, next) => {
    try {
      const admin = req.admin;

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.'
        });
      }

      if (!admin.hasPermission(resource, action)) {
        safeLogAudit(AuditLog.logAdminAction.bind(AuditLog), {
          action: 'PERMISSION_DENIED',
          resource: resource,
          adminId: admin.id,
          adminEmail: admin.email,
          level: 'warning',
          success: false
        });

        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.'
        });
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during permission check.'
      });
    }
  };
};

// Middleware to check admin role hierarchy
const requireRole = (minimumRole) => {
  return async (req, res, next) => {
    try {
      const admin = req.admin;

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.'
        });
      }

      const roleHierarchy = Admin.getRoleHierarchy();
      const adminRoleLevel = roleHierarchy[admin.role] || 0;
      const requiredRoleLevel = roleHierarchy[minimumRole] || 0;

      if (adminRoleLevel < requiredRoleLevel) {
        safeLogAudit(AuditLog.logAdminAction.bind(AuditLog), {
          action: 'ROLE_ACCESS_DENIED',
          resource: 'admin_role',
          adminId: admin.id,
          adminEmail: admin.email,
          level: 'warning',
          success: false
        });

        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient role level.'
        });
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during role check.'
      });
    }
  };
};

// Middleware to log admin actions (completely fail-safe)
const logAdminAction = (action, resource) => {
  return async (req, res, next) => {
    const startTime = Date.now();

    // Store original res.json to capture response
    const originalJson = res.json;
    let responseData = null;

    res.json = function (data) {
      responseData = data;
      return originalJson.call(this, data);
    };

    // Store original res.end to capture when response is sent
    const originalEnd = res.end;
    res.end = function (...args) {
      const duration = Date.now() - startTime;

      // Log the action after response is sent (completely non-blocking)
      setImmediate(async () => {
        try {
          const admin = req.admin;
          const success = res.statusCode >= 200 && res.statusCode < 400;

          await AuditLog.logAdminAction({
            action,
            resource,
            resourceId: req.params.id || req.body?.id || null,
            adminId: admin?.id,
            adminEmail: admin?.email,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            method: req.method,
            endpoint: req.originalUrl,
            statusCode: res.statusCode,
            level: success ? 'info' : 'warning',
            description: `Admin ${action} on ${resource}`,
            duration,
            success
          });
        } catch (error) {
          // Never throw - just log and continue
          console.error('Failed to log admin action (non-blocking):', error.message);
        }
      });

      return originalEnd.apply(this, args);
    };

    next();
  };
};

module.exports = {
  authenticateAdmin,
  requirePermission,
  requireRole,
  logAdminAction
};