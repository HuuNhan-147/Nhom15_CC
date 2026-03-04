import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockApi } from '../utils/mockData';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);
    mockApi.register(formData.fullName, formData.email, formData.password)
      .then(user => {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      })
      .catch(err => {
        setError(err.message || 'Đăng ký thất bại!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-accent to-pink-600 px-8 py-12 text-center text-white">
            <div className="text-5xl mb-4">✨</div>
            <h1 className="text-3xl font-bold mb-2">Đăng ký</h1>
            <p className="text-pink-100">Tham gia ShopHub ngay hôm nay</p>
          </div>

          {/* Form content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block font-bold text-secondary mb-2">👤 Họ và tên</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-pink-200 transition-all text-lg"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-bold text-secondary mb-2">📧 Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-pink-200 transition-all text-lg"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-bold text-secondary mb-2">🔒 Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-pink-200 transition-all text-lg"
                  placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block font-bold text-secondary mb-2">✓ Xác nhận mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-pink-200 transition-all text-lg"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-accent to-pink-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 mt-8"
                disabled={loading}
              >
                {loading ? '⏳ Đang đăng ký...' : '🎉 Đăng ký'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">hoặc</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Login link */}
            <p className="text-center text-gray-600">
              Đã có tài khoản? <Link to="/login" className="text-accent font-bold hover:text-pink-700 transition-colors">Đăng nhập ngay 👉</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
