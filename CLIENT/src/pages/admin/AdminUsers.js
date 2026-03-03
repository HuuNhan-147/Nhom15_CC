import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Load users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.getAllUsers();
        setUsers(response.data || response);
      } catch (err) {
        setError('Lỗi tải người dùng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
      try {
        await api.deleteUser(userId);
        setUsers(users.filter(u => u._id !== userId));
        setSelectedUser(null);
        alert('Xóa người dùng thành công!');
      } catch (err) {
        alert(err.message || 'Lỗi xóa người dùng');
      }
    }
  };

  const filteredUsers = users.filter(u => {
    const roleMatch = filterRole === 'all' || u.role === filterRole;
    const statusMatch = filterStatus === 'all' || u.status === filterStatus;
    return roleMatch && statusMatch;
  });

  const getRoleColor = (role) => {
    return role === 'admin' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải người dùng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">👥 Quản Lý Người Dùng</h1>
        <button
          onClick={() => navigate('/admin')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
        >
          ← Quay lại
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 rounded-lg p-4">
          <p className="text-blue-800 text-sm font-bold">Tổng Người Dùng</p>
          <p className="text-3xl font-bold text-blue-900">{users.length}</p>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4">
          <p className="text-yellow-800 text-sm font-bold">Quản Trị Viên</p>
          <p className="text-3xl font-bold text-yellow-900">{users.filter(u => u.role === 'admin').length}</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4">
          <p className="text-green-800 text-sm font-bold">Hoạt Động</p>
          <p className="text-3xl font-bold text-green-900">{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="bg-red-100 rounded-lg p-4">
          <p className="text-red-800 text-sm font-bold">Vô Hiệu Hóa</p>
          <p className="text-3xl font-bold text-red-900">{users.filter(u => u.status === 'inactive').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <div>
          <label className="text-sm font-bold text-gray-700 mr-2">Vai Trò:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tất Cả</option>
            <option value="user">Người Dùng</option>
            <option value="admin">Quản Trị Viên</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 mr-2">Trạng Thái:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tất Cả</option>
            <option value="active">Hoạt Động</option>
            <option value="inactive">Vô Hiệu Hóa</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto mb-6">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Tên</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Email</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Điện Thoại</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Vai Trò</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Trạng Thái</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Ngày Tạo</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  Không có người dùng nào
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-800">{user.fullName}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRoleColor(user.role)}`}>
                      {user.role === 'admin' ? '👨‍💼 ' : '👤 '}
                      {user.role === 'admin' ? 'Admin' : 'Người dùng'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(user.status)}`}>
                      {user.status === 'active' ? '✅ Hoạt động' : '❌ Vô hiệu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedUser(selectedUser?._id === user._id ? null : user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {selectedUser?._id === user._id ? '▲ Ẩn' : '▼ Chi Tiết'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User Details */}
      {selectedUser && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Thông Tin Người Dùng</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-600 text-sm">ID Người Dùng</p>
              <p className="text-lg font-bold text-gray-800">{selectedUser._id}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Tên Đầy Đủ</p>
              <p className="text-lg font-bold text-gray-800">{selectedUser.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-lg font-bold text-gray-800">{selectedUser.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Điện Thoại</p>
              <p className="text-lg font-bold text-gray-800">{selectedUser.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Vai Trò</p>
              <p className={`text-lg font-bold ${selectedUser.role === 'admin' ? 'text-yellow-600' : 'text-blue-600'}`}>
                {selectedUser.role === 'admin' ? '👨‍💼 Admin' : '👤 Người dùng'}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Trạng Thái</p>
              <p className={`text-lg font-bold ${selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                {selectedUser.status === 'active' ? '✅ Hoạt động' : '❌ Vô hiệu'}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Ngày Tạo Tài Khoản</p>
              <p className="text-lg font-bold text-gray-800">
                {new Date(selectedUser.createdAt).toLocaleString('vi-VN')}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Cập Nhật Lần Cuối</p>
              <p className="text-lg font-bold text-gray-800">
                {new Date(selectedUser.updatedAt).toLocaleString('vi-VN')}
              </p>
            </div>
          </div>

          {/* Address */}
          {selectedUser.address && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-3">📍 Địa Chỉ</h3>
              <p className="text-gray-700">
                {selectedUser.address.street}<br />
                {selectedUser.address.ward}, {selectedUser.address.district}<br />
                {selectedUser.address.province} {selectedUser.address.postalCode}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                alert('Tính năng chỉnh sửa sắp có!');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition-colors"
            >
              ✏️ Chỉnh Sửa
            </button>
            <button
              onClick={() => handleDeleteUser(selectedUser._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold transition-colors"
            >
              🗑️ Xóa
            </button>
            <button
              onClick={() => setSelectedUser(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-bold transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <p className="text-gray-600 mt-6 text-sm">
        Tổng cộng: <strong>{users.length}</strong> người dùng
      </p>
    </div>
  );
}

export default AdminUsers;
