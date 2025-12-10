import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, color = 'blue' }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        text: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        text: 'text-green-600'
      },
      yellow: {
        bg: 'bg-gray-50',
        icon: 'text-gray-600',
        text: 'text-gray-600'
      },
      red: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        text: 'text-red-600'
      },
      purple: {
        bg: 'bg-gray-100',
        icon: 'text-gray-700',
        text: 'text-gray-700'
      },
      indigo: {
        bg: 'bg-slate-50',
        icon: 'text-slate-600',
        text: 'text-slate-600'
      }
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(color);

  const formatValue = (value) => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value.toLocaleString();
    }
    return value;
  };

  const getChangeIcon = (changeType) => {
    if (changeType === 'increase') {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (changeType === 'decrease') {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getChangeTextColor = (changeType) => {
    if (changeType === 'increase') {
      return 'text-green-600';
    } else if (changeType === 'decrease') {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className="flex items-center">
              {getChangeIcon(changeType)}
              <span className={`ml-1 text-sm font-medium ${getChangeTextColor(changeType)}`}>
                {typeof change === 'number' ? `${change > 0 ? '+' : ''}${change}%` : change}
              </span>
              <span className="ml-1 text-sm text-gray-500">from last period</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-full ${colorClasses.bg}`}>
            <Icon className={`h-8 w-8 ${colorClasses.icon}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;