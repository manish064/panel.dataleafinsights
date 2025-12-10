import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, UserPlus, Download, RefreshCw } from 'lucide-react';

import { PageLoading, SectionLoading, ErrorState, LoadingButton } from '../components/StandardizedLoading';
import { ErrorHandler, SuccessHandler, createAsyncHandler } from '../utils/errorHandler';
import {
  getUsers,
  deleteUser as apiDeleteUser,
  activateUser as apiActivateUser,
  deactivateUser as apiDeactivateUser,
  bulkUserAction as apiBulkUserAction,
  exportUsers as apiExportUsers
} from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllMode, setSelectAllMode] = useState('page'); // 'page' or 'all'
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionDropdown, setActionDropdown] = useState(null);

  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, filterStatus]);

  const mapServerUser = (u) => {
    // Add null/undefined check to prevent filter errors
    if (!u || typeof u !== 'object') {
      console.warn('Invalid user data received:', u);
      return null;
    }
    
    return {
      id: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.email || 'Unknown User',
      email: u.email || '',
      phone: u.phone || u.country || u.city || '',
      status: u.isActive ? 'active' : 'inactive',
      joinDate: u.createdAt,
      totalSurveys: u.surveyCount ?? 0,
      totalRewards: u.rewardCount ?? 0,
      approvedWithdrawalAmount: u.approvedWithdrawalAmount ?? 0,
      lastActive: u.lastLogin || u.updatedAt
    };
  };

  const fetchUsers = createAsyncHandler(
    async () => {
      const params = {
        page: currentPage,
        limit: usersPerPage,
        search: searchTerm,
        status: filterStatus !== 'all' ? filterStatus : undefined
      };
      
      const response = await getUsers(params);
      const serverUsers = response.data?.users || [];
      
      // Map and filter out any null results
      const mappedUsers = serverUsers
        .map(mapServerUser)
        .filter(user => user !== null);
      
      setUsers(mappedUsers);
      const totalItems = response.data?.pagination?.totalItems || 0;
      setTotalUsers(totalItems);
      setTotalPages(Math.ceil(totalItems / usersPerPage));
    },
    {
      loadingState: setLoading,
      errorContext: 'fetching users',
      showErrorToast: true
    }
  );

  const exportUsers = createAsyncHandler(
    async () => {
      await apiExportUsers();
      SuccessHandler.show('Users exported successfully');
    },
    {
      errorContext: 'exporting users',
      showErrorToast: true
    }
  );

  const handleUserAction = createAsyncHandler(
    async (action, userId) => {
      let response;
      let message;
      
      switch (action) {
        case 'activate':
          response = await apiActivateUser(userId);
          message = 'User activated successfully';
          break;
        case 'deactivate':
          response = await apiDeactivateUser(userId);
          message = 'User deactivated successfully';
          break;
        case 'delete':
          if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
          }
          response = await apiDeleteUser(userId);
          message = 'User deleted successfully';
          break;
        default:
          throw new Error('Invalid action');
      }
      
      SuccessHandler.show(message);
      setActionDropdown(null);
      await fetchUsers();
    },
    {
      errorContext: 'performing user action',
      showErrorToast: true
    }
  );

  const handleBulkAction = createAsyncHandler(
    async (action) => {
      if (selectedUsers.length === 0) {
        ErrorHandler.handle(new Error('No users selected'), 'bulk action');
        return;
      }
      
      if (!window.confirm(`Are you sure you want to ${action} ${selectedUsers.length} user(s)?`)) {
        return;
      }
      
      await apiBulkUserAction(action, selectedUsers);
      
      SuccessHandler.show(`Bulk ${action} completed successfully`);
      setSelectedUsers([]);
      await fetchUsers();
    },
    {
      errorContext: 'performing bulk action',
      showErrorToast: true
    }
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAllUsers = async () => {
    if (selectAllMode === 'page') {
      // Select all users on current page
      setSelectedUsers(prev => 
        prev.length === filteredUsers.length 
          ? []
          : filteredUsers.map(user => user.id)
      );
    } else {
      // Select all users across all pages
      if (selectedUsers.length > 0) {
        setSelectedUsers([]);
      } else {
        try {
          // Fetch all user IDs from server with correct parameters
          const params = {
            page: 1,
            limit: totalUsers,
            search: searchTerm,
            status: filterStatus !== 'all' ? filterStatus : undefined
          };
          const response = await getUsers(params);
          const allUserIds = response.data?.users?.map(user => user.id) || [];
          setSelectedUsers(allUserIds);
        } catch (error) {
          ErrorHandler.handle(error, 'Failed to select all users');
        }
      }
    }
  };

  const getSelectAllStatus = () => {
    if (selectAllMode === 'page') {
      return selectedUsers.length === filteredUsers.length && filteredUsers.length > 0;
    } else {
      return selectedUsers.length === totalUsers && totalUsers > 0;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // User Modal Component
  const UserModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Name</label>
                <p className="text-xs text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Email</label>
                <p className="text-xs text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Phone</label>
                <p className="text-xs text-gray-900">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                  {user.status}
                </span>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Join Date</label>
                <p className="text-xs text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Total Surveys</label>
                <p className="text-xs text-gray-900">{user.totalSurveys}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Total Rewards</label>
                <p className="text-xs text-gray-900">₹{user.totalRewards}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Approved Withdrawals</label>
                <p className="text-xs text-gray-900">₹{user.approvedWithdrawalAmount}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Last Active</label>
                <p className="text-xs text-gray-900">{new Date(user.lastActive).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Since server-side filtering is already applied, use users directly
  const filteredUsers = users;

  return (
    <div className="admin-container withdrawal-compact">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-header-content">
          <h1 className="text-base sm:text-lg font-bold text-gray-900">User Management</h1>
          <p className="text-xs text-gray-600">Manage and monitor user accounts</p>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={exportUsers}
            className="admin-button-secondary flex items-center justify-center sm:justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={fetchUsers}
            className="admin-button-secondary flex items-center justify-center sm:justify-start"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input search-input"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="w-full sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-input"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedUsers.length} user(s) selected
              </span>
              {selectAllMode === 'all' && selectedUsers.length > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Across all pages
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <LoadingButton
                onClick={() => handleBulkAction('activate')}
                className="admin-button-secondary"
                size="sm"
              >
                Activate
              </LoadingButton>
              <LoadingButton
                onClick={() => handleBulkAction('deactivate')}
                className="admin-button-secondary"
                size="sm"
              >
                Deactivate
              </LoadingButton>
              <LoadingButton
                onClick={() => handleBulkAction('delete')}
                className="admin-button-danger"
                size="sm"
              >
                Delete
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <SectionLoading message="Loading users..." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 text-left">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={getSelectAllStatus()}
                          onChange={toggleAllUsers}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <select
                          value={selectAllMode}
                          onChange={(e) => {
                            setSelectAllMode(e.target.value);
                            setSelectedUsers([]); // Clear selections when switching modes
                          }}
                          className="text-xs border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="page">Page</option>
                          <option value="all">All ({totalUsers})</option>
                        </select>
                      </div>
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">User</th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Status</th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Surveys</th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Withdrawals</th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Join Date</th>
                    <th className="px-2 sm:px-4 py-2 text-right text-xs font-medium text-secondary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => toggleUserSelection(user.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-3">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-700">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-xs font-medium text-gray-900">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                          {user.totalSurveys}
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-xs text-gray-900">
                          ₹{user.approvedWithdrawalAmount}
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-xs text-gray-500">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            
                            <div className="relative">
                              <button
                                onClick={() => setActionDropdown(actionDropdown === user.id ? null : user.id)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                              
                              {actionDropdown === user.id && (
                                <div className="absolute right-0 mt-1 w-32 bg-white rounded shadow-lg z-10 border">
                                  <div className="py-1">
                                    <button
                                      onClick={() => {
                                        setSelectedUser(user);
                                        setShowUserModal(true);
                                        setActionDropdown(null);
                                      }}
                                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      View
                                    </button>
                                    {user.status === 'inactive' ? (
                                      <button
                                        onClick={() => handleUserAction('activate', user.id)}
                                        className="flex items-center w-full px-3 py-2 text-sm text-green-700 hover:bg-green-50"
                                      >
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Activate
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleUserAction('deactivate', user.id)}
                                        className="flex items-center w-full px-3 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Deactivate
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleUserAction('delete', user.id)}
                                      className="flex items-center w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                      {Math.min((currentPage - 1) * usersPerPage + 1, totalUsers)}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * usersPerPage, (currentPage - 1) * usersPerPage + users.length)}
                    </span> of{' '}
                    <span className="font-medium">{totalUsers}</span> users
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* User Details Modal */}
        {showUserModal && (
          <UserModal
            user={selectedUser}
            onClose={() => {
              setShowUserModal(false);
              setSelectedUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;