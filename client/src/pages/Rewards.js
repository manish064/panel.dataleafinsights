import React, { useState, useEffect } from 'react';
import {
  Gift,
  Wallet,
  ArrowRight,
  Zap,
  CreditCard,
  TrendingUp,
  Loader,
  AlertTriangle,
  ShoppingCart,
  User,
  History,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';

// --- Styled Components ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-10px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const FinanceSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0.85rem;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
    border-color: #0fc179;
    transform: translateY(-2px);
  }
`;

// Balance Card Styles
const BalanceCard = styled(Card)`
  padding: 1rem;
  background: white;
  justify-content: space-between;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #0fc179, #059669);
  }
`;

const BalanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;

  h2 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.15rem 0;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  span.subtitle {
    font-size: 0.75rem;
    color: #64748b;
  }

  div.icon-circle {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #ecfdf5;
    color: #059669;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    ${BalanceCard}:hover & {
      transform: rotate(10deg);
      background: #0fc179;
      color: white;
    }
  }
`;

const BalanceAmount = styled.div`
  div.main {
    font-size: 1.9rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 0.5rem;
    
    span {
      font-size: 1rem;
      color: #059669;
      margin-left: 0.2rem;
    }
  }

  div.secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.8rem;
    color: #334155;
    font-weight: 600;

    svg {
      color: #059669;
    }
  }
`;

// Withdrawal Card Styles
const WithdrawalCard = styled(Card)`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: center;
  background: white;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const WithdrawalInfo = styled.div`
  h2 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.35rem 0;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  p {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.4;
    margin: 0 0 1rem 0;
  }

  div.bank-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #f1f5f9;

    div.icon {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      
      &.active {
        background: #ecfdf5;
        color: #059669;
      }
    }

    div.details {
      flex: 1;
      
      strong {
        display: block;
        font-size: 0.75rem;
        color: #0f172a;
      }
      span {
        font-size: 0.68rem;
        color: #64748b;
      }
    }
  }
`;

const WithdrawalForm = styled.div`
  background: #f8fafc;
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;

  &:focus-within {
    background: white;
    border-color: #0fc179;
    box-shadow: 0 4px 12px rgba(15, 193, 121, 0.1);
  }

  label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.35rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  div.input-group {
    position: relative;
    margin-bottom: 0.75rem;

    input {
      width: 100%;
      padding: 0.6rem 0.6rem 0.6rem 2.1rem;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 0.9rem;
      color: #0f172a;
      font-weight: 600;
      outline: none;
      transition: all 0.2s;
      background: white;

      &:focus {
        border-color: #0fc179;
      }
    }

    svg {
      position: absolute;
      left: 0.7rem;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      transition: color 0.2s;
    }

    input:focus + svg {
      color: #0fc179;
    }
  }

  div.summary {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px dashed #e2e8f0;
  }
`;

const Button = styled.button`
  width: ${props => props.$full ? '100%' : 'auto'};
  background: ${props => props.$disabled ? '#e2e8f0' : '#0fc179'};
  color: ${props => props.$disabled ? '#94a3b8' : 'white'};
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;

  &:hover {
    background: ${props => props.$disabled ? '#e2e8f0' : '#059669'};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
  }
`;

// Rewards Grid Section
const SectionTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.65rem 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  animation: ${slideIn} 0.4s ease-out;
  
  svg {
    color: #0fc179;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.85rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const RewardCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #cbd5e1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  animation: ${scaleIn} 0.5s ease-out backwards;
  animation-delay: ${props => props.$index ? `${props.$index * 0.05}s` : '0s'};

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(15, 193, 121, 0.1);
    border-color: #0fc179;
    
    div.image-overlay {
      opacity: 1;
    }
  }
`;

