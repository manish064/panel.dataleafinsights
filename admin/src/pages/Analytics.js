import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Gift,
  DollarSign,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { PageLoading, SectionLoading, ErrorState, LoadingButton } from '../components/StandardizedLoading';
import { ErrorHandler, SuccessHandler, createAsyncHandler } from '../utils/errorHandler';
import axios from 'axios';

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

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalUsers: 0,
      totalSurveys: 0,
      totalRewards: 0,
      totalRevenue: 0,
      userGrowth: 0,
      surveyGrowth: 0,
      rewardGrowth: 0,
      revenueGrowth: 0
    },
    userRegistrations: {
      labels: [],
      data: []
    },
    surveyCompletions: {
      labels: [],
      data: []
    },
    rewardDistribution: {
      labels: [],
      data: []
    },
    revenueAnalytics: {
      labels: [],
      data: []
    },
    userEngagement: {
      labels: [],
      data: []
    },
    topSurveys: [],
    topRewards: [],
    userDemographics: {
      ageGroups: { labels: [], data: [] },
      locations: { labels: [], data: [] }
    }
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const mockAnalyticsData = {
    overview: {
      totalUsers: 1247,
      totalSurveys: 89,
      totalRewards: 156,
      totalRevenue: 12450.75,
      userGrowth: 12.5,
      surveyGrowth: 8.3,
      rewardGrowth: -2.1,
      revenueGrowth: 15.7
    },
    userRegistrations: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [65, 78, 90, 81, 95, 102]
    },
    surveyCompletions: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [120, 145, 165, 180, 195, 210]
    },
    rewardDistribution: {
      labels: ['Gift Cards', 'Cash', 'Discounts', 'Products'],
      data: [45, 30, 15, 10]
    },
    revenueAnalytics: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [1200, 1450, 1650, 1800, 1950, 2100]
    },
    userEngagement: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [85, 92, 88, 95, 90, 75, 70]
    },
    topSurveys: [
      { id: 1, title: 'Customer Satisfaction Survey', completions: 245, rating: 4.5 },
      { id: 2, title: 'Product Feedback Survey', completions: 189, rating: 4.2 },
      { id: 3, title: 'Market Research Survey', completions: 156, rating: 4.0 }
    ],
    topRewards: [
      { id: 1, title: '$10 Amazon Gift Card', claims: 89, value: 890 },
      { id: 2, title: '$5 PayPal Cash', claims: 67, value: 335 },
      { id: 3, title: '20% Discount Coupon', claims: 45, value: 225 }
    ],
    userDemographics: {
      ageGroups: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        data: [25, 35, 20, 15, 5]
      },
      locations: {
        labels: ['USA', 'Canada', 'UK', 'Australia', 'Others'],
        data: [40, 20, 15, 10, 15]
      }
    }
  };

  const fetchAnalyticsData = createAsyncHandler(
    async () => {
      const response = await axios.get(`/api/admin/analytics?range=${dateRange}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAnalyticsData(data);
      },
      onError: () => {
        setAnalyticsData(mockAnalyticsData); // Fallback to mock data
      },
      loadingState: [loading, setLoading],
      fallbackData: mockAnalyticsData
    }
  );

  const exportAnalytics = () => {
    const data = {
      overview: analyticsData.overview,
      dateRange: dateRange,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${dateRange}days.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
    const isPositive = change > 0;
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    };

    return (
      <div className="bg-white admin-padding-responsive rounded-lg shadow admin-touch-target">
        <div className="flex items-center justify-between">
          <div>
            <p className="admin-text-responsive text-gray-600">{title}</p>
            <p className="admin-heading-responsive font-bold text-gray-900">{value}</p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`admin-text-responsive ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}%
              </span>
              <span className="admin-text-responsive text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]} admin-touch-target`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    );
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 1,
    plugins: {
      legend: {
        position: window.innerWidth < 640 ? 'bottom' : 'top',
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
      duration: window.innerWidth < 640 ? 500 : 1000
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
  };

  const doughnutOptions = {
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
  };

  if (loading) {
    return <PageLoading message="Loading analytics data..." />;
  }

  return (
    <div className="admin-container withdrawal-compact">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Analytics Dashboard</h1>
          <p className="admin-body-text">Comprehensive insights and performance metrics</p>
        </div>
        <div className="admin-header-actions">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="admin-input"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={exportAnalytics}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={analyticsData.overview.totalUsers.toLocaleString()}
          change={analyticsData.overview.userGrowth}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Surveys"
          value={analyticsData.overview.totalSurveys}
          change={analyticsData.overview.surveyGrowth}
          icon={FileText}
          color="green"
        />
        <StatCard
          title="Total Rewards"
          value={analyticsData.overview.totalRewards}
          change={analyticsData.overview.rewardGrowth}
          icon={Gift}
          color="yellow"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${analyticsData.overview.totalRevenue.toLocaleString()}`}
          change={analyticsData.overview.revenueGrowth}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Registrations */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <div className="flex items-center justify-between admin-margin-responsive">
            <h3 className="admin-subtitle">User Registrations</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <Line
            data={{
              labels: analyticsData.userRegistrations.labels,
              datasets: [
                {
                  label: 'New Users',
                  data: analyticsData.userRegistrations.data,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.4,
                },
              ],
            }}
            options={chartOptions}
          />
        </div>

        {/* Survey Completions */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <div className="flex items-center justify-between admin-margin-responsive">
            <h3 className="admin-subtitle">Survey Completions</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <Bar
            data={{
              labels: analyticsData.surveyCompletions.labels,
              datasets: [
                {
                  label: 'Completions',
                  data: analyticsData.surveyCompletions.data,
                  backgroundColor: 'rgba(34, 197, 94, 0.8)',
                  borderColor: 'rgb(34, 197, 94)',
                  borderWidth: 1,
                },
              ],
            }}
            options={chartOptions}
          />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reward Distribution */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <div className="flex items-center justify-between admin-margin-responsive">
            <h3 className="admin-subtitle">Reward Distribution</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <Doughnut
            data={{
              labels: analyticsData.rewardDistribution.labels,
              datasets: [
                {
                  data: analyticsData.rewardDistribution.data,
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                  ],
                  borderWidth: 2,
                  borderColor: '#fff',
                },
              ],
            }}
            options={doughnutOptions}
          />
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <div className="flex items-center justify-between admin-margin-responsive">
            <h3 className="admin-subtitle">Revenue Trend</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <Line
            data={{
              labels: analyticsData.revenueAnalytics.labels,
              datasets: [
                {
                  label: 'Revenue ($)',
                  data: analyticsData.revenueAnalytics.data,
                  borderColor: 'rgb(168, 85, 247)',
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  tension: 0.4,
                },
              ],
            }}
            options={chartOptions}
          />
        </div>

        {/* User Engagement */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <div className="flex items-center justify-between admin-margin-responsive">
            <h3 className="admin-subtitle">Weekly Engagement</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <Bar
            data={{
              labels: analyticsData.userEngagement.labels,
              datasets: [
                {
                  label: 'Active Users (%)',
                  data: analyticsData.userEngagement.data,
                  backgroundColor: 'rgba(251, 191, 36, 0.8)',
                  borderColor: 'rgb(251, 191, 36)',
                  borderWidth: 1,
                },
              ],
            }}
            options={chartOptions}
          />
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Surveys */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <h3 className="admin-subtitle admin-margin-responsive">Top Performing Surveys</h3>
          <div className="space-y-4">
            {analyticsData.topSurveys.map((survey, index) => (
              <div key={survey.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{survey.title}</p>
                    <p className="text-xs text-gray-500">{survey.completions} completions</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < Math.floor(survey.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{survey.rating}/5</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rewards */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <h3 className="admin-subtitle admin-margin-responsive">Most Claimed Rewards</h3>
          <div className="space-y-4">
            {analyticsData.topRewards.map((reward, index) => (
              <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{reward.title}</p>
                    <p className="text-xs text-gray-500">{reward.claims} claims</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${reward.value}</p>
                  <p className="text-xs text-gray-500">Total Value</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <h3 className="admin-subtitle admin-margin-responsive">User Age Groups</h3>
          <Doughnut
            data={{
              labels: analyticsData.userDemographics.ageGroups.labels,
              datasets: [
                {
                  data: analyticsData.userDemographics.ageGroups.data,
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                  ],
                  borderWidth: 2,
                  borderColor: '#fff',
                },
              ],
            }}
            options={doughnutOptions}
          />
        </div>

        {/* Location Demographics */}
        <div className="bg-white admin-padding-responsive rounded-lg shadow">
          <h3 className="admin-subtitle admin-margin-responsive">User Locations</h3>
          <Doughnut
            data={{
              labels: analyticsData.userDemographics.locations.labels,
              datasets: [
                {
                  data: analyticsData.userDemographics.locations.data,
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                  ],
                  borderWidth: 2,
                  borderColor: '#fff',
                },
              ],
            }}
            options={doughnutOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;