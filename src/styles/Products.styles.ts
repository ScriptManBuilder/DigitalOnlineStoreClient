import styled from 'styled-components';

export const ProductsContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 40px;
  
  @media (max-width: 1024px) {
    padding: 60px 32px;
  }
  
  @media (max-width: 768px) {
    padding: 50px 24px;
  }
  
  @media (max-width: 425px) {
    padding: 40px 20px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 60px;
  text-align: center;
  color: #000000;
  font-weight: 700;
  letter-spacing: -0.04em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;
  
  @media (max-width: 1024px) {
    font-size: 3rem;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
    letter-spacing: -0.03em;
  }
  
  @media (max-width: 425px) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
  
  @media (max-width: 375px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1.625rem;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const ProductCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border-color: #d4d4d4;
  }
  
  @media (max-width: 768px) {
    border-radius: 10px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
    }
  }
  
  @media (max-width: 425px) {
    border-radius: 10px;
  }
`;

export const ProductImage = styled.div<{ color: string }>`
  height: 300px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  overflow: hidden;
  
  img {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover img {
    transform: scale(1.03);
  }
  
  @media (max-width: 1024px) {
    height: 260px;
    font-size: 4.5rem;
  }
  
  @media (max-width: 768px) {
    height: 240px;
    font-size: 4rem;
  }
  
  @media (max-width: 425px) {
    height: 300px;
    font-size: 5rem;
  }
  
  @media (max-width: 375px) {
    height: 260px;
    font-size: 4.5rem;
  }
  
  @media (max-width: 320px) {
    height: 240px;
    font-size: 4rem;
  }
`;

export const ProductInfo = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 180px;
  
  @media (max-width: 768px) {
    padding: 20px;
    min-height: 170px;
  }
  
  @media (max-width: 425px) {
    padding: 20px;
  }
`;

export const ProductTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #000000;
  font-weight: 600;
  letter-spacing: -0.02em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  max-height: 3.25em;
  word-break: break-word;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.125rem;
  }
`;

export const ProductDescription = styled.p`
  color: #525252;
  font-size: 0.9375rem;
  line-height: 1.5;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 2.8125em;
  word-break: break-word;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
  
  @media (max-width: 425px) {
    font-size: 0.875rem;
  }
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const ProductPrice = styled.span`
  font-size: 1.375rem;
  font-weight: 700;
  color: #000000;
  letter-spacing: -0.02em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const BuyButton = styled.button`
  background: #ffffff;
  color: #000000;
  border: 1px solid #d4d4d4;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  letter-spacing: 0.025em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;

  &:hover {
    background: #f5f5f5;
    border-color: #a3a3a3;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: 8px 16px;
  }
`;