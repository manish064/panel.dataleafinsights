import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ErrorHandler } from '../utils/errorHandler';

const ChangePassword = () => {
  const { changePassword } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      ErrorHandler.show('New passwords do not match');
      return;
    }
    if (form.newPassword.length < 8) {
      ErrorHandler.show('Password must be at least 8 characters long');
      return;
    }
    setLoading(true);
    try {
      const result = await changePassword(form.currentPassword, form.newPassword);
      if (result?.success || result === true) {
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      // Errors are surfaced via toasts in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg flex items-center">
        <Lock className="h-5 w-5 text-blue-600 mr-2" />
        <p className="text-sm text-blue-800">Update your administrator password</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">Change My Password</h3>
          <p className="text-xs text-gray-600">Enter your current password and a new one</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="admin-form-group">
            <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
            <div className="admin-input-container">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                className="admin-input pr-12"
                required
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="admin-input-icon right">
                {showCurrent ? (
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
                  type={showNew ? 'text' : 'password'}
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  className="admin-input pr-12"
                  required
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="admin-input-icon right">
                  {showNew ? (
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
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="admin-input pr-12"
                  required
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="admin-input-icon right">
                  {showConfirm ? (
                    <EyeOff className="h-3 w-3 text-gray-400" />
                  ) : (
                    <Eye className="h-3 w-3 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-4 py-2 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

