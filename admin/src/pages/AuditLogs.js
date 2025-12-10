import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { PageLoading, SectionLoading, ErrorState, LoadingButton } from '../components/StandardizedLoading';
import { ErrorHandler, SuccessHandler, createAsyncHandler } from '../utils/errorHandler';
import {
  getAuditLogs,
  getAuditLogStats,
  exportAuditLogs
} from '../services/api';

const AuditLogs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(20);
  const [filters, setFilters] = useState({
    action: '',
    user: '',
    dateFrom: '',
    dateTo: '',
    level: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    totalLogs: 0,
    todayLogs: 0,
    errorLogs: 0,
    warningLogs: 0
  });

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, filters]);

  const fetchLogs = createAsyncHandler(
    async () => {
      const response = await getAuditLogs();
      return response.logs || [];
    },
    {
      onSuccess: (data) => {
        setLogs(data);
      },
      onError: (error) => {
        console.error('Failed to fetch audit logs:', error);
        setLogs([]);
        ErrorHandler.show('Failed to load audit logs. Please try again.');
      },
      loadingState: [loading, setLoading],
      fallbackData: []
    }
  );

  const fetchStats = createAsyncHandler(
    async () => {
      const response = await getAuditLogStats();
      return response.stats;
    },
    {
      onSuccess: (data) => {
        setStats(data || stats);
      },
      fallbackData: stats
    }
  );

  const filterLogs = () => {
    let filtered = logs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm)
      );
    }

    // Action filter
    if (filters.action) {
      filtered = filtered.filter(log => log.action === filters.action);
    }

    // User filter
    if (filters.user) {
      filtered = filtered.filter(log => 
        log.user.toLowerCase().includes(filters.user.toLowerCase())
      );
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) <= new Date(filters.dateTo + 'T23:59:59')
      );
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter(log => log.level === filters.level);
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const exportLogs = createAsyncHandler(
    async () => {
      const response = await exportAuditLogs(filters);
      
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return 'Export completed successfully';
    },
    {
      onSuccess: () => {
        SuccessHandler.show('Audit logs exported successfully');
      }
    }
  );

  const clearFilters = () => {
    setFilters({
      action: '',
      user: '',
      dateFrom: '',
      dateTo: '',
      level: ''
    });
    setSearchTerm('');
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-primary-500" />;
    }
  };

  const getLevelBadge = (level) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (level) {
      case 'error':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-primary-100 text-primary-800`;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  if (loading) {
    return <PageLoading message="Loading audit logs..." />;
  }

  return (
    <div className="admin-container withdrawal-compact">
      {/* Header */}
      <div className="admin-container">
        <div className="admin-section">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Audit Logs</h1>
              <p className="text-secondary mt-1">Monitor system activities and user actions</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchLogs}
                className="admin-button-secondary mr-3"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={exportLogs}
                className="admin-button-primary"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-grid-4 admin-section">
        <div className="stat-card">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary">Total Logs</p>
              <p className="text-2xl font-bold">{stats.totalLogs.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary">Today's Logs</p>
              <p className="text-2xl font-bold">{stats.todayLogs.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary">Error Logs</p>
              <p className="text-2xl font-bold">{stats.errorLogs.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary">Warning Logs</p>
              <p className="text-2xl font-bold">{stats.warningLogs.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-card">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1 w-full">
              <div className="relative flex-1 max-w-full sm:max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search logs by action, user, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-input search-input"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center w-full sm:w-auto"
                >
                  <Filter className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>Filters</span>
                </button>
                {(searchTerm || Object.values(filters).some(f => f)) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 text-xs text-red-600 hover:text-red-800 flex items-center justify-center w-full sm:w-auto"
                  >
                    <X className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">Action</label>
                <select
                  value={filters.action}
                  onChange={(e) => setFilters({...filters, action: e.target.value})}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Actions</option>
                  <option value="USER_LOGIN">User Login</option>
                  <option value="USER_LOGOUT">User Logout</option>
                  <option value="SURVEY_COMPLETED">Survey Completed</option>
                  <option value="REWARD_CLAIMED">Reward Claimed</option>
                  <option value="ADMIN_ACTION">Admin Action</option>
                  <option value="SYSTEM_ERROR">System Error</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">User</label>
                <input
                  type="text"
                  placeholder="Filter by user"
                  value={filters.user}
                  onChange={(e) => setFilters({...filters, user: e.target.value})}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">From Date</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">To Date</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => setFilters({...filters, level: e.target.value})}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Logs Table */}
      <div className="admin-card overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider admin-text-responsive">
                  Timestamp
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider admin-text-responsive">
                  User
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider admin-text-responsive">
                  Action
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider admin-text-responsive">
                  Description
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider admin-text-responsive">
                  Level
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider admin-text-responsive">
                  IP Address
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider admin-text-responsive">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 text-sm admin-text-responsive">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm admin-text-responsive">
                    {log.user}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm admin-text-responsive">
                    {log.action}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm admin-text-responsive">
                    {log.description}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm">
                    <div className="flex items-center">
                      {getLevelIcon(log.level)}
                      <span className={`ml-2 ${getLevelBadge(log.level)}`}>
                        {log.level}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm admin-text-responsive">
                    {log.ipAddress}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm font-medium text-right">
                    <button
                      onClick={() => {
                        setSelectedLog(log);
                        setShowDetailModal(true);
                      }}
                      className="text-primary-600 hover:text-primary-900 inline-flex items-center admin-touch-target px-2 py-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {currentLogs.map((log) => (
            <div key={log.id} className="bg-white border border-gray-200 rounded-lg p-4 admin-card-mobile">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium admin-text-responsive truncate">{log.action}</div>
                  <div className="text-xs text-secondary admin-text-responsive">
                    {formatTimestamp(log.timestamp)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="flex items-center">
                    {getLevelIcon(log.level)}
                    <span className={`ml-2 ${getLevelBadge(log.level)}`}>
                      {log.level}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedLog(log);
                      setShowDetailModal(true);
                    }}
                    className="text-primary-600 hover:text-primary-900 admin-touch-target px-2 py-1 text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-secondary admin-text-responsive">User:</span>
                  <span className="ml-2 font-medium admin-text-responsive">{log.user}</span>
                </div>
                <div>
                  <span className="text-secondary admin-text-responsive">Description:</span>
                  <span className="ml-2 admin-text-responsive break-words">{log.description}</span>
                </div>
                <div>
                  <span className="text-secondary admin-text-responsive">IP Address:</span>
                  <span className="ml-2 font-mono text-xs admin-text-responsive">{log.ipAddress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 admin-touch-target"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 admin-touch-target"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-secondary admin-text-responsive">
                  Showing <span className="font-medium">{indexOfFirstLog + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastLog, filteredLogs.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredLogs.length}</span> audit logs
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 admin-touch-target"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium admin-touch-target ${
                          currentPage === pageNumber
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 admin-touch-target"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border border-gray-200 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Audit Log Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-secondary hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary">Timestamp</label>
                  <p className="text-sm">{formatTimestamp(selectedLog.timestamp)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary">Level</label>
                  <div className="flex items-center mt-1">
                    {getLevelIcon(selectedLog.level)}
                    <span className={`ml-2 ${getLevelBadge(selectedLog.level)}`}>
                      {selectedLog.level}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">User</label>
                  <p className="text-sm text-gray-900">{selectedLog.user}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Action</label>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {selectedLog.action}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-900">{selectedLog.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">IP Address</label>
                  <p className="text-sm text-gray-900">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">User Agent</label>
                  <p className="text-sm text-gray-900 truncate" title={selectedLog.userAgent}>
                    {selectedLog.userAgent}
                  </p>
                </div>
              </div>
              
              {selectedLog.details && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;