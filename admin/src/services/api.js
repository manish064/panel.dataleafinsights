import axios from '../utils/axiosConfig';

// Helper function to handle API responses
const handleResponse = (response) => {
  return response.data;
};

// Helper function for error handling
const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

// Authentication APIs
export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/admin/login', credentials);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('/api/admin/logout');
    
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getCurrentAdmin = async () => {
  try {
    const response = await axios.get('/api/admin/me');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Dashboard APIs
export const getDashboardStats = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/dashboard/stats', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getUserRegistrationsChart = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/dashboard/charts/user-registrations', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getSurveyCompletionsChart = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/dashboard/charts/survey-completions', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getRewardDistributionChart = async () => {
  try {
    const response = await axios.get('/api/admin/dashboard/charts/reward-distribution');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getRecentActivity = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/dashboard/recent-activity', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getSystemHealth = async () => {
  try {
    const response = await axios.get('/api/admin/dashboard/system-health');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getTopSurveys = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/dashboard/top-surveys', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getTopRewards = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/dashboard/top-rewards', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// User Management APIs
export const getUsers = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/users', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`/api/admin/users/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`/api/admin/users/${id}`, userData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/admin/users/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Individual user status endpoints
export const suspendUser = async (id, reason = '') => {
  try {
    const response = await axios.post(`/api/admin/users/${id}/suspend`, { reason });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const unsuspendUser = async (id) => {
  try {
    const response = await axios.post(`/api/admin/users/${id}/unsuspend`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const activateUser = async (id) => {
  try {
    const response = await axios.post(`/api/admin/users/${id}/activate`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deactivateUser = async (id) => {
  try {
    const response = await axios.post(`/api/admin/users/${id}/deactivate`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Bulk actions and export
export const bulkUserAction = async (action, userIds, reason = '') => {
  try {
    const response = await axios.post('/api/admin/users/bulk-action', { action, userIds, reason });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const exportUsers = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/users/export/csv', { 
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Survey Management APIs
export const getSurveys = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/surveys', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const createSurvey = async (surveyData) => {
  try {
    const response = await axios.post('/api/admin/surveys', surveyData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateSurvey = async (id, surveyData) => {
  try {
    const response = await axios.put(`/api/admin/surveys/${id}`, surveyData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteSurvey = async (id) => {
  try {
    const response = await axios.delete(`/api/admin/surveys/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getSurveyById = async (id) => {
  try {
    const response = await axios.get(`/api/admin/surveys/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Survey status actions
export const activateSurvey = async (id) => {
  try {
    const response = await axios.post(`/api/admin/surveys/${id}/activate`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const pauseSurvey = async (id) => {
  try {
    const response = await axios.post(`/api/admin/surveys/${id}/pause`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const completeSurvey = async (id) => {
  try {
    const response = await axios.post(`/api/admin/surveys/${id}/complete`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const duplicateSurvey = async (id) => {
  try {
    const response = await axios.post(`/api/admin/surveys/${id}/duplicate`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getSurveyResponses = async (id, params = {}) => {
  try {
    const response = await axios.get(`/api/admin/surveys/${id}/responses`, { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const exportSurveyResponses = async (id, params = {}) => {
  try {
    const response = await axios.get(`/api/admin/surveys/${id}/export`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Rewards Management APIs
export const getRewards = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/rewards', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getRewardStats = async () => {
  try {
    const response = await axios.get('/api/admin/rewards/stats');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getRewardDetails = async (id) => {
  try {
    const response = await axios.get(`/api/admin/rewards/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Live available voucher count for a reward
export const getRewardAvailableStock = async (id) => {
  try {
    const response = await axios.get(`/api/admin/rewards/${id}/stock/available`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Force resync Reward.stockQuantity to live available voucher count
export const syncRewardStock = async (id) => {
  try {
    const response = await axios.post(`/api/admin/rewards/${id}/stock/sync`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Upload vouchers CSV data for an existing reward
export const uploadRewardVouchers = async (id, csvData) => {
  try {
    const response = await axios.post(`/api/admin/rewards/${id}/vouchers/upload`, { csvData });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const createReward = async (rewardData) => {
  try {
    const response = await axios.post('/api/admin/rewards', rewardData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateReward = async (id, rewardData) => {
  try {
    const response = await axios.put(`/api/admin/rewards/${id}`, rewardData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const activateReward = async (id) => {
  try {
    const response = await axios.post(`/api/admin/rewards/${id}/activate`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deactivateReward = async (id) => {
  try {
    const response = await axios.post(`/api/admin/rewards/${id}/deactivate`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteReward = async (id) => {
  try {
    const response = await axios.delete(`/api/admin/rewards/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getRewardRedemptions = async (id, params = {}) => {
  try {
    const response = await axios.get(`/api/admin/rewards/${id}/redemptions`, { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getAllRewardRedemptions = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/rewards/redemptions', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateRedemptionStatus = async (redemptionId, payload) => {
  try {
    const response = await axios.put(`/api/admin/rewards/redemptions/${redemptionId}`, payload);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const reassignRedemptionReward = async (redemptionId, newRewardId) => {
  try {
    const response = await axios.put(`/api/admin/rewards/redemptions/${redemptionId}/reassign`, { newRewardId });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const exportRewards = async () => {
  try {
    const response = await axios.get('/api/admin/rewards/export/csv', {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Withdrawal Management APIs
export const getWithdrawals = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/withdrawals', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getWithdrawalStats = async () => {
  try {
    const response = await axios.get('/api/admin/withdrawals/stats');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getWithdrawalDetails = async (id) => {
  try {
    const response = await axios.get(`/api/admin/withdrawals/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateWithdrawal = async (id, status, notes = '') => {
  try {
    const response = await axios.put(`/api/admin/withdrawals/${id}`, { status, notes });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const approveWithdrawal = async (id, notes = '') => {
  try {
    const response = await axios.post(`/api/admin/withdrawals/${id}/approve`, { notes });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const rejectWithdrawal = async (id, reason = '', notes = '') => {
  try {
    const response = await axios.post(`/api/admin/withdrawals/${id}/reject`, { 
      reason: reason || notes || 'No reason provided', 
      notes 
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const exportWithdrawals = async () => {
  try {
    const response = await axios.get('/api/admin/withdrawals/export/csv', {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Analytics APIs
export const getAnalytics = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/analytics', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Audit Logs APIs
export const getAuditLogs = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/audit-logs', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getAuditLogStats = async () => {
  try {
    const response = await axios.get('/api/admin/audit-logs/stats');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const exportAuditLogs = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/audit-logs/export', { 
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// System Settings APIs
export const getSettings = async () => {
  try {
    const response = await axios.get('/api/admin/settings');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateSettings = async (settings) => {
  try {
    const response = await axios.put('/api/admin/settings', settings);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Admin Management APIs
export const getAdmins = async (params = {}) => {
  try {
    const response = await axios.get('/api/admin/admins', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const createAdmin = async (adminData) => {
  try {
    const response = await axios.post('/api/admin/admins', adminData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateAdmin = async (id, adminData) => {
  try {
    const response = await axios.put(`/api/admin/admins/${id}`, adminData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`/api/admin/admins/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
