import styled from 'styled-components';
import type { Product } from '../services/api';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { cartAPI } from '../services/api';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

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

  @media (max-width: 768px) {
    border-radius: 12px;
    max-height: 95vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  color: #525252;
  z-index: 10;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #e5e5e5;
    color: #000000;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    font-size: 1.125rem;
  }
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div<{ color?: string }>`
  background: ${props => props.color || '#f5f5f7'};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 450px;
  padding: 3rem;
  border-radius: 16px 0 0 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 500px;
  }

  @media (max-width: 768px) {
    border-radius: 12px 12px 0 0;
    min-height: 320px;
    padding: 2rem;
  }
`;

const PlaceholderIcon = styled.div`
  font-size: 8rem;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const InfoSection = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
    gap: 1.25rem;
  }
`;

const ProductTitle = styled.h2`
  font-size: 2.25rem;
  margin: 0;
  color: #000000;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 2.75rem;
  font-weight: 700;
  color: #000000;
  margin: 0.75rem 0 0 0;
  letter-spacing: -0.03em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const ProductDescription = styled.p`
  color: #525252;
  font-size: 1.0625rem;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: #737373;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
`;

const InfoValue = styled.span`
  font-size: 1.0625rem;
  color: #000000;
  font-weight: 500;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', 'Segoe UI', sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BuyButton = styled.button`
  flex: 1;
  background: #000000;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.025em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;

  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  background: white;
  color: #000000;
  border: 1px solid #d4d4d4;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.025em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;

  &:hover:not(:disabled) {
    background: #f5f5f5;
    border-color: #a3a3a3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

const getRandomColor = () => {
  const colors = ['#f5f5f7', '#fbfbfd', '#fff9f0', '#f0f9ff', '#fff0f5'];
  return colors[Math.floor(Math.random() * colors.length)];
};

function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to your cart');
      return;
    }

    try {
      setIsAdding(true);
      await cartAPI.addItem(product.id, 1);
      
      // Генерируем событие для обновления корзины
      window.dispatchEvent(new Event('cartUpdated'));
      
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 2000);
      
      if (onAddToCart) {
        onAddToCart(product);
      }
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      alert('Error adding to cart: ' + (err.message || 'Please try again later'));
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    alert('Buy Now functionality coming soon!');
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalContent>
          <ImageSection color={getRandomColor()}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <PlaceholderIcon>📷</PlaceholderIcon>
            )}
          </ImageSection>
          <InfoSection>
            <div>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            </div>

            <Divider />

            <ProductDescription>
              {product.description || 'No description available for this product.'}
            </ProductDescription>

            <Divider />

            <InfoRow>
              <InfoLabel>Product ID</InfoLabel>
              <InfoValue>#{product.id.slice(0, 8).toUpperCase()}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>Added On</InfoLabel>
              <InfoValue>{formatDate(product.createdAt)}</InfoValue>
            </InfoRow>

            {product.updatedAt !== product.createdAt && (
              <InfoRow>
                <InfoLabel>Last Updated</InfoLabel>
                <InfoValue>{formatDate(product.updatedAt)}</InfoValue>
              </InfoRow>
            )}

            <ButtonGroup>
              <BuyButton onClick={handleBuyNow}>Buy Now</BuyButton>
              <AddToCartButton onClick={handleAddToCart} disabled={isAdding || addSuccess}>
                {addSuccess ? '✓ Added' : isAdding ? 'Adding...' : 'Add to Cart'}
              </AddToCartButton>
            </ButtonGroup>
          </InfoSection>
        </ModalContent>
      </Modal>
    </Overlay>
  );
}

export default ProductDetailModal;
