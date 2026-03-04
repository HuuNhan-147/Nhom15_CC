import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../utils/mockData';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    const storedUser = localStorage.getItem('user');
    const userId = storedUser ? JSON.parse(storedUser).id : 1;
    
    mockApi.getOrders(userId).then(data => {
      setOrders(data);
      setLoading(false);
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Chờ xử lý', class: 'badge-pending', icon: '⏳' },
      processing: { label: 'Đang xử lý', class: 'badge-processing', icon: '📦' },
      shipped: { label: 'Đang giao', class: 'badge-shipped', icon: '🚚' },
      delivered: { label: 'Đã giao', class: 'badge-delivered', icon: '✅' },
      cancelled: { label: 'Đã hủy', class: 'badge-cancelled', icon: '❌' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`status-badge ${config.class}`}>
        <span className="badge-icon">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      'credit-card': 'Thẻ tín dụng',
      'bank-transfer': 'Chuyển khoản',
      'e-wallet': 'Ví điện tử',
      'cash-on-delivery': 'Tiền mặt'
    };
    return methods[method] || method;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const toggleOrderDetails = (orderId) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="orders-page flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải lịch sử đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page py-5">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Lịch sử đơn hàng</h1>

      {/* Tabs */}
      <div className="tabs-container mb-6">
        <div className="tabs flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            <span className="tab-icon">📋</span>
            Tất cả ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          >
            <span className="tab-icon">⏳</span>
            Chờ xử lý ({orders.filter(o => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('processing')}
            className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
          >
            <span className="tab-icon">📦</span>
            Đang xử lý ({orders.filter(o => o.status === 'processing').length})
          </button>
          <button
            onClick={() => setActiveTab('shipped')}
            className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`}
          >
            <span className="tab-icon">🚚</span>
            Đang giao ({orders.filter(o => o.status === 'shipped').length})
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          >
            <span className="tab-icon">✅</span>
            Đã giao ({orders.filter(o => o.status === 'delivered').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="empty-orders bg-white rounded-lg shadow-md p-12 text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <p className="text-gray-600 mb-2 text-lg">Chưa có đơn hàng nào</p>
          <p className="text-gray-500 mb-6 text-sm">Hãy mua sản phẩm để xem lịch sử đơn hàng</p>
          <Link to="/products" className="btn btn-primary inline-block">
            <span className="inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
              </svg>
              Mua sắm ngay
            </span>
          </Link>
        </div>
      ) : (
        <div className="orders-list space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div 
                className="order-header p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="order-id">
                      <span className="text-sm text-gray-500">Mã đơn hàng</span>
                      <p className="font-bold text-gray-800 text-lg">{order.id}</p>
                    </div>
                    <div className="order-date">
                      <span className="text-sm text-gray-500">Ngày đặt</span>
                      <p className="font-medium text-gray-800">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="order-items-count">
                      <span className="text-sm text-gray-500">Sản phẩm</span>
                      <p className="font-medium text-gray-800">{order.items.length} sản phẩm</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="order-total text-right">
                      <span className="text-sm text-gray-500">Tổng tiền</span>
                      <p className="font-bold text-primary text-xl">{order.total.toLocaleString('vi-VN')} ₫</p>
                    </div>
                    {getStatusBadge(order.status)}
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform ${selectedOrder === order.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {selectedOrder === order.id && (
                <div className="order-details border-t border-gray-200 p-5 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div className="order-items">
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        Sản phẩm
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                            <img 
                              src={item.image || 'https://via.placeholder.com/60x60?text=SP'} 
                              alt={item.productName}
                              className="w-14 h-14 rounded-lg object-cover mr-3"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 text-sm">{item.productName}</p>
                              <p className="text-gray-500 text-xs">x{item.quantity}</p>
                            </div>
                            <p className="font-bold text-gray-800 text-sm">
                              {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="order-info space-y-4">
                      <div className="info-item bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          Địa chỉ giao hàng
                        </h4>
                        <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                      </div>

                      <div className="info-item bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          Phương thức thanh toán
                        </h4>
                        <p className="text-gray-600 text-sm">{getPaymentMethodLabel(order.paymentMethod)}</p>
                      </div>

                      <div className="info-item bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          Thời gian
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">Ngày đặt:</span> {formatDate(order.createdAt)}
                          </p>
                          {order.deliveredAt && (
                            <p className="text-gray-600">
                              <span className="font-medium">Ngày giao:</span> {formatDate(order.deliveredAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="order-actions mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                    <Link 
                      to={`/products`} 
                      className="btn btn-outline flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      Mua lại
                    </Link>
                    <button className="btn btn-outline flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Xem chi tiết
                    </button>
                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                      <button className="btn btn-cancel flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Hủy đơn
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {orders.length > 0 && (
        <div className="orders-summary mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="summary-card bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-3xl mb-2">📦</div>
            <p className="text-gray-500 text-sm">Tổng đơn hàng</p>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div className="summary-card bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-gray-500 text-sm">Đã giao</p>
            <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}</p>
          </div>
          <div className="summary-card bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-gray-500 text-sm">Đang xử lý</p>
            <p className="text-2xl font-bold text-orange-500">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</p>
          </div>
          <div className="summary-card bg-white rounded-lg shadow-md p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-gray-500 text-sm">Tổng chi tiêu</p>
            <p className="text-2xl font-bold text-primary">{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('vi-VN')} ₫</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
