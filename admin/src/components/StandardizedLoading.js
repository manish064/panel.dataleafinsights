import React from 'react';
import { RefreshCw, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

/**
 * Standardized loading states for dashboard components
 */

// Full page loading component
export const PageLoading = ({ 
  title = 'Loading...', 
  subtitle = 'Please wait while we fetch your data',
  showSpinner = true 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            {showSpinner && (
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            )}
            <p className="text-gray-500 text-lg">Loading data...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section loading overlay
export const SectionLoading = ({ 
  message = 'Loading...', 
  className = '',
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-blue-600 mx-auto mb-2 ${sizeClasses[size]}`}></div>
        <p className="text-gray-500 text-sm">{message}</p>
      </div>
    </div>
  );
};

// Inline loading for buttons and small components
export const InlineLoading = ({ 
  size = 'small', 
  className = '',
  color = 'blue' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}></div>
  );
};

// Refresh loading overlay for existing content
export const RefreshLoading = ({ 
  message = 'Updating data...', 
  className = '' 
}) => {
  return (
    <div className={`absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

// Table loading skeleton
export const TableLoading = ({ 
  rows = 5, 
  columns = 4,
  className = '' 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-50 p-4 rounded-t-lg">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
      <div className="bg-white divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Card loading skeleton
export const CardLoading = ({ 
  className = '',
  showHeader = true,
  showContent = true 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse ${className}`}>
      {showHeader && (
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      )}
      {showContent && (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      )}
    </div>
  );
};

// Error state component
export const ErrorState = ({ 
  title = 'Something went wrong',
  message = 'We encountered an error while loading your data.',
  onRetry,
  retryText = 'Try Again',
  showRetry = true,
  className = '',
  icon: CustomIcon
}) => {
  const Icon = CustomIcon || AlertTriangle;

  return (
    <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
      <div className="text-center max-w-lg w-full">
        <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 transform transition-all duration-300 hover:shadow-2xl">
          {/* Error Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-100 to-red-50 rounded-full animate-pulse">
            <Icon className="h-8 w-8 text-red-500 animate-bounce" />
          </div>
          
          {/* Error Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
          
          {/* Error Message */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
            <p className="text-red-700 text-sm font-medium">{message}</p>
          </div>
          
          {/* Helpful Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            This could be due to a temporary network issue or server maintenance. Please try again.
          </p>
          
          {/* Action Buttons */}
          {showRetry && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onRetry}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {retryText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Network error state
export const NetworkErrorState = ({ 
  onRetry,
  className = '' 
}) => {
  const isOnline = navigator.onLine;
  
  return (
    <ErrorState
      title={isOnline ? 'Connection Error' : 'No Internet Connection'}
      message={isOnline ? 
        'Unable to connect to the server. Please check your connection and try again.' :
        'Please check your internet connection and try again.'
      }
      onRetry={onRetry}
      retryText="Retry Connection"
      icon={isOnline ? Wifi : WifiOff}
      className={className}
    />
  );
};

// Empty state component
export const EmptyState = ({ 
  title = 'No data found',
  message = 'There are no items to display at the moment.',
  actionText,
  onAction,
  icon: CustomIcon,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center min-h-[300px] ${className}`}>
      <div className="text-center max-w-md">
        {CustomIcon && (
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
            <CustomIcon className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6">{message}</p>
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

// Loading button component
export const LoadingButton = ({ 
  loading = false,
  children,
  loadingText = 'Loading...',
  className = '',
  disabled = false,
  ...props 
}) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`flex items-center justify-center ${className} ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading && <InlineLoading size="small" color="white" className="mr-2" />}
      {loading ? loadingText : children}
    </button>
  );
};