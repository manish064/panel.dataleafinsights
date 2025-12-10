import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Eye, Edit, Trash2, Gift, DollarSign, Users, TrendingUp, Calendar, Filter, UserCheck, Mail, Clock } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { PageLoading, SectionLoading, ErrorState, LoadingButton } from '../components/StandardizedLoading';
import { ErrorHandler, SuccessHandler, createAsyncHandler } from '../utils/errorHandler';
import { toast } from 'react-toastify';
import {
  getRewards,
  getRewardStats,
  getRewardDetails,
  createReward,
  updateReward,
  activateReward,
  deactivateReward,
  deleteReward,
  exportRewards,
  getRewardRedemptions,
  updateRedemptionStatus,
  getRewardAvailableStock,
  uploadRewardVouchers
} from '../services/api';

const RewardsManagement = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRedemptionsModal, setShowRedemptionsModal] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(null);
  const [redemptions, setRedemptions] = useState([]);
  const [redemptionsLoading, setRedemptionsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRewards: 0,
    totalDistributed: 0,
    totalValue: 0,
    activeRewards: 0
  });

  const rewardsPerPage = 10;

  useEffect(() => {
    fetchRewards();
    fetchStats();
  }, [currentPage, searchTerm, filterStatus]);

  const fetchRewards = createAsyncHandler(
    async () => {
      const response = await getRewards({
        page: currentPage,
        limit: rewardsPerPage,
        search: searchTerm,
        status: filterStatus === 'all' ? '' : filterStatus
      });
      const apiRewards = response?.data?.rewards || [];
      const mapped = apiRewards.map(r => ({
        id: r.id,
        title: r.name,
        description: r.description || '',
        type: r.type === 'product' ? 'physical' : (r.type === 'voucher' ? 'gift_card' : r.type),
        value: r.cashValue || r.value || 0,
        pointsCost: r.pointsCost || 0,
        status: r.isActive ? 'active' : 'inactive',
        totalClaimed: r.totalRedemptions || 0,
        pendingRedemptions: r.pendingRedemptions || 0,
        totalAvailable: r.stockQuantity || 0,
        createdDate: r.createdAt,
        expiryDate: r.validUntil || null,
        // Provider/Category removed
      }));
      setRewards(mapped);
      setTotalPages(response?.data?.pagination?.totalPages || 1);
    },
    {
      loadingState: setLoading,
      errorContext: 'fetching rewards',
      showErrorToast: true,
      fallbackData: () => {
        // Mock data for development
        setRewards([
          {
            id: 1,
            title: 'Amazon Gift Card',
            description: '₹25 Amazon Gift Card for completing surveys',
            type: 'gift_card',
            value: 25,
            pointsCost: 2500,
            status: 'active',
            totalClaimed: 145,
            totalAvailable: 500,
            createdDate: '2024-01-15',
            expiryDate: '2024-12-31',
            
          },
          {
            id: 2,
            title: 'PayPal Cash',
            description: '₹10 PayPal cash reward',
            type: 'cash',
            value: 10,
            pointsCost: 1000,
            status: 'active',
            totalClaimed: 89,
            totalAvailable: 1000,
            createdDate: '2024-01-18',
            expiryDate: null,
            
          },
          {
            id: 3,
            title: 'Starbucks Gift Card',
            description: '₹15 Starbucks Gift Card',
            type: 'gift_card',
            value: 15,
            pointsCost: 1500,
            status: 'inactive',
            totalClaimed: 67,
            totalAvailable: 200,
            createdDate: '2024-01-10',
            expiryDate: '2024-06-30',
            
          },
          {
            id: 4,
            title: 'Premium Subscription',
            description: '1 month premium subscription',
            type: 'subscription',
            value: 9.99,
            pointsCost: 999,
            status: 'active',
            totalClaimed: 23,
            totalAvailable: 100,
            createdDate: '2024-01-20',
            expiryDate: '2024-12-31',
            
          }
        ]);
        setTotalPages(1);
      }
    }
  );

  const fetchStats = createAsyncHandler(
    async () => {
      const response = await getRewardStats();
      const d = response?.data || {};
      setStats({
        totalRewards: d.totalRewards || 0,
        totalDistributed: d.totalRedemptions || 0,
        totalValue: 0,
        activeRewards: d.activeRewards || 0
      });
    },
    {
      errorContext: 'fetching reward statistics',
      showErrorToast: true,
      fallbackData: () => {
        // Mock stats
        setStats({
          totalRewards: 4,
          totalDistributed: 324,
          totalValue: 16245.67,
          activeRewards: 3
        });
      }
    }
  );

  const fetchRedemptions = async (rewardId) => {
    setRedemptionsLoading(true);
    try {
      const response = await getRewardRedemptions(rewardId);
      if (response.success) {
        setRedemptions(response.data.redemptions || []);
      }
    } catch (error) {
      ErrorHandler.handle(error, 'Failed to fetch redemptions');
      setRedemptions([]);
    } finally {
      setRedemptionsLoading(false);
    }
  };

  const handleRewardAction = createAsyncHandler(
    async (action, rewardId) => {
      switch (action) {
        case 'activate':
          await activateReward(rewardId);
          SuccessHandler.show('Reward activated successfully');
          break;
        case 'deactivate':
          await deactivateReward(rewardId);
          SuccessHandler.show('Reward deactivated successfully');
          break;
        case 'delete':
          // Prevent deletion if reward has existing redemptions
          try {
            const target = rewards?.find(r => r.id === rewardId);
            // Only block on pending redemptions to match admin expectation
            if (target && Number(target.pendingRedemptions) > 0) {
              toast.error('Cannot delete reward with pending redemptions. Deactivate instead.');
              return;
            }
          } catch (_) {
            // If any error occurs during local check, proceed to server which will validate
          }

          if (window.confirm('Are you sure you want to delete this reward?')) {
            await deleteReward(rewardId);
            SuccessHandler.show('Reward deleted successfully');
          } else {
            return;
          }
          break;
        default:
          break;
      }
      await fetchRewards();
      await fetchStats();
      setActionDropdown(null);
    },
    {
      errorContext: 'updating reward',
      showErrorToast: true
    }
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status] || 'bg-gray-100 text-gray-800'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeClasses = {
      gift_card: 'bg-purple-100 text-purple-800',
      cash: 'bg-green-100 text-green-800',
      subscription: 'bg-blue-100 text-blue-800',
      physical: 'bg-orange-100 text-orange-800'
    };
    
    const typeLabels = {
      gift_card: 'Gift Card',
      cash: 'Cash',
      subscription: 'Subscription',
      physical: 'Physical'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        typeClasses[type] || 'bg-gray-100 text-gray-800'
      }`}>
        {typeLabels[type] || type}
      </span>
    );
  };

  const getAvailabilityBar = (claimed, available) => {
    const percentage = Math.min((claimed / available) * 100, 100);
    const remaining = available - claimed;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>{claimed} claimed</span>
          <span>{remaining} remaining</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              percentage > 80 ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-2 rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="ml-3">
          <p className="text-xs font-medium text-gray-600">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const RewardModal = ({ reward, onClose }) => {
    if (!reward) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 sm:top-20 mx-auto admin-padding-responsive border border-gray-200 w-full max-w-2xl shadow-lg rounded-lg bg-white admin-modal">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-4 gap-4">
              <h3 className="admin-subtitle font-medium text-gray-900 min-w-0 truncate">Reward Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 admin-touch-target flex-shrink-0 p-1"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="admin-spacing-xs">
                <div>
                  <label className="block text-xs font-medium text-gray-700 admin-text-responsive">Title</label>
                  <p className="text-sm text-gray-900 break-words">{reward.title}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 admin-text-responsive">Description</label>
                  <p className="text-xs text-gray-900 break-words">{reward.description}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Type</label>
                  {getTypeBadge(reward.type)}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Status</label>
                  {getStatusBadge(reward.status)}
                </div>
              </div>
              
              <div className="admin-spacing-xs">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Value</label>
                  <p className="text-xs text-gray-900 font-semibold text-green-600">${reward.value}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Points Cost</label>
                  <p className="text-xs text-gray-900">{reward.pointsCost} points</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Created Date</label>
                  <p className="text-xs text-gray-900">{new Date(reward.createdDate).toLocaleDateString()}</p>
                </div>
                {reward.expiryDate && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Expiry Date</label>
                    <p className="text-xs text-gray-900">{new Date(reward.expiryDate).toLocaleDateString()}</p>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-700">Availability</label>
                  {getAvailabilityBar(reward.totalClaimed, reward.totalAvailable)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  // Navigate to reward analytics
                  onClose();
                }}
                className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
              >
                View Analytics
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RedemptionsModal = ({ reward, redemptions, loading, onClose }) => {
    const [editingId, setEditingId] = useState(null);
    const [voucherCode, setVoucherCode] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('digital');
    const [notes, setNotes] = useState('');

    if (!reward) return null;

    const getStatusBadge = (status) => {
      // Normalize historical synonyms to canonical statuses
      const normalized = status === 'completed' ? 'delivered' : status === 'rejected' ? 'cancelled' : status;
      const statusConfig = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
        processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Processing' },
        delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
        expired: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Expired' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
      };
      const config = statusConfig[normalized] || statusConfig.pending;
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          {config.label}
        </span>
      );
    };

    const startApprove = (r) => {
      setEditingId(r.id);
      setVoucherCode(r.voucherCode || '');
      setDeliveryMethod(r.deliveryMethod || 'digital');
      setNotes('');
    };

    const submitApprove = async (id) => {
      try {
        await updateRedemptionStatus(id, { status: 'delivered', voucherCode, deliveryMethod, notes });
        SuccessHandler.show('Redemption approved and voucher issued');
        setEditingId(null);
        setVoucherCode('');
        setNotes('');
        onClose();
      } catch (error) {
        ErrorHandler.handle(error, 'Failed to approve redemption');
      }
    };

    const submitReject = async (id) => {
      try {
        await updateRedemptionStatus(id, { status: 'cancelled', notes });
        SuccessHandler.show('Redemption cancelled');
        setEditingId(null);
        setNotes('');
        onClose();
      } catch (error) {
        ErrorHandler.handle(error, 'Failed to reject redemption');
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 sm:top-20 mx-auto admin-padding-responsive border border-gray-200 w-full max-w-4xl shadow-lg rounded-lg bg-white admin-modal">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-4 gap-4">
              <h3 className="admin-subtitle font-medium text-gray-900 min-w-0 truncate">
                Redemptions for {reward.title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 admin-touch-target flex-shrink-0 p-1"
              >
                ×
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : redemptions.length === 0 ? (
              <div className="text-center py-8">
                <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No redemptions yet</h3>
                <p className="mt-1 text-sm text-gray-500">This reward hasn't been redeemed by any users.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User Profile
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Redemption Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points Spent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {redemptions.map((redemption) => (
                      <tr key={redemption.id} className="hover:bg-gray-50">
                        <td className="user-profile">
                          <div className="user-profile-container">
                            <div className="user-avatar bg-gray-200">
                              <span className="text-xs font-medium text-gray-600">
                                {redemption.User?.firstName?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <div className="user-info">
                              <div className="user-name" title={redemption.User ? `${redemption.User.firstName} ${redemption.User.lastName}` : 'Unknown User'}>
                                {redemption.User ? `${redemption.User.firstName} ${redemption.User.lastName}` : 'Unknown User'}
                              </div>
                              <div className="user-email" title={redemption.User?.email || 'No email'}>
                                {redemption.User?.email || 'No email'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              Email in profile
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {new Date(redemption.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {redemption.pointsSpent} points
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(redemption.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {redemption.voucherCode || redemption.redemptionCode || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {editingId === redemption.id ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="Voucher code"
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                              />
                              <p className="text-[10px] text-gray-500">Leave blank to auto-assign from available voucher pool.</p>
                              <select
                                value={deliveryMethod}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                              >
                                <option value="digital">Digital</option>
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                                <option value="postal">Postal</option>
                              </select>
                              <input
                                type="text"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Notes (optional)"
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                              />
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => submitApprove(redemption.id)}
                                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => submitReject(redemption.id)}
                                  className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startApprove(redemption)}
                                className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => submitReject(redemption.id)}
                                className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CreateRewardModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      type: 'gift_card',
      value: '',
      pointsCost: '',
      totalAvailable: '',
      expiryDate: ''
    });
    const [voucherCodesText, setVoucherCodesText] = useState('');
    const [voucherUniqueCount, setVoucherUniqueCount] = useState(0);
    const [voucherValidationError, setVoucherValidationError] = useState('');
    const [enterAnim, setEnterAnim] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setEnterAnim(true), 10);
      return () => clearTimeout(t);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // If voucher/gift_card, parse and validate codes
        let codesArray = [];
        const isVoucherType = ['gift_card', 'voucher'].includes(formData.type);
        const totalAvailableNum = parseInt(formData.totalAvailable || 0);
        if (isVoucherType) {
          const raw = (voucherCodesText || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          const unique = Array.from(new Set(raw));
          setVoucherUniqueCount(unique.length);
          if (!totalAvailableNum || totalAvailableNum <= 0) {
            setVoucherValidationError('Total Available must be a positive number.');
            toast.error('Total Available must be a positive number.');
            return;
          }
          if (unique.length !== totalAvailableNum) {
            setVoucherValidationError(`You must provide exactly ${totalAvailableNum} unique codes; currently ${unique.length}.`);
            toast.error(`Provide exactly ${totalAvailableNum} unique codes; currently ${unique.length}.`);
            return;
          }
          setVoucherValidationError('');
          codesArray = unique;
        }

        const payload = {
          name: formData.title,
          description: formData.description,
          type: formData.type,
          pointsCost: parseInt(formData.pointsCost || 0),
          cashValue: parseFloat(formData.value || 0),
          stockQuantity: parseInt(formData.totalAvailable || 0),
          validUntil: formData.expiryDate || null,
          isActive: true
        };
        if (isVoucherType) {
          payload.voucherCodes = codesArray;
        }
        const createRes = await createReward(payload);
        const createdReward = createRes?.data?.reward || createRes?.reward || createRes; // handle variations
        toast.success('Reward created successfully');
        fetchRewards();
        fetchStats();
        onClose();
      } catch (error) {
        console.error('Error creating reward:', error);
        toast.error(error.response?.data?.message || 'Failed to create reward');
      }
    };

    return (
      <div className={`fixed inset-0 bg-gray-600 overflow-y-auto h-full w-full z-50 p-4 transition-opacity duration-200 ${enterAnim ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
        <div className={`relative top-4 sm:top-20 mx-auto admin-padding-responsive border border-gray-200 w-full max-w-lg shadow-lg rounded-lg bg-white admin-modal transform transition-all duration-200 ${enterAnim ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.99]'}`}>
          <div className="mt-3">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="admin-subtitle font-medium text-gray-900 admin-text-responsive min-w-0 truncate">Create New Reward</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 admin-touch-target flex-shrink-0 p-1"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-spacing-xs">
              <div className="admin-card p-4 space-y-3">
              <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="admin-input"
                  />
                </div>
              
              <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="admin-input"
                  />
                  <p className="text-[10px] text-gray-500">Briefly describe the reward and any special terms.</p>
                </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">Type</label>
                <input type="text" value="Gift Card" readOnly className="admin-input bg-gray-50" />
                <p className="text-[10px] text-gray-500">All rewards are Gift Cards. Voucher codes required.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Value (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    className="admin-input"
                  />
                  <p className="text-[10px] text-gray-500">Amount user receives for this reward.</p>
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Points Cost</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.pointsCost}
                    onChange={(e) => setFormData({...formData, pointsCost: e.target.value})}
                    className="admin-input"
                  />
                  <p className="text-[10px] text-gray-500">Points required to redeem this reward.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Total Available</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.totalAvailable}
                    onChange={(e) => setFormData({...formData, totalAvailable: e.target.value})}
                    className="admin-input"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="admin-input"
                  />
                </div>
              </div>

              {(formData.type === 'gift_card' || formData.type === 'voucher') && (
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Voucher Codes</label>
                    <textarea
                      rows={6}
                      placeholder="Enter one code per line"
                      value={voucherCodesText}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVoucherCodesText(val);
                        const raw = (val || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
                        const unique = Array.from(new Set(raw));
                        setVoucherUniqueCount(unique.length);
                        const totalNum = parseInt(formData.totalAvailable || 0);
                        if (totalNum > 0 && unique.length !== totalNum) {
                          setVoucherValidationError(`You must provide exactly ${totalNum} unique codes; currently ${unique.length}.`);
                        } else {
                          setVoucherValidationError('');
                        }
                      }}
                      className="admin-input"
                    />
                    <p className="text-[10px] text-gray-500">Provide exactly the number of unique codes as Total Available.</p>
                    <div className="flex items-center justify-between text-[10px] mt-1">
                      <span className="text-gray-600">Unique codes: {voucherUniqueCount}</span>
                      {voucherValidationError && (
                        <span className="text-red-600">{voucherValidationError}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
                >
                  Create Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const EditRewardModal = ({ reward, onClose }) => {
    const [formData, setFormData] = useState({
      title: reward?.title || '',
      description: reward?.description || '',
      type: reward?.type || '',
      value: reward?.value || '',
      pointsCost: reward?.pointsCost || '',
      totalAvailable: reward?.totalAvailable || '',
      expiryDate: reward?.expiryDate ? new Date(reward.expiryDate).toISOString().substring(0,10) : '',
      status: reward?.status || 'active'
    });
    const [inventoryInfo, setInventoryInfo] = useState({ mode: 'stock', available: null });
    const [saving, setSaving] = useState(false);
    const [voucherPasteText, setVoucherPasteText] = useState('');
    const [uploading, setUploading] = useState(false);
    const isVoucherType = ['gift_card', 'voucher'].includes(formData.type);

    useEffect(() => {
      let mounted = true;
      const loadStock = async () => {
        try {
          const res = await getRewardAvailableStock(reward.id);
          const data = res?.data || res;
          if (!mounted) return;
          setInventoryInfo({ mode: data?.inventoryMode || 'stock', available: data?.availableCount ?? null });
        } catch (err) {
          // Non-blocking; keep default
        }
      };
      loadStock();
      return () => { mounted = false; };
    }, [reward?.id]);


    const buildCsvFromPaste = (text) => {
      const lines = text
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l.length > 0);
      if (lines.length === 0) return '';
      // Generate simple one-column CSV with header
      return ['code', ...lines].join('\n');
    };

    const handleUploadVouchers = async () => {
      try {
        setUploading(true);
        const pastedCsv = buildCsvFromPaste(voucherPasteText);
        if (!pastedCsv || pastedCsv.trim().length === 0) {
          toast.error('Please paste voucher codes');
          return;
        }
        const res = await uploadRewardVouchers(reward.id, pastedCsv);
        const data = res?.data || res;
        const uploaded = data?.uploadedCount ?? data?.data?.uploadedCount ?? 0;
        const dupes = data?.duplicateCount ?? data?.data?.duplicateCount ?? 0;
        toast.success(`Vouchers uploaded: ${uploaded}. Duplicates ignored: ${dupes}.`);
        // Refresh available stock display
        try {
          const stockRes = await getRewardAvailableStock(reward.id);
          const info = stockRes?.data || stockRes;
          setInventoryInfo({ mode: info?.inventoryMode || 'voucher', available: info?.availableCount ?? inventoryInfo.available });
        } catch (_) {}
        // Clear inputs
        setVoucherPasteText('');
      } catch (error) {
        ErrorHandler.handle(error, 'Failed to upload vouchers');
      } finally {
        setUploading(false);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setSaving(true);
        const payload = {
          name: formData.title,
          description: formData.description,
          pointsCost: parseInt(formData.pointsCost || 0),
          cashValue: parseFloat(formData.value || 0),
          validUntil: formData.expiryDate || null,
          isActive: formData.status === 'active'
        };
        payload.stockQuantity = parseInt(formData.totalAvailable || 0);
        await updateReward(reward.id, payload);
        toast.success('Reward updated successfully');
        await fetchRewards();
        await fetchStats();
        onClose();
      } catch (error) {
        ErrorHandler.handle(error, 'Failed to update reward');
      } finally {
        setSaving(false);
      }
    };

    if (!reward) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 sm:top-20 mx-auto admin-padding-responsive border border-gray-200 w-full max-w-lg shadow-lg rounded-lg bg-white admin-modal">
          <div className="mt-3">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="admin-subtitle font-medium text-gray-900 admin-text-responsive min-w-0 truncate">Edit Reward</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 admin-touch-target flex-shrink-0 p-1">×</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-spacing-xs">
              <div className="admin-card p-4 space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="admin-input" />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="admin-input" />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Type</label>
                  <input type="text" value="Gift Card" readOnly className="admin-input bg-gray-50" />
                  <p className="text-[10px] text-gray-500">All rewards are Gift Cards. Voucher codes manage availability.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Value (₹)</label>
                    <input type="number" required min="0" step="0.01" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className="admin-input" />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Points Cost</label>
                    <input type="number" required min="1" value={formData.pointsCost} onChange={(e) => setFormData({ ...formData, pointsCost: e.target.value })} className="admin-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Total Available</label>
                    <input type="number" min="1" value={formData.totalAvailable} onChange={(e) => setFormData({ ...formData, totalAvailable: e.target.value })} className="admin-input" />
                    <div className="text-[10px] text-gray-600 mt-1">
                      <span>Available vouchers: {inventoryInfo.available ?? '—'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Expiry Date (Optional)</label>
                    <input type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} className="admin-input" />
                  </div>
                </div>

                

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="admin-input">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {isVoucherType && (
                  <div className="mt-2 border-t border-gray-100 pt-3">
                    <h4 className="text-xs font-semibold text-gray-800 mb-2">Add Vouchers</h4>
                    <p className="text-[10px] text-gray-500 mb-2">Paste codes (one per line). Existing codes are ignored; new codes are added and stock syncs automatically.</p>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-gray-700">Paste Codes</label>
                        <textarea
                          value={voucherPasteText}
                          onChange={(e) => setVoucherPasteText(e.target.value)}
                          rows={4}
                          placeholder="One code per line"
                          className="admin-input"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleUploadVouchers}
                          disabled={uploading || !voucherPasteText}
                          className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-60"
                        >
                          {uploading ? 'Uploading...' : 'Upload Vouchers'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3">
                <button type="button" onClick={onClose} className="px-4 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 w-full sm:w-auto">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto">{saving ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const filteredRewards = (Array.isArray(rewards) ? rewards : []).filter(reward => {
    // Safety check for reward object
    if (!reward || typeof reward !== 'object') {
      return false;
    }
    const matchesSearch = (reward.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (reward.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || reward.type === filterType;
    const matchesStatus = filterStatus === 'all' || reward.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="admin-container withdrawal-compact">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-header-content">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">Rewards Management</h1>
          <p className="text-xs text-gray-600">Manage rewards and track distribution</p>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto justify-center"
          >
            <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>Create Reward</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Rewards"
          value={stats.totalRewards || 0}
          icon={Gift}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Distributed"
          value={stats.totalDistributed || 0}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Total Value"
          value={`₹${(stats.totalValue || 0).toLocaleString()}`}
          icon={DollarSign}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Rewards"
          value={stats.activeRewards || 0}
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      {/* Filters and Search */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search rewards by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input search-input"
              />
            </div>
          </div>
          
          {/* Type Filter */}
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full">
            <SectionLoading message="Loading rewards..." />
          </div>
        ) : (
          filteredRewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">{reward.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{reward.description}</p>
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      {getTypeBadge(reward.type)}
                      {getStatusBadge(reward.status)}
                    </div>
                  </div>
                  <div className="relative ml-2 flex-shrink-0">
                    <button
                      onClick={() => setActionDropdown(actionDropdown === reward.id ? null : reward.id)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </button>
                    
                    {actionDropdown === reward.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                        <button
                          onClick={() => {
                            setSelectedReward(reward);
                            setShowRewardModal(true);
                            setActionDropdown(null);
                          }}
                          className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="mr-2 h-3 w-3 flex-shrink-0" />
                          <span>View Details</span>
                        </button>
                        {reward.type !== 'gift_card' && (
                          <button
                            onClick={() => {
                              setSelectedReward(reward);
                              fetchRedemptions(reward.id);
                              setShowRedemptionsModal(true);
                              setActionDropdown(null);
                            }}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                          >
                            <UserCheck className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span>View Redemptions</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedReward(reward);
                            setShowEditModal(true);
                            setActionDropdown(null);
                          }}
                          className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="mr-2 h-3 w-3 flex-shrink-0" />
                          <span>Edit</span>
                        </button>
                        {reward.status === 'inactive' ? (
                          <button
                            onClick={() => handleRewardAction('activate', reward.id)}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                          >
                            <TrendingUp className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span>Activate</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRewardAction('deactivate', reward.id)}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                          >
                            <TrendingUp className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span>Deactivate</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const hasPending = Number(reward.pendingRedemptions || 0) > 0;
                            if (hasPending) {
                              toast.error('Cannot delete reward with pending redemptions. Deactivate instead.');
                              return;
                            }
                            handleRewardAction('delete', reward.id);
                          }}
                          className={`flex items-center w-full px-3 py-1.5 text-xs ${Number(reward.pendingRedemptions || 0) > 0 ? 'text-red-300 cursor-not-allowed' : 'text-red-700 hover:bg-red-50'}`}
                        >
                          <Trash2 className="mr-2 h-3 w-3 flex-shrink-0" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-medium text-green-600">${reward.value}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Points Cost:</span>
                    <span className="font-medium">{reward.pointsCost} pts</span>
                  </div>
                  
                  
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Availability:</span>
                      <span className="font-medium">{reward.totalClaimed}/{reward.totalAvailable}</span>
                    </div>
                    {getAvailabilityBar(reward.totalClaimed, reward.totalAvailable)}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 pt-2 border-t border-gray-200 gap-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>{new Date(reward.createdDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedReward(reward);
                        setShowRewardModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1"
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reward Details Modal */}
      {showRewardModal && (
        <RewardModal
          reward={selectedReward}
          onClose={() => {
            setShowRewardModal(false);
            setSelectedReward(null);
          }}
        />
      )}

      {/* Create Reward Modal */}
      {showCreateModal && (
        <CreateRewardModal
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Edit Reward Modal */}
      {showEditModal && (
        <EditRewardModal
          reward={selectedReward}
          onClose={() => {
            setShowEditModal(false);
            setSelectedReward(null);
          }}
        />
      )}

      {/* Redemptions Modal */}
      {showRedemptionsModal && (
        <RedemptionsModal
          reward={selectedReward}
          redemptions={redemptions}
          loading={redemptionsLoading}
          onClose={() => {
            setShowRedemptionsModal(false);
            setSelectedReward(null);
            setRedemptions([]);
          }}
        />
      )}
    </div>
  );
};

export default RewardsManagement;
