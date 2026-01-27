import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Product, CreateProductData, UpdateProductData } from '../services/api';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  color: #1d1d1f;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #1d1d1f;
  font-weight: 500;
  font-size: 0.875rem;
`;

const Required = styled.span`
  color: #ff3b30;
  margin-left: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071e3;
  }

  &::placeholder {
    color: #86868b;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0071e3;
  }

  &::placeholder {
    color: #86868b;
  }
`;

const ErrorMessage = styled.div`
  background: #fff3f3;
  color: #d32f2f;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  border: 1px solid #ffcdd2;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: #0071e3;
  color: white;

  &:hover:not(:disabled) {
    background: #0077ed;
  }
`;

const SecondaryButton = styled(Button)`
  background: #f5f5f7;
  color: #1d1d1f;

  &:hover:not(:disabled) {
    background: #e8e8ed;
  }
`;

interface ProductModalProps {
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: CreateProductData & UpdateProductData) => Promise<void>;
}

function ProductModal({ product, onClose, onSubmit }: ProductModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price.toFixed(2));
    }
  }, [product]);

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError('Product name is required');
      return false;
    }

    const priceNum = parseFloat(price);
    if (!price || isNaN(priceNum) || priceNum <= 0) {
      setError('Price must be a positive number');
      return false;
    }

    // Проверка на 2 знака после запятой
    const decimalPart = price.split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
      setError('Price must have at most 2 decimal places');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        name: name.trim(),
        description: description.trim() || undefined,
        price: parseFloat(parseFloat(price).toFixed(2)),
      };

      await onSubmit(data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Title>{product ? 'Edit Product' : 'Add Product'}</Title>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label>
              Product Name<Required>*</Required>
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description (optional)"
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Price ($)<Required>*</Required>
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              disabled={isSubmitting}
            />
          </FormGroup>

          <ButtonGroup>
            <SecondaryButton type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : product ? 'Update' : 'Create'}
            </PrimaryButton>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
}

export default ProductModal;
