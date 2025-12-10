import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, Check, X, User, CreditCard, DollarSign, Clock, TrendingUp, AlertTriangle, MoreVertical } from 'lucide-react';
import { SectionLoading, LoadingButton } from '../components/StandardizedLoading';
import { SuccessHandler, createAsyncHandler, ErrorHandler } from '../utils/errorHandler';
import { getWithdrawals, getWithdrawalStats, approveWithdrawal, rejectWithdrawal, getAllRewardRedemptions, updateRedemptionStatus, getRewardAvailableStock, syncRewardStock } from '../services/api';

const WithdrawalManagement = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(null);
  const [stats, setStats] = useState({
    totalWithdrawals: 0,
    pendingAmount: 0,
    approvedAmount: 0,
    rejectedCount: 0
  });

  const [redemptions, setRedemptions] = useState([]);
  const [redemptionsLoading, setRedemptionsLoading] = useState(true);
  const [redemptionsStatusFilter, setRedemptionsStatusFilter] = useState('pending');
  // Simplified approval: no manual code or delivery method selection
  
  const [rewardStock, setRewardStock] = useState({}); // { [rewardId]: stockQuantity }

  useEffect(() => {
    fetchWithdrawals();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchRedemptions();
  }, [redemptionsStatusFilter]);

  const fetchWithdrawals = createAsyncHandler(
    async () => {
      const response = await getWithdrawals();
      const withdrawals = response.data?.withdrawals || [];
      
      // Map the backend data structure to frontend expected format
      const mappedWithdrawals = withdrawals.map(withdrawal => ({
        ...withdrawal,
        userName: withdrawal.User ? `${withdrawal.User.firstName} ${withdrawal.User.lastName}` : 'Unknown User',
        userEmail: withdrawal.User?.email || 'No email'
      }));
      
      setWithdrawals(mappedWithdrawals);
    },
    {
      loadingState: setLoading,
      errorContext: 'fetching withdrawals',
      showErrorToast: true
    }
  );

  const fetchRedemptions = createAsyncHandler(
    async () => {
      const response = await getAllRewardRedemptions({ status: redemptionsStatusFilter === 'all' ? '' : redemptionsStatusFilter });
      const list = response.data?.redemptions || [];
      setRedemptions(list);
      // Prefetch stock quantities for displayed rewards
      try {
        const ids = Array.from(new Set(list.map(r => r.rewardId).filter(Boolean)));
        if (ids.length > 0) {
          const results = await Promise.all(ids.map(async (id) => {
            try {
              const stockRes = await getRewardAvailableStock(id);
              const info = stockRes?.data || stockRes;
              const stock = info?.availableCount ?? info?.data?.availableCount ?? undefined;
              return [id, stock];
            } catch (e) {
              console.warn('Failed to fetch reward details for', id, e);
              return [id, undefined];
            }
          }));
          setRewardStock(prev => {
            const next = { ...prev };
            results.forEach(([id, stock]) => { next[id] = stock; });
            return next;
          });
        }
      } catch (e) {
        // Non-blocking; stock badges will show as unknown if this fails
      }
    },
    {
      loadingState: setRedemptionsLoading,
      errorContext: 'fetching redemptions',
      showErrorToast: true
    }
  );

  const fetchStats = createAsyncHandler(
    async () => {
      const response = await getWithdrawalStats();
      const overview = response.data?.overview || {};
      setStats({
        totalWithdrawals: overview.totalRequests || 0,
        pendingAmount: overview.pendingAmount || 0,
        approvedAmount: overview.approvedAmount || 0,
        rejectedCount: overview.rejectedRequests || 0
      });
    },
    {
      errorContext: 'fetching withdrawal statistics',
      showErrorToast: true
    }
  );

  const handleWithdrawalAction = createAsyncHandler(
    async (action, withdrawalId, notes = '') => {
      if (action === 'approve') {
        await approveWithdrawal(withdrawalId, notes);
      } else if (action === 'reject') {
        await rejectWithdrawal(withdrawalId, notes);
      }
      SuccessHandler.show(`Withdrawal ${action}d successfully`);
      await fetchWithdrawals();
      await fetchStats();
      setActionDropdown(null);
    },
    {
      errorContext: 'updating withdrawal',
      showErrorToast: true
    }
  );

  const approveRedemption = createAsyncHandler(
    async (redemption) => {
      try {
        // For voucher/gift_card rewards, pre-check available vouchers to avoid 400s
        if (redemption?.Reward?.type && ['gift_card', 'voucher'].includes(redemption.Reward.type)) {
          try {
            const stockRes = await getRewardAvailableStock(redemption.rewardId);
            const rewardInfo = stockRes?.data || stockRes;
            const stock = rewardInfo?.availableCount ?? rewardInfo?.data?.availableCount;
            const hasNumericStock = typeof stock === 'number';
            if (hasNumericStock && stock <= 0) {
              ErrorHandler.handle(new Error('No available vouchers for this reward'), 'approving redemption');
              return;
            }
            // If stock unknown or fetch fails, let server validate
          } catch (e) {
            // Non-blocking on pre-check failure; proceed
          }
        }

        // Try auto-assignment from available voucher pool
        await updateRedemptionStatus(redemption.id, { status: 'delivered' });
        
        SuccessHandler.show('Redemption approved – voucher assigned');
        fetchRedemptions();
      } catch (err) {
        // Handle 400s gracefully: show server message, refresh stock badge, and avoid overlay crash
        const serverMessage = err?.response?.data?.message || err?.message || 'Approval failed';
        ErrorHandler.handle(err, 'approving redemption', { showToast: true, fallbackMessage: serverMessage });
        // Attempt to resync stock for this reward, so the badge reflects reality
        if (redemption?.rewardId) {
          try {
            await syncRewardStock(redemption.rewardId);
            const stockRes = await getRewardAvailableStock(redemption.rewardId);
            const rewardInfo = stockRes?.data || stockRes;
            const stock = rewardInfo?.availableCount ?? rewardInfo?.data?.availableCount ?? undefined;
            setRewardStock(prev => ({ ...prev, [redemption.rewardId]: stock }));
          } catch (_) {
            // ignore
          }
        }
        // Don't rethrow; let the UI remain interactive
        return;
      }
    },
    {
      errorContext: 'approving redemption',
      showErrorToast: true
    }
  );

  const rejectRedemption = createAsyncHandler(
    async (id) => {
      await updateRedemptionStatus(id, { status: 'cancelled' });
      SuccessHandler.show('Redemption cancelled');
      fetchRedemptions();
    },
    {
      errorContext: 'rejecting redemption',
      showErrorToast: true
    }
  );

  // Removed Connect QWERT feature per UI requirement



  const exportWithdrawalsCSV = () => {
    const csvContent = [
      ['ID', 'User', 'Email', 'Amount', 'Method', 'Status', 'Request Date', 'Processed Date'].join(','),
      ...filteredWithdrawals.map(w => [
        w.id,
        w.userName,
        w.userEmail,
        '₹' + w.amount,
        w.method,
        w.status,
        new Date(w.requestDate).toLocaleDateString(),
        w.processedDate ? new Date(w.processedDate).toLocaleDateString() : 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'withdrawals.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    // Add null/undefined check to prevent filter errors
    if (!withdrawal || typeof withdrawal !== 'object') {
      console.warn('Invalid withdrawal data received:', withdrawal);
      return false;
    }
    
    const matchesSearch = (withdrawal.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (withdrawal.userEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (withdrawal.id || '').toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || withdrawal.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || withdrawal.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: Check },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: X },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800', icon: TrendingUp }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getMethodBadge = (method) => {
    const methodConfig = {
      paypal: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'PayPal' },
      bank_transfer: { bg: 'bg-green-100', text: 'text-green-800', label: 'Bank Transfer' },
      crypto: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Cryptocurrency' },
      gift_card: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Gift Card' }
    };
    
    const config = methodConfig[method] || { bg: 'bg-gray-100', text: 'text-gray-800', label: method };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getRedemptionStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      processing: { bg: 'bg-blue-100 text-blue-800', label: 'Processing' },
      delivered: { bg: 'bg-green-100 text-green-800', label: 'Delivered' },
      expired: { bg: 'bg-gray-100 text-gray-800', label: 'Expired' },
      cancelled: { bg: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    const cfg = statusConfig[status] || statusConfig.pending;
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg}`}>{cfg.label}</span>;
  };

  const WithdrawalModal = ({ withdrawal, onClose }) => {
    const [notes, setNotes] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [processing, setProcessing] = useState(false);
    const [actionType, setActionType] = useState(null);

    const handleAction = async (action) => {
      if (action === 'reject' && !rejectionReason.trim()) {
        alert('Please provide a rejection reason');
        return;
      }
      
      setProcessing(true);
      try {
        if (action === 'approve') {
          await handleWithdrawalAction(action, withdrawal.id, notes);
        } else if (action === 'reject') {
          await handleWithdrawalAction(action, withdrawal.id, rejectionReason, notes);
        }
        setProcessing(false);
        onClose();
      } catch (error) {
        setProcessing(false);
        console.error('Action failed:', error);
      }
    };

    const confirmAction = (action) => {
      setActionType(action);
    };

    const cancelAction = () => {
      setActionType(null);
      setRejectionReason('');
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-6 border border-gray-200 w-11/12 max-w-2xl shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Withdrawal Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* User Information */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">User Profile</h3>
                  <p className="text-sm text-gray-600">Withdrawal request details</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                    <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{withdrawal.userName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
                    <p className="text-lg font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-md break-all">{withdrawal.userEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Withdrawal Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">Amount</label>
                <p className="text-2xl font-bold text-green-600">₹{withdrawal.amount}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <div className="mt-1">{getStatusBadge(withdrawal.status)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Method</label>
                <div className="mt-1">{getMethodBadge(withdrawal.method)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Request Date</label>
                <p className="font-medium">{new Date(withdrawal.requestDate).toLocaleString()}</p>
              </div>
            </div>

            {/* Bank Account Details */}
            {withdrawal.bankDetails && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Bank Account Details</h3>
                    <p className="text-sm text-gray-600">Payment destination information</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account Holder Name</label>
                      <p className="text-lg font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{withdrawal.bankDetails.accountHolderName}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account Number</label>
                      <p className="text-lg font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded-md">{withdrawal.bankDetails.accountNumber}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">IFSC Code</label>
                      <p className="text-lg font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded-md">{withdrawal.bankDetails.ifscCode}</p>
                    </div>
                    {withdrawal.bankDetails.capturedAt && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Details Captured</label>
                        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">{new Date(withdrawal.bankDetails.capturedAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Method Details */}
            <div>
              <label className="text-sm text-gray-600">Payment Details</label>
              <p className="font-medium bg-gray-50 p-3 rounded">{withdrawal.methodDetails}</p>
            </div>

            {/* Processing Information */}
            {(withdrawal.processedDate || withdrawal.processedBy) && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Processing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {withdrawal.processedDate && (
                    <div>
                      <label className="text-sm text-gray-600">Processed Date</label>
                      <p className="font-medium">{new Date(withdrawal.processedDate).toLocaleString()}</p>
                    </div>
                  )}
                  {withdrawal.processedBy && (
                    <div>
                      <label className="text-sm text-gray-600">Processed By</label>
                      <p className="font-medium">{withdrawal.processedBy}</p>
                    </div>
                  )}
                </div>
                {withdrawal.transactionId && (
                  <div className="mt-3">
                    <label className="text-sm text-gray-600">Transaction ID</label>
                    <p className="font-medium font-mono">{withdrawal.transactionId}</p>
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            {withdrawal.notes && (
              <div>
                <label className="text-sm text-gray-600">Notes</label>
                <p className="bg-gray-50 p-3 rounded">{withdrawal.notes}</p>
              </div>
            )}

            {/* Action Section for Pending Withdrawals */}
            {withdrawal.status === 'pending' && (
              <div className="border-t pt-4">
                {!actionType ? (
                  <>
                    <label className="text-xs text-gray-600">Admin Notes (Optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full mt-1 px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Add optional notes for this action..."
                    />
                    
                    <div className="flex space-x-3 mt-3">
                      <button
                        onClick={() => confirmAction('approve')}
                        className="flex-1 bg-green-600 text-white px-3 py-2 text-sm rounded-md hover:bg-green-700 flex items-center justify-center"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => confirmAction('reject')}
                        className="flex-1 bg-red-600 text-white px-3 py-2 text-sm rounded-md hover:bg-red-700 flex items-center justify-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  </>
                ) : actionType === 'approve' ? (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-green-800 mb-2">Confirm Approval</h4>
                    <p className="text-xs text-green-700 mb-3">Are you sure you want to approve this withdrawal request for ₹{withdrawal.amount}?</p>
                    <div className="flex space-x-2">
                      <LoadingButton
                        onClick={() => handleAction('approve')}
                        loading={processing}
                        className="bg-green-600 text-white px-4 py-2 text-xs rounded-md hover:bg-green-700"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Confirm Approval
                      </LoadingButton>
                      <button
                        onClick={cancelAction}
                        className="bg-gray-300 text-gray-700 px-4 py-2 text-xs rounded-md hover:bg-gray-400"
                        disabled={processing}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Reject Withdrawal</h4>
                    <p className="text-xs text-red-700 mb-3">Please provide a reason for rejecting this withdrawal request:</p>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full mt-1 px-2 py-1.5 text-xs border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter rejection reason (required)..."
                      required
                    />
                    <div className="flex space-x-2 mt-3">
                      <LoadingButton
                        onClick={() => handleAction('reject')}
                        loading={processing}
                        className="bg-red-600 text-white px-4 py-2 text-xs rounded-md hover:bg-red-700"
                        disabled={!rejectionReason.trim()}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Confirm Rejection
                      </LoadingButton>
                      <button
                        onClick={cancelAction}
                        className="bg-gray-300 text-gray-700 px-4 py-2 text-xs rounded-md hover:bg-gray-400"
                        disabled={processing}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container withdrawal-compact">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-content">
          <h1 className="text-base sm:text-lg font-bold text-gray-900">Withdrawal Management</h1>
          <p className="text-xs text-gray-600">Manage user withdrawal requests and payments</p>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={exportWithdrawalsCSV}
            className="admin-button-secondary flex items-center justify-center sm:justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-grid admin-grid-2 lg:admin-grid-4 mb-3">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-secondary">Total Withdrawals</p>
              <p className="text-2xl font-bold">{stats.totalWithdrawals}</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-secondary">Pending Amount</p>
              <p className="text-2xl font-bold">₹{stats.pendingAmount}</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-secondary">Approved Amount</p>
              <p className="text-2xl font-bold">₹{stats.approvedAmount}</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-secondary">Rejected</p>
              <p className="text-2xl font-bold">{stats.rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-secondary mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by user, email, or ID..."
                className="admin-input search-input"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-secondary mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-input"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="processing">Processing</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-secondary mb-2">Method</label>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="admin-input"
            >
              <option value="all">All Methods</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="gift_card">Gift Card</option>
            </select>
          </div>
        </div>
      </div>

      {/* Withdrawals Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <SectionLoading message="Loading withdrawals..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">User</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Amount</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Bank Details</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Method</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Request Date</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Processing Info</th>
                  <th className="px-2 sm:px-4 py-2 text-right text-xs font-medium text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWithdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No withdrawals found
                    </td>
                  </tr>
                ) : (
                  filteredWithdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-3 user-profile">
                        <div className="user-profile-container">
                          <div className="user-avatar bg-gradient-to-r from-blue-500 to-purple-600">
                            <User className="h-3 w-3 text-white" />
                          </div>
                          <div className="user-info">
                            <div className="user-name" title={withdrawal.userName}>{withdrawal.userName}</div>
                            <div className="user-email" title={withdrawal.userEmail}>{withdrawal.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-left whitespace-nowrap">
                        <div className="text-xs font-medium">₹{withdrawal.amount}</div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-left bank-details">
                        {withdrawal.bankDetails ? (
                          <div className="bg-green-50 rounded border border-green-200 p-1 sm:p-2">
                            <div className="flex items-center space-x-1 mb-1">
                              <CreditCard className="h-3 w-3 text-green-600 flex-shrink-0" />
                              <span className="font-medium text-green-800 text-xs truncate">{withdrawal.bankDetails.bankName}</span>
                            </div>
                            <div className="font-mono text-gray-600 truncate text-xs" title={withdrawal.bankDetails.accountNumber}>
                              ****{withdrawal.bankDetails.accountNumber?.slice(-4) || 'N/A'}
                            </div>
                            <div className="font-mono text-gray-600 text-xs truncate">
                              {withdrawal.bankDetails.ifscCode}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">No bank details</span>
                        )}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-left whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full text-xs font-medium status-badge px-2 py-1 ${
                          withdrawal.method === 'bank_transfer' ? 'bg-blue-100 text-blue-800' :
                          withdrawal.method === 'upi' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {withdrawal.method === 'bank_transfer' ? 'Bank' :
                           withdrawal.method === 'upi' ? 'UPI' :
                           withdrawal.method}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-left whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full text-xs font-medium status-badge px-2 py-1 ${
                          withdrawal.status === 'approved' ? 'bg-green-100 text-green-800' :
                          withdrawal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-left whitespace-nowrap text-xs text-secondary">
                        <div className="text-xs">{new Date(withdrawal.requestDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-left whitespace-nowrap text-xs text-secondary">
                        {withdrawal.status === 'approved' && withdrawal.approvedAt && (
                          <div className="space-y-1">
                            <div className="text-xs text-green-600 font-medium">
                              Approved: {new Date(withdrawal.approvedAt).toLocaleDateString()}
                            </div>
                            {withdrawal.ApprovedByAdmin && (
                              <div className="text-xs text-gray-500">
                                By: {withdrawal.ApprovedByAdmin.firstName} {withdrawal.ApprovedByAdmin.lastName}
                              </div>
                            )}
                          </div>
                        )}
                        {withdrawal.status === 'rejected' && withdrawal.rejectedAt && (
                          <div className="space-y-1">
                            <div className="text-xs text-red-600 font-medium">
                              Rejected: {new Date(withdrawal.rejectedAt).toLocaleDateString()}
                            </div>
                            {withdrawal.RejectedByAdmin && (
                              <div className="text-xs text-gray-500">
                                By: {withdrawal.RejectedByAdmin.firstName} {withdrawal.RejectedByAdmin.lastName}
                              </div>
                            )}
                          </div>
                        )}
                        {withdrawal.status === 'pending' && (
                          <div className="text-xs text-yellow-600">
                            Awaiting review
                          </div>
                        )}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                          <button
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setShowWithdrawalModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 action-button rounded hover:bg-blue-50 p-1 sm:p-2"
                            title="View Details"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          
                          {/* Dropdown for actions */}
                          <div className="relative">
                            <button
                              onClick={() => setActionDropdown(actionDropdown === withdrawal.id ? null : withdrawal.id)}
                              className="text-gray-400 hover:text-gray-600 action-button rounded hover:bg-gray-50 p-1 sm:p-2"
                            >
                              <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            
                            {actionDropdown === withdrawal.id && (
                              <div className="absolute right-0 mt-1 w-36 sm:w-32 bg-white rounded shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      setSelectedWithdrawal(withdrawal);
                                      setShowWithdrawalModal(true);
                                      setActionDropdown(null);
                                    }}
                                    className="flex items-center w-full action-button text-gray-700 hover:bg-gray-100 px-3 py-2 text-sm"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </button>
                                  {withdrawal.status === 'pending' && (
                                    <>
                                      <button
                                        onClick={() => handleWithdrawalAction('approve', withdrawal.id)}
                                        className="flex items-center w-full action-button text-green-700 hover:bg-green-50 px-3 py-2 text-sm"
                                      >
                                        <Check className="mr-2 h-4 w-4" />
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => handleWithdrawalAction('reject', withdrawal.id)}
                                        className="flex items-center w-full action-button text-red-700 hover:bg-red-50 px-3 py-2 text-sm"
                                      >
                                        <X className="mr-2 h-4 w-4" />
                                        Reject
                                      </button>
                                    </>
                                  )}
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
        )}
      </div>

      {/* Gift Card Redemptions */}
      <div className="admin-card mt-6">
        <div className="admin-page-header">
          <div className="admin-header-content">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Gift Card Redemptions</h2>
            <p className="text-xs text-gray-600">Approve or reject gift card voucher issuance</p>
          </div>
          <div className="admin-header-actions">
            <select
              value={redemptionsStatusFilter}
              onChange={(e) => setRedemptionsStatusFilter(e.target.value)}
              className="admin-input"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        {redemptionsLoading ? (
          <SectionLoading message="Loading redemptions..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">User</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Reward</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Date</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Points</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-secondary uppercase tracking-wider">Code</th>
                  <th className="px-2 sm:px-4 py-2 text-right text-xs font-medium text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {redemptions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">No redemptions found</td>
                  </tr>
                ) : (
                  redemptions.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-3 text-xs">
                        {r.User ? `${r.User.firstName} ${r.User.lastName}` : 'Unknown'}<div className="text-secondary">{r.User?.email || ''}</div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs">
                        {r.Reward ? r.Reward.name : ''}
                        {(() => {
                          const stock = rewardStock[r.rewardId];
                          const badgeClass = stock == null
                            ? 'bg-gray-100 text-gray-700'
                            : stock > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800';
                          return (
                            <span
                              className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${badgeClass}`}
                              title={stock == null ? 'Stock unknown' : `Stock: ${stock}`}
                            >
                              Stock: {stock == null ? '—' : stock}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs">
                        {r.pointsSpent}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs">
                        {getRedemptionStatusBadge(r.status)}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs font-mono">
                        {r.voucherCode || 'N/A'}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => approveRedemption(r)}
                            disabled={typeof rewardStock[r.rewardId] === 'number' && rewardStock[r.rewardId] <= 0}
                            title={typeof rewardStock[r.rewardId] === 'number' && rewardStock[r.rewardId] <= 0 ? 'No vouchers available' : 'Approve redemption'}
                            className={`px-3 py-1.5 text-xs rounded-md text-white ${
                              typeof rewardStock[r.rewardId] === 'number' && rewardStock[r.rewardId] <= 0
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                          >
                            Approve
                          </button>
                          {/* Connect QWERT button removed */}
                          <button onClick={() => rejectRedemption(r.id)} className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-md hover:bg-red-700">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdrawal Details Modal */}
      {showWithdrawalModal && (
        <WithdrawalModal
          withdrawal={selectedWithdrawal}
          onClose={() => {
            setShowWithdrawalModal(false);
            setSelectedWithdrawal(null);
          }}
        />
      )}
    </div>
  );
};

export default WithdrawalManagement;
