import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  TabContainer,
  Tab,
  FormContainer,
  Input,
  Button,
  FormLink,
  Divider,
  ErrorAlert,
  SuccessAlert
} from '../styles/AuthModal.styles';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Очищаем ошибку при изменении полей
    setSuccess(''); // Очищаем успех при изменении полей
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setIsLoading(true);

    try {
      if (activeTab === 'signup') {
        // Проверка совпадения паролей
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        await signup(formData.email, formData.password, formData.name || undefined);
        setSuccess('Account created successfully! Welcome!');
      } else {
        await login(formData.email, formData.password);
        setSuccess('Welcome back!');
      }
      
      // Закрываем модальное окно через 1 секунду после успеха
      setTimeout(() => {
        onClose();
        // Очищаем форму
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setSuccess('');
      }, 1000);
    } catch (err: any) {
      // Обработка разных типов ошибок
      let errorMessage = 'An error occurred. Please try again.';
      
      // Проверяем статус код ошибки
      if (err.statusCode) {
        switch (err.statusCode) {
          case 401:
            errorMessage = '❌ Invalid email or password. Please try again.';
            break;
          case 400:
            if (err.message.toLowerCase().includes('password')) {
              errorMessage = '❌ Password must be at least 6 characters long.';
            } else if (err.message.toLowerCase().includes('email')) {
              errorMessage = '❌ Please enter a valid email address.';
            } else {
              errorMessage = `❌ ${err.message}`;
            }
            break;
          case 409:
            errorMessage = '❌ An account with this email already exists.';
            break;
          case 500:
            errorMessage = '❌ Server error. Please try again later.';
            break;
          default:
            errorMessage = `❌ ${err.message || 'An error occurred. Please try again.'}`;
        }
      } else if (err.message) {
        // Если нет статус кода, проверяем сообщение
        if (err.message.toLowerCase().includes('unauthorized') || 
            err.message.toLowerCase().includes('invalid credentials')) {
          errorMessage = '❌ Invalid email or password. Please try again.';
        } else if (err.message.toLowerCase().includes('already exists') || 
                   err.message.toLowerCase().includes('conflict')) {
          errorMessage = '❌ An account with this email already exists.';
        } else if (err.message.toLowerCase().includes('email')) {
          errorMessage = '❌ Please enter a valid email address.';
        } else if (err.message.toLowerCase().includes('password')) {
          errorMessage = '❌ Password must be at least 6 characters long.';
        } else {
          errorMessage = `❌ ${err.message}`;
        }
      }
      
      setError(errorMessage);
      // НЕ закрываем окно при ошибке!
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Welcome Back</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <TabContainer>
          <Tab 
            active={activeTab === 'signin'} 
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </Tab>
          <Tab 
            active={activeTab === 'signup'} 
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </Tab>
        </TabContainer>

        <FormContainer onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          {activeTab === 'signup' && (
            <Input 
              type="text" 
              name="name"
              placeholder="Full Name (Optional)" 
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          )}
          <Input 
            type="email" 
            name="email"
            placeholder="Email" 
            required 
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input 
            type="password" 
            name="password"
            placeholder="Password" 
            required 
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {activeTab === 'signup' && (
            <Input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          )}
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>

          <Divider>or</Divider>

          <FormLink>
            {activeTab === 'signin' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <span onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}>
              {activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
            </span>
          </FormLink>
        </FormContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default AuthModal;
