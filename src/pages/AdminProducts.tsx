import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { productsAPI, ApiError } from '../services/api';
import type { Product, CreateProductData, UpdateProductData } from '../services/api';
import ProductModal from '../components/ProductModal';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #1d1d1f;
  font-weight: 600;
  
  span {
    font-size: 1.75rem;
    margin-right: 0.5rem;
  }
`;

const Subtitle = styled.span`
  color: #666;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.75rem;
  padding-left: 0.75rem;
  border-left: 2px solid #e0e0e0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: none;
  color: #0071e3;
  border: 1px solid #0071e3;
  padding: 0.5rem 1.25rem;
  border-radius: 980px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: #0071e3;
    color: white;
  }
`;

const Content = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: #1d1d1f;
  font-weight: 600;
`;

const AddButton = styled.button`
  background: #0071e3;
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #0077ed;
    transform: translateY(-1px);
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background: #f5f5f7;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #1d1d1f;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  &:hover {
    background: #fafafa;
  }
`;

const Td = styled.td`
  padding: 1rem 1.5rem;
  color: #1d1d1f;
  font-size: 0.95rem;
`;

const ProductName = styled.div`
  font-weight: 500;
`;

const ProductDescription = styled.div`
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.span`
  font-weight: 600;
  color: #0071e3;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: 1px solid #d2d2d7;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  color: #1d1d1f;

  &:hover {
    background: #f5f5f7;
    border-color: #0071e3;
    color: #0071e3;
  }

  &.delete:hover {
    border-color: #ff3b30;
    color: #ff3b30;
    background: #fff5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
`;

const ErrorState = styled.div`
  background: #fff3f3;
  color: #d32f2f;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #ffcdd2;
`;

function AdminProducts() {
  const { isAdmin, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err: any) {
      if (err instanceof ApiError && err.statusCode === 401) {
        logout();
        navigate('/admin/login');
      } else {
        setError(err.message || 'Failed to load products');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (data: CreateProductData) => {
    try {
      await productsAPI.create(data);
      await loadProducts();
      setShowModal(false);
    } catch (err: any) {
      if (err instanceof ApiError && err.statusCode === 401) {
        logout();
        navigate('/admin/login');
      }
      throw err;
    }
  };

  const handleEditProduct = async (data: UpdateProductData) => {
    if (!editingProduct) return;

    try {
      await productsAPI.update(editingProduct.id, data);
      await loadProducts();
      setShowModal(false);
      setEditingProduct(null);
    } catch (err: any) {
      if (err instanceof ApiError && err.statusCode === 401) {
        logout();
        navigate('/admin/login');
      }
      throw err;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeletingId(id);
      await productsAPI.delete(id);
      await loadProducts();
    } catch (err: any) {
      if (err instanceof ApiError && err.statusCode === 401) {
        logout();
        navigate('/admin/login');
      } else if (err instanceof ApiError && err.statusCode === 404) {
        alert('Product not found');
      } else {
        alert(err.message || 'Failed to delete product');
      }
    } finally {
      setDeletingId(null);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingState>Loading...</LoadingState>
      </PageContainer>
    );
  }

  // Если не администратор, редирект на страницу входа
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <Title>
              <span>🛒</span>
              Digital Shop
              <Subtitle>Product Management</Subtitle>
            </Title>
          </Logo>
          <HeaderActions>
            <BackButton onClick={() => navigate('/admin/dashboard')}>
              ← Back to Dashboard
            </BackButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <Content>
        <PageHeader>
          <PageTitle>Products</PageTitle>
          <AddButton onClick={openAddModal}>
            <span>➕</span>
            Add Product
          </AddButton>
        </PageHeader>

        {error && <ErrorState>{error}</ErrorState>}

        {loading ? (
          <TableContainer>
            <LoadingState>Loading products...</LoadingState>
          </TableContainer>
        ) : products.length === 0 ? (
          <TableContainer>
            <EmptyState>
              <EmptyIcon>📦</EmptyIcon>
              <EmptyText>No products yet</EmptyText>
              <AddButton onClick={openAddModal}>
                <span>➕</span>
                Add Your First Product
              </AddButton>
            </EmptyState>
          </TableContainer>
        ) : (
          <TableContainer>
            <Table>
              <Thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Price</Th>
                  <Th style={{ width: '150px' }}>Actions</Th>
                </tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <ProductName>{product.name}</ProductName>
                    </Td>
                    <Td>
                      <ProductDescription>
                        {product.description || '—'}
                      </ProductDescription>
                    </Td>
                    <Td>
                      <Price>${product.price.toFixed(2)}</Price>
                    </Td>
                    <Td>
                      <ActionButtons>
                        <IconButton
                          onClick={() => openEditModal(product)}
                          title="Edit"
                        >
                          ✏️ Edit
                        </IconButton>
                        <IconButton
                          className="delete"
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={deletingId === product.id}
                          title="Delete"
                        >
                          🗑️ {deletingId === product.id ? '...' : 'Delete'}
                        </IconButton>
                      </ActionButtons>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Content>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={closeModal}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        />
      )}
    </PageContainer>
  );
}

export default AdminProducts;