const CardImage = styled.div`
  height: 90px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid #cbd5e1;
  transition: all 0.3s ease;

  svg.reward-icon {
    width: 36px;
    height: 36px;
    color: #94a3b8;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  span.brand {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: white;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.6rem;
    font-weight: 700;
    color: #334155;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    z-index: 2;
    transition: all 0.3s ease;
  }

  ${RewardCard}:hover & {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    
    svg.reward-icon {
      transform: scale(1.15) rotate(5deg);
      color: #059669;
    }
    
    span.brand {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0,0,0,0.12);
    }
  }
`;

const CardBody = styled.div`
  padding: 0.75rem 0.85rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  h4 {
    margin: 0 0 0.15rem 0;
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e293b;
    transition: color 0.3s ease;
  }

  p {
    color: #475569;
    font-size: 0.75rem;
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
    flex: 1;
    transition: color 0.3s ease;
  }
  
  ${RewardCard}:hover & {
    h4 {
      color: #0f172a;
    }
    
    p {
      color: #334155;
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  div.cost {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    color: #059669;
    font-weight: 700;
    font-size: 0.8rem;
    transition: all 0.3s ease;
  }
  
  ${RewardCard}:hover & {
    border-top-color: #cbd5e1;
    
    div.cost {
      color: #0fc179;
      transform: scale(1.05);
    }
  }
`;

