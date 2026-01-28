import styled from 'styled-components';
import type { Product } from '../services/api';

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
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s ease;
  position: relative;

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    max-height: 95vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  z-index: 10;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f7;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    font-size: 1.3rem;
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
  min-height: 400px;
  padding: 3rem;
  border-radius: 20px 0 0 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 500px;
  }

  @media (max-width: 768px) {
    border-radius: 16px 16px 0 0;
    min-height: 300px;
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
  font-size: 2rem;
  margin: 0;
  color: #1d1d1f;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0071e3;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e5e7;
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #86868b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: #1d1d1f;
  font-weight: 500;
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
  background: #0071e3;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0077ed;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 113, 227, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  background: white;
  color: #0071e3;
  border: 2px solid #0071e3;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f7;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const getRandomColor = () => {
  const colors = ['#f5f5f7', '#fbfbfd', '#fff9f0', '#f0f9ff', '#fff0f5'];
  return colors[Math.floor(Math.random() * colors.length)];
};

function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
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
              <BuyButton>Buy Now</BuyButton>
              <AddToCartButton>Add to Cart</AddToCartButton>
            </ButtonGroup>
          </InfoSection>
        </ModalContent>
      </Modal>
    </Overlay>
  );
}

export default ProductDetailModal;
