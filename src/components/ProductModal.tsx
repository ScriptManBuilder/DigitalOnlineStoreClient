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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Required = styled.span`
  color: #ff3b30;
  margin-left: 0.25rem;
`;

const CharCounter = styled.span<{ isOverLimit?: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.isOverLimit ? '#ff3b30' : '#86868b'};
  font-weight: 400;
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

const FieldError = styled.div`
  color: #ff3b30;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #d2d2d7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f5f5f7;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderIcon = styled.div`
  font-size: 3rem;
  color: #86868b;
`;

const FileInputWrapper = styled.div`
  position: relative;
`;

const FileInput = styled.input`
  display: none;
`;

const FileButton = styled.label`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #f5f5f7;
  color: #1d1d1f;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: 1px solid #d2d2d7;

  &:hover {
    background: #e8e8ed;
    border-color: #0071e3;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.5rem;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: white;
    transform: scale(1.1);
  }
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
  onSubmit: (data: CreateProductData & UpdateProductData, image?: File) => Promise<void>;
}

// Константы валидации
const VALIDATION = {
  NAME_MIN: 3,
  NAME_MAX: 100,
  DESCRIPTION_MIN: 10,
  DESCRIPTION_MAX: 500,
  PRICE_MIN: 0.01,
  PRICE_MAX: 999999.99,
};

function ProductModal({ product, onClose, onSubmit }: ProductModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    description?: string;
    price?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price.toFixed(2));
      if (product.imageUrl) {
        setPreviewUrl(product.imageUrl);
      }
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка типа файла
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, GIF, or WebP)');
      return;
    }

    // Проверка размера (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setImageFile(file);
    setError('');

    // Создаем preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};
    let isValid = true;

    // Валидация имени
    const trimmedName = name.trim();
    if (!trimmedName) {
      errors.name = 'Product name is required';
      isValid = false;
    } else if (trimmedName.length < VALIDATION.NAME_MIN) {
      errors.name = `Name must be at least ${VALIDATION.NAME_MIN} characters`;
      isValid = false;
    } else if (trimmedName.length > VALIDATION.NAME_MAX) {
      errors.name = `Name must not exceed ${VALIDATION.NAME_MAX} characters`;
      isValid = false;
    }

    // Валидация описания (если заполнено)
    const trimmedDescription = description.trim();
    if (trimmedDescription) {
      if (trimmedDescription.length < VALIDATION.DESCRIPTION_MIN) {
        errors.description = `Description must be at least ${VALIDATION.DESCRIPTION_MIN} characters`;
        isValid = false;
      } else if (trimmedDescription.length > VALIDATION.DESCRIPTION_MAX) {
        errors.description = `Description must not exceed ${VALIDATION.DESCRIPTION_MAX} characters`;
        isValid = false;
      }
    }

    // Валидация цены
    const priceNum = parseFloat(price);
    if (!price || isNaN(priceNum)) {
      errors.price = 'Price is required';
      isValid = false;
    } else if (priceNum < VALIDATION.PRICE_MIN) {
      errors.price = `Price must be at least $${VALIDATION.PRICE_MIN}`;
      isValid = false;
    } else if (priceNum > VALIDATION.PRICE_MAX) {
      errors.price = `Price must not exceed $${VALIDATION.PRICE_MAX.toLocaleString()}`;
      isValid = false;
    } else {
      // Проверка на 2 знака после запятой
      const decimalPart = price.split('.')[1];
      if (decimalPart && decimalPart.length > 2) {
        errors.price = 'Price must have at most 2 decimal places';
        isValid = false;
      }
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

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

      await onSubmit(data, imageFile || undefined);
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
              <span>
                Product Name<Required>*</Required>
              </span>
              <CharCounter isOverLimit={name.length > VALIDATION.NAME_MAX}>
                {name.length}/{VALIDATION.NAME_MAX}
              </CharCounter>
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) {
                  setFieldErrors(prev => ({ ...prev, name: undefined }));
                }
              }}
              placeholder="Enter product name"
              disabled={isSubmitting}
              maxLength={VALIDATION.NAME_MAX + 10}
            />
            {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label>
              <span>Description</span>
              <CharCounter isOverLimit={description.length > VALIDATION.DESCRIPTION_MAX}>
                {description.length}/{VALIDATION.DESCRIPTION_MAX}
              </CharCounter>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (fieldErrors.description) {
                  setFieldErrors(prev => ({ ...prev, description: undefined }));
                }
              }}
              placeholder={`Enter product description (min ${VALIDATION.DESCRIPTION_MIN} characters, optional)`}
              disabled={isSubmitting}
              maxLength={VALIDATION.DESCRIPTION_MAX + 10}
            />
            {fieldErrors.description && <FieldError>{fieldErrors.description}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label>
              <span>
                Price ($)<Required>*</Required>
              </span>
              <CharCounter>
                ${VALIDATION.PRICE_MIN} - ${VALIDATION.PRICE_MAX.toLocaleString()}
              </CharCounter>
            </Label>
            <Input
              type="number"
              step="0.01"
              min={VALIDATION.PRICE_MIN}
              max={VALIDATION.PRICE_MAX}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (fieldErrors.price) {
                  setFieldErrors(prev => ({ ...prev, price: undefined }));
                }
              }}
              placeholder="0.00"
              disabled={isSubmitting}
            />
            {fieldErrors.price && <FieldError>{fieldErrors.price}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label>Product Image</Label>
            <ImageUploadSection>
              {previewUrl && (
                <ImagePreview>
                  <img src={previewUrl} alt="Product preview" />
                  <RemoveImageButton
                    type="button"
                    onClick={handleRemoveImage}
                    title="Remove image"
                  >
                    ×
                  </RemoveImageButton>
                </ImagePreview>
              )}
              {!previewUrl && (
                <ImagePreview>
                  <PlaceholderIcon>📷</PlaceholderIcon>
                </ImagePreview>
              )}
              <FileInputWrapper>
                <FileInput
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                />
                <FileButton htmlFor="image-upload">
                  {previewUrl ? '🔄 Change Image' : '📁 Choose Image'}
                </FileButton>
                <FileInfo>
                  {imageFile ? (
                    <span>📦 {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)</span>
                  ) : (
                    <span>JPG, PNG, GIF or WebP (max 5MB)</span>
                  )}
                </FileInfo>
              </FileInputWrapper>
            </ImageUploadSection>
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
