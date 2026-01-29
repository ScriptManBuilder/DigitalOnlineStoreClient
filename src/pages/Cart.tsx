import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cartAPI, ordersAPI } from '../services/api';
import type { Cart as CartType } from '../services/api';
import {
  CartContainer,
  PageTitle,
  CartContent,
  CartItems,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  ItemActions,
  QuantityControl,
  QuantityButton,
  QuantityValue,
  RemoveButton,
  ItemTotal,
  CartSummary,
  SummaryTitle,
  SummaryRow,
  SummaryTotal,
  CheckoutButton,
  ClearCartButton,
  EmptyCart,
  ContinueShoppingButton,
  BackButton
} from '../styles/Cart.styles';

function Cart() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (err: any) {
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1 || updating) return;
    
    try {
      setUpdating(true);
      const updatedCart = await cartAPI.updateItem(itemId, newQuantity);
      setCart(updatedCart);
    } catch (err: any) {
      console.error('Error updating quantity:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (updating) return;
    
    try {
      setUpdating(true);
      const updatedCart = await cartAPI.removeItem(itemId);
      setCart(updatedCart);
    } catch (err: any) {
      console.error('Error removing item:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (updating) return;
    
    try {
      setUpdating(true);
      await cartAPI.clearCart();
      setCart(null);
    } catch (err: any) {
      console.error('Error clearing cart:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = async () => {
    if (checkoutLoading || !cart || cart.items.length === 0) return;
    
    try {
      setCheckoutLoading(true);
      await ordersAPI.checkout();
      setCart(null);
      navigate('/orders');
    } catch (err: any) {
      console.error('Error during checkout:', err);
      alert('Checkout error: ' + (err.message || 'Please try again later'));
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <CartContainer>
        <PageTitle>Shopping Cart</PageTitle>
        <EmptyCart>
          <span>🔒</span>
          <h2>Sign in to continue</h2>
          <p>Please sign in to add items to your cart</p>
          <ContinueShoppingButton onClick={() => navigate('/products')}>
            Browse Products
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  if (loading) {
    return (
      <CartContainer>
        <PageTitle>Shopping Cart</PageTitle>
        <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
      </CartContainer>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <CartContainer>
        <BackButton onClick={() => navigate(-1)}>
          ← Back
        </BackButton>
        <PageTitle>Shopping Cart</PageTitle>
        <EmptyCart>
          <span>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add products from our catalog</p>
          <ContinueShoppingButton onClick={() => navigate('/products')}>
            Browse Products
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <BackButton onClick={() => navigate(-1)}>
        ← Back
      </BackButton>
      <PageTitle>Shopping Cart</PageTitle>
      
      <CartContent>
        <CartItems>
          {cart.items.map((item) => (
            <CartItem key={item.id}>
              <ItemImage>
                {item.productImageUrl ? (
                  <img src={item.productImageUrl} alt={item.productName} />
                ) : (
                  <span style={{ fontSize: '2.5rem', color: '#86868b' }}>📷</span>
                )}
              </ItemImage>
              
              <ItemInfo>
                <div>
                  <ItemName>{item.productName}</ItemName>
                  <ItemPrice>${item.productPrice.toFixed(2)}</ItemPrice>
                </div>
                
                <ItemActions>
                  <QuantityControl>
                    <QuantityButton 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={updating || item.quantity <= 1}
                    >
                      −
                    </QuantityButton>
                    <QuantityValue>{item.quantity}</QuantityValue>
                    <QuantityButton 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={updating}
                    >
                      +
                    </QuantityButton>
                  </QuantityControl>
                  
                  <RemoveButton onClick={() => handleRemoveItem(item.id)} disabled={updating}>
                    🗑️ Remove
                  </RemoveButton>
                </ItemActions>
              </ItemInfo>
              
              <ItemTotal>
                <small>Total:</small>
                <span>${item.totalPrice.toFixed(2)}</span>
              </ItemTotal>
            </CartItem>
          ))}
        </CartItems>
        
        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Items:</span>
            <span>{cart.totalItems}</span>
          </SummaryRow>
          <SummaryTotal>
            <span>Total:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </SummaryTotal>
          
          <CheckoutButton 
            onClick={handleCheckout}
            disabled={checkoutLoading || updating}
          >
            {checkoutLoading ? 'Processing...' : 'Place Order'}
          </CheckoutButton>
          
          <ClearCartButton onClick={handleClearCart} disabled={updating}>
            Clear Cart
          </ClearCartButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
}

export default Cart;
