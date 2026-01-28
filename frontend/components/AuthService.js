// components/AuthService.js

// Base URL: Hugging Face backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tabiqchohan-user-managment-system.hf.space/api';

// Auth API methods
export const authApi = {
  // Signup
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Signup failed' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },
};

// Authentication helper functions
export const authService = {
  // Store JWT token in localStorage
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  // Get JWT token from localStorage
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  // Remove token from localStorage
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!authService.getToken();
  },

  // Get auth headers with token
  getAuthHeaders: () => {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  },
};
