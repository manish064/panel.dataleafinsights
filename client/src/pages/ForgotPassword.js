import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

// Styled components
const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 2rem;
  background-color: #f8fafc;
`;

const ForgotPasswordCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
`;

const ForgotPasswordHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #0fc179;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #64748b;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`;

const SubmitButton = styled.button`
  background: #0fc179;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0fc179;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackToLogin = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: #0fc179;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background-color: #dcfce7;
  color: #166534;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setSuccess('If an account with that email exists, a password reset OTP has been sent. Please check your email.');
        
        // Check if this might be a Google OAuth user by making a request to check user type
        try {
          const checkResponse = await fetch('/api/auth/check-user-type', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
          });
          
          const userData = await checkResponse.json();
          
          if (userData.isGoogleUser) {
            // Navigate to set password page for Google users
            setTimeout(() => {
              navigate('/set-password', { state: { email } });
            }, 3000);
          } else {
            // Navigate to reset password page for regular users
            setTimeout(() => {
              navigate('/reset-password', { state: { email } });
            }, 3000);
          }
        } catch (checkError) {
          // If check fails, default to reset password page
          setTimeout(() => {
            navigate('/reset-password', { state: { email } });
          }, 3000);
        }
        
        // Clear the form
        setEmail('');
      } else {
        setError(result.message || 'Failed to send password reset email');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ForgotPasswordContainer>
      <ForgotPasswordCard>
        <ForgotPasswordHeader>
          <h1>Forgot Password</h1>
          <p>Enter your email to receive a password reset code</p>
        </ForgotPasswordHeader>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Code'}
          </SubmitButton>
        </Form>
        
        <BackToLogin to="/login">
          <FaArrowLeft /> Back to Login
        </BackToLogin>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
