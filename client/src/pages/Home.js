import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaClipboardList, FaGift, FaDollarSign, FaUsers, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: calc(100vh - 200px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>') repeat;
    background-size: 40px 40px;
  }
`;

const HeroContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  font-family: 'Inter', sans-serif;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-family: 'Inter', sans-serif;
  
  ${props => props.$primary ? `
    background: white;
    color: #0fc179;
    border-color: white;
    
    &:hover {
      background: #f8fafc;
      color: #0fc179;
      border-color: #f8fafc;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
  ` : `
    background: transparent;
    color: white;
    border-color: white;
    
    &:hover {
      background: white;
      color: #0fc179;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
  `}
`;

const FeaturesSection = styled.section`
  padding: 3.5rem 0;
  background: #f8fafc;
`;

const SectionContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  border: 1px solid #e2e8f0;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(15, 193, 121, 0.15);
    border-color: #0fc179;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #0fc179;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.5;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  text-align: center;
`;

const StatCard = styled.div`
  h3 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: white;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
  }
  
  p {
    font-size: 1rem;
    opacity: 0.9;
    font-family: 'Inter', sans-serif;
  }
`;

const Home = () => {
  const { user } = useAuth();

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Share Your Opinion, Earn Rewards</HeroTitle>
          <HeroSubtitle>
            Join thousands of members worldwide and get paid for your valuable opinions.
            Complete surveys, earn points, and redeem amazing rewards.
          </HeroSubtitle>
          <CTAButtons>
            {user ? (
              <>
                <CTAButton to="/dashboard" $primary>
                  Go to Dashboard
                </CTAButton>
                <CTAButton to="/surveys">
                  Browse Surveys
                </CTAButton>
              </>
            ) : (
              <>
                <CTAButton to="/register" $primary>
                  Join Now - It's Free!
                </CTAButton>
                <CTAButton to="/login">
                  Already a Member?
                </CTAButton>
              </>
            )}
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionContent>
          <SectionTitle>Why Choose DataLeaf?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <FaClipboardList />
              </FeatureIcon>
              <FeatureTitle>Easy Surveys</FeatureTitle>
              <FeatureDescription>
                Complete simple surveys on topics you care about. Each survey takes just 5-15 minutes of your time.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaDollarSign />
              </FeatureIcon>
              <FeatureTitle>Earn Real Money</FeatureTitle>
              <FeatureDescription>
                Get paid for every completed survey. Earn points that can be redeemed for cash, gift cards, and more.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaGift />
              </FeatureIcon>
              <FeatureTitle>Amazing Rewards</FeatureTitle>
              <FeatureDescription>
                Choose from hundreds of rewards including PayPal cash, Amazon gift cards, and exclusive merchandise.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaUsers />
              </FeatureIcon>
              <FeatureTitle>Global Community</FeatureTitle>
              <FeatureDescription>
                Join a worldwide community of opinion leaders and help shape the future of products and services.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaChartLine />
              </FeatureIcon>
              <FeatureTitle>Track Progress</FeatureTitle>
              <FeatureDescription>
                Monitor your earnings, survey completion rate, and rewards history with our comprehensive dashboard.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaShieldAlt />
              </FeatureIcon>
              <FeatureTitle>Secure & Private</FeatureTitle>
              <FeatureDescription>
                Your data is protected with industry-standard security. We never share your personal information.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </SectionContent>
      </FeaturesSection>

      <StatsSection>
        <SectionContent>
          <SectionTitle style={{ color: 'white' }}>Our Impact</SectionTitle>
          <StatsGrid>
            <StatCard>
              <h3>50K+</h3>
              <p>Active Members</p>
            </StatCard>
            <StatCard>
              <h3>1M+</h3>
              <p>Surveys Completed</p>
            </StatCard>
            <StatCard>
              <h3>$2M+</h3>
              <p>Rewards Distributed</p>
            </StatCard>
            <StatCard>
              <h3>150+</h3>
              <p>Countries Served</p>
            </StatCard>
          </StatsGrid>
        </SectionContent>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home;
