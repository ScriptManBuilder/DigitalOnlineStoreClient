import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { productsAPI, ApiError } from '../services/api';
import type { Product, CreateProductData, UpdateProductData } from '../services/api';
import ProductModal from '../components/ProductModal';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertDialog from '../components/AlertDialog';
import AdminHeader from '../components/AdminHeader';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
`;

const Content = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  
  @media (max-width: 1024px) {
    padding: 2rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
  
  @media (max-width: 425px) {
    padding: 1rem 0.75rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PageTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: #1d1d1f;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
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
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    background: #0077ed;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
    font-size: 0.9375rem;
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    border: none;
    background: transparent;
    overflow: visible;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  @media (max-width: 768px) {
    display: none;
  }
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

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductThumbnail = styled.div<{ $hasImage?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
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
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const EmptyText = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    font-size: 1rem;
  }
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #ff3b30;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    font-size: 1rem;
  }
`;

// Mobile Cards
const MobileCardsContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const MobileCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MobileCardHeader = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`;

const MobileCardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MobileCardTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #1d1d1f;
  margin-bottom: 0.25rem;
`;

const MobileCardDesc = styled.div`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MobileCardPrice = styled.div`
  font-weight: 600;
  color: #0071e3;
  font-size: 1.125rem;
`;

const MobileCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f0f0f0;
  
  button {
    flex: 1;
  }
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
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: 'success' | 'error' | 'warning' | 'info';
  }>({ isOpen: false, title: '', message: '', variant: 'info' });

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

  const handleAddProduct = async (data: CreateProductData, image?: File) => {
    try {
      await productsAPI.create(data, image);
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

  const handleEditProduct = async (data: UpdateProductData, image?: File) => {
    if (!editingProduct) return;

    try {
      await productsAPI.update(editingProduct.id, data, image);
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

  const handleDeleteProduct = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      onConfirm: () => confirmDeleteProduct(id),
    });
  };

  const confirmDeleteProduct = async (id: string) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });

    try {
      setDeletingId(id);
      await productsAPI.delete(id);
      await loadProducts();
    } catch (err: any) {
      if (err instanceof ApiError && err.statusCode === 401) {
        logout();
        navigate('/admin/login');
      } else if (err instanceof ApiError && err.statusCode === 404) {
        setAlertDialog({
          isOpen: true,
          title: 'Product Not Found',
          message: 'The product you are trying to delete could not be found.',
          variant: 'error',
        });
      } else {
        setAlertDialog({
          isOpen: true,
          title: 'Error',
          message: err.message || 'Failed to delete product. Please try again.',
          variant: 'error',
        });
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
      <AdminHeader title="Product Management" icon="📦" activePage="products" />

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
                  <Th style={{ width: '40%' }}>Product</Th>
                  <Th style={{ width: '30%' }}>Description</Th>
                  <Th style={{ width: '15%' }}>Price</Th>
                  <Th style={{ width: '15%' }}>Actions</Th>
                </tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <ProductCell>
                        <ProductThumbnail $hasImage={!!product.imageUrl}>
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} />
                          ) : (
                            '📷'
                          )}
                        </ProductThumbnail>
                        <ProductInfo>
                          <ProductName>{product.name}</ProductName>
                        </ProductInfo>
                      </ProductCell>
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
            
            {/* Mobile Cards View */}
            <MobileCardsContainer>
              {products.map((product) => (
                <MobileCard key={product.id}>
                  <MobileCardHeader>
                    <ProductThumbnail $hasImage={!!product.imageUrl}>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} />
                      ) : (
                        '📷'
                      )}
                    </ProductThumbnail>
                    <MobileCardInfo>
                      <MobileCardTitle>{product.name}</MobileCardTitle>
                      <MobileCardDesc>
                        {product.description || 'No description'}
                      </MobileCardDesc>
                    </MobileCardInfo>
                  </MobileCardHeader>
                  <MobileCardPrice>${product.price.toFixed(2)}</MobileCardPrice>
                  <MobileCardActions>
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
                  </MobileCardActions>
                </MobileCard>
              ))}
            </MobileCardsContainer>
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

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        variant="warning"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />

      <AlertDialog
        isOpen={alertDialog.isOpen}
        title={alertDialog.title}
        message={alertDialog.message}
        variant={alertDialog.variant}
        onClose={() => setAlertDialog({ ...alertDialog, isOpen: false })}
      />
    </PageContainer>
  );
}

export default AdminProducts;
