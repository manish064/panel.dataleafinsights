import axios from 'axios';
import { toast } from 'react-toastify';

// Configure axios base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const IS_DEVELOPMENT = process.env.REACT_APP_ENVIRONMENT === 'development' || process.env.NODE_ENV === 'development';
// Alternate dev base URLs to try if the primary is unreachable (no server restart needed)
const DEV_ALT_BASES = ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:5003'];
const getAlternateBase = (current) => {
  if (!IS_DEVELOPMENT) return null;
  const idx = DEV_ALT_BASES.indexOf(current);
  if (idx === -1) return DEV_ALT_BASES[0];
  return DEV_ALT_BASES[(idx + 1) % DEV_ALT_BASES.length];
};

console.log('Admin Panel API Base URL:', API_BASE_URL);
console.log('Environment:', IS_DEVELOPMENT ? 'development' : 'production');

axios.defaults.baseURL = API_BASE_URL;

// Add request timeout
axios.defaults.timeout = IS_DEVELOPMENT ? 10000 : 30000; // Shorter timeout for development

// Configure CORS based on environment
if (IS_DEVELOPMENT) {
  // For development, don't use withCredentials to avoid CORS issues
  axios.defaults.withCredentials = false;
} else {
  // For production, use withCredentials for proper CORS
  axios.defaults.withCredentials = true;
}

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching issues
    config.params = {
      ...config.params,
      _t: Date.now()
    };
    
    // Ensure proper headers
    config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.headers
    };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle ERR_ABORTED and network errors with retry
    if (
      (error.code === 'ERR_ABORTED' || 
       error.code === 'ERR_NETWORK' ||
       error.message?.includes('aborted') ||
       error.message?.includes('Network Error')) &&
      !originalRequest._retry &&
      originalRequest._retryCount < 3
    ) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      console.log(`Retrying request (attempt ${originalRequest._retryCount}/3):`, originalRequest.url);
      
      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, originalRequest._retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry the request
      return axios(originalRequest);
    }
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Don't show toast for login endpoint
      if (!originalRequest.url?.includes('/login')) {
        toast.error('Session expired. Please login again.');
        // Clear auth data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        delete axios.defaults.headers.common['Authorization'];
        // Redirect to login
        window.location.href = '/login';
      }
    }
    
    // Handle other errors
    if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.code === 'ERR_ABORTED') {
      toast.error('Request was aborted. Please check your connection and try again.');
    } else if (error.code === 'ERR_NETWORK') {
      // In development, attempt an automatic base URL fallback (e.g., 5001 -> 5003)
      if (IS_DEVELOPMENT && originalRequest && !originalRequest._triedAltBase && /^http:\/\/localhost:\d+/.test(axios.defaults.baseURL || '')) {
        const currentBase = axios.defaults.baseURL;
        const altBase = getAlternateBase(currentBase);
        if (altBase && altBase !== currentBase) {
          console.log(`API base unreachable at ${currentBase}. Trying alternate base ${altBase} for this request.`);
          // Mark to avoid loops
          originalRequest._triedAltBase = true;
          // Use the alternate base only for this retry
          const reqForAlt = { ...originalRequest, baseURL: altBase };
          try {
            const altResp = await axios(reqForAlt);
            // If alternate succeeds, switch global base for subsequent requests
            axios.defaults.baseURL = altBase;
            console.log(`Switched API base URL to ${altBase}`);
            return altResp;
          } catch (altErr) {
            // If alternate also fails, fall through to toast below
          }
        }
      }
      toast.error('Network error. Please check your internet connection.');
    }
    
    return Promise.reject(error);
  }
);

export default axios;
