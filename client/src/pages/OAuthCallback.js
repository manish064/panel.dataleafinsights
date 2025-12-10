import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import styled from 'styled-components';

const CallbackContainer = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
`;

const CallbackCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0fc179;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Message = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 1rem;
  margin: 0;
`;

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthenticatedUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          navigate('/login?error=Authentication failed. Please try again.');
          return;
        }

        if (token) {
          // Store the token and get user info
          localStorage.setItem('token', token);
          
          // Decode the token to get user info (basic decode, not verification)
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            
            // Fetch user details from the API
            const response = await axios.get('/users/profile', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.data.success && response.data.user) {
              // Update auth context
              setAuthenticatedUser(response.data.user, token);
              
              // Redirect to dashboard
              navigate('/dashboard');
            } else {
              throw new Error('Invalid user data received');
            }
          } catch (decodeError) {
            console.error('Token decode error:', decodeError);
            navigate('/login?error=Authentication failed. Please try again.');
          }
        } else {
          navigate('/login?error=No authentication token received.');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/login?error=Authentication failed. Please try again.');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setAuthenticatedUser]);

  return (
    <CallbackContainer>
      <CallbackCard>
        <LoadingSpinner />
        <Message>Completing your sign-in...</Message>
      </CallbackCard>
    </CallbackContainer>
  );
};

export default OAuthCallback;
