const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface User {
  id: string;
  email: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  name?: string;
  description?: string;
}

export interface Admin {
  id: string;
  username: string;
  name: string;
}

export interface AuthResponse {
  user?: User;
  admin?: Admin;
}

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AdminSignInData {
  username: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
}

class ApiError extends Error {
  statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

// Универсальная функция для fetch запросов
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  silent = false // Флаг для тихих запросов (без вывода 401 в консоль)
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // ✅ Автоматически отправляет cookies
  };

  // Для тихих запросов подавляем вывод ошибок в консоль браузера
  if (silent) {
    config.keepalive = true;
  }

  const response = await fetch(url, config);

  // Обработка ошибок
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An error occurred',
      statusCode: response.status,
    }));

    throw new ApiError(
      response.status,
      Array.isArray(error.message) ? error.message.join(', ') : error.message
    );
  }

  return response.json();
}

// === AUTH ENDPOINTS ===

export const authAPI = {
  // Регистрация пользователя
  signup: async (data: SignUpData): Promise<User> => {
    const response = await fetchAPI<{ user: User }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.user;
  },

  // Вход пользователя
  signin: async (data: SignInData): Promise<User> => {
    const response = await fetchAPI<{ user: User }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.user;
  },

  // Получить профиль пользователя
  getProfile: async (): Promise<User> => {
    return fetchAPI<User>('/auth/me', {
      method: 'GET',
    }, true); // silent = true, не показывать 401 в консоли
  },

  // Обновить профиль пользователя
  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    return fetchAPI<User>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Выход
  logout: async (): Promise<void> => {
    await fetchAPI<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  },
};

// === ADMIN ENDPOINTS ===

export const adminAPI = {
  // Вход администратора
  signin: async (data: AdminSignInData): Promise<Admin> => {
    const response = await fetchAPI<{ admin: Admin }>('/admin/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.admin;
  },

  // Получить профиль администратора
  getProfile: async (): Promise<Admin> => {
    return fetchAPI<Admin>('/admin/me', {
      method: 'GET',
    }, true); // silent = true, не показывать 401 в консоли
  },

  // Выход администратора
  logout: async (): Promise<void> => {
    await fetchAPI<{ message: string }>('/admin/logout', {
      method: 'POST',
    });
  },

  // Получить всех пользователей (только админ)
  getAllUsers: async (): Promise<User[]> => {
    return fetchAPI<User[]>('/admin/users', {
      method: 'GET',
    });
  },
};

// === PRODUCTS ENDPOINTS ===

export const productsAPI = {
  // Получить все продукты (публичный)
  getAll: async (): Promise<Product[]> => {
    return fetchAPI<Product[]>('/products', {
      method: 'GET',
    });
  },

  // Получить один продукт (публичный)
  getOne: async (id: string): Promise<Product> => {
    return fetchAPI<Product>(`/products/${id}`, {
      method: 'GET',
    });
  },

  // Создать продукт (только админ)
  create: async (data: CreateProductData): Promise<Product> => {
    return fetchAPI<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Обновить продукт (только админ)
  update: async (id: string, data: UpdateProductData): Promise<Product> => {
    return fetchAPI<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Удалить продукт (только админ)
  delete: async (id: string): Promise<{ message: string }> => {
    return fetchAPI<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Экспортируем ApiError для обработки ошибок
export { ApiError };
