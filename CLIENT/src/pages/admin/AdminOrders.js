import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.getAllOrders();
        setOrders(response.data || response);
      } catch (err) {
        setError('Lỗi tải đơn hàng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => 
        o._id === orderId ? { ...o, status: newStatus } : o
      ));
      alert('Cập nhật trạng thái thành công!');
    } catch (err) {
      alert(err.message || 'Lỗi cập nhật trạng thái');
    }
  };

  const handlePaymentStatusChange = async (orderId, newStatus) => {
    try {
      await api.updatePaymentStatus(orderId, newStatus);
      setOrders(orders.map(o => 
        o._id === orderId ? { ...o, paymentStatus: newStatus } : o
      ));
      alert('Cập nhật thanh toán thành công!');
    } catch (err) {
      alert(err.message || 'Lỗi cập nhật thanh toán');
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentColor = (status) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📋 Quản Lý Đơn Hàng</h1>
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

      {/* Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded font-bold transition-colors ${
            filterStatus === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Tất Cả ({orders.length})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded font-bold transition-colors ${
            filterStatus === 'pending'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Chờ Xử Lý ({orders.filter(o => o.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilterStatus('processing')}
          className={`px-4 py-2 rounded font-bold transition-colors ${
            filterStatus === 'processing'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Đang Xử Lý ({orders.filter(o => o.status === 'processing').length})
        </button>
        <button
          onClick={() => setFilterStatus('shipped')}
          className={`px-4 py-2 rounded font-bold transition-colors ${
            filterStatus === 'shipped'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Đã Gửi ({orders.filter(o => o.status === 'shipped').length})
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto mb-6">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Mã Đơn</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Khách Hàng</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Giá Trị</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Trạng Thái</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Thanh Toán</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Ngày</th>
              <th className="px-6 py-3 text-left font-bold text-gray-800">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  Không có đơn hàng nào
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-800">{order._id?.slice(-8)}</td>
                  <td className="px-6 py-4">{order.userId?.fullName || 'N/A'}</td>
                  <td className="px-6 py-4 font-bold">
                    {order.totalAmount?.toLocaleString()} VNĐ
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getPaymentColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {selectedOrder?._id === order._id ? '▲ Ẩn' : '▼ Chi Tiết'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details */}
      {selectedOrder && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Chi Tiết Đơn Hàng</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600 text-sm">Mã Đơn</p>
              <p className="text-xl font-bold text-gray-800">{selectedOrder._id}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Ngày Tạo</p>
              <p className="text-xl font-bold text-gray-800">
                {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Khách Hàng</p>
              <p className="text-xl font-bold text-gray-800">{selectedOrder.userId?.fullName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-xl font-bold text-gray-800">{selectedOrder.userId?.email || 'N/A'}</p>
            </div>
          </div>

          {/* Status Update */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-bold text-gray-700 mb-2">Cập Nhật Trạng Thái</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pending">Chờ Xử Lý</option>
                <option value="processing">Đang Xử Lý</option>
                <option value="shipped">Đã Gửi</option>
                <option value="delivered">Đã Giao</option>
                <option value="cancelled">Đã Hủy</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-2">Cập Nhật Thanh Toán</label>
              <select
                value={selectedOrder.paymentStatus || 'pending'}
                onChange={(e) => handlePaymentStatusChange(selectedOrder._id, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pending">Chưa Thanh Toán</option>
                <option value="paid">Đã Thanh Toán</option>
              </select>
            </div>
          </div>

          {/* Items */}
          {selectedOrder.items && selectedOrder.items.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">📦 Sản Phẩm Trong Đơn</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>{item.productId?.name || 'Sản phẩm'} x {item.quantity}</span>
                    <span className="font-bold">{item.price * item.quantity} VNĐ</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Address */}
          {selectedOrder.shippingAddress && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3">📍 Địa Chỉ Giao Hàng</h3>
              <p className="text-gray-700">
                {selectedOrder.shippingAddress.street}<br />
                {selectedOrder.shippingAddress.ward}, {selectedOrder.shippingAddress.district}<br />
                {selectedOrder.shippingAddress.province} {selectedOrder.shippingAddress.postalCode}
              </p>
            </div>
          )}
        </div>
      )}

      <p className="text-gray-600 mt-6 text-sm">
        Tổng cộng: <strong>{orders.length}</strong> đơn hàng
      </p>
    </div>
  );
}

export default AdminOrders;
