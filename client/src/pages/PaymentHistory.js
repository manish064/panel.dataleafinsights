import React, { useState, useEffect, useCallback } from 'react';
import {
  History,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Loader,
  Filter,
  ArrowUpDown,
  Gift,
  Copy,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';

// --- Styled Components (Matching Professional Theme) ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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

const HeroCard = styled.div`
  background: linear-gradient(135deg, #0fc179 0%, #059669 100%);
  border-radius: 10px;
  padding: 1rem 1.5rem;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(15, 193, 121, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  
  div.icon-box {
    width: 42px;
    height: 42px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  }

  div.content {
    h1 {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0 0 0.15rem 0;
      letter-spacing: -0.02em;
    }
    p {
      margin: 0;
      font-size: 0.85rem;
      opacity: 0.9;
    }
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TabGroup = styled.div`
  display: flex;
  background: white;
  padding: 0.25rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
`;

const TabButton = styled.button`
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  border: none;
  background: ${props => props.$active ? '#0fc179' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#64748b'};
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.$active ? 'white' : '#0f172a'};
    background: ${props => props.$active ? '#0fc179' : '#f1f5f9'};
  }
`;

const Select = styled.select`
  padding: 0.4rem 1.75rem 0.4rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #1e293b;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;

  &:focus {
    border-color: #0fc179;
    box-shadow: 0 0 0 3px rgba(15, 193, 121, 0.1);
  }
`;

const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeIn} 0.4s ease-out;
`;

const TransactionCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-1px);
    border-color: #0fc179;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
  }

  /* Status Indicator Line */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.$statusColor};
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  h4 {
    margin: 0;
    color: #0f172a;
    font-size: 0.85rem;
    font-weight: 600;
  }

  div.meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    color: #64748b;

    span {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  }

  code {
    font-size: 0.7rem;
    background: #f1f5f9;
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    width: fit-content;

    &:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
    }
  }
