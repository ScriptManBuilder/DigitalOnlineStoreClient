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
  max-width: 420px;
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

const Icon = styled.div<{ variant?: 'warning' | 'error' | 'info' }>`
  font-size: 2.5rem;
  line-height: 1;
  
  ${props => {
    switch (props.variant) {
      case 'error':
        return 'filter: hue-rotate(-15deg);';
      case 'warning':
        return 'filter: hue-rotate(30deg);';
      default:
        return '';
    }
  }}
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
  gap: 0.75rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => {
    switch (props.variant) {
      case 'danger':
        return `
          background: #ff3b30;
          color: white;
          
          &:hover {
            background: #e5342a;
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'primary':
        return `
          background: #0071e3;
          color: white;
          
          &:hover {
            background: #0077ed;
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      default:
        return `
          background: #f5f5f7;
          color: #1d1d1f;
          
          &:hover {
            background: #e8e8ed;
          }
          
          &:active {
            background: #d2d2d7;
          }
        `;
    }
  }}
`;

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'warning' | 'error' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  variant = 'warning',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '⚠️';
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
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
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button 
            variant={variant === 'error' || variant === 'warning' ? 'danger' : 'primary'} 
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </ButtonContainer>
      </Dialog>
    </Overlay>
  );
}

export default ConfirmDialog;
