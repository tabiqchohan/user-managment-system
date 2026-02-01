// components/AuthService.js

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tabiqchohan-user-managment-system.hf.space";

// ================= AUTH API =================
export const authApi = {
  async signup(userData) {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Signup failed");
    }

    return res.json();
  },

  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Login failed");
    }

    return res.json();
  },
};

// ================= AUTH SERVICE =================
export const authService = {
  setToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },

  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },

  // ✅ REQUIRED BY ApiService.js
  getAuthHeaders() {
    const token = this.getToken();

    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },

  // ✅ REQUIRED BY layout / route protection
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },
};
