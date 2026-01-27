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
import { productsAPI } from '../services/api';
import type { Product } from '../services/api';

const getRandomColor = () => {
  const colors = ['#f5f5f7', '#fbfbfd', '#fff9f0', '#f0f9ff', '#fff0f5'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getProductIcon = (name: string) => {
  const lowercaseName = name.toLowerCase();
  
  if (lowercaseName.includes('photo') || lowercaseName.includes('camera')) return '📷';
  if (lowercaseName.includes('design') || lowercaseName.includes('template')) return '🎨';
  if (lowercaseName.includes('book') || lowercaseName.includes('guide') || lowercaseName.includes('ebook')) return '📚';
  if (lowercaseName.includes('music') || lowercaseName.includes('audio')) return '🎵';
  if (lowercaseName.includes('video') || lowercaseName.includes('film')) return '🎬';
  if (lowercaseName.includes('business') || lowercaseName.includes('plan')) return '💼';
  if (lowercaseName.includes('marketing') || lowercaseName.includes('analytics')) return '📊';
  if (lowercaseName.includes('code') || lowercaseName.includes('programming')) return '💻';
  if (lowercaseName.includes('game')) return '🎮';
  if (lowercaseName.includes('art')) return '🖼️';
  
  return '📦';
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          <ProductCard key={product.id}>
            <ProductImage color={getRandomColor()}>
              {getProductIcon(product.name)}
            </ProductImage>
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductFooter>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <BuyButton>Buy Now</BuyButton>
              </ProductFooter>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
}

export default Products;
