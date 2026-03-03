import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../utils/mockData';

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

  if (loading) {
    return <p className="text-center text-gray-600 py-5">Đang tải...</p>;
  }

  return (
    <div className="py-5">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-10 bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-5 text-lg">Giỏ hàng của bạn trống</p>
          <Link to="/products" className="btn btn-primary">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-6">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Sản phẩm</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Giá</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Số lượng</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Tổng</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.productName} className="w-16 h-16 rounded object-cover" />
                        <span className="font-medium text-gray-800">{item.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-primary font-bold">{item.price.toLocaleString('vi-VN')} VND</span>
                    </td>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 border border-gray-300 rounded px-2 py-1"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold text-gray-800">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        ✕ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products" className="md:col-span-1 btn btn-primary text-center">
              ← Tiếp tục mua sắm
            </Link>
            <div></div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tóm tắt</h2>
              <div className="space-y-3 mb-4 border-b border-gray-200 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tổng hàng:</span>
                  <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tiền hàng:</span>
                  <span>{calculateTotal().toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí giao hàng:</span>
                  <span className="text-green-600 font-bold">Miễn phí</span>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold text-gray-800">Tổng cộng:</span>
                <span className="text-2xl font-bold text-primary">{calculateTotal().toLocaleString('vi-VN')} VND</span>
              </div>
              <Link to="/checkout" className="btn btn-primary w-full text-center block">
                Thanh toán →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
