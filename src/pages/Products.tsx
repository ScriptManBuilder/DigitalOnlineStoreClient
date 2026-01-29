import { useEffect, useState } from 'react';
import {
  ProductsContainer,
  PageTitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductDescription,
  ProductFooter,
  ProductPrice,
  BuyButton
} from '../styles/Products.styles';
import ProductDetailModal from '../components/ProductDetailModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { productsAPI, cartAPI } from '../services/api';
import type { Product } from '../services/api';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.025em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: #1a1a1a;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: 8px 16px;
  }
`;

const SuccessMessage = styled.span`
  color: #059669;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  letter-spacing: 0.025em;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;
`;

const getRandomColor = () => {
  const colors = ['#f5f5f7', '#fbfbfd', '#fff9f0', '#f0f9ff', '#fff0f5'];
  return colors[Math.floor(Math.random() * colors.length)];
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    if (!user) {
      setShowSignInDialog(true);
      return;
    }
    
    try {
      setAddingToCart(product.id);
      await cartAPI.addItem(product.id, 1);
      
      // Генерируем событие для обновления корзины
      window.dispatchEvent(new Event('cartUpdated'));
      
      setAddedToCart(product.id);
      setTimeout(() => setAddedToCart(null), 2000);
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      alert('Error adding to cart: ' + (err.message || 'Please try again later'));
    } finally {
      setAddingToCart(null);
    }
  };

  const handleBuyClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    handleProductClick(product);
  };

  if (loading) {
    return (
      <ProductsContainer>
        <PageTitle>Our Digital Products</PageTitle>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>Loading products...</p>
      </ProductsContainer>
    );
  }

  if (error) {
    return (
      <ProductsContainer>
        <PageTitle>Our Digital Products</PageTitle>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#d32f2f' }}>{error}</p>
      </ProductsContainer>
    );
  }

  if (products.length === 0) {
    return (
      <ProductsContainer>
        <PageTitle>Our Digital Products</PageTitle>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>No products available yet.</p>
      </ProductsContainer>
    );
  }

  return (
    <ProductsContainer>
      <PageTitle>Our Digital Products</PageTitle>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
            <ProductImage color={getRandomColor()}>
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '4rem', color: '#86868b' }}>📷</span>
              )}
            </ProductImage>
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductFooter>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {addedToCart === product.id ? (
                    <SuccessMessage>✓ Added</SuccessMessage>
                  ) : (
                    <AddToCartButton 
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={addingToCart === product.id}
                    >
                      {addingToCart === product.id ? '...' : '🛒 Add to Cart'}
                    </AddToCartButton>
                  )}
                  <BuyButton onClick={(e) => handleBuyClick(e, product)}>Details</BuyButton>
                </div>
              </ProductFooter>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <ConfirmDialog
        isOpen={showSignInDialog}
        title="Sign In Required"
        message="Please sign in to add items to your cart"
        confirmText="OK"
        cancelText="Exit"
        variant="info"
        onConfirm={() => setShowSignInDialog(false)}
        onCancel={() => setShowSignInDialog(false)}
      />
    </ProductsContainer>
  );
}

export default Products;
