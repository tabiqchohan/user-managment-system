// components/AuthService.js

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tabiqchohan-user-managment-system.hf.space/api";

export const authApi = {
  // Signup using /users endpoint
  signup: async (userData) => {
    try {
      // Step 1: Check if user already exists
      const usersRes = await fetch(`${API_BASE_URL}/users`);
      if (!usersRes.ok) throw new Error("Failed to fetch users");

      const users = await usersRes.json();
      const existingUser = users.find((u) => u.email === userData.email);

      if (existingUser) throw new Error("Email already exists");

      // Step 2: Create new user
      const createRes = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!createRes.ok) throw new Error("Signup failed");

      const newUser = await createRes.json();

      // Step 3: Return mock token with user info
      return {
        ...newUser,
        token: `mock_token_for_${userData.email}_${Date.now()}`,
      };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Login using /users endpoint
  login: async (credentials) => {
    try {
      const usersRes = await fetch(`${API_BASE_URL}/users`);
      if (!usersRes.ok) throw new Error("Failed to fetch users");

      const users = await usersRes.json();
      const user = users.find((u) => u.email === credentials.email);

      if (!user) throw new Error("Invalid email or password");

      // Return user info with mock token
      return {
        ...user,
        token: `mock_token_for_${credentials.email}_${Date.now()}`,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

// Auth helper functions
export const authService = {
  setToken: (token) => {
    if (typeof window !== "undefined") localStorage.setItem("token", token);
  },

  getToken: () => {
    if (typeof window !== "undefined") return localStorage.getItem("token");
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
  },

  isAuthenticated: () => !!authService.getToken(),

  getAuthHeaders: () => {
    const token = authService.getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },
};
