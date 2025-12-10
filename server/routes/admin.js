const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin, AuditLog } = require('../models');
const { authenticateAdmin, requirePermission, requireRole, logAdminAction } = require('../middleware/adminAuth');
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      await AuditLog.logSystemEvent({
        action: 'ADMIN_LOGIN_ATTEMPT',
        resource: 'admin_auth',
        level: 'warning',
        description: 'Admin login attempted with missing credentials',
        metadata: {
          email: email || 'not provided',
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        },
        success: false,
        errorMessage: 'Email and password are required'
      });
      
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const admin = await Admin.findOne({ where: { email: email.toLowerCase() } });
    
    if (!admin) {
      await AuditLog.logSystemEvent({
        action: 'ADMIN_LOGIN_FAILED',
        resource: 'admin_auth',
        level: 'warning',
        description: 'Admin login attempted with non-existent email',
        metadata: {
          email,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        },
        success: false,
        errorMessage: 'Admin not found'
      });
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!admin.isActive) {
      await AuditLog.logAdminAction({
        action: 'INACTIVE_ADMIN_LOGIN_ATTEMPT',
        resource: 'admin_auth',
        adminId: admin.id,
        adminEmail: admin.email,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        method: 'POST',
        endpoint: '/api/admin/login',
        level: 'warning',
        description: 'Inactive admin attempted to login',
        success: false,
        errorMessage: 'Admin account is inactive'
      });
      
      return res.status(401).json({
        success: false,
        message: 'Account is inactive. Please contact system administrator.'
      });
    }

    if (admin.isLocked()) {
      await AuditLog.logAdminAction({
        action: 'LOCKED_ADMIN_LOGIN_ATTEMPT',
        resource: 'admin_auth',
        adminId: admin.id,
        adminEmail: admin.email,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        method: 'POST',
        endpoint: '/api/admin/login',
        level: 'warning',
        description: 'Locked admin attempted to login',
        success: false,
        errorMessage: 'Admin account is temporarily locked'
      });
      
      const lockTimeRemaining = Math.ceil((admin.lockUntil - Date.now()) / (1000 * 60));
      return res.status(401).json({
        success: false,
        message: `Account is temporarily locked. Try again in ${lockTimeRemaining} minutes.`
      });
    }

    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      await admin.incLoginAttempts();
      
      await AuditLog.logAdminAction({
        action: 'ADMIN_LOGIN_FAILED',
        resource: 'admin_auth',
        adminId: admin.id,
        adminEmail: admin.email,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        method: 'POST',
        endpoint: '/api/admin/login',
        level: 'warning',
        description: 'Admin login failed due to invalid password',
        metadata: {
          loginAttempts: admin.loginAttempts + 1
        },
        success: false,
        errorMessage: 'Invalid password'
      });
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        role: admin.role,
        type: 'admin'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    const duration = Date.now() - startTime;
    
    await AuditLog.logAdminAction({
      action: 'ADMIN_LOGIN_SUCCESS',
      resource: 'admin_auth',
      adminId: admin.id,
      adminEmail: admin.email,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      method: 'POST',
      endpoint: '/api/admin/login',
      statusCode: 200,
      level: 'info',
      description: 'Admin logged in successfully',
      duration,
      success: true
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          avatar: admin.avatar,
          lastLogin: admin.lastLogin
        }
      }
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    
    await AuditLog.logSystemEvent({
      action: 'ADMIN_LOGIN_ERROR',
      resource: 'admin_auth',
      level: 'error',
      description: 'Error during admin login',
      metadata: {
        email: req.body.email,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      },
      duration,
      success: false,
      errorMessage: error.message
    });
    
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// Get current admin info (me endpoint)
router.get('/me', authenticateAdmin, async (req, res) => {
  try {
    const admin = req.admin;
    
    res.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          avatar: admin.avatar,
          phone: admin.phone,
          department: admin.department,
          lastLogin: admin.lastLogin,
          createdAt: admin.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get admin me error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get current admin profile
router.get('/profile', authenticateAdmin, async (req, res) => {
  try {
    const admin = req.admin;
    
    res.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          avatar: admin.avatar,
          phone: admin.phone,
          department: admin.department,
          lastLogin: admin.lastLogin,
          createdAt: admin.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update admin profile
router.put('/profile', authenticateAdmin, logAdminAction('UPDATE_PROFILE', 'admin'), async (req, res) => {
  try {
    const admin = req.admin;
    const { firstName, lastName, phone, department, avatar } = req.body;
    
    // Store original data for audit log
    req.originalData = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      phone: admin.phone,
      department: admin.department,
      avatar: admin.avatar
    };
    
    const updatedAdmin = await admin.update({
      firstName: firstName || admin.firstName,
      lastName: lastName || admin.lastName,
      phone: phone || admin.phone,
      department: department || admin.department,
      avatar: avatar || admin.avatar
    });
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        admin: {
          id: updatedAdmin.id,
          email: updatedAdmin.email,
          firstName: updatedAdmin.firstName,
          lastName: updatedAdmin.lastName,
          role: updatedAdmin.role,
          permissions: updatedAdmin.permissions,
          avatar: updatedAdmin.avatar,
          phone: updatedAdmin.phone,
          department: updatedAdmin.department
        }
      }
    });
  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Change password
router.put('/change-password', authenticateAdmin, logAdminAction('CHANGE_PASSWORD', 'admin'), async (req, res) => {
  try {
    const admin = req.admin;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }
    
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long'
      });
    }
    
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    await admin.update({ password: newPassword });
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Admin logout (optional - mainly for audit logging)
router.post('/logout', authenticateAdmin, logAdminAction('LOGOUT', 'admin_auth'), async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all admins (super_admin only)
router.get('/admins', authenticateAdmin, requireRole('super_admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '', isActive = '' } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (role) {
      whereClause.role = role;
    }
    
    if (isActive !== '') {
      whereClause.isActive = isActive === 'true';
    }
    
    const { count, rows: admins } = await Admin.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Admin,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });
    
    res.json({
      success: true,
      data: {
        admins,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new admin (super_admin only)
router.post('/admins', authenticateAdmin, requireRole('super_admin'), logAdminAction('CREATE_ADMIN', 'admin'), async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'admin', permissions, phone, department } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, first name, and last name are required'
      });
    }
    
    const existingAdmin = await Admin.findOne({ where: { email: email.toLowerCase() } });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }
    
    const adminPermissions = permissions || Admin.getDefaultPermissions(role);
    
    const newAdmin = await Admin.create({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      role,
      permissions: adminPermissions,
      phone,
      department,
      createdBy: req.admin.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          firstName: newAdmin.firstName,
          lastName: newAdmin.lastName,
          role: newAdmin.role,
          permissions: newAdmin.permissions,
          isActive: newAdmin.isActive,
          createdAt: newAdmin.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update admin (super_admin only)
router.put('/admins/:id', authenticateAdmin, requireRole('super_admin'), logAdminAction('UPDATE_ADMIN', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, role, permissions, isActive, phone, department } = req.body;
    
    const admin = await Admin.findByPk(id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    // Store original data for audit log
    req.originalData = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: admin.role,
      permissions: admin.permissions,
      isActive: admin.isActive,
      phone: admin.phone,
      department: admin.department
    };
    
    const updatedAdmin = await admin.update({
      firstName: firstName || admin.firstName,
      lastName: lastName || admin.lastName,
      role: role || admin.role,
      permissions: permissions || admin.permissions,
      isActive: isActive !== undefined ? isActive : admin.isActive,
      phone: phone || admin.phone,
      department: department || admin.department
    });
    
    res.json({
      success: true,
      message: 'Admin updated successfully',
      data: {
        admin: updatedAdmin
      }
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete admin (super_admin only)
router.delete('/admins/:id', authenticateAdmin, requireRole('super_admin'), logAdminAction('DELETE_ADMIN', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    if (parseInt(id) === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }
    
    const admin = await Admin.findByPk(id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    // Store original data for audit log
    req.originalData = admin.toJSON();
    
    await admin.destroy();
    
    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
