import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ onMenuClick }) => {
  const { admin, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 transition-all duration-300 ease-in-out lg:ml-80">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Mobile menu button and title */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-3 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 admin-touch-target"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Page title - will be dynamic based on current route */}
          <h1 className="ml-2 lg:ml-0 text-base sm:text-lg font-bold text-gray-900 truncate">
            Admin Dashboard
          </h1>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
          {/* Notifications */}
          <button className="p-2 sm:p-3 text-secondary hover:text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 relative admin-touch-target">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full hidden"></span>
          </button>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 admin-touch-target"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="hidden sm:block text-left min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate max-w-24 sm:max-w-32">
                    {admin?.name || 'Admin User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-24 sm:max-w-32">
                    {admin?.email || 'admin@example.com'}
                  </div>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-secondary flex-shrink-0" />
              </div>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200 backdrop-blur-sm">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center px-4 py-3 text-sm text-secondary hover:bg-gray-50 transition-colors duration-150 admin-touch-target"
                >
                  <User className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span className="text-xs text-gray-700">Profile</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center px-4 py-3 text-sm text-secondary hover:bg-gray-50 transition-colors duration-150 admin-touch-target"
                >
                  <Settings className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span className="text-xs text-gray-700">Settings</span>
                </Link>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm text-secondary hover:bg-red-50 hover:text-red-600 transition-colors duration-150 admin-touch-target"
                >
                  <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span className="text-xs text-gray-700">Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;