import { toast } from 'react-toastify';

/**
 * Standardized error handling utility for admin dashboard components
 */
export class ErrorHandler {
  /**
   * Handle API errors with consistent messaging and logging
   * @param {Error} error - The error object
   * @param {string} context - Context where the error occurred (e.g., 'fetching users')
   * @param {Object} options - Additional options
   * @param {boolean} options.showToast - Whether to show toast notification (default: true)
   * @param {string} options.fallbackMessage - Custom fallback message
   * @param {Function} options.onError - Custom error callback
   */
  static handle(error, context, options = {}) {
    const {
      showToast = true,
      fallbackMessage,
      onError
    } = options;

    // Log error for debugging
    console.error(`Error ${context}:`, error);

    // Determine error message
    let message = fallbackMessage || `Failed to ${context.toLowerCase()}`;
    
    if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message) {
      message = error.message;
    } else if (error?.response?.status) {
      message = this.getStatusMessage(error.response.status, context);
    }

    // Show toast notification
    if (showToast) {
      toast.error(message);
    }

    // Execute custom error callback
    if (onError && typeof onError === 'function') {
      onError(error, message);
    }

    return { error, message };
  }

  /**
   * Get user-friendly message based on HTTP status code
   * @param {number} status - HTTP status code
   * @param {string} context - Context of the operation
   */
  static getStatusMessage(status, context) {
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'You are not authorized to perform this action. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This action conflicts with existing data. Please refresh and try again.';
      case 422:
        return 'The provided data is invalid. Please check your input.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error occurred. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return `Failed to ${context.toLowerCase()}. Please try again.`;
    }
  }

  /**
   * Handle network errors specifically
   * @param {Error} error - Network error
   * @param {string} context - Context of the operation
   */
  static handleNetworkError(error, context) {
    if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
      return this.handle(
        new Error('Network connection lost. Please check your internet connection.'),
        context
      );
    }
    return this.handle(error, context);
  }

  /**
   * Create a standardized async operation wrapper with error handling
   * @param {Function} operation - Async operation to execute
   * @param {string} context - Context description
   * @param {Object} options - Error handling options
   */
  static async withErrorHandling(operation, context, options = {}) {
    try {
      return await operation();
    } catch (error) {
      this.handle(error, context, options);
      throw error; // Re-throw to allow component-specific handling
    }
  }
}

/**
 * Loading state manager for consistent loading UI
 */
export class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
    this.listeners = new Set();
  }

  /**
   * Set loading state for a specific operation
   * @param {string} key - Unique key for the operation
   * @param {boolean} isLoading - Loading state
   */
  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
    this.notifyListeners();
  }

  /**
   * Get loading state for a specific operation
   * @param {string} key - Operation key
   */
  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }

  /**
   * Check if any operation is loading
   */
  isAnyLoading() {
    return Array.from(this.loadingStates.values()).some(loading => loading);
  }

  /**
   * Clear all loading states
   */
  clearAll() {
    this.loadingStates.clear();
    this.notifyListeners();
  }

  /**
   * Add listener for loading state changes
   * @param {Function} listener - Callback function
   */
  addListener(listener) {
    this.listeners.add(listener);
  }

  /**
   * Remove listener
   * @param {Function} listener - Callback function to remove
   */
  removeListener(listener) {
    this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of state changes
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.loadingStates));
  }
}

/**
 * Success message handler for consistent success notifications
 */
export class SuccessHandler {
  /**
   * Show success message with consistent styling
   * @param {string} message - Success message
   * @param {Object} options - Additional options
   */
  static show(message, options = {}) {
    const { duration = 3000 } = options;
    toast.success(message, {
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  /**
   * Show operation success with context
   * @param {string} operation - Operation that succeeded (e.g., 'create user')
   * @param {Object} options - Additional options
   */
  static showOperation(operation, options = {}) {
    const message = `Successfully ${operation.toLowerCase()}`;
    this.show(message, options);
  }
}

// Export singleton instance for loading manager
export const loadingManager = new LoadingManager();

// Utility functions for common patterns
export const withLoading = async (key, operation, options = {}) => {
  const { showError = true, context = 'perform operation' } = options;
  
  try {
    loadingManager.setLoading(key, true);
    const result = await operation();
    return result;
  } catch (error) {
    if (showError) {
      ErrorHandler.handle(error, context);
    }
    throw error;
  } finally {
    loadingManager.setLoading(key, false);
  }
};

export const createAsyncHandler = (operation, options = {}) => {
  const {
    loadingState,
    errorContext = 'perform operation',
    showErrorToast = true,
    onError
  } = options;

  return async (...args) => {
    try {
      if (loadingState && typeof loadingState === 'function') {
        loadingState(true);
      }
      const result = await operation(...args);
      return result;
    } catch (error) {
      console.error(`Error ${errorContext}:`, error);
      
      if (showErrorToast) {
        ErrorHandler.handle(error, errorContext, { showToast: true });
      }
      
      if (onError && typeof onError === 'function') {
        onError(error);
      }
      
      throw error;
    } finally {
      if (loadingState && typeof loadingState === 'function') {
        loadingState(false);
      }
    }
  };
};