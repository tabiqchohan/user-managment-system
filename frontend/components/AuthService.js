// components/AuthService.js

// Base URL: Hugging Face backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tabiqchohan-user-managment-system.hf.space/api';

// Auth API methods
export const authApi = {
  // Mock signup - creates user in the system and returns mock token
  signup: async (userData) => {
    try {
      // First, check if user with this email already exists
      const usersResponse = await fetch(`${API_BASE_URL}/users`);
      if (!usersResponse.ok) {
        throw new Error('Failed to check existing users');
      }

      const users = await usersResponse.json();
      const existingUser = users.find(u => u.email === userData.email);

      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Create the user using the existing users endpoint
      const response = await fetch(`${API_BASE_URL}/users`, {
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

      // Return the created user with a mock token
      const newUser = await response.json();
      return {
        ...newUser,
        token: `mock_token_for_${userData.email}_${Date.now()}`
      };
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  // Mock login - validates user exists and returns mock token
  login: async (credentials) => {
    try {
      // Fetch all users to find the one with matching email
      const response = await fetch(`${API_BASE_URL}/users`);

      if (!response.ok) {
        throw new Error('Failed to fetch users for login validation');
      }

      const users = await response.json();

      // Find user by email (since we don't have password verification capability)
      const user = users.find(u => u.email === credentials.email);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Return the user with a mock token
      return {
        ...user,
        token: `mock_token_for_${credentials.email}_${Date.now()}`
      };
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
