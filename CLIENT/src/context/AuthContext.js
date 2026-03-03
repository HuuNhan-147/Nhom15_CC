import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Tạo Context
export const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khởi tạo từ localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRefreshToken = localStorage.getItem('refreshToken');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setRefreshToken(savedRefreshToken);
        // Cập nhật token trong API service
        api.setToken(savedToken);
      } catch (err) {
        console.error('Lỗi khôi phục session:', err);
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  // Đăng nhập
  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.login(email, password);

      if (response.success) {
        const { token, refreshToken, user } = response.data;

        // Lưu vào state
        setToken(token);
        setUser(user);
        setRefreshToken(refreshToken);

        // Lưu vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('refreshToken', refreshToken);

        // Cập nhật API service
        api.setToken(token);

        return { success: true, user };
      }

      throw new Error(response.message || 'Đăng nhập thất bại');
    } catch (err) {
      const errorMessage = err.message || 'Lỗi đăng nhập';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng ký
  const register = useCallback(async (fullName, email, password, phone) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.register(fullName, email, password, phone);

      if (response.success) {
        return { success: true, user: response.data };
      }

      throw new Error(response.message || 'Đăng ký thất bại');
    } catch (err) {
      const errorMessage = err.message || 'Lỗi đăng ký';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng xuất
  const logout = useCallback(async () => {
    try {
      // Gọi API logout (nếu cần)
      if (token) {
        await api.logout(refreshToken).catch(() => {
          // Nếu logout API thất bại, vẫn tiếp tục clear local
        });
      }

      // Xóa state
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      setError(null);

      // Xóa localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');

      // Cập nhật API service
      api.setToken(null);

      return { success: true };
    } catch (err) {
      console.error('Lỗi đăng xuất:', err);
      // Vẫn xóa local dù gặp lỗi
      throw err;
    }
  }, [token, refreshToken]);

  // Làm mới token
  const refreshAccessToken = useCallback(async () => {
    try {
      if (!refreshToken) {
        throw new Error('Không có refresh token');
      }

      const response = await api.refreshToken(refreshToken);

      if (response.success) {
        const newToken = response.token;

        // Cập nhật token
        setToken(newToken);
        localStorage.setItem('token', newToken);
        api.setToken(newToken);

        return { success: true, token: newToken };
      }

      throw new Error('Làm mới token thất bại');
    } catch (err) {
      // Nếu refresh token không hợp lệ, logout
      await logout();
      throw err;
    }
  }, [refreshToken, logout]);

  // Kiểm tra người dùng là admin
  const isAdmin = useCallback(() => {
    return user && user.role === 'admin';
  }, [user]);

  // Kiểm tra người dùng đã xác thực
  const isAuthenticated = useCallback(() => {
    return !!token && !!user;
  }, [token, user]);

  const value = {
    user,
    token,
    refreshToken,
    loading,
    error,
    login,
    register,
    logout,
    refreshAccessToken,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook để sử dụng AuthContext
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
}
