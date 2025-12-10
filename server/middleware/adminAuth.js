const jwt = require('jsonwebtoken');
const { Admin, AuditLog } = require('../models');

// Middleware to authenticate admin users
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      await AuditLog.logSystemEvent({
        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        resource: 'admin_auth',
        level: 'warning',
        description: 'Admin authentication attempted without token',
        metadata: {
          endpoint: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        },
        success: false,
        errorMessage: 'No authentication token provided'
      });
      
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== 'admin') {
      await AuditLog.logSystemEvent({
        action: 'INVALID_TOKEN_TYPE',
        resource: 'admin_auth',
        level: 'warning',
        description: 'Non-admin token used for admin authentication',
        metadata: {
          tokenType: decoded.type,
          endpoint: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        },
        success: false,
        errorMessage: 'Invalid token type for admin access'
      });
      
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Invalid token type.' 
      });
    }

    const admin = await Admin.findByPk(decoded.id);
    
    if (!admin) {
      await AuditLog.logSystemEvent({
        action: 'ADMIN_NOT_FOUND',
        resource: 'admin_auth',
        level: 'warning',
        description: 'Authentication attempted with non-existent admin ID',
        metadata: {
          adminId: decoded.id,
          endpoint: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        },
        success: false,
        errorMessage: 'Admin account not found'
      });
      
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Admin not found.' 
      });
    }

    if (!admin.isActive) {
      await AuditLog.logAdminAction({
        action: 'INACTIVE_ADMIN_ACCESS_ATTEMPT',
        resource: 'admin_auth',
        adminId: admin.id,
        adminEmail: admin.email,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        method: req.method,
        endpoint: req.originalUrl,
        level: 'warning',
        description: 'Inactive admin attempted to access system',
        success: false,
        errorMessage: 'Admin account is inactive'
      });
      
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Account is inactive.' 
      });
    }

    if (admin.isLocked()) {
      await AuditLog.logAdminAction({
        action: 'LOCKED_ADMIN_ACCESS_ATTEMPT',
        resource: 'admin_auth',
        adminId: admin.id,
        adminEmail: admin.email,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        method: req.method,
        endpoint: req.originalUrl,
        level: 'warning',
        description: 'Locked admin attempted to access system',
        success: false,
        errorMessage: 'Admin account is locked due to failed login attempts'
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
    await AuditLog.logSystemEvent({
      action: 'ADMIN_AUTH_ERROR',
      resource: 'admin_auth',
      level: 'error',
      description: 'Error during admin authentication',
      metadata: {
        endpoint: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      },
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
        await AuditLog.logAdminAction({
          action: 'PERMISSION_DENIED',
          resource: resource,
          adminId: admin.id,
          adminEmail: admin.email,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          method: req.method,
          endpoint: req.originalUrl,
          level: 'warning',
          description: `Admin attempted ${action} on ${resource} without permission`,
          metadata: {
            requiredPermission: `${resource}:${action}`,
            adminRole: admin.role,
            adminPermissions: admin.permissions
          },
          success: false,
          errorMessage: 'Insufficient permissions'
        });
        
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Insufficient permissions.' 
        });
      }

      next();
    } catch (error) {
      await AuditLog.logSystemEvent({
        action: 'PERMISSION_CHECK_ERROR',
        resource: resource,
        level: 'error',
        description: 'Error during permission check',
        metadata: {
          endpoint: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          requiredPermission: `${resource}:${action}`
        },
        success: false,
        errorMessage: error.message
      });
      
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
        await AuditLog.logAdminAction({
          action: 'ROLE_ACCESS_DENIED',
          resource: 'admin_role',
          adminId: admin.id,
          adminEmail: admin.email,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          method: req.method,
          endpoint: req.originalUrl,
          level: 'warning',
          description: `Admin with role ${admin.role} attempted to access ${minimumRole} required endpoint`,
          metadata: {
            adminRole: admin.role,
            requiredRole: minimumRole,
            adminRoleLevel,
            requiredRoleLevel
          },
          success: false,
          errorMessage: 'Insufficient role level'
        });
        
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Insufficient role level.' 
        });
      }

      next();
    } catch (error) {
      await AuditLog.logSystemEvent({
        action: 'ROLE_CHECK_ERROR',
        resource: 'admin_role',
        level: 'error',
        description: 'Error during role check',
        metadata: {
          endpoint: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          requiredRole: minimumRole
        },
        success: false,
        errorMessage: error.message
      });
      
      console.error('Role check error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error during role check.' 
      });
    }
  };
};

// Middleware to log admin actions
const logAdminAction = (action, resource) => {
  return async (req, res, next) => {
    const startTime = Date.now();
    
    // Store original res.json to capture response
    const originalJson = res.json;
    let responseData = null;
    
    res.json = function(data) {
      responseData = data;
      return originalJson.call(this, data);
    };
    
    // Store original res.end to capture when response is sent
    const originalEnd = res.end;
    res.end = function(...args) {
      const duration = Date.now() - startTime;
      
      // Log the action after response is sent
      setImmediate(async () => {
        try {
          const admin = req.admin;
          const success = res.statusCode >= 200 && res.statusCode < 400;
          
          await AuditLog.logAdminAction({
            action,
            resource,
            resourceId: req.params.id || req.body.id || null,
            adminId: admin?.id,
            adminEmail: admin?.email,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            method: req.method,
            endpoint: req.originalUrl,
            statusCode: res.statusCode,
            level: success ? 'info' : 'warning',
            description: `Admin ${action} on ${resource}`,
            oldValues: req.originalData || null,
            newValues: req.body || null,
            metadata: {
              query: req.query,
              params: req.params,
              responseData: success ? responseData : null
            },
            duration,
            success,
            errorMessage: success ? null : responseData?.message || 'Action failed'
          });
        } catch (error) {
          console.error('Failed to log admin action:', error);
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