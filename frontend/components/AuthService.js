const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tabiqchohan-user-managment-system.hf.space";

export const authApi = {
  signup: async (userData) => {
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

    return await res.json();
  },

  login: async (credentials) => {
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

    return await res.json();
  },
};

export const authService = {
  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};
