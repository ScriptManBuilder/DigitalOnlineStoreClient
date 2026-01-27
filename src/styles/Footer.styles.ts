import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #f5f5f7;
  margin-top: 80px;
  padding: 40px 40px 20px;
  border-top: 1px solid #d2d2d7;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    margin-top: 60px;
    padding: 35px 20px 15px;
  }
  
  @media (max-width: 768px) {
    margin-top: 50px;
    padding: 30px 15px 15px;
  }
  
  @media (max-width: 425px) {
    margin-top: 40px;
    padding: 25px 15px 12px;
  }
`;

export const FooterContent = styled.div`
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    gap: 35px;
    margin-bottom: 25px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 425px) {
    padding-bottom: 10px;
  }
`;

export const FooterTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const FooterLink = styled.a`
  color: #6e6e73;
  text-decoration: none;
  font-size: 0.875rem;
  margin-bottom: 8px;
  transition: color 0.2s;

  &:hover {
    color: #1d1d1f;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 7px;
  }
  
  @media (max-width: 425px) {
    font-size: 0.875rem;
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  margin: 0;
  padding-top: 20px;
  border-top: 1px solid #d2d2d7;
  text-align: center;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding-top: 15px;
  }
`;

export const Copyright = styled.p`
  color: #6e6e73;
  font-size: 0.75rem;
  
  @media (max-width: 425px) {
    font-size: 0.7rem;
  }
`;