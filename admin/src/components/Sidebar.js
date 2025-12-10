import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Gift,
  CreditCard,
  BarChart3,
  Settings,
  FileSearch,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentPath }) => {
  const menuItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      description: 'Overview and statistics'
    },
    {
      path: '/users',
      icon: Users,
      label: 'User Management',
      description: 'Manage user accounts'
    },
    {
      path: '/surveys',
      icon: FileText,
      label: 'Survey Management',
      description: 'Manage surveys and responses'
    },
    {
      path: '/rewards',
      icon: Gift,
      label: 'Rewards Management',
      description: 'Manage rewards and points'
    },
    {
      path: '/withdrawals',
      icon: CreditCard,
      label: 'Withdrawal Management',
      description: 'Process withdrawal requests'
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'System Settings',
      description: 'Configure system settings'
    },

  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30">
        <div className="flex flex-col w-80">
          <div className="flex flex-col flex-grow bg-gradient-to-b from-slate-800 to-slate-900 pt-5 pb-4 overflow-y-auto">
            {/* Logo Only */}
            <div className="flex items-center justify-center flex-shrink-0 px-4 py-6">
              <Link
                to="/dashboard"
                className="flex items-center bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="DataLeaf - Go to admin dashboard"
              >
                <h1 className="text-2xl font-bold">
                  <span className="text-white">Data</span>
                  <span className="text-green-400">Leaf</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="mt-8 flex-1 px-2 admin-spacing-xs">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 admin-touch-target ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-102'
                      }`}
                  >
                    <Icon className={`mr-3 h-4 w-4 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{item.label}</div>
                      <div className={`text-xs mt-0.5 transition-colors truncate ${isActive ? 'text-blue-100' : 'text-slate-400 group-hover:text-slate-300'
                        }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-40 w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between flex-shrink-0 px-4 py-6">
            <div className="flex items-center justify-center flex-1">
              <Link
                to="/dashboard"
                className="flex items-center bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="DataLeaf - Go to admin dashboard"
                onClick={onClose}
              >
                <h1 className="text-2xl font-bold">
                  <span className="text-white">Data</span>
                  <span className="text-green-400">Leaf</span>
                </h1>
              </Link>
            </div>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-3 pb-4 admin-spacing-xs">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200 admin-touch-target ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-102'
                    }`}
                >
                  <Icon className={`mr-4 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{item.label}</div>
                    <div className={`text-xs mt-1 transition-colors truncate ${isActive ? 'text-blue-100' : 'text-slate-400 group-hover:text-slate-300'
                      }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
