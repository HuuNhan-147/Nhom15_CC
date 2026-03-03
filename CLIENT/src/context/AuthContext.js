import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockApi, mockUsers } from '../utils/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục session từ localStorage khi mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Đăng nhập
  const login = useCallback(async (email, password) => {
    const result = await mockApi.login(email, password);
    const { token, ...userData } = result;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  // Đăng ký
  const register = useCallback(async (fullName, email, password) => {
    const result = await mockApi.register(fullName, email, password);
    return result;
  }, []);

  // Đăng xuất
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  // Cập nhật thông tin user
  const updateProfile = useCallback(async (updatedData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Cập nhật mock data
    const idx = mockUsers.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      Object.assign(mockUsers[idx], updatedData);
    }

    return updatedUser;
  }, [user]);

  // Đổi mật khẩu
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = mockUsers.find(u => u.id === user.id);
    if (!mockUser || mockUser.password !== currentPassword) {
      throw new Error('Mật khẩu hiện tại không đúng');
    }

    mockUser.password = newPassword;
    return true;
  }, [user]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}

export default AuthContext;
