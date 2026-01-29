import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Nav,
  NavContainer,
  Logo,
  NavLinks,
  NavLink,
  CartButton,
  CartBadge,
  AuthButtons,
  ProfileButton,
  LogoutButton,
  LoginButton,
  MobileMenuButton,
  MobileMenu
} from '../styles/Navbar.styles';
import AuthModal from './AuthModal';
import { cartAPI } from '../services/api';

function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Загружаем количество товаров в корзине
  useEffect(() => {
    if (user) {
      loadCartCount();
    } else {
      setCartItemsCount(0);
    }
  }, [user, location.pathname]);

  // Слушаем кастомное событие для обновления корзины
  useEffect(() => {
    const handleCartUpdate = () => {
      if (user) {
        loadCartCount();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [user]);

  const loadCartCount = async () => {
    try {
      const cart = await cartAPI.getCart();
      setCartItemsCount(cart.totalItems);
    } catch (err) {
      setCartItemsCount(0);
    }
  };

  const handleAuthClick = () => {
    if (user) {
      logout('user');
      navigate('/');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo to="/" onClick={() => setIsMobileMenuOpen(false)}>Digital Shop</Logo>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/">About Us</NavLink>
            {user && (
              <CartButton onClick={handleCartClick}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
              </CartButton>
            )}
            
            <AuthButtons>
              {user ? (
                <>
                  <ProfileButton onClick={handleProfileClick}>
                    Profile
                  </ProfileButton>
                  <LogoutButton onClick={handleAuthClick}>
                    Logout
                  </LogoutButton>
                </>
              ) : (
                <LoginButton onClick={handleAuthClick}>
                  Sign In
                </LoginButton>
              )}
            </AuthButtons>
          </NavLinks>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </NavContainer>
        
        <MobileMenu isOpen={isMobileMenuOpen}>
          <NavLink to="/" onClick={() => handleNavClick('/')}>Home</NavLink>
          <NavLink to="/products" onClick={() => handleNavClick('/products')}>Products</NavLink>
          <NavLink to="/" onClick={() => handleNavClick('/')}>About Us</NavLink>
          {user && (
            <CartButton onClick={handleCartClick}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart
              {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
            </CartButton>
          )}
          
          {user ? (
            <>
              <ProfileButton onClick={handleProfileClick}>
                Profile
              </ProfileButton>
              <LogoutButton onClick={handleAuthClick}>
                Logout
              </LogoutButton>
            </>
          ) : (
            <LoginButton onClick={handleAuthClick}>
              Sign In
            </LoginButton>
          )}
        </MobileMenu>
      </Nav>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}

export default Navbar;
