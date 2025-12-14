import React, { useState, useEffect, useCallback } from 'react';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  Play,
  Search,
  Filter,
  AlertCircle,
  LayoutDashboard,
  Timer,
  Zap
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  min-height: calc(100vh - 80px);
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const HeroCard = styled.div`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(15, 193, 121, 0.2);
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.9;
    max-width: 600px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    
    h1 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.75rem;
    }
  }

  /* Abstract Pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  background: white;
  padding: 0.4rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  width: fit-content;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: ${props => props.$active ? '#0fc179' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#64748b'};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.$active ? 'white' : '#1e293b'};
    background: ${props => props.$active ? '#0fc179' : '#f1f5f9'};
  }
`;

const SurveyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SurveyCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr auto;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$loading ? 0.7 : 1};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.1);
    border-color: #e2e8f0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const SurveyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  div.icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${props => props.$completed ? '#ecfdf5' : '#f0f9ff'};
    color: ${props => props.$completed ? '#059669' : '#0284c7'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  div.text {
    h3 {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.15rem 0;
    }
    span {
      font-size: 0.75rem;
      color: #64748b;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;

const StatBadge = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  label {
    font-size: 0.65rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  span {
    font-size: 0.85rem;
    color: #334155;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    svg {
      width: 14px;
      height: 14px;
      color: #0fc179;
    }
  }
`;

const PointsBadge = styled.div`
  background: #f0fdf4;
  color: #059669;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;

  svg {
    fill: currentColor;
    width: 12px;
    height: 12px;
  }
`;

const ActionButton = styled.button`
  background: #0fc179;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 1px 3px rgba(15, 193, 121, 0.2);

  &:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(15, 193, 121, 0.3);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
  
  div {
    width: 48px;
    height: 48px;
    background: #f8fafc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: #94a3b8;
  }
  
  h3 {
    margin: 0 0 0.35rem 0;
    color: #1e293b;
    font-size: 0.95rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: #64748b;
    font-size: 0.85rem;
  }
`;

const MessageBox = styled.div`
  background: #f0fdf4;
  color: #166534;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;

  svg {
    color: #15803d;
  }
`;

const Surveys = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('active');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [availableSurveys, setAvailableSurveys] = useState([]);
  const [completedSurveys, setCompletedSurveys] = useState([]);
  const [allSurveys, setAllSurveys] = useState([]);

  const fetchSurveyData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError('');

      const availableSurveysResponse = await axios.get('/surveys', { timeout: 10000 });
      let availableSurveysData = [];
      if (availableSurveysResponse.data.success) {
        availableSurveysData = availableSurveysResponse.data.surveys || [];
        setAvailableSurveys(availableSurveysData);
        setAllSurveys(availableSurveysData);
      }

      const completedResponse = await axios.get('/surveys/user/history', { timeout: 10000 });
      if (completedResponse.data.success) {
        setCompletedSurveys(completedResponse.data.responses || []);
      }

    } catch (error) {
      console.error('Error fetching survey data:', error);
      if (!isRefresh) setError('Failed to load surveys. Please try again.');
    } finally {
      if (!isRefresh) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSurveyData();
  }, [fetchSurveyData]);

  useEffect(() => {
    if (user?.points !== undefined) fetchSurveyData();
  }, [user?.points, fetchSurveyData]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (user && !loading) fetchSurveyData(true);
    }, 30000);
    return () => clearInterval(refreshInterval);
  }, [user, loading, fetchSurveyData]);

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const handleSurveyStart = (survey) => {
    navigate(`/surveys/${survey.id}`);
  };

  useEffect(() => {
    const completed = searchParams.get('completed');
    if (completed === 'true') {
      refreshUser();
      fetchSurveyData();
      setMessageText('Survey completed successfully! Your points have been updated.');
      setShowMessage(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('completed');
      newSearchParams.delete('refresh');
      setSearchParams(newSearchParams, { replace: true });
      setTimeout(() => setShowMessage(false), 5000);
    }
  }, [searchParams, setSearchParams, refreshUser, fetchSurveyData]);

  const displayedSurveys = activeTab === 'active' ? availableSurveys : completedSurveys;

  return (
    <PageContainer>
      <HeroCard>
        <h1>Survey Dashboard</h1>
        <p>Complete surveys to earn points and unlock rewards. Your opinion matters!</p>
      </HeroCard>

      {showMessage && (
        <MessageBox>
          <CheckCircle size={20} />
          {messageText}
        </MessageBox>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
          <AlertCircle size={32} style={{ marginBottom: '0.5rem' }} />
          <p>{error}</p>
        </div>
      )}

      {!error && (
        <ContentGrid>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <TabContainer>
              <TabButton
                $active={activeTab === 'active'}
                onClick={() => setActiveTab('active')}
              >
                <LayoutDashboard size={18} />
                Available ({availableSurveys.length})
              </TabButton>
              <TabButton
                $active={activeTab === 'completed'}
                onClick={() => setActiveTab('completed')}
              >
                <CheckCircle size={18} />
                Completed ({completedSurveys.length})
              </TabButton>
            </TabContainer>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{
                width: '40px', height: '40px', border: '3px solid #f1f5f9',
                borderTopColor: '#0fc179', borderRadius: '50%', margin: '0 auto 1rem',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ color: '#64748b' }}>Loading surveys...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : displayedSurveys.length > 0 ? (
            <SurveyList>
              {displayedSurveys.map((item, index) => {
                const isCompleted = activeTab === 'completed';
                const survey = isCompleted ? item.survey : item;
                // Handle case where survey might be null in completed responses
                if (isCompleted && !survey) return null;

                return (
                  <SurveyCard key={`${isCompleted ? item.id : survey.id}-${index}`}>
                    <SurveyInfo $completed={isCompleted}>
                      <div className="icon">
                        {isCompleted ? <CheckCircle size={24} /> : <ClipboardList size={24} />}
                      </div>
                      <div className="text">
                        <h3>{survey.title}</h3>
                        <span>{survey.category || 'General Survey'}</span>
                      </div>
                    </SurveyInfo>

                    <StatBadge>
                      <label>Estimated Time</label>
                      <span><Timer /> {formatDuration(survey.estimatedTime)}</span>
                    </StatBadge>

                    <PointsBadge>
                      <Zap />
                      {isCompleted ? item.pointsEarned : survey.pointsReward} pts
                    </PointsBadge>

                    {isCompleted ? (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          Completed on {new Date(item.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ) : (
                      <ActionButton onClick={() => handleSurveyStart(survey)}>
                        Start Survey <Play size={16} fill="white" />
                      </ActionButton>
                    )}
                  </SurveyCard>
                );
              })}
            </SurveyList>
          ) : (
            <EmptyState>
              <div>
                {activeTab === 'active' ? <ClipboardList size={32} /> : <CheckCircle size={32} />}
              </div>
              <h3>
                {activeTab === 'active' ? 'No Available Surveys' : 'No Completed Surveys'}
              </h3>
              <p>
                {activeTab === 'active'
                  ? "You've completed all available tasks! Check back later for more."
                  : "Start completing surveys to see your history here."}
              </p>
            </EmptyState>
          )}
        </ContentGrid>
      )}
    </PageContainer>
  );
};

export default Surveys;
