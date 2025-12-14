import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaArrowRight } from 'react-icons/fa';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  background: white;
  overflow: hidden;
  @media (max-width: 768px) { flex-direction: column; }
`;

const BrandingSection = styled.div`
  flex: 0.8;
  background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  color: white;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(15, 193, 121, 0.15) 0%, transparent 70%);
    top: -50px;
    right: -50px;
    border-radius: 50%;
  }
  @media (max-width: 768px) { display: none; }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  max-width: 320px;
  animation: ${fadeIn} 0.6s ease-out;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    background: linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 0.875rem;
    color: #d1fae5;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  span {
    background: rgba(15, 193, 121, 0.15);
    border: 1px solid rgba(15, 193, 121, 0.3);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    color: #34d399;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #fff;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const WelcomeText = styled.div`
  margin-bottom: 1.25rem;
  h2 { font-size: 1.25rem; color: #111827; font-weight: 700; margin-bottom: 0.25rem; }
  p { color: #6b7280; font-size: 0.875rem; 
    a { color: #0fc179; font-weight: 600; text-decoration: none; &:hover { color: #059669; } }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
  display: block;
`;

const InputWrapper = styled.div`
  position: relative;
  svg { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #9ca3af; width: 16px; height: 16px; }
  &:focus-within svg { color: #0fc179; }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 2.25rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  background: #f9fafb;
  &:focus { outline: none; border-color: #0fc179; background: #fff; box-shadow: 0 0 0 3px rgba(15, 193, 121, 0.1); }
  &::placeholder { color: #9ca3af; }
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  &:hover { color: #4b5563; }
`;

const ForgotLink = styled(Link)`
  text-align: right;
  color: #0fc179;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const SubmitBtn = styled.button`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  color: white;
  padding: 0.625rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(15, 193, 121, 0.2);
  &:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(15, 193, 121, 0.25); }
  &:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
  .spinner { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  color: #9ca3af;
  font-size: 0.75rem;
  &::before, &::after { content: ''; flex: 1; border-bottom: 1px solid #e5e7eb; }
  &::before { margin-right: 0.75rem; }
  &::after { margin-left: 0.75rem; }
`;

const GoogleBtn = styled.button`
  width: 100%;
  background: white;
  border: 1.5px solid #e5e7eb;
  color: #374151;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover { background: #f9fafb; border-color: #d1d5db; }
`;

const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: -0.25rem;
`;

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) navigate('/dashboard');
      else setError(result.message || 'Invalid credentials');
    } catch (err) {
      setError('Connection failed');
    }
    setLoading(false);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/auth/verify-login', { email: formData.email, otp });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError('Invalid code');
    }
    setLoading(false);
  };

  const handleGoogle = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/auth/google`;
  };

  return (
    <PageContainer>
      <BrandingSection>
        <GlassCard>
          <h1>DataLeaf</h1>
          <p>Share opinions. Earn rewards. Join thousands worldwide.</p>
          <Tags>
            <span>Surveys</span>
            <span>Rewards</span>
            <span>Secure</span>
          </Tags>
        </GlassCard>
      </BrandingSection>

      <FormSection>
        <FormWrapper>
          {!showOTP ? (
            <>
              <WelcomeText>
                <h2>Welcome back</h2>
                <p>New here? <Link to="/register">Create account</Link></p>
              </WelcomeText>

              <Form onSubmit={handleSubmit}>
                <div>
                  <Label>Email</Label>
                  <InputWrapper>
                    <Mail />
                    <Input type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required />
                  </InputWrapper>
                </div>

                <div>
                  <Label>Password</Label>
                  <InputWrapper>
                    <Lock />
                    <Input type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                    <ToggleBtn type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </ToggleBtn>
                  </InputWrapper>
                </div>

                <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                <SubmitBtn type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="spinner" size={16} /> Signing in...</> : <>Sign In <FaArrowRight size={12} /></>}
                </SubmitBtn>
              </Form>

              <Divider>or</Divider>
              <GoogleBtn onClick={handleGoogle}><FaGoogle style={{ color: '#DB4437' }} /> Google</GoogleBtn>
            </>
          ) : (
            <Form onSubmit={handleOTPSubmit}>
              <WelcomeText>
                <h2>Verify</h2>
                <p>Enter code sent to {formData.email}</p>
              </WelcomeText>
              <Input type="text" maxLength={6} value={otp} placeholder="000000" onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem' }} />
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <SubmitBtn type="submit" disabled={loading || otp.length !== 6}>{loading ? 'Verifying...' : 'Verify'}</SubmitBtn>
              <button type="button" onClick={() => setShowOTP(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.75rem', marginTop: '0.5rem' }}>Back</button>
            </Form>
          )}
        </FormWrapper>
      </FormSection>
    </PageContainer>
  );
};

export default Login;
