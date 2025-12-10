import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #0d3d3d;
  color: #e2e8f0;
  padding: 3rem 0 2rem;
  margin-top: auto;
  font-family: 'Inter', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: white;
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    position: relative;
    padding-bottom: 0.5rem;
    display: inline-block;
    width: fit-content;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      height: 3px;
      background: #0fc179;
      border-radius: 2px;
    }
    
    span {
      color: #0fc179;
    }
  }

  h3 {
    color: white;
    margin: 0 0 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    color: #cbd5e1;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.75rem;
    
    a {
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.2s ease;
      font-size: 0.95rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      
      &:before {
        content: '•';
        color: #0fc179;
        margin-right: 0.5rem;
      }
      
      &:hover {
        color: #0fc179;
        transform: translateX(5px);
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: #0fc179;
      color: #0d3d3d;
      border-color: #0fc179;
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(15, 193, 121, 0.3);
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2.5rem auto 0;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  
  p {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Brand Section */}
        <FooterSection>
          <h2>Data<span>Leaf</span></h2>
          <p>
            Premium market research rooted in empathy and evidence.
            We help you make decisions that matter.
          </p>
          <SocialLinks>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="mailto:info@dataleafinsights.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </SocialLinks>
        </FooterSection>

        {/* Company Links */}
        <FooterSection>
          <h3>Company</h3>
          <LinkList>
            <li><Link to="/dashboard">About Us</Link></li>
            <li><Link to="/dashboard">Contact</Link></li>
            <li><Link to="/dashboard">Careers</Link></li>
          </LinkList>
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white' }}>Email Us</h3>
            <a href="mailto:info@dataleafinsights.com" style={{ color: '#0fc179', textDecoration: 'none', fontSize: '0.95rem' }}>
              info@dataleafinsights.com
            </a>
          </div>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          &copy; {new Date().getFullYear()} DataLeaf. All rights reserved.
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
