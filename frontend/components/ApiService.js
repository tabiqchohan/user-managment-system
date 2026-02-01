// components/ApiService.js
import { authService } from "./AuthService";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tabiqchohan-user-managment-system.hf.space";

// ================= USER API =================
export const userApi = {
  // 🔹 Get all users
  async getAllUsers() {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: "GET",
      headers: authService.getAuthHeaders(),
    });

    if (!res.ok) {
      handleAuthError(res);
    }

    return res.json();
  },

  // 🔹 Get user by ID
  async getUserById(id) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: "GET",
      headers: authService.getAuthHeaders(),
    });

    if (!res.ok) {
      handleAuthError(res);
    }

    return res.json();
  },

  // 🔹 Create user
  async createUser(userData) {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      handleAuthError(res);
    }

    return res.json();
  },

  // 🔹 Update user (PUT)
  async updateUser(id, userData) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: "PUT",
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      handleAuthError(res);
    }

    return res.json();
  },

  // 🔹 Partial update user (PATCH)
  async partialUpdateUser(id, userData) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: "PATCH",
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      handleAuthError(res);
    }

    return res.json();
  },

  // 🔹 Delete user
  async deleteUser(id) {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: authService.getAuthHeaders(),
    });

    if (!res.ok) {
      handleAuthError(res);
    }

    return true;
  },
};

// ================= HELPER =================
function handleAuthError(res) {
  if (res.status === 401 || res.status === 403) {
    authService.removeToken();
    throw new Error("Unauthorized. Please login again.");
  }

  throw new Error(`Request failed with status ${res.status}`);
}
