import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Shield, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Login card */}
      <div className="w-full max-w-md">
        <div className="admin-card admin-spacing-md">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
                <span className="text-gray-900">Data</span>
                <span className="text-green-600">Leaf</span>
              </h1>
            </div>
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Admin Panel
            </h2>
            <p className="text-secondary text-xs">
              Secure administrative access to DataLeaf
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="admin-spacing-sm">
            {/* Email field */}
            <div className="admin-form-group">
              <label htmlFor="email" className="text-xs font-medium">
                Email Address
              </label>
              <div className="admin-input-container">
                <Mail className="admin-input-icon left h-4 w-4" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="admin-input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="admin-form-group">
              <label htmlFor="password" className="text-xs font-medium">
                Password
              </label>
              <div className="admin-input-container">
                <Lock className="admin-input-icon left h-4 w-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="admin-input pl-10 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="admin-input-icon right"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-red-700 text-xs text-center">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 text-xs"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" aria-hidden="true" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>Access Admin Panel</span>
                </div>
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="text-center mt-6">
            <p className="text-xs text-secondary">
              🔒 Secured with SSL encryption
            </p>
          </div>
        </div>

        {/* Brand footer */}
        <div className="text-center mt-6">
          <p className="text-secondary text-sm">
            © 2024 DataLeaf. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;