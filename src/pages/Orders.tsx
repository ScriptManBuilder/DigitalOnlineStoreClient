import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import type { Order } from '../services/api';
import {
  OrdersContainer,
  PageTitle,
  OrdersList,
  OrderCard,
  OrderHeader,
  OrderInfo,
  OrderId,
  OrderDate,
  StatusBadge,
  OrderItems,
  OrderItemRow,
  OrderItemImage,
  OrderItemInfo,
  OrderItemName,
  OrderItemDetails,
  OrderItemPrice,
  OrderTotal,
  EmptyOrders,
  BackButton,
  ShopButton
} from '../styles/Orders.styles';

const statusLabels: Record<string, string> = {
  PROCESSING: 'Processing',
  ACCEPTED: 'Accepted',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered'
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersAPI.getAll();
      setOrders(data);
    } catch (err: any) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
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

  if (!isAuthenticated || !user) {
    return (
      <OrdersContainer>
        <PageTitle>My Orders</PageTitle>
        <EmptyOrders>
          <span>🔒</span>
          <h2>Sign in to continue</h2>
          <p>Please sign in to view your orders</p>
          <ShopButton onClick={() => navigate('/products')}>
            Browse Products
          </ShopButton>
        </EmptyOrders>
      </OrdersContainer>
    );
  }

  if (loading) {
    return (
      <OrdersContainer>
        <PageTitle>My Orders</PageTitle>
        <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
      </OrdersContainer>
    );
  }

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <BackButton onClick={() => navigate(-1)}>
          ← Back
        </BackButton>
        <PageTitle>My Orders</PageTitle>
        <EmptyOrders>
          <span>📦</span>
          <h2>No orders yet</h2>
          <p>Place your first order in our store</p>
          <ShopButton onClick={() => navigate('/products')}>
            Browse Products
          </ShopButton>
        </EmptyOrders>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <BackButton onClick={() => navigate(-1)}>
        ← Back
      </BackButton>
      <PageTitle>My Orders</PageTitle>
      
      <OrdersList>
        {orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderInfo>
                <OrderId>Order #{order.id.slice(-8).toUpperCase()}</OrderId>
                <OrderDate>{formatDate(order.createdAt)}</OrderDate>
              </OrderInfo>
              <StatusBadge status={order.status}>
                {statusLabels[order.status] || order.statusText}
              </StatusBadge>
            </OrderHeader>
            
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
            
            <OrderTotal>
              Total: ${order.totalPrice.toFixed(2)}
            </OrderTotal>
          </OrderCard>
        ))}
      </OrdersList>
    </OrdersContainer>
  );
}

export default Orders;
