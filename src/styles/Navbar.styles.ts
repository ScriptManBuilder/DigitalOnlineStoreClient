import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const NavContainer = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  height: 52px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 16px;
    height: 52px;
  }
  
  @media (max-width: 375px) {
    padding: 0 12px;
  }
`;

export const Logo = styled(Link)`
  color: #000000;
  font-size: 1.375rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: -0.02em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    color: #525252;
  }
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.125rem;
  }
  
  @media (max-width: 375px) {
    font-size: 1.0625rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    color: #525252;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CartButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  color: #000000;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  svg {
    width: 22px;
    height: 22px;
    stroke: currentColor;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #000000;
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0;
  border-radius: 50%;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-left: 0.5rem;
`;

export const ProfileButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  padding: 7px 18px;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #1a1a1a;
  }
`;

export const LogoutButton = styled.button`
  background: #ffffff;
  color: #000000;
  border: 1px solid #d4d4d4;
  padding: 7px 18px;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #f5f5f5;
    border-color: #a3a3a3;
  }
`;

export const LoginButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  padding: 7px 18px;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #1a1a1a;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: 1px solid #e5e5e5;
  color: #000000;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: #f5f5f5;
    border-color: #d4d4d4;
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    gap: 0;
    padding: 0;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    
    ${NavLink} {
      display: flex;
      justify-content: flex-start;
      padding: 10px 16px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #000000;
      border-bottom: 1px solid #f0f0f0;
      
      &:hover {
        background: #f5f5f5;
      }
    }
    
    ${CartButton} {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 16px;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      border-bottom: 1px solid #f0f0f0;
      border-radius: 0;
      background: transparent;
      gap: 8px;
      position: relative;
      
      &:hover {
        background: #f5f5f5;
        border-bottom: 1px solid #f0f0f0;
      }
      
      svg {
        width: 18px;
        height: 18px;
      }
      
      ${CartBadge} {
        position: static;
        margin-left: auto;
        border-radius: 10px;
        min-width: 20px;
        height: 20px;
        font-size: 0.6875rem;
        padding: 0 6px;
      }
    }
    
    ${ProfileButton}, ${LogoutButton} {
      display: flex;
      justify-content: center;
      margin: 6px 12px;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.8125rem;
    }
    
    ${LoginButton} {
      display: flex;
      justify-content: center;
      margin: 8px 12px 12px 12px;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 0.8125rem;
    }
  }
`;
