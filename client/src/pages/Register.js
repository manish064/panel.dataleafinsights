import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react';
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
  flex: 0.7;
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
    width: 250px;
    height: 250px;
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
  padding: 1.25rem;
  border-radius: 16px;
  max-width: 280px;
  animation: ${fadeIn} 0.6s ease-out;
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 0.8rem;
    color: #d1fae5;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  span {
    background: rgba(15, 193, 121, 0.15);
    border: 1px solid rgba(15, 193, 121, 0.3);
    padding: 0.2rem 0.6rem;
    border-radius: 50px;
    font-size: 0.7rem;
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
  overflow-y: auto;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const WelcomeText = styled.div`
  margin-bottom: 1rem;
  h2 { font-size: 1.25rem; color: #111827; font-weight: 700; margin-bottom: 0.2rem; }
  p { color: #6b7280; font-size: 0.8rem; 
    a { color: #0fc179; font-weight: 600; text-decoration: none; &:hover { color: #059669; } }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  @media (max-width: 400px) { grid-template-columns: 1fr; }
`;

const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.15rem;
  display: block;
`;

const InputWrapper = styled.div`
  position: relative;
  svg { position: absolute; left: 0.6rem; top: 50%; transform: translateY(-50%); color: #9ca3af; width: 14px; height: 14px; }
  &:focus-within svg { color: #0fc179; }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.6rem 0.5rem 2rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.8rem;
  background: #f9fafb;
  &:focus { outline: none; border-color: #0fc179; background: #fff; box-shadow: 0 0 0 2px rgba(15, 193, 121, 0.1); }
  &::placeholder { color: #9ca3af; }
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  &:hover { color: #4b5563; }
`;

const PasswordReqs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.15rem 0.5rem;
  padding: 0.4rem;
  background: #f9fafb;
  border-radius: 6px;
  font-size: 0.65rem;
  .req { display: flex; align-items: center; gap: 0.25rem; }
  .met { color: #10b981; }
  .unmet { color: #9ca3af; }
`;

const StrengthBar = styled.div`
  height: 3px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  .fill {
    height: 100%;
    transition: width 0.3s;
    &.weak { width: 25%; background: #ef4444; }
    &.fair { width: 50%; background: #f59e0b; }
    &.good { width: 75%; background: #eab308; }
    &.strong { width: 100%; background: #10b981; }
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  input { margin-top: 0.1rem; }
  label { font-size: 0.7rem; color: #6b7280; line-height: 1.3;
    a { color: #0fc179; text-decoration: none; &:hover { text-decoration: underline; } }
  }
`;

const SubmitBtn = styled.button`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: 0 3px 10px rgba(15, 193, 121, 0.2);
  &:hover { transform: translateY(-1px); }
  &:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: #9ca3af;
  font-size: 0.7rem;
  &::before, &::after { content: ''; flex: 1; border-bottom: 1px solid #e5e7eb; }
  &::before { margin-right: 0.5rem; }
  &::after { margin-left: 0.5rem; }
`;

const GoogleBtn = styled.button`
  width: 100%;
  background: white;
  border: 1.5px solid #e5e7eb;
  color: #374151;
  padding: 0.4rem;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  cursor: pointer;
  font-size: 0.75rem;
  &:hover { background: #f9fafb; }
`;

const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 0.7rem;
  padding: 0.4rem;
  background: #fef2f2;
  border-radius: 4px;
`;

const SuccessMsg = styled.div`
  color: #10b981;
  font-size: 0.7rem;
  padding: 0.4rem;
  background: #ecfdf5;
  border-radius: 4px;
`;

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const validatePw = (pw) => ({
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    num: /\d/.test(pw),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pw)
  });

  const getStrength = (pw) => {
    const met = Object.values(validatePw(pw)).filter(Boolean).length;
    if (met <= 2) return 'weak';
    if (met === 3) return 'fair';
    if (met === 4) return 'good';
    return 'strong';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqs = validatePw(formData.password);
    if (!Object.values(reqs).every(Boolean)) return setError('Password must meet all requirements');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    if (!formData.agreeToTerms) return setError('Accept terms to continue');

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', formData);
      if (res.data.success) {
        setSuccess('Account created! Check email for verification.');
        setTimeout(() => navigate('/verify-email', { state: { email: formData.email, isRegistration: true } }), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const handleGoogle = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/auth/google`;
  };

  const reqs = validatePw(formData.password);

  return (
    <PageContainer>
      <BrandingSection>
        <GlassCard>
          <h1>DataLeaf</h1>
          <p>Join thousands earning rewards for sharing opinions.</p>
          <Tags><span>Free</span><span>Easy</span><span>Rewarding</span></Tags>
        </GlassCard>
      </BrandingSection>

      <FormSection>
        <FormWrapper>
          <WelcomeText>
            <h2>Create account</h2>
            <p>Already have one? <Link to="/login">Sign in</Link></p>
          </WelcomeText>

          {error && <ErrorMsg>{error}</ErrorMsg>}
          {success && <SuccessMsg>{success}</SuccessMsg>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <div>
                <Label>First Name</Label>
                <InputWrapper><User /><Input name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required /></InputWrapper>
              </div>
              <div>
                <Label>Last Name</Label>
                <InputWrapper><User /><Input name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required /></InputWrapper>
              </div>
            </Row>

            <div>
              <Label>Email</Label>
              <InputWrapper><Mail /><Input type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required /></InputWrapper>
            </div>

            <div>
              <Label>Password</Label>
              <InputWrapper>
                <Lock />
                <Input type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                <ToggleBtn type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}</ToggleBtn>
              </InputWrapper>
            </div>

            {formData.password && (
              <>
                <PasswordReqs>
                  <div className={`req ${reqs.length ? 'met' : 'unmet'}`}>{reqs.length ? <FaCheck size={8} /> : <FaTimes size={8} />} 8+ chars</div>
                  <div className={`req ${reqs.upper ? 'met' : 'unmet'}`}>{reqs.upper ? <FaCheck size={8} /> : <FaTimes size={8} />} Uppercase</div>
                  <div className={`req ${reqs.lower ? 'met' : 'unmet'}`}>{reqs.lower ? <FaCheck size={8} /> : <FaTimes size={8} />} Lowercase</div>
                  <div className={`req ${reqs.num ? 'met' : 'unmet'}`}>{reqs.num ? <FaCheck size={8} /> : <FaTimes size={8} />} Number</div>
                  <div className={`req ${reqs.special ? 'met' : 'unmet'}`}>{reqs.special ? <FaCheck size={8} /> : <FaTimes size={8} />} Special</div>
                </PasswordReqs>
                <StrengthBar><div className={`fill ${getStrength(formData.password)}`} /></StrengthBar>
              </>
            )}

            <div>
              <Label>Confirm Password</Label>
              <InputWrapper>
                <Lock />
                <Input type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
                <ToggleBtn type="button" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}</ToggleBtn>
              </InputWrapper>
              {formData.confirmPassword && (
                <div style={{ fontSize: '0.65rem', marginTop: '0.2rem', color: formData.password === formData.confirmPassword ? '#10b981' : '#ef4444' }}>
                  {formData.password === formData.confirmPassword ? '✓ Match' : '✗ No match'}
                </div>
              )}
            </div>

            <Checkbox>
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required />
              <label>I agree to <a href="#">Terms</a> & <a href="#">Privacy</a></label>
            </Checkbox>

            <SubmitBtn type="submit" disabled={loading}>
              {loading ? <><Loader2 className="spinner" size={14} style={{ animation: 'spin 1s linear infinite' }} /> Creating...</> : <>Create Account <FaArrowRight size={10} /></>}
            </SubmitBtn>
          </Form>

          <Divider>or</Divider>
          <GoogleBtn onClick={handleGoogle}><FaGoogle style={{ color: '#DB4437' }} /> Google</GoogleBtn>
        </FormWrapper>
      </FormSection>
    </PageContainer>
  );
};

export default Register;
