import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../utils/mockData';

function Checkout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData(prev => ({
        ...prev,
        fullName: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        zipCode: userData.zipCode || ''
      }));
    }

    // Lấy giỏ hàng
    mockApi.getCart().then(data => setCartItems(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      userId: user?.id || 1,
      items: cartItems,
      total: calculateTotal(),
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod
    };

    mockApi.createOrder(orderData)
      .then(order => {
        alert(`Đặt hàng thành công! Mã đơn hàng: ${order.id}`);
        localStorage.removeItem('cart');
        navigate('/');
      })
      .catch(error => {
        alert('Lỗi: ' + error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="py-5">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Thanh toán</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form className="bg-white rounded-lg shadow-md p-8" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-primary">Thông tin giao hàng</h2>
              <div className="mb-5">
                <label htmlFor="fullName" className="block font-bold text-gray-800 mb-2">Họ và tên:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block font-bold text-gray-800 mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="phone" className="block font-bold text-gray-800 mb-2">Số điện thoại:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="address" className="block font-bold text-gray-800 mb-2">Địa chỉ:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="city" className="block font-bold text-gray-800 mb-2">Thành phố:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block font-bold text-gray-800 mb-2">Mã bưu điện:</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-primary">Phương thức thanh toán</h2>
              <div>
                <label htmlFor="paymentMethod" className="block font-bold text-gray-800 mb-2">Chọn phương thức:</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
                >
                  <option value="credit-card">💳 Thẻ tín dụng</option>
                  <option value="bank-transfer">🏦 Chuyển khoản ngân hàng</option>
                  <option value="e-wallet">📱 Ví điện tử</option>
                  <option value="cash-on-delivery">💰 Thanh toán khi nhận</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large w-full"
              disabled={loading}
            >
              {loading ? '⏳ Đang xử lý...' : '✓ Hoàn tất đơn hàng'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
            
            <div className="mb-4 max-h-64 overflow-y-auto border-b border-gray-200 pb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between mb-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{item.productName}</p>
                    <p className="text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-800">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Tiền hàng:</span>
                <span>{calculateTotal().toLocaleString('vi-VN')} VND</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí giao hàng:</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Thuế:</span>
                <span>0 VND</span>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <span className="font-bold text-gray-800">Tổng cộng:</span>
              <span className="text-2xl font-bold text-primary">
                {calculateTotal().toLocaleString('vi-VN')} VND
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-700">
              ✓ Giao hàng miễn phí toàn quốc<br/>
              ✓ Bảo hành chính hãng<br/>
              ✓ Đổi trả 30 ngày
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
