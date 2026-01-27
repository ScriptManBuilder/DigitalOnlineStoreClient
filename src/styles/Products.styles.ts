import styled from 'styled-components';

export const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  
  @media (max-width: 1024px) {
    padding: 50px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 15px;
  }
  
  @media (max-width: 425px) {
    padding: 30px 15px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 50px;
  text-align: center;
  color: #1d1d1f;
  font-weight: 600;
  letter-spacing: -1px;
  
  @media (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 35px;
    letter-spacing: -0.5px;
  }
  
  @media (max-width: 425px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  @media (max-width: 375px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1.5rem;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ProductCard = styled.div`
  background: transparent;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }
  }
`;

export const ProductImage = styled.div<{ color: string }>`
  height: 280px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border-radius: 18px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    height: 250px;
    font-size: 4.5rem;
  }
  
  @media (max-width: 768px) {
    height: 220px;
    font-size: 4rem;
    border-radius: 14px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 425px) {
    height: 280px;
    font-size: 5rem;
    border-radius: 12px;
  }
  
  @media (max-width: 375px) {
    height: 250px;
    font-size: 4.5rem;
  }
  
  @media (max-width: 320px) {
    height: 220px;
    font-size: 4rem;
  }
`;

export const ProductInfo = styled.div`
  padding: 0;
`;

export const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #1d1d1f;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.15rem;
  }
`;

export const ProductDescription = styled.p`
  color: #6e6e73;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const ProductPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1d1d1f;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const BuyButton = styled.button`
  background: #0071e3;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 980px;
  font-weight: 400;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: #0077ed;
  }
  
  @media (max-width: 768px) {
    padding: 7px 18px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 425px) {
    padding: 8px 20px;
    font-size: 0.875rem;
  }
`;