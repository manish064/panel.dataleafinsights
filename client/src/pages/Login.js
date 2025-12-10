import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaShieldAlt } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const LoginContainer = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  
  h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.75rem;
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #666666;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
  
  &::placeholder {
    color: #bdc3c7;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #0fc179;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(15, 193, 121, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const GoogleButton = styled.button`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(15, 193, 121, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    padding: 0 1rem;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const ForgotPassword = styled(Link)`
  color: #0fc179;
  text-decoration: none;
  text-align: center;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #7f8c8d;
  
  a {
    color: #0fc179;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #e74c3c;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #fcc;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background: #f0f9ff;
  color: #0369a1;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #bae6fd;
  font-size: 0.9rem;
`;

const OTPContainer = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const OTPInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #666666;
  border-radius: 8px;
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: 0.5rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
  
  &::placeholder {
    color: #bdc3c7;
    letter-spacing: normal;
  }
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #0fc179;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  
  &:hover {
    color: #0fc179;
  }
  
  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/auth/verify-login', {
        email: formData.email,
        otp: otp
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Trigger a page reload to reinitialize the AuthContext
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
    
    setLoading(false);
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/auth/complete-registration', {
        email: formData.email,
        otp: otp
      });

      if (response.data.success) {
        if (response.data.token && response.data.user) {
          // Registration completed with login
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          window.location.href = '/dashboard';
        } else {
          // Just verification, need to login
          setSuccess('Email verified successfully! You can now log in.');
          setRequiresVerification(false);
          setOtp('');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Email verification failed');
    }
    
    setLoading(false);
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Trigger login again to resend OTP
      await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      setSuccess('Verification code resent to your email');
      setResendCooldown(60);
      
      // Start countdown
      const interval = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setError('Failed to resend verification code');
    }
    
    setLoading(false);
  };

  const resetToLogin = () => {
    setShowOTPVerification(false);
    setRequiresVerification(false);
    setOtp('');
    setError('');
    setSuccess('');
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/auth/google`;
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          {showOTPVerification ? (
            <>
              <h1>Verify Login</h1>
              <p>Enter the verification code sent to {formData.email}</p>
            </>
          ) : requiresVerification ? (
            <>
              <h1>Verify Email</h1>
              <p>Please verify your email to continue</p>
            </>
          ) : (
            <>
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue</p>
            </>
          )}
        </LoginHeader>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        {showOTPVerification ? (
          <Form onSubmit={handleOTPSubmit}>
            <OTPContainer>
              <InputGroup>
                <InputIcon>
                  <FaShieldAlt />
                </InputIcon>
                <OTPInput
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                />
              </InputGroup>
              <ResendButton
                type="button"
                onClick={handleResendOTP}
                disabled={resendCooldown > 0 || loading}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </ResendButton>
            </OTPContainer>
            
            <LoginButton type="submit" disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </LoginButton>
            
            <ResendButton type="button" onClick={resetToLogin}>
              Back to Login
            </ResendButton>
          </Form>
        ) : requiresVerification ? (
          <Form onSubmit={handleEmailVerification}>
            <OTPContainer>
              <InputGroup>
                <InputIcon>
                  <FaShieldAlt />
                </InputIcon>
                <OTPInput
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                />
              </InputGroup>
            </OTPContainer>
            
            <LoginButton type="submit" disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </LoginButton>
            
            <ResendButton type="button" onClick={resetToLogin}>
              Back to Login
            </ResendButton>
          </Form>
        ) : (
          <>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputGroup>
              
              <ForgotPassword to="/forgot-password">
                Forgot your password?
              </ForgotPassword>
              
              <LoginButton type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </LoginButton>
            </Form>
            
            <Divider>
              <span>or</span>
            </Divider>
            
            <GoogleButton onClick={handleGoogleLogin}>
              <FaGoogle />
              Continue with Google
            </GoogleButton>
            
            <SignupLink>
              Don't have an account? <Link to="/register">Sign up here</Link>
            </SignupLink>
          </>
        )}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
