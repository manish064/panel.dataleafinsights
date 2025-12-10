import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Add token to requests if available
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // Verify token with backend
          const response = await axios.get('/auth/verify');
          if (response.data.success) {
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const setAuthenticatedUser = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const refreshUser = async () => {
    try {
      const response = await axios.get('/auth/verify');
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
    return null;
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get('/users/profile');
      if (response.data.success) {
        return {
          user: response.data.user,
          hasPassword: response.data.hasPassword
        };
      }
    } catch (error) {
      console.error('Failed to get user profile:', error);
    }
    return null;
  };

  const sendVerificationEmail = async (email) => {
    try {
      const response = await axios.post('/auth/send-verification-email', { email });
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send verification email'
      };
    }
  };

  const resendRegistrationEmail = async (email) => {
    try {
      // For registration, we need to re-trigger the registration process
      // This will resend the OTP for pending registrations
      const registrationData = JSON.parse(localStorage.getItem('pendingRegistration') || '{}');
      if (registrationData.email === email) {
        const response = await axios.post('/auth/register', registrationData);
        return {
          success: response.data.success,
          message: response.data.message
        };
      } else {
        return {
          success: false,
          message: 'Registration data not found. Please register again.'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to resend registration email'
      };
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const response = await axios.post('/auth/verify-email', { email, otp });

      if (response.data.success && response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }

      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Email verification failed'
      };
    }
  };

  const completeRegistration = async (email, otp) => {
    try {
      const response = await axios.post('/auth/complete-registration', { email, otp });

      if (response.data.success && response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // Clean up pending registration data
        localStorage.removeItem('pendingRegistration');
        setUser(user);
      }

      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration completion failed'
      };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post('/auth/forgot-password', { email });
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to process password reset request'
      };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axios.post('/auth/reset-password', {
        email,
        otp,
        newPassword
      });

      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password reset failed'
      };
    }
  };

  const setPasswordForGoogleUser = async (email, otp, newPassword) => {
    try {
      const response = await axios.post('/auth/set-password-google', {
        email,
        otp,
        newPassword
      });

      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to set password'
      };
    }
  };

  const linkGoogleAccount = async () => {
    try {
      // This will redirect to Google OAuth for account linking
      // The backend will handle the linking process and redirect back
      window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/google`;

      return {
        success: true,
        message: 'Redirecting to Google for account linking...'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to initiate Google account linking'
      };
    }
  };

  const checkUserType = async (email) => {
    try {
      const response = await axios.post('/auth/check-user-type', { email });
      return {
        success: response.data.success,
        isGoogleUser: response.data.isGoogleUser
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to check user type'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    setAuthenticatedUser,
    register,
    logout,
    updateUser,
    refreshUser,
    getUserProfile,
    sendVerificationEmail,
    resendRegistrationEmail,
    verifyEmail,
    completeRegistration,
    forgotPassword,
    resetPassword,
    setPasswordForGoogleUser,
    linkGoogleAccount,
    checkUserType
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
