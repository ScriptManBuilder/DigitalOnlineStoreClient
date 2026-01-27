import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { adminAPI } from '../services/api';
import type { User } from '../services/api';

const Container = styled.div`
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
  }
  
  @media (max-width: 425px) {
    padding: 0.75rem 0.875rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: #2d3748;
  color: #ffffff;
  border: 1px solid #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  &:hover {
    background: #4a5568;
    border-color: #718096;
  }
  
  @media (max-width: 425px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1rem;
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

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 425px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const PageTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #1a202c;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.125rem;
  }
`;

const UsersCount = styled.span`
  color: #718096;
  font-size: 0.9rem;
  font-weight: 400;
  
  @media (max-width: 425px) {
    font-size: 0.8125rem;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Thead = styled.thead`
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f7fafc;
  }
`;

const Td = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #1a202c;
`;

const UserName = styled.div`
  font-weight: 500;
  color: #1a202c;
`;

const UserEmail = styled.div`
  color: #718096;
  font-size: 0.8125rem;
  margin-top: 0.125rem;
`;

const DateText = styled.span`
  color: #718096;
`;

const MobileCards = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    padding: 1rem;
  }
  
  @media (max-width: 425px) {
    gap: 0.75rem;
    padding: 0.875rem;
  }
`;

const MobileCard = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 425px) {
    padding: 0.875rem;
  }
`;

const MobileCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileLabel = styled.span`
  font-size: 0.75rem;
  color: #718096;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MobileValue = styled.span`
  font-size: 0.875rem;
  color: #1a202c;
  font-weight: 500;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #718096;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #718096;
  text-align: center;
  
  @media (max-width: 425px) {
    padding: 2rem 1rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 425px) {
    font-size: 2.5rem;
  }
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 1rem;
  
  @media (max-width: 425px) {
    font-size: 0.9375rem;
  }
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #e53e3e;
  text-align: center;
  
  @media (max-width: 425px) {
    padding: 2rem 1rem;
  }
`;

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminAPI.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <BackButton onClick={() => navigate('/admin/dashboard')}>
              ← Back
            </BackButton>
            <Title>Users Management</Title>
          </HeaderLeft>
        </HeaderContent>
      </Header>

      <Content>
        <PageHeader>
          <PageTitle>All Users</PageTitle>
          <UsersCount>{users.length} total users</UsersCount>
        </PageHeader>

        <TableContainer>
          {loading && <LoadingState>Loading users...</LoadingState>}
          
          {error && (
            <ErrorState>
              <EmptyIcon>⚠️</EmptyIcon>
              <EmptyText>{error}</EmptyText>
            </ErrorState>
          )}

          {!loading && !error && users.length === 0 && (
            <EmptyState>
              <EmptyIcon>👥</EmptyIcon>
              <EmptyText>No users found</EmptyText>
            </EmptyState>
          )}

          {!loading && !error && users.length > 0 && (
            <>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Created At</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td>
                        <UserName>{user.name}</UserName>
                      </Td>
                      <Td>
                        <UserEmail>{user.email}</UserEmail>
                      </Td>
                      <Td>
                        <DateText>
                          {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                        </DateText>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <MobileCards>
                {users.map((user) => (
                  <MobileCard key={user.id}>
                    <MobileCardRow>
                      <MobileLabel>Name</MobileLabel>
                      <MobileValue>{user.name}</MobileValue>
                    </MobileCardRow>
                    <MobileCardRow>
                      <MobileLabel>Email</MobileLabel>
                      <MobileValue>{user.email}</MobileValue>
                    </MobileCardRow>
                    <MobileCardRow>
                      <MobileLabel>Created</MobileLabel>
                      <MobileValue>
                        {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                      </MobileValue>
                    </MobileCardRow>
                  </MobileCard>
                ))}
              </MobileCards>
            </>
          )}
        </TableContainer>
      </Content>
    </Container>
  );
}

export default AdminUsers;
