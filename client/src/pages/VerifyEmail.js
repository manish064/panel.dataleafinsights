import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaEnvelope, FaCheck, FaRedo, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

// Styled components
const VerifyEmailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 2rem;
  background-color: #f8fafc;
`;

const VerifyEmailCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
`;

const VerifyEmailHeader = styled.div`
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

const OTPInput = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  
  input {
    width: 3rem;
    height: 3rem;
    text-align: center;
    font-size: 1.5rem;
    border: 1px solid #666666;
    border-radius: 8px;
    
    &:focus {
      outline: none;
      border-color: #0fc179;
    }
  }
`;

const VerifyButton = styled.button`
  background: #0fc179;
  color: white;
  padding: 1rem;
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

const ResendButton = styled.button`
  background: transparent;
  color: #0fc179;
  padding: 0.5rem;
  border: 1px solid #0fc179;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover {
    background: #e6f9f3;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

const Timer = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, completeRegistration, sendVerificationEmail, resendRegistrationEmail } = useAuth();
  const emailFromState = location.state?.email;
  const isRegistration = location.state?.isRegistration || false;
  
  const [email, setEmail] = useState(emailFromState || '');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  const inputRefs = Array(6).fill(0).map(() => React.createRef());
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Validate form
    if (!email) {
      setError('Email is required');
      return;
    }
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    
    setLoading(true);
    
    try {
      // Use completeRegistration for new registrations, verifyEmail for existing users
      const result = isRegistration 
        ? await completeRegistration(email, otpValue)
        : await verifyEmail(email, otpValue);
      
      if (result.success) {
        setSuccess(isRegistration ? 'Registration completed successfully!' : 'Email verified successfully!');
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(result.message || 'Verification failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again later.');
      console.error('Email verification error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    // Reset messages
    setError('');
    setSuccess('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setResending(true);
    
    try {
      let result;
      if (isRegistration) {
        result = await resendRegistrationEmail(email);
      } else {
        result = await sendVerificationEmail(email);
      }
      
      if (result.success) {
        setSuccess('Verification email sent successfully!');
        setCountdown(60); // 60 seconds cooldown
      } else {
        setError(result.message || 'Failed to resend verification email');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Resend verification email error:', error);
    } finally {
      setResending(false);
    }
  };
  
  return (
    <VerifyEmailContainer>
      <VerifyEmailCard>
        <VerifyEmailHeader>
          <h1>Verify Your Email</h1>
          <p>Enter the 6-digit code sent to your email</p>
        </VerifyEmailHeader>
        
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
              readOnly={!!emailFromState}
            />
          </InputGroup>
          
          <OTPInput>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                required
              />
            ))}
          </OTPInput>
          
          <VerifyButton type="submit" disabled={loading}>
            {loading ? 'Verifying...' : (
              <>
                <FaCheck /> Verify Email
              </>
            )}
          </VerifyButton>
        </Form>
        
        {countdown > 0 ? (
          <Timer>Resend code in {countdown} seconds</Timer>
        ) : (
          <ResendButton 
            type="button" 
            onClick={handleResendOtp} 
            disabled={resending || countdown > 0}
          >
            <FaRedo /> Resend Verification Code
          </ResendButton>
        )}
        
        <BackToLogin to="/login">
          <FaArrowLeft /> Back to Login
        </BackToLogin>
      </VerifyEmailCard>
    </VerifyEmailContainer>
  );
};

export default VerifyEmail;
