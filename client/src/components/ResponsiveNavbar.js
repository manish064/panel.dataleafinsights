import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Gift,
  ChevronDown,
  History,
  CreditCard
} from 'lucide-react';
import styled, { keyframes, css } from 'styled-components';

// --- Styled Components ---

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const NavContainer = styled.nav`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  
  @supports not (backdrop-filter: blur(12px)) {
    background: white;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    height: 60px;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
    height: 56px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 120px;
    width: auto;
  }
  
  @media (max-width: 768px) {
    img {
      height: 90px;
    }
  }
  
  @media (max-width: 480px) {
    img {
      height: 70px;
    }
  }
`;

const LogoText = styled.div`
  position: absolute;
  left: 98px;
  top: 50%;
  transform: translateY(-40%);
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  white-space: nowrap;
  
  span {
    color: #0fc179;
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    left: 72px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    left: 58px;
  }
`;

const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.$active ? '#059669' : '#334155'};
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: ${props => props.$active ? 'rgba(15, 193, 121, 0.12)' : 'transparent'};
  position: relative;

  &:hover {
    color: #059669;
    background: ${props => props.$active ? 'rgba(15, 193, 121, 0.12)' : 'rgba(15, 193, 121, 0.05)'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const AuthGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.4rem 0.5rem 0.4rem 0.4rem;
  border-radius: 9999px;
  cursor: pointer;
  color: #334155;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #0fc179;
    color: #0fc179;
    background: #f0fdf4;
    box-shadow: 0 4px 6px -1px rgba(15, 193, 121, 0.1);
    transform: translateY(-1px);
  }

  svg.chevron {
    color: #94a3b8;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 240px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  overflow: hidden;
  padding: 0.5rem;
  z-index: 100;
  animation: ${fadeInDown} 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #334155;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #0fc179;
    transform: translateX(4px);
  }

  svg {
    color: #94a3b8;
    transition: color 0.2s ease;
  }
  
  &:hover svg {
    color: #0fc179;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #ef4444;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.25rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;

  &:hover {
    background: #fef2f2;
    transform: translateX(4px);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: #0fc179;
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  background: white;
  padding: 1.5rem;
  border-top: 1px solid #f1f5f9;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: ${fadeInDown} 0.3s ease-out;

  @media (max-width: 1024px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  text-decoration: none;
  color: ${props => props.$active ? '#0fc179' : '#334155'};
  background: ${props => props.$active ? '#f0fdf4' : 'transparent'};
  border-radius: 12px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #0fc179;
    transform: translateX(4px);
  }
`;

const PrimaryButton = styled(Link)`
  background: #0fc179;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(15, 193, 121, 0.3), 0 2px 4px -1px rgba(15, 193, 121, 0.15);

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(15, 193, 121, 0.4), 0 4px 6px -2px rgba(15, 193, 121, 0.2);
    color: white;
  }
`;

const SecondaryButton = styled(Link)`
  color: #64748b;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border-radius: 12px;

  &:hover {
    color: #0f172a;
    background: #f8fafc;
  }
`;

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileDropdownOpen(false);
  };

  return (
    <NavContainer>
      <NavContent>
        {/* Logo */}
        <LogoLink to={user ? '/dashboard' : '/'}>
          <img
            src="/dataleaf-logo.png"
            alt="DataLeaf"
          />
          <LogoText>Data<span>Leaf</span></LogoText>
        </LogoLink>

        {/* Desktop Nav */}
        <NavLinks>
          {user ? (
            <>
              <NavLink to="/dashboard" $active={isActive('/dashboard')}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>
              <NavLink to="/surveys" $active={isActive('/surveys')}>
                <ClipboardList size={18} />
                Surveys
              </NavLink>
              <NavLink to="/rewards" $active={isActive('/rewards')}>
                <Gift size={18} />
                Rewards
              </NavLink>
            </>
          ) : null}
        </NavLinks>

        {/* Right Side Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <ProfileButton
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                $isOpen={profileDropdownOpen}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                  <User size={18} />
                </div>
                <span className="hidden sm:block">{user.firstName}</span>
                <ChevronDown size={14} className="chevron" />
              </ProfileButton>

              {profileDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem to="/profile">
                    <User size={18} />
                    Profile
                  </DropdownItem>
                  <DropdownItem to="/payment-history">
                    <History size={18} />
                    History
                  </DropdownItem>
                  <LogoutButton onClick={handleLogout}>
                    <LogOut size={18} />
                    Logout
                  </LogoutButton>
                </DropdownMenu>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <SecondaryButton to="/login">Login</SecondaryButton>
              <PrimaryButton to="/register">Sign Up</PrimaryButton>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </div>
      </NavContent>

      {/* Mobile Menu */}
      <MobileMenu $isOpen={isOpen} ref={mobileMenuRef}>
        {user ? (
          <>
            <MobileLink to="/dashboard" $active={isActive('/dashboard')}>
              <LayoutDashboard size={20} />
              Dashboard
            </MobileLink>
            <MobileLink to="/surveys" $active={isActive('/surveys')}>
              <ClipboardList size={20} />
              Surveys
            </MobileLink>
            <MobileLink to="/rewards" $active={isActive('/rewards')}>
              <Gift size={20} />
              Rewards
            </MobileLink>
            <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #f1f5f9' }} />
            <MobileLink to="/profile">
              <User size={20} />
              Profile
            </MobileLink>
            <MobileLink to="/payment-history">
              <History size={20} />
              History
            </MobileLink>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                width: '100%',
                background: '#fef2f2',
                color: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              <LogOut size={20} />
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <MobileLink to="/login" style={{ justifyContent: 'center' }}>
              Login
            </MobileLink>
            <PrimaryButton to="/register" style={{ textAlign: 'center', justifyContent: 'center' }}>
              Sign Up
            </PrimaryButton>
          </div>
        )}
      </MobileMenu>
    </NavContainer>
  );
};

export default ResponsiveNavbar;