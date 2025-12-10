import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Award,
  Clock,
  ChevronRight,
  PlayCircle,
  Zap,
  Gift,
  ArrowUpRight,
  CreditCard,
  Target
} from 'lucide-react';
import axios from 'axios';
import styled, { keyframes, css } from 'styled-components';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

// --- Styled Components ---

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  min-height: calc(100vh - 80px);

  @media (max-width: 1024px) {
    padding: 1rem;
  }
`;

const HeroCard = styled.div`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  color: white;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 15px -1px rgba(15, 193, 121, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;

  // Abstract shapes
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: 10%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
  }
`;

const WelcomeText = styled.div`
  position: relative;
  z-index: 1;

  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
    color: white;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    margin: 0.25rem 0 0;
    color: rgba(255, 255, 255, 0.95);
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 1rem;
`;


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(15, 193, 121, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(15, 193, 121, 0); }
  100% { box-shadow: 0 0 0 0 rgba(15, 193, 121, 0); }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out backwards;
  animation-delay: ${props => props.index * 0.1}s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: #0fc179;
  }

  /* Decorative sheen effect on hover */
  // ... (kept same but lighter)
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  z-index: 1;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg || '#f0fdf4'};
  color: ${props => props.color || '#0fc179'};
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  box-shadow: inset 0 2px 4px 0 rgba(255, 255, 255, 0.6);

  ${StatCard}:hover & {
    transform: rotate(5deg) scale(1.1);
  }
`;


const StatMain = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0px;
  letter-spacing: -0.03em;
  line-height: 1.1;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

const TrendBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => props.$pulse ? '#ecfdf5' : '#f1f5f9'};
  color: ${props => props.$pulse ? '#059669' : '#475569'};
  border: 1px solid ${props => props.$pulse ? '#d1fae5' : 'transparent'};
  
  ${props => props.$pulse && css`
    animation: ${pulse} 2s infinite;
  `}
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 1.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:first-child {
    margin-top: 0;
  }

  svg {
    color: #0fc179;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  overflow: hidden;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.$clickable ? '#f8fafc' : 'white'};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ItemIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: ${props => props.bg || '#f1f5f9'};
  color: ${props => props.color || '#64748b'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ItemContent = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
`;

const Badge = styled.span`
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => props.bg || '#f1f5f9'};
  color: ${props => props.color || '#475569'};
`;

const ButtonPrimary = styled(Link)`
  background: white;
  color: #0fc179;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    background: #f0fdf4;
    color: #059669;
  }
`;

const GoalCard = styled(Card)`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(15, 193, 121, 0.3);
  margin-bottom: 1.5rem;
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: white;
  }
`;

const ProgressBarContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  height: 8px;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: white;
  border-radius: 4px;
  width: ${props => props.width || '0%'};
  transition: width 1s ease-out;
`;

const GoalMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.5rem;
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const QuickActionButton = styled(Link)`
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    border-color: #0fc179;
    background: #f0fdf4;
    transform: translateY(-2px);
  }

  svg {
    color: #0fc179;
    margin-bottom: 0.25rem;
  }

  span {
    font-weight: 600;
    font-size: 0.875rem;
    color: #334155;
  }
`;

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

// --- Dashboard Component ---

