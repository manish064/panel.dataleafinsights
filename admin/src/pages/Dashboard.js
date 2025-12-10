import React, { useState, useEffect } from 'react';
import { Users, FileText, Gift, DollarSign, TrendingUp, TrendingDown, Activity, Clock, RefreshCw, Calendar } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';

import { PageLoading, ErrorState, RefreshLoading } from '../components/StandardizedLoading';
import { ErrorHandler, SuccessHandler } from '../utils/errorHandler';
// Remove axios import and use centralized API
import {
  getDashboardStats,
  getUserRegistrationsChart,
  getSurveyCompletionsChart,
  getRewardDistributionChart,
  getRecentActivity,
  getSystemHealth,
  getTopSurveys,
  getTopRewards
} from '../services/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchDashboardStats(true);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [period]);

  const fetchDashboardStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Fetch all dashboard data in parallel via api service
      const [statsRes, userChartRes, surveyChartRes, rewardDistRes, recentActivityRes, systemHealthRes, topSurveysRes, topRewardsRes] = await Promise.all([
        getDashboardStats({ period }),
        getUserRegistrationsChart({ period }),
        getSurveyCompletionsChart({ period }),
        getRewardDistributionChart(),
        getRecentActivity({ limit: 8 }),
        getSystemHealth(),
        getTopSurveys({ limit: 5 }),
        getTopRewards({ limit: 5 })
      ]);
      
      const statsData = statsRes.data;
      const userChartData = userChartRes.data.chartData;
      const surveyChartData = surveyChartRes.data.chartData;
      const rewardDistData = rewardDistRes.data.chartData;
      const recentActivity = recentActivityRes.data.activities;
      const systemHealth = systemHealthRes.data;
      const topSurveys = topSurveysRes.data.surveys;
      const topRewards = topRewardsRes.data.rewards;
      
      // Transform data for charts
      const userRegistrationChart = {
        labels: userChartData.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [{
          label: 'New Users',
          data: userChartData.map(item => item.users),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      };
      
      const surveyCompletionChart = {
        labels: surveyChartData.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [{
          label: 'Completions',
          data: surveyChartData.map(item => item.completions),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1
        }]
      };
      
      const rewardDistributionChart = {
        labels: rewardDistData.map(item => item.type || 'Unknown'),
        datasets: [{
          data: rewardDistData.map(item => item.count),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(107, 114, 128, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(71, 85, 105, 0.8)',
            'rgba(156, 163, 175, 0.8)'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      };
      
      setStats({
        totalUsers: statsData.overview.totalUsers,
        totalSurveys: statsData.overview.totalSurveys,
        totalRewards: statsData.overview.totalRewards,
        totalWithdrawals: statsData.overview.pendingWithdrawals,
        userGrowth: statsData.growth.users.growth,
        surveyCompletion: statsData.growth.responses.growth,
        rewardDistribution: Math.round((statsData.revenue.totalPointsRedeemed / statsData.revenue.totalPointsEarned) * 100) || 0,
        withdrawalProcessing: statsData.overview.pendingWithdrawals,
        recentActivity: recentActivity.map(activity => ({
          id: activity.id,
          type: activity.action,
          description: activity.description,
          timestamp: activity.createdAt
        })),
        chartData: {
          userRegistrations: userRegistrationChart,
          surveyCompletions: surveyCompletionChart,
          rewardDistribution: rewardDistributionChart
        },
        systemHealth: {
          status: systemHealth.status,
          metrics: systemHealth.metrics
        },
        topSurveys: topSurveys || [],
        topRewards: topRewards || []
      });
      
      setError(null);
      if (isRefresh) {
        SuccessHandler.show('Dashboard data updated successfully');
      }
    } catch (err) {
      const { message } = ErrorHandler.handle(err, 'loading dashboard data', {
        showToast: isRefresh, // Only show toast on refresh, not initial load
        fallbackMessage: 'Failed to load dashboard statistics'
      });
      setError(message);
      
      // Fallback to mock data for development
      setStats({
        totalUsers: 1250,
        totalSurveys: 45,
        totalRewards: 320,
        totalWithdrawals: 89,
        userGrowth: 12.5,
        surveyCompletion: 78.3,
        rewardDistribution: 95.2,
        withdrawalProcessing: 24,
        recentActivity: [
          { id: 1, type: 'user_registration', description: 'New user registered', timestamp: '2024-01-15T10:30:00Z' },
          { id: 2, type: 'survey_completion', description: 'Survey completed by user', timestamp: '2024-01-15T10:25:00Z' },
          { id: 3, type: 'reward_claimed', description: 'Reward claimed', timestamp: '2024-01-15T10:20:00Z' },
          { id: 4, type: 'withdrawal_request', description: 'Withdrawal requested', timestamp: '2024-01-15T10:15:00Z' },
        ],
        chartData: {
          userRegistrations: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'New Users',
              data: [65, 78, 90, 81, 95, 105],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4
            }]
          },
          surveyCompletions: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Completions',
              data: [12, 19, 15, 25, 22, 18, 20],
              backgroundColor: 'rgba(34, 197, 94, 0.8)'
            }]
          },
          rewardDistribution: {
            labels: ['Gift Cards', 'Cash', 'Points', 'Vouchers'],
            datasets: [{
              data: [45, 25, 20, 10],
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(107, 114, 128, 0.8)',
                'rgba(239, 68, 68, 0.8)'
              ]
            }]
          }
        },
        systemHealth: {
          status: 'healthy',
          metrics: {
            errorLogs: 2,
            warningLogs: 5,
            totalLogs: 150,
            activeUsers: 45,
            uptime: 86400,
            memoryUsage: { rss: 50000000, heapTotal: 30000000, heapUsed: 20000000 }
          }
        },
        topSurveys: [
          { id: 1, title: 'Customer Satisfaction Survey', responseCount: 245, avgPoints: 15.5, status: 'active' },
          { id: 2, title: 'Product Feedback Survey', responseCount: 189, avgPoints: 12.3, status: 'active' },
          { id: 3, title: 'Market Research Survey', responseCount: 156, avgPoints: 18.7, status: 'active' }
        ],
        topRewards: [
          { id: 1, title: '₹10 Amazon Gift Card', redeemCount: 89, pointsCost: 1000, type: 'gift_card' },
          { id: 2, title: '₹5 Starbucks Card', redeemCount: 67, pointsCost: 500, type: 'gift_card' },
          { id: 3, title: 'PayPal Cash ₹20', redeemCount: 45, pointsCost: 2000, type: 'cash' }
        ]
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  const handleRefresh = () => {
    fetchDashboardStats(true);
  };
  
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };
  
  const getPeriodLabel = (periodValue) => {
    switch (periodValue) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      case '1y': return 'Last Year';
      default: return 'Last 30 Days';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="stat-card admin-touch-target p-4 sm:p-5 lg:p-6">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-xs sm:text-sm font-medium text-secondary mb-1 sm:mb-2">{title}</p>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 truncate leading-tight">{value}</p>
          {change && (
            <div className={`flex items-center mt-1 sm:mt-2 text-xs sm:text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' && <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />}
              <span className="font-medium">{change}%</span>
              <span className="text-secondary ml-1 hidden sm:inline">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-2 sm:p-2.5 lg:p-3 bg-blue-50 rounded-lg ml-2 sm:ml-3 flex-shrink-0">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-blue-600" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'user_registration': return <Users className="h-4 w-4" />;
        case 'survey_completion': return <FileText className="h-4 w-4" />;
        case 'reward_claimed': return <Gift className="h-4 w-4" />;
        case 'withdrawal_request': return <DollarSign className="h-4 w-4" />;
        default: return <Activity className="h-4 w-4" />;
      }
    };

    const getActivityColor = (type) => {
      switch (type) {
        case 'user_registration': return 'text-blue-600 bg-blue-50';
        case 'survey_completion': return 'text-green-600 bg-green-50';
        case 'reward_claimed': return 'text-gray-600 bg-gray-50';
        case 'withdrawal_request': return 'text-slate-600 bg-slate-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    return (
      <div className="flex items-center space-x-2 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 admin-touch-target">
        <div className={`p-1.5 rounded-full ${getActivityColor(activity.type)} flex-shrink-0`}>
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{activity.description}</p>
          <p className="text-xs text-secondary flex items-center mt-0.5">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{new Date(activity.timestamp).toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <PageLoading 
        title="Dashboard" 
        subtitle="Loading dashboard data..." 
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Unable to load dashboard data</p>
          </div>
          <ErrorState
            title="Dashboard Error"
            message={error}
            onRetry={handleRefresh}
            retryText="Reload Dashboard"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container withdrawal-compact">
        {/* Refresh Loading Overlay */}
        {refreshing && (
          <RefreshLoading message="Updating dashboard..." />
        )}
        
        {/* Page Header */}
        <div className="admin-section">
          <div className="admin-page-header">
            <div className="admin-header-content">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Dashboard</h1>
              <p className="text-xs text-gray-600">Overview and statistics</p>
            </div>
            <div className="admin-header-actions">
              {/* Period Selector */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-secondary flex-shrink-0" />
                <select
                  value={period}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  disabled={refreshing}
                  className="admin-input disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="admin-button-primary compact disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                <span className="sm:hidden">{refreshing ? 'Updating...' : 'Update'}</span>
              </button>
            </div>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 admin-section">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={stats.userGrowth}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Active Surveys"
          value={stats.totalSurveys}
          change={stats.surveyCompletion}
          icon={FileText}
          trend="up"
        />
        <StatCard
          title="Rewards Distributed"
          value={stats.totalRewards}
          change={stats.rewardDistribution}
          icon={Gift}
          trend="up"
        />
        <StatCard
          title="Pending Withdrawals"
          value={stats.totalWithdrawals}
          change={stats.withdrawalProcessing}
          icon={DollarSign}
          trend="down"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 admin-section">
        <div className="admin-card">
          <h3 className="admin-subtitle font-semibold text-gray-900 admin-margin-responsive">User Registrations</h3>
          <div className="admin-chart-container">
            <Line data={stats.chartData.userRegistrations} options={{
                responsive: true,
                maintainAspectRatio: false,
                devicePixelRatio: window.devicePixelRatio || 1,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    intersect: false,
                    mode: 'index',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      font: {
                        size: window.innerWidth < 640 ? 10 : 11
                      },
                      maxRotation: window.innerWidth < 640 ? 45 : 0,
                      minRotation: 0
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                      font: {
                        size: window.innerWidth < 640 ? 10 : 11
                      },
                      maxTicksLimit: window.innerWidth < 640 ? 5 : 8
                    }
                  }
                },
                animation: {
                  duration: window.innerWidth < 640 ? 500 : 1000,
                  easing: 'easeInOutQuart'
                },
                interaction: {
                  intersect: false,
                  mode: 'index'
                },
                elements: {
                  point: {
                    radius: window.innerWidth < 640 ? 3 : 4,
                    hoverRadius: window.innerWidth < 640 ? 5 : 6
                  },
                  line: {
                    borderWidth: window.innerWidth < 640 ? 2 : 3
                  }
                }
              }} />
          </div>
        </div>
        <div className="admin-card">
          <h3 className="admin-subtitle font-semibold text-gray-900 admin-margin-responsive">Survey Completions</h3>
          <div className="admin-chart-container">
            <Bar data={stats.chartData.surveyCompletions} options={{
                responsive: true,
                maintainAspectRatio: false,
                devicePixelRatio: window.devicePixelRatio || 1,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      font: {
                        size: window.innerWidth < 640 ? 10 : 11
                      },
                      maxRotation: window.innerWidth < 640 ? 45 : 0
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                      font: {
                        size: window.innerWidth < 640 ? 10 : 11
                      },
                      maxTicksLimit: window.innerWidth < 640 ? 5 : 8
                    }
                  }
                },
                animation: {
                  duration: window.innerWidth < 640 ? 500 : 1000
                },
                interaction: {
                  intersect: false,
                  mode: 'index'
                }
              }} />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="admin-grid-3 admin-section">
        {/* Reward Distribution */}
        <div className="admin-card">
          <h3 className="admin-subtitle font-semibold text-gray-900 admin-margin-responsive">Reward Distribution</h3>
          <div className="admin-chart-container">
            <Doughnut data={stats.chartData.rewardDistribution} options={{
              responsive: true,
              maintainAspectRatio: false,
              devicePixelRatio: window.devicePixelRatio || 1,
              plugins: {
                legend: {
                  position: window.innerWidth < 640 ? 'bottom' : 'right',
                  labels: {
                    padding: window.innerWidth < 640 ? 15 : 20,
                    usePointStyle: true,
                    font: {
                      size: window.innerWidth < 640 ? 11 : 12
                    },
                    boxWidth: window.innerWidth < 640 ? 12 : 15
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  cornerRadius: 8,
                  padding: 12,
                  titleFont: { size: 14 },
                  bodyFont: { size: 13 }
                }
              },
              animation: {
                duration: window.innerWidth < 640 ? 500 : 1000
              },
              cutout: window.innerWidth < 640 ? '60%' : '50%'
            }} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 admin-card">
          <h3 className="admin-subtitle font-semibold admin-margin-responsive">Recent Activity</h3>
          <div className="admin-spacing-sm max-h-48 sm:max-h-64 overflow-y-auto">
            {stats.recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>

      {/* System Health & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* System Health */}
        <div className="admin-card">
          <h3 className="admin-subtitle font-semibold text-gray-900 admin-margin-responsive">System Health</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                stats.systemHealth.status === 'healthy' ? 'bg-green-100 text-green-800' :
                stats.systemHealth.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {stats.systemHealth.status.charAt(0).toUpperCase() + stats.systemHealth.status.slice(1)}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Active Users (24h)</span>
                <span className="font-medium">{stats.systemHealth.metrics.activeUsers}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Error Logs (24h)</span>
                <span className="font-medium text-red-600">{stats.systemHealth.metrics.errorLogs}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Warning Logs (24h)</span>
                <span className="font-medium text-yellow-600">{stats.systemHealth.metrics.warningLogs}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Uptime</span>
                <span className="font-medium">{Math.floor(stats.systemHealth.metrics.uptime / 3600)}h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Surveys */}
        <div className="admin-card">
          <h3 className="admin-subtitle font-semibold text-gray-900 admin-margin-responsive">Top Surveys</h3>
          <div className="divide-y divide-gray-100">
            {stats.topSurveys.slice(0, 5).map((survey, index) => (
              <div key={survey.id} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs">{index + 1}</span>
                  <p className="text-sm font-medium text-gray-900 truncate">{survey.title}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{survey.responseCount} responses</span>
                  <span className="text-xs text-blue-600">{survey.avgPoints} avg points</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rewards */}
        <div className="admin-card">
          <h3 className="admin-subtitle font-semibold text-gray-900 admin-margin-responsive">Popular Rewards</h3>
          <div className="divide-y divide-gray-100">
            {stats.topRewards.slice(0, 5).map((reward, index) => (
              <div key={reward.id} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs">{index + 1}</span>
                  <p className="text-sm font-medium text-gray-900 truncate">{reward.title}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{reward.redeemCount} redeemed</span>
                  <span className="text-xs text-green-600">{reward.pointsCost} points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
