import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authAPI, adminAPI } from '../services/api';
import type { User, Admin, UpdateProfileData } from '../services/api';

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAdmin: (username: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  logout: (type?: 'user' | 'admin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка авторизации при загрузке (восстановление сессии из cookie)
  useEffect(() => {
    const checkAuth = async () => {
      // Проверяем ОБЕ сессии одновременно (два разных cookie: access_token и admin_token)
      const [userResult, adminResult] = await Promise.allSettled([
        authAPI.getProfile(),
        adminAPI.getProfile(),
      ]);

      // Устанавливаем user, если access_token валиден
      if (userResult.status === 'fulfilled') {
        setUser(userResult.value);
      }

      // Устанавливаем admin, если admin_token валиден
      if (adminResult.status === 'fulfilled') {
        setAdmin(adminResult.value);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await authAPI.signin({ email, password });
      // После логина загружаем полный профиль с description
      const fullProfile = await authAPI.getProfile();
      setUser(fullProfile);
    } catch (error) {
      throw error;
    }
  };

  const loginAdmin = async (username: string, password: string) => {
    try {
      const admin = await adminAPI.signin({ username, password });
      setAdmin(admin);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      await authAPI.signup({ email, password, name });
      // После регистрации загружаем полный профиль с description
      const fullProfile = await authAPI.getProfile();
      setUser(fullProfile);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const updatedUser = await authAPI.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (type?: 'user' | 'admin') => {
    try {
      // Определяем тип logout: явно указан ИЛИ по текущему состоянию
      const logoutType = type || (admin ? 'admin' : 'user');
      
      if (logoutType === 'admin') {
        await adminAPI.logout();
        setAdmin(null);
      } else {
        await authAPI.logout();
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // В случае ошибки всё равно очищаем локальное состояние
      if (type === 'admin' || (!type && admin)) {
        setAdmin(null);
      }
      if (type === 'user' || (!type && user)) {
        setUser(null);
      }
    }
  };

  const value: AuthContextType = {
    user,
    admin,
    isLoading,
    isAuthenticated: !!user || !!admin,
    isAdmin: !!admin,
    login,
    loginAdmin,
    signup,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