const Dashboard = () => {
  const { user, refreshUser } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleSurveyClick = (surveyId) => {
    navigate(`/surveys/${surveyId}`);
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get('/users/dashboard');
      if (response.data.success) {
        setDashboardData(response.data.dashboard);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError('Failed to load dashboard data. Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array - function never changes

  // Initial load only
  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  // Socket.io listener
  useEffect(() => {
    if (socket && user) {
      const handlePointsUpdate = async (data) => {
        if (data.reason === 'withdrawal_approved') {
          toast.success(data.message);
        } else if (data.reason === 'withdrawal_rejected') {
          toast.info(data.message);
        }
        await refreshUser();
        // fetchDashboardData is stable now
        fetchDashboardData();
      };

      socket.on('pointsUpdated', handlePointsUpdate);
      return () => socket.off('pointsUpdated', handlePointsUpdate);
    }
  }, [socket, user, refreshUser, fetchDashboardData]);

  // Handle URL params
  useEffect(() => {
    const completed = searchParams.get('completed');
    const refresh = searchParams.get('refresh');

    if (completed === 'true' && refresh === 'true') {
      const refreshData = async () => {
        try {
          await refreshUser();
          await fetchDashboardData();
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete('completed');
          newSearchParams.delete('refresh');
          setSearchParams(newSearchParams, { replace: true });
        } catch (error) {
          console.error('Error refreshing dashboard data:', error);
        }
      };
      refreshData();
    }
  }, [searchParams, setSearchParams, refreshUser]);

  if (loading) {
    return (
      <PageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '3rem', background: '#fee2e2', borderRadius: '16px', color: '#dc2626' }}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      </PageContainer>
    );
  }

  const stats = dashboardData?.stats || {
    totalSurveys: 0,
    totalPointsEarned: 0,
    totalRedemptions: 0,
    currentPoints: user?.points || 0,
    approvedWithdrawalAmount: 0
  };

  const recentCompletedSurveys = dashboardData?.recentCompletedSurveys || [];
  const recentOpenSurveys = dashboardData?.recentOpenSurveys || [];

  // Gamification logic
  const nextRewardTarget = 1000;
  const progressPercent = Math.min((stats.currentPoints / nextRewardTarget) * 100, 100);

  return (
    <PageContainer>
      <HeroCard>
        <WelcomeText>
          <h1>Hello, {user?.firstName || 'Member'}! 👋</h1>
          <p>Ready to earn some rewards today?</p>
        </WelcomeText>
        <ActionGroup style={{ position: 'relative', zIndex: 1 }}>
          <ButtonPrimary to="/surveys">
            <PlayCircle size={20} />
            Start Earning Now
          </ButtonPrimary>
        </ActionGroup>
      </HeroCard>

      {/* Hero Stats */}
      {/* Hero Stats */}
      <StatsGrid>
        <StatCard index={0} glowColor="rgba(147, 51, 234, 0.15)">
          <StatHeader>
            <IconWrapper bg="#f3e8ff" color="#9333ea">
              <LayoutDashboard size={24} strokeWidth={2} />
            </IconWrapper>
            <TrendBadge>
              <TrendingUp size={14} />
              Total
            </TrendBadge>
          </StatHeader>
          <StatMain>
            <StatValue>{stats.totalSurveys}</StatValue>
            <StatLabel>Surveys Completed</StatLabel>
          </StatMain>
        </StatCard>

        <StatCard index={1} glowColor="rgba(15, 193, 121, 0.15)">
          <StatHeader>
            <IconWrapper bg="#dcfce7" color="#15803d">
              <Wallet size={24} strokeWidth={2} />
            </IconWrapper>
            <TrendBadge $pulse>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', marginRight: 4 }}></div>
              Live
            </TrendBadge>
          </StatHeader>
          <StatMain>
            <StatValue style={{ color: '#059669' }}>{stats.currentPoints}</StatValue>
            <StatLabel>Current Balance (Pts)</StatLabel>
          </StatMain>
        </StatCard>

        <StatCard index={2} glowColor="rgba(217, 119, 6, 0.15)">
          <StatHeader>
            <IconWrapper bg="#fef3c7" color="#d97706">
              <Award size={24} strokeWidth={2} />
            </IconWrapper>
            <TrendBadge>
              <ArrowUpRight size={14} />
              Earned
            </TrendBadge>
          </StatHeader>
          <StatMain>
            <StatValue>{stats.totalPointsEarned}</StatValue>
            <StatLabel>Lifetime Earnings</StatLabel>
          </StatMain>
        </StatCard>

        <StatCard index={3} glowColor="rgba(220, 38, 38, 0.15)">
          <StatHeader>
            <IconWrapper bg="#fee2e2" color="#dc2626">
              <CreditCard size={24} strokeWidth={2} />
            </IconWrapper>
          </StatHeader>
          <StatMain>
            <StatValue>₹{(stats.approvedWithdrawalAmount || 0).toLocaleString()}</StatValue>
            <StatLabel>Total Withdrawn</StatLabel>
          </StatMain>
        </StatCard>
      </StatsGrid>

      <MainGrid>
        {/* Left Column: Activity & Surveys */}
        <div>
          {/* Available Surveys Section */}
          <SectionTitle>
            <Zap size={20} />
            Recommended for You
          </SectionTitle>

          <Card>
            <ListContainer>
              {recentOpenSurveys.length > 0 ? (
                recentOpenSurveys.slice(0, 3).map((survey, index) => (
                  <ListItem
                    key={survey.id}
                    $clickable={true}
                    onClick={() => handleSurveyClick(survey.id)}
                  >
                    <ItemIcon bg="#f0fdf4" color="#0fc179">
                      <PlayCircle size={20} />
                    </ItemIcon>
                    <ItemContent>
                      <h4>{survey.title}</h4>
                      <p>
                        <Clock size={14} /> {survey.estimatedTime} min • {survey.category || 'General'}
                      </p>
                    </ItemContent>
                    <ItemRight>
                      <Badge bg="#e6fffa" color="#0fc179">+{survey.pointsReward} pts</Badge>
                      <ChevronRight size={18} color="#cbd5e1" />
                    </ItemRight>
                  </ListItem>
                ))
              ) : (
                <EmptyState>
                  <LayoutDashboard size={40} strokeWidth={1.5} />
                  <span>No new surveys available right now.</span>
                </EmptyState>
              )}
            </ListContainer>
            {recentOpenSurveys.length > 0 && (
              <div style={{ padding: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <Link to="/surveys" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  View All Surveys <ArrowUpRight size={16} />
                </Link>
              </div>
            )}
          </Card>

          {/* Recent Activity Section */}
          <SectionTitle>
            <Clock size={20} style={{ color: '#0f172a' }} />
            Recent History
          </SectionTitle>

          <Card>
            <ListContainer>
              {recentCompletedSurveys.length > 0 ? (
                recentCompletedSurveys.slice(0, 3).map((survey, index) => (
                  <ListItem key={index} $clickable={false}>
                    <ItemIcon bg="#f1f5f9" color="#64748b">
                      <Award size={20} />
                    </ItemIcon>
                    <ItemContent>
                      <h4>{survey.Survey?.title || 'Completed Survey'}</h4>
                      <p>
                        {new Date(survey.createdAt).toLocaleDateString()}
                      </p>
                    </ItemContent>
                    <ItemRight>
                      <Badge bg="#fcf8e3" color="#b45309">+{survey.pointsEarned} pts</Badge>
                    </ItemRight>
                  </ListItem>
                ))
              ) : (
                <EmptyState>
                  <Clock size={40} strokeWidth={1.5} />
                  <span>No recent activity yet. Start a survey!</span>
                </EmptyState>
              )}
            </ListContainer>
          </Card>
        </div>

        {/* Right Column: Goals & Quick Actions */}
        <div>
          <SectionTitle>Your Goals</SectionTitle>
          <GoalCard>
            <GoalHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Target size={24} color="white" />
                <div>
                  <h3>Next Reward</h3>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '2px' }}>Track your progress</div>
                </div>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'white' }}>{Math.round(progressPercent)}%</span>
            </GoalHeader>
            <ProgressBarContainer>
              <ProgressBarFill width={`${progressPercent}%`} />
            </ProgressBarContainer>
            <GoalMeta>
              <span>{stats.currentPoints} pts</span>
              <span>Target: {nextRewardTarget} pts</span>
            </GoalMeta>
          </GoalCard>

          <SectionTitle>Quick Actions</SectionTitle>
          <QuickActionGrid>
            <QuickActionButton to="/rewards">
              <Gift size={24} />
              <span>Redeem</span>
            </QuickActionButton>
            <QuickActionButton to="/profile">
              <CreditCard size={24} />
              <span>Profile</span>
            </QuickActionButton>
            <QuickActionButton to="/surveys">
              <Zap size={24} />
              <span>Surveys</span>
            </QuickActionButton>
            <QuickActionButton to="/payment-history">
              <Clock size={24} />
              <span>History</span>
            </QuickActionButton>
          </QuickActionGrid>
        </div>
      </MainGrid>
    </PageContainer>
  );
};

export default Dashboard;
