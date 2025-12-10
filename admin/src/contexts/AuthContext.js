import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if admin is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          console.log('Checking authentication with token:', token.substring(0, 20) + '...');
          const response = await axios.get('/api/admin/me');
          console.log('Auth check response:', response.data);
          // Handle nested response structure: response.data.data
          setAdmin(response.data.data?.admin || response.data.admin || response.data);
        } catch (error) {
          console.error('Auth check failed:', error.message || error);
          
          // Handle different types of errors
          if (error.code === 'ERR_BLOCKED_BY_CLIENT') {
            console.log('Request blocked by client (likely ad blocker or browser extension), keeping current state');
          } else if (error.code === 'ERR_NETWORK' || error.code === 'ERR_ABORTED') {
            console.log('Network error during auth check, keeping current state');
          } else if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('Authentication failed, logging out');
            logout();
          } else {
            console.log('Unknown error during auth check, keeping current state:', error.code || 'NO_CODE');
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/admin/login', { email, password });
      
      // Handle nested response structure: response.data.data
      const responseData = response.data.data || response.data;
      const { token: newToken, admin: adminData } = responseData;
      
      setToken(newToken);
      setAdmin(adminData);
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      // Store in localStorage
      localStorage.setItem('adminToken', newToken);
      localStorage.setItem('adminData', JSON.stringify(adminData));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    toast.info('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/admin/profile', profileData);
      // Handle nested response structure: response.data.data
      const updatedAdmin = response.data.data?.admin || response.data.admin || response.data;
      setAdmin(updatedAdmin);
      localStorage.setItem('adminData', JSON.stringify(updatedAdmin));
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('/api/admin/change-password', {
        currentPassword,
        newPassword
      });
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!admin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};