`;

const Amount = styled.div`
  text-align: right;
  
  div.value {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
  }

  div.status {
    font-size: 0.7rem;
    font-weight: 600;
    margin-top: 0.2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.1rem 0.4rem;
    border-radius: 9999px;
    background: ${props => props.$statusBg};
    color: ${props => props.$statusColor};
  }

  @media (max-width: 640px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    border-top: 1px solid #f0fdf4;
    padding-top: 0.75rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  
  button {
    background: white;
    border: 1px solid #e2e8f0;
    color: #64748b;
    padding: 0.4rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #0f172a;
    }
  }

  span {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  border: 1px dashed #e2e8f0;
  color: #64748b;

  svg {
    opacity: 0.5;
    margin-bottom: 0.5rem;
    color: #94a3b8;
  }
  
  p {
    font-size: 0.85rem;
  }
`;

const PaymentHistory = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [activeTab, setActiveTab] = useState('withdrawals'); // 'withdrawals' | 'redemptions'

  // Withdrawals State
  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawalsLoading, setWithdrawalsLoading] = useState(true);
  const [withdrawalPage, setWithdrawalPage] = useState(1);
  const [withdrawalTotalPages, setWithdrawalTotalPages] = useState(1);
  const [withdrawalFilter, setWithdrawalFilter] = useState('all');

  // Redemptions State
  const [redemptions, setRedemptions] = useState([]);
  const [redemptionsLoading, setRedemptionsLoading] = useState(true);
  const [redemptionPage, setRedemptionPage] = useState(1);
  const [redemptionTotalPages, setRedemptionTotalPages] = useState(1);
  const [redemptionFilter, setRedemptionFilter] = useState('all');

  const fetchWithdrawals = useCallback(async () => {
    try {
      setWithdrawalsLoading(true);
      const params = {
        page: withdrawalPage,
        limit: 10,
        sortBy: 'requestDate',
        sortOrder: 'desc',
        ...(withdrawalFilter !== 'all' && { status: withdrawalFilter })
      };

      const response = await axios.get('/users/withdrawal-history', {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setWithdrawals(response.data.withdrawalHistory || []);
      setWithdrawalTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Fetch withdrawals error:', error);
      toast.error('Failed to load transaction history');
    } finally {
      setWithdrawalsLoading(false);
    }
  }, [withdrawalPage, withdrawalFilter]);

  const fetchRedemptions = useCallback(async () => {
    try {
      setRedemptionsLoading(true);
      const params = {
        page: redemptionPage,
        limit: 10,
        ...(redemptionFilter !== 'all' && { status: redemptionFilter })
      };

      const response = await axios.get('/users/rewards/history', {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setRedemptions(response.data.redemptions || []);
      setRedemptionTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Fetch redemptions error:', error);
    } finally {
      setRedemptionsLoading(false);
    }
  }, [redemptionPage, redemptionFilter]);

  useEffect(() => {
    if (activeTab === 'withdrawals') fetchWithdrawals();
    else fetchRedemptions();
  }, [activeTab, fetchWithdrawals, fetchRedemptions]);

  useEffect(() => {
    if (socket && user) {
      const handleUpdate = () => {
        if (activeTab === 'withdrawals') fetchWithdrawals();
        else fetchRedemptions();
      };
      socket.on('pointsUpdated', handleUpdate);
      return () => socket.off('pointsUpdated', handleUpdate);
    }
  }, [socket, user, activeTab, fetchWithdrawals, fetchRedemptions]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': case 'delivered': case 'processed': return '#0fc179';
      case 'pending': case 'processing': return '#f59e0b';
      case 'rejected': case 'cancelled': case 'expired': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    const bg = `${color}15`; // 15% opacity hex

    let Icon = Clock;
    if (status === 'approved' || status === 'delivered' || status === 'processed') Icon = CheckCircle;
    if (status === 'rejected' || status === 'cancelled') Icon = XCircle;

    return (
      <div className="status" style={{ background: bg, color: color }}>
        <Icon size={12} /> {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied!');
  };

  const renderContent = () => {
    const isLoading = activeTab === 'withdrawals' ? withdrawalsLoading : redemptionsLoading;
    const data = activeTab === 'withdrawals' ? withdrawals : redemptions;

    if (isLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#0fc179' }}>
          <Loader size={40} style={{ animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <EmptyState>
          <History size={48} />
          <p>No transactions found for this category.</p>
        </EmptyState>
      );
    }

    return (
      <TransactionsList>
        {data.map((item) => {
          const isWithdrawal = activeTab === 'withdrawals';
          const statusColor = getStatusColor(item.status);

          return (
            <TransactionCard key={item.id} $statusColor={statusColor}>
              <IconWrapper $bg={isWithdrawal ? '#f0fdf4' : '#ecfdf5'} $color="#059669">
                {isWithdrawal ? <DollarSign size={20} /> : <Gift size={20} />}
              </IconWrapper>

              <Info>
                <h4>{isWithdrawal ? `Withdrawal to ${item.bankDetails?.bankName || 'Bank'}` : (item.Reward?.name || 'Reward Redemption')}</h4>

                <div className="meta">
                  <span><Calendar size={14} /> {new Date(isWithdrawal ? item.requestDate : item.createdAt).toLocaleDateString()}</span>
                  <span><Clock size={14} /> {new Date(isWithdrawal ? item.requestDate : item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {isWithdrawal && item.rejectionReason && (
                  <div style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.25rem' }}>
                    Reason: {item.rejectionReason}
                  </div>
                )}

                {!isWithdrawal && item.status === 'delivered' && (item.voucherCode || item.voucher?.code) && (
                  <code onClick={() => copyToClipboard(item.voucherCode || item.voucher?.code)}>
                    <Copy size={12} /> {item.voucherCode || item.voucher?.code}
                  </code>
                )}
              </Info>

              <Amount $statusColor={statusColor} $statusBg={`${statusColor}15`}>
                <div className="value">
                  {isWithdrawal ? `₹${item.amount}` : `-${item.pointsSpent} pts`}
                </div>
                {getStatusBadge(item.status)}
              </Amount>
            </TransactionCard>
          );
        })}
      </TransactionsList>
    );
  };

  return (
    <PageContainer>
      <HeroCard>
        <div className="icon-box">
          <History size={28} color="white" />
        </div>
        <div className="content">
          <h1>Transaction History</h1>
          <p>View details of your past earnings and reward redemptions.</p>
        </div>
      </HeroCard>

      <FilterBar>
        <TabGroup>
          <TabButton
            $active={activeTab === 'withdrawals'}
            onClick={() => { setActiveTab('withdrawals'); setWithdrawalPage(1); }}
          >
            Cash Withdrawals
          </TabButton>
          <TabButton
            $active={activeTab === 'redemptions'}
            onClick={() => { setActiveTab('redemptions'); setRedemptionPage(1); }}
          >
            Gift Redemptions
          </TabButton>
        </TabGroup>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Filter size={16} color="#059669" />
          <Select
            value={activeTab === 'withdrawals' ? withdrawalFilter : redemptionFilter}
            onChange={(e) => activeTab === 'withdrawals' ? setWithdrawalFilter(e.target.value) : setRedemptionFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </Select>
        </div>
      </FilterBar>

      {renderContent()}

      {/* Pagination */}
      {((activeTab === 'withdrawals' && withdrawalTotalPages > 1) || (activeTab === 'redemptions' && redemptionTotalPages > 1)) && (
        <Pagination>
          <button
            disabled={activeTab === 'withdrawals' ? withdrawalPage === 1 : redemptionPage === 1}
            onClick={() => activeTab === 'withdrawals' ? setWithdrawalPage(p => p - 1) : setRedemptionPage(p => p - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span>
            Page {activeTab === 'withdrawals' ? withdrawalPage : redemptionPage} of {activeTab === 'withdrawals' ? withdrawalTotalPages : redemptionTotalPages}
          </span>
          <button
            disabled={activeTab === 'withdrawals' ? withdrawalPage === withdrawalTotalPages : redemptionPage === redemptionTotalPages}
            onClick={() => activeTab === 'withdrawals' ? setWithdrawalPage(p => p + 1) : setRedemptionPage(p => p + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </Pagination>
      )}
    </PageContainer>
  );
};

export default PaymentHistory;
