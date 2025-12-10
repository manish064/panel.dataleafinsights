import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaCheck, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const RegisterContainer = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1.5rem 0.8rem; // Reduced from 2rem 1rem
`;

const RegisterCard = styled.div`
  background: white;
  padding: 1.5rem; // Reduced from 2rem
  border-radius: 12px; // Reduced from 15px
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); // Reduced shadow
  width: 100%;
  max-width: 400px; // Reduced from 450px
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 1.2rem; // Reduced from 1.5rem
  
  h1 {
    color: #2c3e50;
    margin-bottom: 0.4rem; // Reduced from 0.5rem
    font-size: 1.5rem; // Reduced from 1.75rem
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
    font-size: 0.9rem; // Added smaller font size
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; // Reduced from 1.25rem
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem; // Reduced from 1rem
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
  padding: 0.75rem 0.875rem 0.75rem 2.75rem; // Reduced padding
  border: 2px solid #666666;
  border-radius: 6px; // Reduced from 8px
  font-size: 0.9rem; // Reduced from 1rem
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem; // Reduced from 0.5rem
  
  input[type="checkbox"] {
    margin-top: 0.2rem; // Reduced from 0.25rem
  }
  
  label {
    font-size: 0.8rem; // Reduced from 0.9rem
    color: #7f8c8d;
    line-height: 1.3; // Reduced from 1.4
    
    a {
      color: #0fc179;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const RegisterButton = styled.button`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.75rem; // Reduced from 0.875rem
  border: none;
  border-radius: 6px; // Reduced from 8px
  font-size: 0.9rem; // Reduced from 1rem
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px); // Reduced from -2px
    box-shadow: 0 4px 12px rgba(15, 193, 121, 0.25); // Reduced shadow
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
  padding: 0.75rem; // Reduced from 1rem
  border: none;
  border-radius: 6px; // Reduced from 8px
  font-size: 0.9rem; // Reduced from 1rem
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-1px); // Reduced from -2px
    box-shadow: 0 4px 12px rgba(15, 193, 121, 0.25); // Reduced shadow
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
  margin: 0.6rem 0; // Reduced from 0.75rem 0
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    padding: 0 0.8rem; // Reduced from 1rem
    color: #7f8c8d;
    font-size: 0.8rem; // Reduced from 0.9rem
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 0.8rem; // Reduced from 1rem
  color: #7f8c8d;
  font-size: 0.85rem; // Added smaller font size
  
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
  padding: 0.8rem; // Reduced from 1rem
  border-radius: 6px; // Reduced from 8px
  border: 1px solid #fcc;
  font-size: 0.8rem; // Reduced from 0.9rem
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #27ae60;
  padding: 0.8rem; // Reduced from 1rem
  border-radius: 6px; // Reduced from 8px
  border: 1px solid #cfc;
  font-size: 0.8rem; // Reduced from 0.9rem
`;

const PasswordRequirements = styled.div`
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  
  .requirement {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.met {
      color: #27ae60;
    }
    
    &.unmet {
      color: #e74c3c;
    }
  }
`;

const PasswordStrengthIndicator = styled.div`
  margin-top: 0.5rem;
  
  .strength-bar {
    height: 4px;
    background: #e9ecef;
    border-radius: 2px;
    overflow: hidden;
    
    .strength-fill {
      height: 100%;
      transition: all 0.3s ease;
      
      &.weak {
        width: 25%;
        background: #e74c3c;
      }
      
      &.fair {
        width: 50%;
        background: #f39c12;
      }
      
      &.good {
        width: 75%;
        background: #f1c40f;
      }
      
      &.strong {
        width: 100%;
        background: #27ae60;
      }
    }
  }
  
  .strength-text {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    font-weight: 500;
    
    &.weak { color: #e74c3c; }
    &.fair { color: #f39c12; }
    &.good { color: #f1c40f; }
    &.strong { color: #27ae60; }
  }
`;

const PasswordMatchIndicator = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &.match {
    color: #27ae60;
  }
  
  &.no-match {
    color: #e74c3c;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  // Password validation functions
  const validatePasswordRequirements = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const calculatePasswordStrength = (password) => {
    const requirements = validatePasswordRequirements(password);
    const metCount = Object.values(requirements).filter(Boolean).length;

    if (metCount <= 2) return 'weak';
    if (metCount === 3) return 'fair';
    if (metCount === 4) return 'good';
    return 'strong';
  };

  const isPasswordValid = (password) => {
    const requirements = validatePasswordRequirements(password);
    return Object.values(requirements).every(Boolean);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!isPasswordValid(formData.password)) {
      setError('Password must meet all security requirements');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Store registration data for potential resend
        localStorage.setItem('pendingRegistration', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }));

        setSuccess('Account created successfully! Please check your email for verification.');
        setTimeout(() => {
          navigate('/verify-email', { state: { email: formData.email, isRegistration: true } });
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/auth/google`;
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <h1>Join DataLeaf</h1>
          <p>Create your account and start earning rewards</p>
        </RegisterHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <InputRow>
            <InputGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </InputRow>

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
              placeholder="Create a strong password"
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

          {formData.password && (
            <>
              <PasswordRequirements>
                <div className={`requirement ${validatePasswordRequirements(formData.password).length ? 'met' : 'unmet'}`}>
                  {validatePasswordRequirements(formData.password).length ? <FaCheck /> : <FaTimes />}
                  At least 8 characters
                </div>
                <div className={`requirement ${validatePasswordRequirements(formData.password).uppercase ? 'met' : 'unmet'}`}>
                  {validatePasswordRequirements(formData.password).uppercase ? <FaCheck /> : <FaTimes />}
                  One uppercase letter
                </div>
                <div className={`requirement ${validatePasswordRequirements(formData.password).lowercase ? 'met' : 'unmet'}`}>
                  {validatePasswordRequirements(formData.password).lowercase ? <FaCheck /> : <FaTimes />}
                  One lowercase letter
                </div>
                <div className={`requirement ${validatePasswordRequirements(formData.password).number ? 'met' : 'unmet'}`}>
                  {validatePasswordRequirements(formData.password).number ? <FaCheck /> : <FaTimes />}
                  One number
                </div>
                <div className={`requirement ${validatePasswordRequirements(formData.password).special ? 'met' : 'unmet'}`}>
                  {validatePasswordRequirements(formData.password).special ? <FaCheck /> : <FaTimes />}
                  One special character (!@#$%^&*)
                </div>
              </PasswordRequirements>

              <PasswordStrengthIndicator>
                <div className="strength-bar">
                  <div className={`strength-fill ${calculatePasswordStrength(formData.password)}`}></div>
                </div>
                <div className={`strength-text ${calculatePasswordStrength(formData.password)}`}>
                  Password strength: {calculatePasswordStrength(formData.password).charAt(0).toUpperCase() + calculatePasswordStrength(formData.password).slice(1)}
                </div>
              </PasswordStrengthIndicator>
            </>
          )}

          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </InputGroup>

          {formData.confirmPassword && (
            <PasswordMatchIndicator className={formData.password === formData.confirmPassword ? 'match' : 'no-match'}>
              {formData.password === formData.confirmPassword ? <FaCheck /> : <FaTimes />}
              {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
            </PasswordMatchIndicator>
          )}

          <CheckboxGroup>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
          </CheckboxGroup>

          <RegisterButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </RegisterButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <GoogleButton onClick={handleGoogleRegister}>
          <FaGoogle />
          Continue with Google
        </GoogleButton>

        <LoginLink>
          Already have an account? <Link to="/login">Sign in here</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
