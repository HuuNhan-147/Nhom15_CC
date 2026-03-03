import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // const response = await api.getDashboardStats();
        // setStats(response.data);
        
        // Mock data cho demo
        setStats({
          totalProducts: 45,
          totalUsers: 128,
          totalOrders: 356,
          totalRevenue: 145230000, // VNĐ
          recentOrdersCount: 12,
          pendingOrders: 8,
          activeUsers: 45
        });
      } catch (err) {
        setError('Lỗi tải thống kê');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color = 'bg-blue-500' }) => (
    <div className={`${color} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-50">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">👨‍💼 Admin Dashboard</h1>
        <p className="text-gray-600">Quản lý cửa hàng e-commerce</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Tổng Sản Phẩm" 
            value={stats.totalProducts} 
            icon="📦"
            color="bg-blue-500"
          />
          <StatCard 
            title="Tổng Người Dùng" 
            value={stats.totalUsers} 
            icon="👥"
            color="bg-purple-500"
          />
          <StatCard 
            title="Tổng Đơn Hàng" 
            value={stats.totalOrders} 
            icon="📋"
            color="bg-green-500"
          />
          <StatCard 
            title="Doanh Thu" 
            value={`${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            icon="💰"
            color="bg-yellow-500"
          />
        </div>
      )}

      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <h3 className="text-gray-600 font-bold mb-2">⏳ Đơn Hàng Chờ Xử Lý</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 className="text-gray-600 font-bold mb-2">✅ Đơn Hàng Gần Đây</h3>
            <p className="text-2xl font-bold text-green-600">{stats.recentOrdersCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <h3 className="text-gray-600 font-bold mb-2">👤 Người Dùng Đang Hoạt Động</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.activeUsers}</p>
          </div>
        </div>
      )}

      {/* Menu Shortcuts */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Quản Lý</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/products')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="text-4xl mb-2">📦</div>
            <h3 className="font-bold text-lg">Sản Phẩm</h3>
            <p className="text-sm opacity-80">Quản lý sản phẩm</p>
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="text-4xl mb-2">📋</div>
            <h3 className="font-bold text-lg">Đơn Hàng</h3>
            <p className="text-sm opacity-80">Quản lý đơn hàng</p>
          </button>

          <button
            onClick={() => navigate('/admin/users')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="text-4xl mb-2">👥</div>
            <h3 className="font-bold text-lg">Người Dùng</h3>
            <p className="text-sm opacity-80">Quản lý người dùng</p>
          </button>

          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="text-4xl mb-2">🏠</div>
            <h3 className="font-bold text-lg">Trang Chủ</h3>
            <p className="text-sm opacity-80">Quay lại cửa hàng</p>
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-2">📌 Hướng Dẫn Nhanh</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✅ Quản lý sản phẩm: Thêm, sửa, xóa sản phẩm từ kho hàng</li>
          <li>✅ Quản lý đơn hàng: Xem và cập nhật trạng thái đơn hàng</li>
          <li>✅ Quản lý người dùng: Xem danh sách khách hàng và thông tin của họ</li>
          <li>✅ Xem thống kê: Theo dõi doanh thu và hiệu suất cửa hàng</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
