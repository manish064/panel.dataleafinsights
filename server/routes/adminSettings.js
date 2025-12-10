const express = require('express');
const { authenticateAdmin, requirePermission, logAdminAction } = require('../middleware/adminAuth');
const router = express.Router();

// Default settings structure
const defaultSettings = {
  general: {
    siteName: 'Survey Platform',
    siteDescription: 'Complete surveys and earn rewards',
    contactEmail: 'admin@example.com',
    supportEmail: 'support@example.com',
    maintenanceMode: false
  },
  surveys: {
    maxSurveysPerUser: 10,
    minPointsPerSurvey: 10,
    maxPointsPerSurvey: 100,
    surveyTimeoutMinutes: 30,
    allowAnonymousResponses: false
  },
  rewards: {
    minWithdrawalAmount: 100,
    maxWithdrawalAmount: 10000,
    withdrawalProcessingDays: 7,
    pointsToMoneyRatio: 0.01, // 1 point = $0.01
    enableRewardCategories: true
  },
  users: {
    requireEmailVerification: true,
    maxAccountsPerIP: 3,
    sessionTimeoutHours: 24,
    enableProfilePictures: true,
    minPasswordLength: 8
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false
  },
  security: {
    enableTwoFactor: false,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 30,
    enableCaptcha: true,
    ipWhitelist: []
  }
};

// In-memory settings storage (in production, this should be in database)
let currentSettings = { ...defaultSettings };

// Get admin settings
router.get('/', authenticateAdmin, requirePermission('settings', 'read'), async (req, res) => {
  try {
    await logAdminAction(req.admin.id, 'settings', 'read', 'Retrieved admin settings');
    
    res.json({
      success: true,
      data: {
        settings: currentSettings,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Get admin settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update admin settings
router.put('/', authenticateAdmin, requirePermission('settings', 'write'), async (req, res) => {
  try {
    const { settings } = req.body;
    
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid settings data provided'
      });
    }
    
    // Validate and merge settings
    const updatedSettings = { ...currentSettings };
    
    // Update each section if provided
    if (settings.general) {
      updatedSettings.general = { ...updatedSettings.general, ...settings.general };
    }
    if (settings.surveys) {
      updatedSettings.surveys = { ...updatedSettings.surveys, ...settings.surveys };
    }
    if (settings.rewards) {
      updatedSettings.rewards = { ...updatedSettings.rewards, ...settings.rewards };
    }
    if (settings.users) {
      updatedSettings.users = { ...updatedSettings.users, ...settings.users };
    }
    if (settings.notifications) {
      updatedSettings.notifications = { ...updatedSettings.notifications, ...settings.notifications };
    }
    if (settings.security) {
      updatedSettings.security = { ...updatedSettings.security, ...settings.security };
    }
    
    // Validate critical settings
    if (updatedSettings.rewards.minWithdrawalAmount < 0) {
      return res.status(400).json({
        success: false,
        message: 'Minimum withdrawal amount cannot be negative'
      });
    }
    
    if (updatedSettings.rewards.maxWithdrawalAmount < updatedSettings.rewards.minWithdrawalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Maximum withdrawal amount must be greater than minimum'
      });
    }
    
    if (updatedSettings.surveys.maxPointsPerSurvey < updatedSettings.surveys.minPointsPerSurvey) {
      return res.status(400).json({
        success: false,
        message: 'Maximum points per survey must be greater than minimum'
      });
    }
    
    if (updatedSettings.users.minPasswordLength < 6) {
      return res.status(400).json({
        success: false,
        message: 'Minimum password length must be at least 6 characters'
      });
    }
    
    // Update settings
    currentSettings = updatedSettings;
    
    await logAdminAction(
      req.admin.id,
      'settings',
      'update',
      `Updated admin settings: ${Object.keys(settings).join(', ')}`
    );
    
    res.json({
      success: true,
      data: {
        settings: currentSettings,
        message: 'Settings updated successfully',
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Update admin settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get specific setting section
router.get('/:section', authenticateAdmin, requirePermission('settings', 'read'), async (req, res) => {
  try {
    const { section } = req.params;
    
    if (!currentSettings[section]) {
      return res.status(404).json({
        success: false,
        message: 'Settings section not found'
      });
    }
    
    await logAdminAction(req.admin.id, 'settings', 'read', `Retrieved ${section} settings`);
    
    res.json({
      success: true,
      data: {
        section,
        settings: currentSettings[section]
      }
    });
  } catch (error) {
    console.error('Get settings section error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update specific setting section
router.put('/:section', authenticateAdmin, requirePermission('settings', 'write'), async (req, res) => {
  try {
    const { section } = req.params;
    const { settings } = req.body;
    
    if (!currentSettings[section]) {
      return res.status(404).json({
        success: false,
        message: 'Settings section not found'
      });
    }
    
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid settings data provided'
      });
    }
    
    // Update the specific section
    currentSettings[section] = { ...currentSettings[section], ...settings };
    
    await logAdminAction(
      req.admin.id,
      'settings',
      'update',
      `Updated ${section} settings`
    );
    
    res.json({
      success: true,
      data: {
        section,
        settings: currentSettings[section],
        message: `${section} settings updated successfully`,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Update settings section error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Reset settings to default
router.post('/reset', authenticateAdmin, requirePermission('settings', 'write'), async (req, res) => {
  try {
    const { section } = req.body;
    
    if (section && !defaultSettings[section]) {
      return res.status(404).json({
        success: false,
        message: 'Settings section not found'
      });
    }
    
    if (section) {
      // Reset specific section
      currentSettings[section] = { ...defaultSettings[section] };
      await logAdminAction(req.admin.id, 'settings', 'reset', `Reset ${section} settings to default`);
    } else {
      // Reset all settings
      currentSettings = { ...defaultSettings };
      await logAdminAction(req.admin.id, 'settings', 'reset', 'Reset all settings to default');
    }
    
    res.json({
      success: true,
      data: {
        settings: section ? currentSettings[section] : currentSettings,
        message: section ? `${section} settings reset to default` : 'All settings reset to default',
        resetAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Reset settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;