import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Surveys from './pages/Surveys';
import SurveyDetail from './pages/SurveyDetail';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import PaymentHistory from './pages/PaymentHistory';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SetPassword from './pages/SetPassword';
import OAuthCallback from './pages/OAuthCallback';

// Simplified Protected Route
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" />;
};

// Simplified Public Route
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  return user ? <Navigate to="/dashboard" /> : children;
};

// Simplified Home Route
const HomeRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  return user ? <Navigate to="/dashboard" /> : <Home />;
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <ResponsiveNavbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/surveys" element={<ProtectedRoute><Surveys /></ProtectedRoute>} />
              <Route path="/surveys/:id" element={<ProtectedRoute><SurveyDetail /></ProtectedRoute>} />
              <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
              <Route path="/verify-email" element={<PublicRoute><VerifyEmail /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
              <Route path="/set-password" element={<PublicRoute><SetPassword /></PublicRoute>} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            draggable
            pauseOnHover
            className="mt-16"
          />
        </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
