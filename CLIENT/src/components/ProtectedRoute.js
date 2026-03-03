import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute - Bảo vệ các route yêu cầu xác thực
 * 
 * Sử dụng:
 * <ProtectedRoute>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
export function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Chưa xác thực
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Yêu cầu admin nhưng user không phải admin
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/**
 * PublicRoute - Cho phép người dùng đã xác thực truy cập
 * nhưng redirect nếu đã login (hữu ích cho Login/Register page)
 */
export function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Đã xác thực, redirect đến home
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
