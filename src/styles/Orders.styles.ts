import styled, { css } from 'styled-components';
import type { OrderStatus } from '../services/api';

export const OrdersContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  min-height: calc(100vh - 200px);
  
  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  color: #1d1d1f;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OrderCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e5e7;
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OrderId = styled.span`
  font-size: 0.85rem;
  color: #6e6e73;
  font-family: monospace;
`;

export const OrderDate = styled.span`
  font-size: 0.9rem;
  color: #1d1d1f;
`;

const statusColors = {
  PROCESSING: css`
    background: #fff3e0;
    color: #e65100;
    border-color: #ffcc80;
  `,
  ACCEPTED: css`
    background: #e3f2fd;
    color: #1565c0;
    border-color: #90caf9;
  `,
  SHIPPED: css`
    background: #f3e5f5;
    color: #7b1fa2;
    border-color: #ce93d8;
  `,
  DELIVERED: css`
    background: #e8f5e9;
    color: #2e7d32;
    border-color: #a5d6a7;
  `,
};

export const StatusBadge = styled.span<{ status: OrderStatus }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid;
  ${props => statusColors[props.status]}
`;

export const OrderItems = styled.div`
  border-top: 1px solid #e5e5e7;
  padding-top: 20px;
`;

export const OrderItemRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const OrderItemImage = styled.div`
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

export const OrderItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OrderItemName = styled.span`
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 4px;
`;

export const OrderItemDetails = styled.span`
  font-size: 0.85rem;
  color: #6e6e73;
`;

export const OrderItemPrice = styled.span`
  font-weight: 600;
  color: #1d1d1f;
  display: flex;
  align-items: center;
`;

export const OrderTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid #e5e5e7;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1d1d1f;
`;

export const EmptyOrders = styled.div`
  text-align: center;
  padding: 80px 20px;
  
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
    margin-bottom: 24px;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #666;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f5f5f5;
    border-color: #667eea;
    color: #667eea;
    transform: translateX(-4px);
  }
`;

export const ShopButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`;

// === Admin Orders Styles ===

export const FiltersBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
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

export const UserInfo = styled.div`
  background: #f5f5f7;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserAvatar = styled.div`
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

export const UserDetails = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-weight: 600;
  color: #1d1d1f;
`;

export const UserEmail = styled.div`
  font-size: 0.85rem;
  color: #6e6e73;
`;

export const StatusSelect = styled.select`
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

export const StatusActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const UpdateButton = styled.button`
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
