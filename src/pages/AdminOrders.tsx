import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminOrdersAPI } from '../services/api';
import type { Order, OrderStatus } from '../services/api';
import styled from 'styled-components';
import AdminHeader from '../components/AdminHeader';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
`;

const Content = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h2`
  font-size: 1.75rem;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  font-weight: 600;
`;

const FiltersBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  border: 1px solid ${props => props.active ? '#667eea' : '#e5e5e7'};
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#6e6e73'};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    border-color: #667eea;
    color: ${props => props.active ? 'white' : '#667eea'};
  }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e5e7;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OrderId = styled.span`
  font-size: 0.85rem;
  color: #6e6e73;
  font-family: monospace;
`;

const OrderDate = styled.span`
  font-size: 0.9rem;
  color: #1d1d1f;
`;

const statusColors: Record<OrderStatus, string> = {
  PROCESSING: '#e65100',
  ACCEPTED: '#1565c0',
  SHIPPED: '#7b1fa2',
  DELIVERED: '#2e7d32'
};

const statusBg: Record<OrderStatus, string> = {
  PROCESSING: '#fff3e0',
  ACCEPTED: '#e3f2fd',
  SHIPPED: '#f3e5f5',
  DELIVERED: '#e8f5e9'
};

const StatusBadge = styled.span<{ status: OrderStatus }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => statusBg[props.status]};
  color: ${props => statusColors[props.status]};
`;

const UserInfo = styled.div`
  background: #f5f5f7;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #1d1d1f;
`;

const UserEmail = styled.div`
  font-size: 0.85rem;
  color: #6e6e73;
`;

const OrderItems = styled.div`
  border-top: 1px solid #e5e5e7;
  padding-top: 20px;
`;

const OrderItemRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: #f5f5f7;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrderItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OrderItemName = styled.span`
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 4px;
`;

const OrderItemDetails = styled.span`
  font-size: 0.85rem;
  color: #6e6e73;
`;

const OrderItemPrice = styled.span`
  font-weight: 600;
  color: #1d1d1f;
  display: flex;
  align-items: center;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid #e5e5e7;
  flex-wrap: wrap;
  gap: 16px;
`;

const OrderTotal = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1d1d1f;
`;

const StatusActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const StatusSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #e5e5e7;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  background: white;
  color: #1d1d1f;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const UpdateButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  
  span {
    font-size: 5rem;
    display: block;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #1d1d1f;
    margin-bottom: 12px;
  }
  
  p {
    color: #6e6e73;
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

const statusLabels: Record<OrderStatus, string> = {
  PROCESSING: 'Processing',
  ACCEPTED: 'Accepted',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered'
};

const allStatuses: OrderStatus[] = ['PROCESSING', 'ACCEPTED', 'SHIPPED', 'DELIVERED'];

function AdminOrders() {
  const { isAdmin, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<string, OrderStatus>>({});

  useEffect(() => {
    if (isAdmin) {
      loadOrders();
    }
  }, [isAdmin, activeFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const status = activeFilter === 'ALL' ? undefined : activeFilter;
      const data = await adminOrdersAPI.getAll(status);
      setOrders(data);
      
      // Initialize selected statuses
      const statuses: Record<string, OrderStatus> = {};
      data.forEach(order => {
        statuses[order.id] = order.status;
      });
      setSelectedStatuses(statuses);
    } catch (err: any) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    setSelectedStatuses(prev => ({
      ...prev,
      [orderId]: status
    }));
  };

  const handleUpdateStatus = async (orderId: string) => {
    const newStatus = selectedStatuses[orderId];
    if (!newStatus) return;
    
    try {
      setUpdatingOrderId(orderId);
      await adminOrdersAPI.updateStatus(orderId, newStatus);
      await loadOrders();
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert('Error updating status: ' + (err.message || 'Please try again later'));
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <LoadingState>Loading...</LoadingState>;
  }

  if (!isAdmin) {
    return <LoadingState>Access Denied</LoadingState>;
  }

  return (
    <DashboardContainer>
      <AdminHeader title="Order Management" icon="📦" activePage="orders" />

      <Content>
        <PageTitle>Customer Orders</PageTitle>
        
        <FiltersBar>
          <FilterButton 
            active={activeFilter === 'ALL'} 
            onClick={() => setActiveFilter('ALL')}
          >
            All Orders
          </FilterButton>
          {allStatuses.map(status => (
            <FilterButton
              key={status}
              active={activeFilter === status}
              onClick={() => setActiveFilter(status)}
            >
              {statusLabels[status]}
            </FilterButton>
          ))}
        </FiltersBar>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
        ) : orders.length === 0 ? (
          <EmptyOrders>
            <span>📭</span>
            <h2>No orders yet</h2>
            <p>When customers place orders, they will appear here</p>
          </EmptyOrders>
        ) : (
          <OrdersList>
            {orders.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <OrderInfo>
                    <OrderId>Order #{order.id.slice(-8).toUpperCase()}</OrderId>
                    <OrderDate>{formatDate(order.createdAt)}</OrderDate>
                  </OrderInfo>
                  <StatusBadge status={order.status}>
                    {statusLabels[order.status]}
                  </StatusBadge>
                </OrderHeader>
                
                {order.user && (
                  <UserInfo>
                    <UserAvatar>
                      {order.user.name?.charAt(0).toUpperCase() || order.user.email.charAt(0).toUpperCase()}
                    </UserAvatar>
                    <UserDetails>
                      <UserName>{order.user.name || 'No name'}</UserName>
                      <UserEmail>{order.user.email}</UserEmail>
                    </UserDetails>
                  </UserInfo>
                )}
                
                <OrderItems>
                  {order.items.map((item) => (
                    <OrderItemRow key={item.id}>
                      <OrderItemImage>
                        {item.productImageUrl ? (
                          <img src={item.productImageUrl} alt={item.productName} />
                        ) : (
                          <span style={{ fontSize: '1.5rem', color: '#86868b' }}>📷</span>
                        )}
                      </OrderItemImage>
                      <OrderItemInfo>
                        <OrderItemName>{item.productName}</OrderItemName>
                        <OrderItemDetails>
                          {item.quantity} × ${item.productPrice.toFixed(2)}
                        </OrderItemDetails>
                      </OrderItemInfo>
                      <OrderItemPrice>${item.totalPrice.toFixed(2)}</OrderItemPrice>
                    </OrderItemRow>
                  ))}
                </OrderItems>
                
                <OrderFooter>
                  <OrderTotal>Total: ${order.totalPrice.toFixed(2)}</OrderTotal>
                  
                  <StatusActions>
                    <StatusSelect 
                      value={selectedStatuses[order.id] || order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    >
                      {allStatuses.map(status => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
                        </option>
                      ))}
                    </StatusSelect>
                    <UpdateButton
                      onClick={() => handleUpdateStatus(order.id)}
                      disabled={
                        updatingOrderId === order.id || 
                        selectedStatuses[order.id] === order.status
                      }
                    >
                      {updatingOrderId === order.id ? 'Updating...' : 'Update Status'}
                    </UpdateButton>
                  </StatusActions>
                </OrderFooter>
              </OrderCard>
            ))}
          </OrdersList>
        )}
      </Content>
    </DashboardContainer>
  );
}

export default AdminOrders;
