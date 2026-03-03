import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../utils/mockData';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockApi.getCart().then(data => {
      setCartItems(data);
      setLoading(false);
    });
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      handleRemoveItem(id);
    }
  };

  if (loading) {
    return (
      <div className="cart flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart py-5">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Giỏ hàng của bạn</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart bg-white rounded-lg shadow-md p-12 text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <p className="text-gray-600 mb-2 text-lg">Giỏ hàng của bạn trống</p>
          <p className="text-gray-500 mb-6 text-sm">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link to="/products" className="btn btn-primary inline-block">
            <span className="inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
              </svg>
              Tiếp tục mua sắm
            </span>
          </Link>
        </div>
      ) : (
        <div className="cart-wrapper">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="cart-table">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-4 py-4 text-left font-bold text-gray-800 min-w-64">Sản phẩm</th>
                    <th className="px-4 py-4 text-left font-bold text-gray-800 min-w-32">Giá</th>
                    <th className="px-4 py-4 text-left font-bold text-gray-800 min-w-36">Số lượng</th>
                    <th className="px-4 py-4 text-left font-bold text-gray-800 min-w-32">Tổng</th>
                    <th className="px-4 py-4 text-left font-bold text-gray-800 min-w-24">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <Link to={`/products/${item.productId}`}>
                            <img 
                              src={item.image} 
                              alt={item.productName} 
                              className="w-20 h-20 rounded-lg object-cover shadow-sm hover:shadow-md transition-shadow"
                            />
                          </Link>
                          <div>
                            <Link to={`/products/${item.productId}`} className="font-semibold text-gray-800 hover:text-primary transition-colors">
                              {item.productName}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">Mã: SP{item.productId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-primary font-bold">{item.price.toLocaleString('vi-VN')} ₫</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-l-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-colors"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-14 h-8 border-y border-gray-200 text-center focus:outline-none focus:border-primary"
                          />
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-r-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-gray-800 text-lg">
                          {calculateItemTotal(item).toLocaleString('vi-VN')} ₫
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Xóa sản phẩm"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products" className="md:col-span-1 btn btn-primary text-center bg-gray-600 hover:bg-gray-700">
              <span className="inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                </svg>
                Tiếp tục mua sắm
              </span>
            </Link>
            <div></div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b border-gray-200">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-3 mb-5 border-b border-gray-200 pb-5">
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    Tổng sản phẩm:
                  </span>
                  <span className="font-medium">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Tiền hàng:
                  </span>
                  <span className="font-medium">{calculateTotal().toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                    Phí vận chuyển:
                  </span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold text-gray-800">Tổng cộng:</span>
                <span className="text-2xl font-bold text-primary">{calculateTotal().toLocaleString('vi-VN')} ₫</span>
              </div>
              
              <Link to="/checkout" className="btn btn-primary w-full text-center block text-lg py-4">
                <span className="inline-flex items-center">
                  Thanh toán
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>
              
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Thanh toán an toàn
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
