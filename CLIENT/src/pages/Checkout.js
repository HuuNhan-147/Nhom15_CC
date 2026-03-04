import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockApi } from '../utils/mockData';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    paymentMethod: 'credit-card',
    notes: ''
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
        city: userData.city || ''
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
    // Xóa lỗi khi người dùng nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^0\d{9,10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Vui lòng chọn thành phố';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.');
      return;
    }
    
    setLoading(true);

    const orderData = {
      userId: user?.id || 1,
      items: cartItems,
      total: calculateTotal(),
      shippingAddress: `${formData.address}, ${formData.district ? formData.district + ', ' : ''}${formData.city}`,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes
    };

    mockApi.createOrder(orderData)
      .then(order => {
        alert(`🎉 Đặt hàng thành công!\nMã đơn hàng: ${order.id}\n\nCảm ơn bạn đã mua hàng!`);
        localStorage.removeItem('cart');
        navigate('/orders');
      })
      .catch(error => {
        alert('Lỗi: ' + error.message);
      })
      .finally(() => setLoading(false));
  };

  const paymentMethods = [
    { value: 'credit-card', label: 'Thẻ tín dụng/Ghi nợ', icon: '💳', desc: 'Thanh toán an toàn qua cổng VNPay' },
    { value: 'bank-transfer', label: 'Chuyển khoản ngân hàng', icon: '🏦', desc: 'Chuyển khoản qua tài khoản ngân hàng' },
    { value: 'e-wallet', label: 'Ví điện tử', icon: '📱', desc: 'Momo, ZaloPay, VNPay' },
    { value: 'cash-on-delivery', label: 'Thanh toán khi nhận hàng', icon: '💰', desc: 'Trả tiền mặt khi nhận được hàng' }
  ];

  const cities = [
    'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
    'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
    'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
    'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
    'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
    'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
    'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên',
    'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
    'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
    'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
    'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
  ];

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="py-5">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Bạn cần thêm sản phẩm vào giỏ hàng để thanh toán</p>
          <Link to="/products" className="btn btn-primary inline-block">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page py-5">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Thanh toán đơn hàng</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form className="bg-white rounded-lg shadow-md p-8" onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-primary flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Thông tin giao hàng
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="block font-bold text-gray-800 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-bold text-gray-800 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block font-bold text-gray-800 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="0901234567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block font-bold text-gray-800 mb-2">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Số nhà, đường, phường/xã"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div>
                  <label htmlFor="district" className="block font-bold text-gray-800 mb-2">
                    Quận/Huyện
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                    placeholder="Quận/Huyện"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block font-bold text-gray-800 mb-2">
                    Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  >
                    <option value="">-- Chọn thành phố --</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block font-bold text-gray-800 mb-2">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes || ''}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
                    placeholder="Ghi chú thêm cho đơn hàng (nếu có)..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-primary flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                Phương thức thanh toán
              </h2>
              
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <label 
                    key={method.value}
                    className={`block p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary ${
                      formData.paymentMethod === method.value 
                        ? 'border-primary bg-green-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary focus:ring-primary"
                      />
                      <span className="text-2xl mr-3 ml-2">{method.icon}</span>
                      <div>
                        <p className="font-bold text-gray-800">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý đơn hàng...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Đặt hàng ngay
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-5 pb-3 border-b border-gray-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Tóm tắt đơn hàng
            </h2>
            
            {/* Items */}
            <div className="mb-4 max-h-72 overflow-y-auto border-b border-gray-200 pb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between mb-4 pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.productName}
                      className="w-14 h-14 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm line-clamp-2">{item.productName}</p>
                      <p className="text-gray-500 text-xs">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-800 text-sm">
                    {calculateItemTotal(item).toLocaleString('vi-VN')} ₫
                  </p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  Tạm tính:
                </span>
                <span>{calculateTotal().toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                  Phí vận chuyển:
                </span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"></path>
                  </svg>
                  Thuế (VAT):
                </span>
                <span>0 ₫</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between mb-6">
              <span className="text-xl font-bold text-gray-800">Tổng cộng:</span>
              <span className="text-2xl font-bold text-primary">
                {calculateTotal().toLocaleString('vi-VN')} ₫
              </span>
            </div>

            {/* Benefits */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center text-green-700 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Giao hàng miễn phí toàn quốc
              </div>
              <div className="flex items-center text-green-700 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Bảo hành chính hãng 12 tháng
              </div>
              <div className="flex items-center text-green-700 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Đổi trả trong 30 ngày
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
