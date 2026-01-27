import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { productsAPI, adminAPI } from '../services/api';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
`;

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
  
  @media (max-width: 425px) {
    padding: 0.75rem 0.875rem;
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
  
  @media (max-width: 425px) {
    font-size: 1rem;
    
    span {
      font-size: 1.125rem;
    }
  }
`;

const Subtitle = styled.span`
  color: #a0aec0;
  font-size: 0.75rem;
  font-weight: 400;
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid #4a5568;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserName = styled.span`
  color: #e2e8f0;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  
  @media (max-width: 425px) {
    font-size: 0.8rem;
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

const Content = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2rem;
  
  @media (max-width: 1024px) {
    padding: 1.5rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }
  
  @media (max-width: 425px) {
    padding: 1rem 0.875rem;
  }
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
  }
  
  @media (max-width: 425px) {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
    border-radius: 8px;
  }
`;

const WelcomeTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.125rem;
  }
`;

const WelcomeText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  opacity: 0.95;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.4;
  }
  
  @media (max-width: 425px) {
    font-size: 0.8125rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  color: #1a202c;
  margin: 0 0 1.25rem 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 425px) {
    font-size: 0.9375rem;
    margin-bottom: 0.875rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    gap: 0.875rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #cbd5e0;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 8px;
  }
  
  @media (max-width: 425px) {
    padding: 1rem;
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.625rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
`;

const CardTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: #718096;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 425px) {
    font-size: 0.6875rem;
    margin-bottom: 0.5rem;
  }
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.375rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
`;

const CardLabel = styled.div`
  color: #a0aec0;
  font-size: 0.8125rem;
  
  @media (max-width: 425px) {
    font-size: 0.75rem;
  }
`;

const QuickActionsSection = styled.div`
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
  
  @media (max-width: 425px) {
    margin-top: 1.25rem;
  }
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.875rem;
  }
  
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const ActionButton = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #667eea;
    background: #f7fafc;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
  }
  
  @media (max-width: 425px) {
    padding: 0.875rem;
    gap: 0.75rem;
  }
`;

const ActionIcon = styled.span`
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.25rem;
  }
`;

const ActionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ActionTitle = styled.span`
  font-weight: 600;
  color: #1a202c;
  font-size: 0.875rem;
  
  @media (max-width: 425px) {
    font-size: 0.8125rem;
  }
`;

const ActionDesc = styled.span`
  color: #718096;
  font-size: 0.75rem;
  
  @media (max-width: 425px) {
    font-size: 0.6875rem;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: #666;
`;

function AdminDashboard() {
  const { admin, isAdmin, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      loadProductsCount();
      loadUsersCount();
    }
  }, [isAdmin]);

  const loadProductsCount = async () => {
    try {
      setLoadingProducts(true);
      const products = await productsAPI.getAll();
      setProductsCount(products.length);
    } catch (err) {
      console.error('Failed to load products count:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadUsersCount = async () => {
    try {
      setLoadingUsers(true);
      const users = await adminAPI.getAllUsers();
      setUsersCount(users.length);
    } catch (err) {
      console.error('Failed to load users count:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleLogout = async () => {
    await logout('admin'); // Явно указываем тип logout
    navigate('/admin/login'); // Редирект на страницу входа админа
  };

  const handleNavigateToProducts = () => {
    navigate('/admin/products');
  };

  const handleNavigateToUsers = () => {
    navigate('/admin/users');
  };

  // Если не администратор, редирект на страницу входа
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <Title>
              <span>🛒</span>
              Digital Shop
              <Subtitle>Admin Panel</Subtitle>
            </Title>
          </Logo>
          <UserInfo>
            <UserName>👤 {admin?.name || admin?.username}</UserName>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserInfo>
        </HeaderContent>
      </Header>

      <Content>
        <WelcomeSection>
          <WelcomeTitle>Welcome back, {admin?.name || admin?.username}! 👋</WelcomeTitle>
          <WelcomeText>
            Here's what's happening with your store today. You can manage products, track orders, and view customer insights.
          </WelcomeText>
        </WelcomeSection>

        <SectionTitle>📊 Overview</SectionTitle>
        <Grid>
          <Card>
            <CardIcon>📦</CardIcon>
            <CardTitle>Total Products</CardTitle>
            <CardValue>{loadingProducts ? '...' : productsCount}</CardValue>
            <CardLabel>Active products in store</CardLabel>
          </Card>

          <Card>
            <CardIcon>🛍️</CardIcon>
            <CardTitle>Total Orders</CardTitle>
            <CardValue>0</CardValue>
            <CardLabel>Orders received</CardLabel>
          </Card>

          <Card>
            <CardIcon>👥</CardIcon>
            <CardTitle>Total Users</CardTitle>
            <CardValue>{loadingUsers ? '...' : usersCount}</CardValue>
            <CardLabel>Registered users</CardLabel>
          </Card>

          <Card>
            <CardIcon>💰</CardIcon>
            <CardTitle>Revenue</CardTitle>
            <CardValue>$0</CardValue>
            <CardLabel>Total revenue</CardLabel>
          </Card>
        </Grid>

        <QuickActionsSection>
          <SectionTitle>⚡ Quick Actions</SectionTitle>
          <QuickActionsGrid>
            <ActionButton onClick={handleNavigateToProducts}>
              <ActionIcon>➕</ActionIcon>
              <ActionText>
                <ActionTitle>Add Product</ActionTitle>
                <ActionDesc>Create new product</ActionDesc>
              </ActionText>
            </ActionButton>

            <ActionButton onClick={handleNavigateToProducts}>
              <ActionIcon>📋</ActionIcon>
              <ActionText>
                <ActionTitle>Manage Products</ActionTitle>
                <ActionDesc>View all products</ActionDesc>
              </ActionText>
            </ActionButton>

            <ActionButton onClick={handleNavigateToUsers}>
              <ActionIcon>👥</ActionIcon>
              <ActionText>
                <ActionTitle>Users</ActionTitle>
                <ActionDesc>View all users</ActionDesc>
              </ActionText>
            </ActionButton>

            <ActionButton>
              <ActionIcon>⚙️</ActionIcon>
              <ActionText>
                <ActionTitle>Settings</ActionTitle>
                <ActionDesc>Configure store</ActionDesc>
              </ActionText>
            </ActionButton>
          </QuickActionsGrid>
        </QuickActionsSection>
      </Content>
    </DashboardContainer>
  );
}

export default AdminDashboard;
