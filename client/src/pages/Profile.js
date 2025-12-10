import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  User, Mail, Lock, Edit2, Save, X, Eye, EyeOff,
  Shield, CheckCircle, AlertTriangle, Calendar,
  CreditCard, DollarSign, Activity, Smartphone, Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const ProfileHeader = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AvatarCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(15, 193, 121, 0.3);
`;

const HeaderInfo = styled.div`
  flex: 1;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.5rem 0;
  }

  div.meta {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    color: #64748b;
    font-size: 0.9rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  }

  @media (max-width: 640px) {
    div.meta {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  height: fit-content;
  animation: ${fadeIn} 0.5s ease-out;
`;

const CardHeader = styled.div`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #0fc179;
    }
  }

  button.edit-btn {
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
  }
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }

  span.label {
    color: #64748b;
    font-size: 0.9rem;
  }

  span.value {
    color: #0f172a;
    font-weight: 500;
    font-size: 0.95rem;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #475569;
    }

    input {
      padding: 0.6rem 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.95rem;
      color: #0f172a;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #0fc179;
        box-shadow: 0 0 0 3px rgba(15, 193, 121, 0.1);
      }
    }
  }

  div.actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &.primary {
    background: #0fc179;
    color: white;
    &:hover { background: #059669; }
  }

  &.secondary {
    background: #f1f5f9;
    color: #475569;
    &:hover { background: #e2e8f0; color: #0f172a; }
  }
  
  &.danger {
    background: #fee2e2;
    color: #dc2626;
    &:hover { background: #fecaca; }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Badge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #d1fae5;
`;

const Profile = () => {
  const { user, refreshUser, getUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalPoints: 0, memberSince: '' });

  // Bank State
  const [editingBank, setEditingBank] = useState(false);
  const [bankData, setBankData] = useState({ accountHolderName: '', accountNumber: '', ifscCode: '' });
  const [bankLoading, setBankLoading] = useState(false);

  // Password State
  const [editingPassword, setEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await axios.get('/users/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const date = new Date(data.dashboard.user.createdAt);
      setStats({
        totalPoints: data.dashboard.stats.totalPointsEarned || 0,
        memberSince: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchBankDetails = useCallback(async () => {
    try {
      const { data } = await axios.get('/users/bank-details', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (data.success && data.bankDetails) {
        setBankData({
          accountHolderName: data.bankDetails.accountHolderName || '',
          accountNumber: data.bankDetails.accountNumber || '',
          ifscCode: data.bankDetails.ifscCode || ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchBankDetails();
    }
  }, [user, fetchStats, fetchBankDetails]);

  const handleBankSave = async () => {
    setBankLoading(true);
    try {
      await axios.post('/users/bank-details', bankData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Bank details updated!');
      setEditingBank(false);
      refreshUser();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setBankLoading(false);
    }
  };

  return (
    <PageContainer>
      {/* 1. Header Profile Card */}
      <ProfileHeader>
        <AvatarCircle>
          {user?.name?.charAt(0).toUpperCase() || <User />}
        </AvatarCircle>
        <HeaderInfo>
          <h1>{user?.name}</h1>
          <div className="meta">
            <span><Mail size={16} /> {user?.email}</span>
            <span><Calendar size={16} /> Member since {stats.memberSince}</span>
            <Badge>Active Member</Badge>
          </div>
        </HeaderInfo>
      </ProfileHeader>

      <MainGrid>
        {/* 2. Left Column: Account Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <CardHeader>
              <h3><User size={18} /> Personal Info</h3>
            </CardHeader>
            <CardBody>
              <InfoRow>
                <span className="label">Full Name</span>
                <span className="value">{user?.name}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Email Address</span>
                <span className="value">{user?.email}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Account ID</span>
                <span className="value">#{user?._id?.slice(-6).toUpperCase()}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Total Points Earned</span>
                <span className="value" style={{ color: '#059669' }}>{stats.totalPoints} pts</span>
              </InfoRow>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3><Shield size={18} /> Security</h3>
              <button
                className="edit-btn"
                onClick={() => setEditingPassword(!editingPassword)}
              >
                {editingPassword ? 'Cancel' : 'Change Password'}
              </button>
            </CardHeader>
            <CardBody>
              {editingPassword ? (
                <Form>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.current}
                      onChange={e => setPasswordData({ ...passwordData, current: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordData.new}
                      onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                    />
                  </div>
                  <div className="actions">
                    <Button className="secondary" onClick={() => setEditingPassword(false)}>Cancel</Button>
                    <Button className="primary">Update Password</Button>
                  </div>
                </Form>
              ) : (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                  <Lock size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                  <p>Your account is secured with a password.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* 3. Right Column: Bank & Withdrawals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <CardHeader>
              <h3><CreditCard size={18} /> Banking Details</h3>
              <button
                className="edit-btn"
                onClick={() => setEditingBank(!editingBank)}
              >
                <Edit2 size={14} /> {editingBank ? 'Cancel' : 'Edit'}
              </button>
            </CardHeader>
            <CardBody>
              {editingBank ? (
                <Form>
                  <div className="form-group">
                    <label>Account Holder Name</label>
                    <input
                      value={bankData.accountHolderName}
                      onChange={e => setBankData({ ...bankData, accountHolderName: e.target.value })}
                      placeholder="As per bank records"
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      value={bankData.accountNumber}
                      onChange={e => setBankData({ ...bankData, accountNumber: e.target.value })}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input
                      value={bankData.ifscCode}
                      onChange={e => setBankData({ ...bankData, ifscCode: e.target.value.toUpperCase() })}
                      placeholder="e.g. HDFC0001234"
                    />
                  </div>
                  <div className="actions">
                    <Button className="secondary" onClick={() => {
                      setEditingBank(false);
                      fetchBankDetails(); // Reset
                    }}>Cancel</Button>
                    <Button
                      className="primary"
                      onClick={handleBankSave}
                      disabled={bankLoading}
                    >
                      {bankLoading ? 'Saving...' : 'Save Details'}
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  {bankData.accountNumber ? (
                    <>
                      <InfoRow>
                        <span className="label">Beneficiary</span>
                        <span className="value">{bankData.accountHolderName}</span>
                      </InfoRow>
                      <InfoRow>
                        <span className="label">Account Number</span>
                        <span className="value">•••• {bankData.accountNumber.slice(-4)}</span>
                      </InfoRow>
                      <InfoRow>
                        <span className="label">IFSC Code</span>
                        <span className="value">{bankData.ifscCode}</span>
                      </InfoRow>
                      <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#ecfdf5', borderRadius: '8px', color: '#059669', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <CheckCircle size={16} /> Bank account verified and linked.
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                      <AlertTriangle size={32} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
                      <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>No bank account linked yet.</p>
                      <Button className="primary" onClick={() => setEditingBank(true)}>Link Bank Account</Button>
                    </div>
                  )}
                </>
              )}
            </CardBody>
          </Card>

          {/* Quick Stats Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Card style={{ padding: '1rem', textAlign: 'center' }}>
              <Activity size={24} color="#0fc179" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>{stats.totalPoints}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Lifetime Earnings</div>
            </Card>
            <Card style={{ padding: '1rem', textAlign: 'center' }}>
              <Globe size={24} color="#3b82f6" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>Active</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Account Status</div>
            </Card>
          </div>

        </div>
      </MainGrid>
    </PageContainer>
  );
};

export default Profile;
