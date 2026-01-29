import styled from 'styled-components';

export const CartContainer = styled.div`
  max-width: 1200px;
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

export const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 300px;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CartItem = styled.div`
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e5e7;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
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
  
  @media (max-width: 600px) {
    width: 100%;
    height: 200px;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemName = styled.h3`
  font-size: 1.2rem;
  color: #1d1d1f;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const ItemPrice = styled.span`
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f5f5f7;
  border-radius: 10px;
  padding: 6px 12px;
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #1d1d1f;
  
  &:hover {
    background: #667eea;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuantityValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
  color: #1d1d1f;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff3b30;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s;
  border-radius: 8px;
  
  &:hover {
    background: rgba(255, 59, 48, 0.1);
  }
`;

export const ItemTotal = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-width: 100px;
  
  span {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1d1d1f;
  }
  
  small {
    color: #6e6e73;
    font-size: 0.85rem;
  }
  
  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

export const CartSummary = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e5e7;
  position: sticky;
  top: 80px;
  height: fit-content;
`;

export const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  color: #1d1d1f;
  margin: 0 0 20px 0;
  font-weight: 600;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 1rem;
  color: #6e6e73;
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e5e7;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d1d1f;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ClearCartButton = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #ff3b30;
  border: 1px solid #ff3b30;
  border-radius: 12px;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 59, 48, 0.1);
  }
`;

export const EmptyCart = styled.div`
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

export const ContinueShoppingButton = styled.button`
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