const ActionIcon = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: ${props => props.$disabled ? '#f1f5f9' : '#ecfdf5'};
  color: ${props => props.$disabled ? '#94a3b8' : '#059669'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${props => props.$disabled ? '#f1f5f9' : '#0fc179'};
    color: ${props => props.$disabled ? '#94a3b8' : 'white'};
    transform: ${props => props.$disabled ? 'none' : 'scale(1.1) rotate(5deg)'};
    box-shadow: ${props => props.$disabled ? 'none' : '0 4px 8px rgba(15, 193, 121, 0.2)'};
  }
  
  &:active {
    transform: ${props => props.$disabled ? 'none' : 'scale(0.95)'};
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 1.75rem;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px dashed #cbd5e1;

  svg {
    color: #94a3b8;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #64748b;
    font-size: 0.8rem;
  }
`;

const Rewards = () => {
  const { user, refreshUser } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [rewards, setRewards] = useState([]);
  const [rewardsLoading, setRewardsLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);

  useEffect(() => {
    fetchRewards();
  }, []);

  useEffect(() => {
    if (socket && user) {
      const handlePointsUpdate = (data) => {
        if (data.reason === 'withdrawal_approved') {
          toast.success(`Withdrawal approved! ${Math.abs(data.change)} points deducted.`);
        } else if (data.reason === 'withdrawal_rejected') {
          toast.info(`Withdrawal rejected. ${data.change} points restored.`);
        }
        refreshUser();
      };

      socket.on('pointsUpdated', handlePointsUpdate);
      return () => socket.off('pointsUpdated', handlePointsUpdate);
    }
  }, [socket, user, refreshUser]);

  const fetchRewards = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/users/rewards', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setRewards(response.data.rewards || []);
      }
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setRewardsLoading(false);
    }
  };

  const handleRedeem = async (rewardId) => {
    try {
      setRedeeming(rewardId);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/users/rewards/${rewardId}/redeem`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Redeemed successfully! Check your email.');
        refreshUser();
        fetchRewards();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to redeem');
    } finally {
      setRedeeming(null);
    }
  };

  const handleWithdrawalRequest = async () => {
    try {
      setWithdrawalLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/users/withdrawal-request',
        { amount: parseInt(withdrawalAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Withdrawal request submitted!');
        setWithdrawalAmount('');
        refreshUser();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setWithdrawalLoading(false);
    }
  };

  const totalPoints = user?.points || 0;
  const inrValue = totalPoints;

  return (
    <PageContainer>
      {/* 1. Finance Section: Balance + Withdrawal Side-by-Side */}
      <FinanceSection>
        {/* Left: Balance Dashboard */}
        <BalanceCard>
          <BalanceHeader>
            <div>
              <h2>My Balance</h2>
              <span className="subtitle">Total available earnings</span>
            </div>
            <div className="icon-circle">
              <TrendingUp size={20} />
            </div>
          </BalanceHeader>

          <BalanceAmount>
            <div className="main">
              {totalPoints.toLocaleString()}<span>pts</span>
            </div>
            <div className="secondary">
              <Zap size={14} fill="#059669" />
              ≈ ₹{inrValue.toLocaleString()} INR
            </div>
          </BalanceAmount>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <Button
              style={{ background: '#0f172a', flex: 1, fontSize: '0.85rem' }}
              onClick={() => navigate('/payment-history')}
            >
              <History size={16} /> History
            </Button>
            <Button
              style={{ background: '#f1f5f9', color: '#0f172a', flex: 1, fontSize: '0.85rem' }}
              onClick={() => navigate('/surveys')}
            >
              <Activity size={16} /> Earn
            </Button>
          </div>
        </BalanceCard>

        {/* Right: Quick Withdrawal Panel */}
        <WithdrawalCard>
          <WithdrawalInfo>
            <h2><Wallet size={20} /> Cash Withdrawal</h2>
            <p>Transfer earnings to your bank account instantly. Minimum: 100 pts.</p>

            <div className="bank-status">
              <div className={`icon ${user?.accountNumber ? 'active' : ''}`}>
                <CreditCard size={18} />
              </div>
              <div className="details">
                <strong>{user?.accountNumber ? 'Bank Connected' : 'No Account Linked'}</strong>
                <span>{user?.accountNumber ? `Ends in ••••${user.accountNumber.slice(-4)}` : 'Link account to withdraw'}</span>
              </div>
            </div>
          </WithdrawalInfo>

          <WithdrawalForm>
            {!user?.accountNumber ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Please connect a bank account</p>
                <Button $full onClick={() => navigate('/profile')}>
                  <User size={16} /> Link Now
                </Button>
              </div>
            ) : (
              <>
                <label>Amount to Withdraw</label>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="Points"
                    min="100"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                  />
                  <Wallet size={16} />
                </div>

                <div className="summary">
                  <span>Receive:</span>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>₹{withdrawalAmount || 0}</span>
                </div>

                <Button
                  $full
                  onClick={handleWithdrawalRequest}
                  $disabled={withdrawalLoading || !withdrawalAmount || withdrawalAmount < 100 || withdrawalAmount > totalPoints}
                >
                  {withdrawalLoading ? <Loader className="spin" size={16} /> : <ArrowRight size={16} />}
                  {withdrawalLoading ? 'Processing' : 'Withdraw'}
                </Button>
              </>
            )}
          </WithdrawalForm>
        </WithdrawalCard>
      </FinanceSection>

      {/* 2. Available Rewards Grid */}
      <SectionTitle><Gift size={20} /> Available Rewards</SectionTitle>

      {rewardsLoading ? (
        <EmptyState>
          <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '0.5rem' }}>Loading rewards...</p>
        </EmptyState>
      ) : rewards.length > 0 ? (
        <Grid>
          {rewards.map((reward) => {
            const canAfford = totalPoints >= reward.pointsCost;
            const isRedeeming = redeeming === reward.id;

            return (
              <RewardCard key={reward.id}>
                <CardImage>
                  <Gift className="reward-icon" />
                  {reward.brand && <span className="brand">{reward.brand}</span>}
                </CardImage>

                <CardBody>
                  <h4>{reward.name}</h4>
                  <p>{reward.description}</p>

                  <CardFooter>
                    <div className="cost">
                      <Zap size={14} fill="#059669" /> {reward.pointsCost}
                    </div>
                    <ActionIcon
                      $disabled={!canAfford || isRedeeming}
                      onClick={() => handleRedeem(reward.id)}
                    >
                      {isRedeeming ? <Loader size={18} className="spin" /> : <ShoppingCart size={18} />}
                    </ActionIcon>
                  </CardFooter>
                </CardBody>
              </RewardCard>
            );
          })}
        </Grid>
      ) : (
        <EmptyState>
          <Gift size={40} />
          <p>No rewards available yet.</p>
        </EmptyState>
      )}

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </PageContainer>
  );
};

export default Rewards;
