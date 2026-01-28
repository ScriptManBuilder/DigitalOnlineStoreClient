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
import { productsAPI } from '../services/api';
import type { Product } from '../services/api';

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
                <BuyButton onClick={(e) => handleBuyClick(e, product)}>Buy Now</BuyButton>
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
    </ProductsContainer>
  );
}

export default Products;
