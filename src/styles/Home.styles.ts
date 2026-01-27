import styled from 'styled-components';

export const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;

export const Hero = styled.section`
  text-align: center;
  padding: 60px 20px 80px;
  background-color: #fbfbfd;
  color: #1d1d1f;
  
  @media (max-width: 1024px) {
    padding: 50px 20px 70px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px 50px;
  }
  
  @media (max-width: 425px) {
    padding: 30px 15px 40px;
  }
  
  @media (max-width: 375px) {
    padding: 25px 12px 35px;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1.1;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 1024px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 425px) {
    font-size: 1.6rem;
    line-height: 1.2;
  }
  
  @media (max-width: 375px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1.3rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #6e6e73;
  font-weight: 400;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 425px) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  @media (max-width: 375px) {
    font-size: 0.9rem;
    margin-bottom: 18px;
  }
`;

export const CTAButton = styled.button`
  background-color: #0071e3;
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 980px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0077ed;
  }
  
  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 0.95rem;
  }
  
  @media (max-width: 425px) {
    padding: 10px 22px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 375px) {
    padding: 9px 20px;
    font-size: 0.875rem;
  }
`;

export const ImageSection = styled.section`
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    margin: 40px auto;
    gap: 15px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 30px auto;
    padding: 0 20px;
    gap: 12px;
  }
  
  @media (max-width: 425px) {
    margin: 25px auto;
    padding: 0 15px;
    gap: 10px;
  }
`;

export const ImageCard = styled.div`
  aspect-ratio: 1;
  border-radius: 18px;
  overflow: hidden;
  background-color: #f5f5f7;
  
  @media (max-width: 768px) {
    border-radius: 14px;
  }
  
  @media (max-width: 425px) {
    border-radius: 12px;
  }
`;

export const Features = styled.section`
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  
  @media (max-width: 1024px) {
    margin: 50px auto;
    gap: 35px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 40px auto;
    padding: 0 20px;
    gap: 25px;
  }
  
  @media (max-width: 425px) {
    margin: 30px auto;
    padding: 0 15px;
    gap: 20px;
  }
`;

export const FeatureCard = styled.div`
  text-align: center;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px 10px;
  }
  
  @media (max-width: 425px) {
    padding: 10px 5px;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #1d1d1f;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.2rem;
  }
`;

export const FeatureDescription = styled.p`
  color: #6e6e73;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;
