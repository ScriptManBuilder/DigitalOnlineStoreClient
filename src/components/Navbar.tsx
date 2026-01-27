import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Nav,
  NavContainer,
  Logo,
  NavLinks,
  NavLink,
  CartButton,
  AuthButtons,
  ProfileButton,
  LogoutButton,
  LoginButton
} from '../styles/Navbar.styles';
import AuthModal from './AuthModal';

function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) { // Проверяем именно user, а не isAuthenticated
      logout('user');
      navigate('/');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleProfileClick = () => {
    if (user) { // Проверяем именно user
      navigate('/profile');
    }
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo to="/">Digital Shop</Logo>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/products">New Arrival</NavLink>
            <NavLink to="/">About Us</NavLink>
            <CartButton>Cart (0)</CartButton>
            
            <AuthButtons>
              {user ? ( // Показываем Profile/Logout только если есть user
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
        </NavContainer>
      </Nav>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}

export default Navbar;
