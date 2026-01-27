import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 18px;
  width: 90%;
  max-width: 450px;
  padding: 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    max-width: 95%;
    border-radius: 14px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #6e6e73;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f7;
    color: #1d1d1f;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  padding: 0 30px;
  margin-top: 20px;
  gap: 10px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  background: ${props => props.active ? '#f5f5f7' : 'transparent'};
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#1d1d1f' : '#6e6e73'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f7;
  }
`;

export const FormContainer = styled.form`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  font-size: 1rem;
  color: #1d1d1f;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #0071e3;
    box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
  }
  
  &::placeholder {
    color: #6e6e73;
  }
  
  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 0.95rem;
  }
`;

export const Button = styled.button`
  background: #0071e3;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #0077ed;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 0.95rem;
  }
`;

export const ErrorAlert = styled.div`
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-left: 4px solid #ff4d4f;
  color: #cf1322;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  animation: shake 0.3s ease-out;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  &::before {
    content: '⚠️';
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

export const SuccessAlert = styled.div`
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  border-left: 4px solid #52c41a;
  color: #389e0d;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &::before {
    content: '✓';
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

export const Divider = styled.div`
  text-align: center;
  color: #6e6e73;
  font-size: 0.875rem;
  margin: 8px 0;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: #d2d2d7;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

export const FormLink = styled.p`
  text-align: center;
  color: #6e6e73;
  font-size: 0.875rem;
  margin: 8px 0 0 0;
  
  span {
    color: #0071e3;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
