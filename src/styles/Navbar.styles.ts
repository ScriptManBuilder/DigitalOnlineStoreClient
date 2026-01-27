import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  padding: 0 40px;
  height: 44px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 10px;
    height: 48px;
  }
  
  @media (max-width: 375px) {
    padding: 0 8px;
  }
`;

export const Logo = styled(Link)`
  color: #1d1d1f;
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: -0.5px;
  
  &:hover {
    color: #6e6e73;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1rem;
  }
  
  @media (max-width: 375px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 320px) {
    font-size: 0.9rem;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    gap: 0.6rem;
  }
  
  @media (max-width: 425px) {
    gap: 0.4rem;
  }
  
  @media (max-width: 375px) {
    gap: 0.3rem;
  }
`;

export const NavLink = styled(Link)`
  color: #1d1d1f;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 400;
  transition: color 0.2s;
  
  &:hover {
    color: #6e6e73;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CartButton = styled.button`
  background: none;
  border: none;
  color: #1d1d1f;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s;
  white-space: nowrap;
  
  &:hover {
    color: #6e6e73;
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    gap: 2px;
  }
  
  @media (max-width: 425px) {
    font-size: 0.7rem;
    gap: 2px;
  }
  
  @media (max-width: 375px) {
    font-size: 0.65rem;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-left: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-left: 0.3rem;
  }
  
  @media (max-width: 425px) {
    gap: 0.3rem;
    margin-left: 0.2rem;
  }
`;

export const ProfileButton = styled.button`
  background: none;
  color: #0071e3;
  border: 1px solid #0071e3;
  padding: 6px 16px;
  font-size: 0.875rem;
  border-radius: 980px;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #0071e3;
    color: white;
  }
  
  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 0.75rem;
  }
  
  @media (max-width: 425px) {
    padding: 4px 10px;
    font-size: 0.7rem;
  }
  
  @media (max-width: 375px) {
    padding: 4px 8px;
    font-size: 0.65rem;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  color: #1d1d1f;
  border: 1px solid #d2d2d7;
  padding: 6px 16px;
  font-size: 0.875rem;
  border-radius: 980px;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #f5f5f7;
    border-color: #1d1d1f;
  }
  
  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 0.75rem;
  }
  
  @media (max-width: 425px) {
    padding: 4px 10px;
    font-size: 0.7rem;
  }
  
  @media (max-width: 375px) {
    padding: 4px 8px;
    font-size: 0.65rem;
  }
`;

export const LoginButton = styled.button`
  background: #0071e3;
  color: white;
  border: none;
  padding: 6px 16px;
  font-size: 0.875rem;
  border-radius: 980px;
  cursor: pointer;
  font-weight: 400;
  transition: background 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #0077ed;
  }
  
  @media (max-width: 768px) {
    padding: 5px 12px;
    font-size: 0.75rem;
  }
  
  @media (max-width: 425px) {
    padding: 4px 10px;
    font-size: 0.7rem;
  }
  
  @media (max-width: 375px) {
    padding: 4px 8px;
    font-size: 0.65rem;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #1d1d1f;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;
