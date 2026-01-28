import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dialog = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  margin: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Icon = styled.div<{ variant?: 'success' | 'error' | 'warning' | 'info' }>`
  font-size: 2.5rem;
  line-height: 1;
`;

const Title = styled.h3`
  margin: 0;
  color: #1d1d1f;
  font-size: 1.25rem;
  font-weight: 600;
  flex: 1;
`;

const Message = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: #0071e3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background: #0077ed;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

function AlertDialog({
  isOpen,
  title,
  message,
  buttonText = 'OK',
  variant = 'info',
  onClose,
}: AlertDialogProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialog>
        <Header>
          <Icon variant={variant}>{getIcon()}</Icon>
          <Title>{title}</Title>
        </Header>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button onClick={onClose}>{buttonText}</Button>
        </ButtonContainer>
      </Dialog>
    </Overlay>
  );
}

export default AlertDialog;
