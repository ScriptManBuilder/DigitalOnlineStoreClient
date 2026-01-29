import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const Header = styled.header`
  background: #1a1d29;
  border-bottom: none;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    
    span {
      font-size: 1.25rem;
    }
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#667eea' : '#2d3748'};
  color: #ffffff;
  border: 1px solid ${props => props.active ? '#667eea' : '#4a5568'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8125rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#5a6fd6' : '#4a5568'};
    border-color: ${props => props.active ? '#5a6fd6' : '#718096'};
  }
  
  @media (max-width: 425px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const LogoutButton = styled.button`
  background: #2d3748;
  color: #ffffff;
  border: 1px solid #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8125rem;
  transition: all 0.2s ease;

  &:hover {
    background: #4a5568;
    border-color: #718096;
  }
  
  @media (max-width: 425px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }
`;

interface AdminHeaderProps {
  title: string;
  icon: string;
  activePage: 'dashboard' | 'products' | 'users' | 'orders';
}

function AdminHeader({ title, icon, activePage }: AdminHeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout('admin');
    navigate('/admin/login');
  };

  return (
    <Header>
      <HeaderContent>
        <Logo>
          <Title><span>{icon}</span> {title}</Title>
        </Logo>
        <NavButtons>
          <NavButton 
            active={activePage === 'dashboard'} 
            onClick={() => navigate('/admin/dashboard')}
          >
            Dashboard
          </NavButton>
          <NavButton 
            active={activePage === 'products'} 
            onClick={() => navigate('/admin/products')}
          >
            Products
          </NavButton>
          <NavButton 
            active={activePage === 'users'} 
            onClick={() => navigate('/admin/users')}
          >
            Users
          </NavButton>
          <NavButton 
            active={activePage === 'orders'} 
            onClick={() => navigate('/admin/orders')}
          >
            Orders
          </NavButton>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavButtons>
      </HeaderContent>
    </Header>
  );
}

export default AdminHeader;
