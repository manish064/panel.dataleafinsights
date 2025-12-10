import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  RefreshCw,
  Mail,
  Database,
  Shield,
  Globe,
  Bell,
  Palette,
  Server,
  Key,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { PageLoading, SectionLoading, ErrorState, LoadingButton } from '../components/StandardizedLoading';
import { ErrorHandler, SuccessHandler, createAsyncHandler } from '../utils/errorHandler';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock } from 'lucide-react';

const SystemSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: '',
      siteDescription: '',
      contactEmail: '',
      supportEmail: '',
      timezone: '',
      language: '',
      maintenanceMode: false
    },
    email: {
      smtpHost: '',
      smtpPort: '',
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: '',
      fromName: '',
      enableEmailNotifications: true
    },
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableTwoFactor: false,
      allowedDomains: ''
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminAlerts: true,
      userWelcomeEmail: true,
      surveyCompletionEmail: true,
      rewardClaimEmail: true
    },
    api: {
      rateLimit: 100,
      enableCors: true,
      allowedOrigins: '',
      apiVersion: 'v1',
      enableLogging: true,
      logLevel: 'info'
    },
    rewards: {
      minPointsForReward: 100,
      maxRewardsPerUser: 10,
      rewardExpirationDays: 30,
      autoApproveRewards: false,
      enableRewardCategories: true
    }
  });

  // Password change (admin) state and handlers
  const { changePassword } = useAuth();
  const [pwdLoading, setPwdLoading] = useState(false);
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChangeMyPassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      ErrorHandler.show('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      ErrorHandler.show('Password must be at least 8 characters long');
      return;
    }
    setPwdLoading(true);
    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result?.success || result === true) {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPwdForm(false);
      }
    } catch (err) {
      // Errors are handled via interceptors/toasts
    } finally {
      setPwdLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = createAsyncHandler(
    async () => {
      const response = await axios.get('/api/admin/settings');
      return response.data.settings;
    },
    {
      onSuccess: (data) => {
        setSettings(data || settings);
      },
      loadingState: [loading, setLoading],
      fallbackData: settings
    }
  );

  const saveSettings = createAsyncHandler(
    async () => {
      await axios.put('/api/admin/settings', { settings });
      return 'Settings saved successfully';
    },
    {
      onSuccess: () => {
        SuccessHandler.show('Settings saved successfully');
      },
      loadingState: [saving, setSaving]
    }
  );

  const resetSettings = createAsyncHandler(
    async () => {
      if (window.confirm('Are you sure you want to reset all settings to default values?')) {
        await axios.post('/api/admin/settings/reset');
        fetchSettings();
        return 'Settings reset to defaults';
      }
      throw new Error('Reset cancelled');
    },
    {
      onSuccess: () => {
        SuccessHandler.show('Settings reset to defaults');
      }
    }
  );

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API', icon: Server },
    { id: 'rewards', label: 'Rewards', icon: Key }
  ];

  const InputField = ({ label, type = 'text', value, onChange, placeholder, description, required = false }) => (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={2}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {placeholder}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  const ToggleField = ({ label, value, onChange, description }) => (
    <div className="flex items-start sm:items-center justify-between py-2 gap-3">
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-medium text-gray-700">{label}</label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
          value ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <InputField
                label="Site Name"
                value={settings.general.siteName}
                onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                placeholder="Cred Encuesta"
                required
              />
              <InputField
                label="Contact Email"
                type="email"
                value={settings.general.contactEmail}
                onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                placeholder="contact@credencuesta.com"
                required
              />
            </div>
            
            <InputField
              label="Site Description"
              type="textarea"
              value={settings.general.siteDescription}
              onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
              placeholder="Survey platform for earning rewards"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <InputField
                label="Support Email"
                type="email"
                value={settings.general.supportEmail}
                onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
                placeholder="support@credencuesta.com"
              />
              <InputField
                label="Timezone"
                type="select"
                value={settings.general.timezone}
                onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                placeholder={
                  <>
                    <option value="">Select Timezone</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </>
                }
              />
            </div>
            
            <ToggleField
              label="Maintenance Mode"
              value={settings.general.maintenanceMode}
              onChange={(value) => updateSetting('general', 'maintenanceMode', value)}
              description="Enable to put the site in maintenance mode"
            />
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div className="bg-primary-50 p-3 rounded-lg">
              <div className="flex items-start sm:items-center gap-2">
                <Info className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                <p className="text-xs text-primary-800">Configure SMTP settings for sending emails</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <InputField
                label="SMTP Host"
                value={settings.email.smtpHost}
                onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                placeholder="smtp.gmail.com"
                required
              />
              <InputField
                label="SMTP Port"
                type="number"
                value={settings.email.smtpPort}
                onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                placeholder="587"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <InputField
                label="SMTP Username"
                value={settings.email.smtpUsername}
                onChange={(e) => updateSetting('email', 'smtpUsername', e.target.value)}
                placeholder="your-email@gmail.com"
                required
              />
              <InputField
                label="SMTP Password"
                type="password"
                value={settings.email.smtpPassword}
                onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <InputField
                label="From Email"
                type="email"
                value={settings.email.fromEmail}
                onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                placeholder="noreply@credencuesta.com"
                required
              />
              <InputField
                label="From Name"
                value={settings.email.fromName}
                onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                placeholder="Cred Encuesta"
                required
              />
            </div>
            
            <ToggleField
              label="Enable Email Notifications"
              value={settings.email.enableEmailNotifications}
              onChange={(value) => updateSetting('email', 'enableEmailNotifications', value)}
              description="Allow the system to send email notifications"
            />
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">Security settings affect all user accounts</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Minimum Password Length"
                type="number"
                value={settings.security.passwordMinLength}
                onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                placeholder="8"
                description="Minimum number of characters required for passwords"
              />
              <InputField
                label="Session Timeout (minutes)"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                placeholder="30"
                description="How long users stay logged in when inactive"
              />
            </div>
            
            <InputField
              label="Max Login Attempts"
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
              placeholder="5"
              description="Number of failed login attempts before account lockout"
            />
            
            <InputField
              label="Allowed Email Domains"
              value={settings.security.allowedDomains}
              onChange={(e) => updateSetting('security', 'allowedDomains', e.target.value)}
              placeholder="example.com, company.org"
              description="Comma-separated list of allowed email domains (leave empty for all)"
            />
            
            <div className="space-y-4">
              <ToggleField
                label="Require Special Characters"
                value={settings.security.requireSpecialChars}
                onChange={(value) => updateSetting('security', 'requireSpecialChars', value)}
                description="Require special characters in passwords"
              />
              
              <ToggleField
                label="Enable Two-Factor Authentication"
                value={settings.security.enableTwoFactor}
                onChange={(value) => updateSetting('security', 'enableTwoFactor', value)}
                description="Allow users to enable 2FA for their accounts"
              />
            </div>

            {/* Change My Password (Admin) */}
            <div className="bg-white shadow rounded-lg mt-6">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Change My Password</h3>
                  <p className="text-xs text-gray-600">Update your own administrator password</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPwdForm(!showPwdForm)}
                  className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {showPwdForm ? 'Cancel' : 'Change Password'}
                </button>
              </div>

              {showPwdForm && (
                <form onSubmit={handleChangeMyPassword} className="p-4 space-y-4">
                  <div className="admin-form-group">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="admin-input-container">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="admin-input pr-12"
                        required
                      />
                      <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="admin-input-icon right">
                        {showCurrentPassword ? (
                          <EyeOff className="h-3 w-3 text-gray-400" />
                        ) : (
                          <Eye className="h-3 w-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="admin-form-group">
                      <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
                      <div className="admin-input-container">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="admin-input pr-12"
                          required
                        />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="admin-input-icon right">
                          {showNewPassword ? (
                            <EyeOff className="h-3 w-3 text-gray-400" />
                          ) : (
                            <Eye className="h-3 w-3 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <div className="admin-input-container">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="admin-input pr-12"
                          required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="admin-input-icon right">
                          {showConfirmPassword ? (
                            <EyeOff className="h-3 w-3 text-gray-400" />
                          ) : (
                            <Eye className="h-3 w-3 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={pwdLoading} className="px-4 py-2 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">
                      {pwdLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">Configure notification preferences for users and admins</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <ToggleField
                label="Email Notifications"
                value={settings.notifications.emailNotifications}
                onChange={(value) => updateSetting('notifications', 'emailNotifications', value)}
                description="Send notifications via email"
              />
              
              <ToggleField
                label="SMS Notifications"
                value={settings.notifications.smsNotifications}
                onChange={(value) => updateSetting('notifications', 'smsNotifications', value)}
                description="Send notifications via SMS (requires SMS provider)"
              />
              
              <ToggleField
                label="Push Notifications"
                value={settings.notifications.pushNotifications}
                onChange={(value) => updateSetting('notifications', 'pushNotifications', value)}
                description="Send browser push notifications"
              />
              
              <ToggleField
                label="Admin Alerts"
                value={settings.notifications.adminAlerts}
                onChange={(value) => updateSetting('notifications', 'adminAlerts', value)}
                description="Send alerts to administrators for important events"
              />
            </div>
            
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">User Email Notifications</h4>
              <div className="space-y-4">
                <ToggleField
                  label="Welcome Email"
                  value={settings.notifications.userWelcomeEmail}
                  onChange={(value) => updateSetting('notifications', 'userWelcomeEmail', value)}
                  description="Send welcome email to new users"
                />
                
                <ToggleField
                  label="Survey Completion Email"
                  value={settings.notifications.surveyCompletionEmail}
                  onChange={(value) => updateSetting('notifications', 'surveyCompletionEmail', value)}
                  description="Send confirmation email when users complete surveys"
                />
                
                <ToggleField
                  label="Reward Claim Email"
                  value={settings.notifications.rewardClaimEmail}
                  onChange={(value) => updateSetting('notifications', 'rewardClaimEmail', value)}
                  description="Send confirmation email when users claim rewards"
                />
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-primary-600 mr-2" />
                <p className="text-sm text-primary-800">Configure API settings and access controls</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Rate Limit (requests/minute)"
                type="number"
                value={settings.api.rateLimit}
                onChange={(e) => updateSetting('api', 'rateLimit', parseInt(e.target.value))}
                placeholder="100"
                description="Maximum API requests per minute per IP"
              />
              <InputField
                label="API Version"
                value={settings.api.apiVersion}
                onChange={(e) => updateSetting('api', 'apiVersion', e.target.value)}
                placeholder="v1"
                description="Current API version"
              />
            </div>
            
            <InputField
              label="Allowed Origins"
              value={settings.api.allowedOrigins}
              onChange={(e) => updateSetting('api', 'allowedOrigins', e.target.value)}
              placeholder="https://example.com, https://app.example.com"
              description="Comma-separated list of allowed CORS origins"
            />
            
            <InputField
              label="Log Level"
              type="select"
              value={settings.api.logLevel}
              onChange={(e) => updateSetting('api', 'logLevel', e.target.value)}
              placeholder={
                <>
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </>
              }
            />
            
            <div className="space-y-4">
              <ToggleField
                label="Enable CORS"
                value={settings.api.enableCors}
                onChange={(value) => updateSetting('api', 'enableCors', value)}
                description="Allow cross-origin requests"
              />
              
              <ToggleField
                label="Enable API Logging"
                value={settings.api.enableLogging}
                onChange={(value) => updateSetting('api', 'enableLogging', value)}
                description="Log API requests and responses"
              />
            </div>
          </div>
        );

      case 'rewards':
        return (
          <div className="space-y-6">
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Key className="h-5 w-5 text-primary-600 mr-2" />
                <p className="text-sm text-primary-800">Configure reward system settings and limits</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Minimum Points for Reward"
                type="number"
                value={settings.rewards.minPointsForReward}
                onChange={(e) => updateSetting('rewards', 'minPointsForReward', parseInt(e.target.value))}
                placeholder="100"
                description="Minimum points required to claim any reward"
              />
              <InputField
                label="Max Rewards per User"
                type="number"
                value={settings.rewards.maxRewardsPerUser}
                onChange={(e) => updateSetting('rewards', 'maxRewardsPerUser', parseInt(e.target.value))}
                placeholder="10"
                description="Maximum number of rewards a user can claim per month"
              />
            </div>
            
            <InputField
              label="Reward Expiration (days)"
              type="number"
              value={settings.rewards.rewardExpirationDays}
              onChange={(e) => updateSetting('rewards', 'rewardExpirationDays', parseInt(e.target.value))}
              placeholder="30"
              description="Number of days before unclaimed rewards expire"
            />
            
            <div className="space-y-4">
              <ToggleField
                label="Auto-approve Rewards"
                value={settings.rewards.autoApproveRewards}
                onChange={(value) => updateSetting('rewards', 'autoApproveRewards', value)}
                description="Automatically approve reward claims without manual review"
              />
              
              <ToggleField
                label="Enable Reward Categories"
                value={settings.rewards.enableRewardCategories}
                onChange={(value) => updateSetting('rewards', 'enableRewardCategories', value)}
                description="Allow organizing rewards into categories"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <PageLoading message="Loading system settings..." />;
  }

  return (
    <div className="admin-container withdrawal-compact">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={resetSettings}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </button>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex flex-wrap space-x-4 sm:space-x-8 px-4 sm:px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;