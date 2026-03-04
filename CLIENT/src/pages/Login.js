import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockApi } from '../utils/mockData';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);
    
    mockApi.login(formData.email, formData.password)
      .then(user => {
        alert('Đăng nhập thành công!');
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      })
      .catch(err => {
        setError(err.message || 'Đăng nhập thất bại!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-primary to-blue-600 px-8 py-12 text-center text-white">
            <div className="text-5xl mb-4">👤</div>
            <h1 className="text-3xl font-bold mb-2">Đăng nhập</h1>
            <p className="text-blue-100">Chào mừng quay lại ShopHub</p>
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
                <label htmlFor="email" className="block font-bold text-secondary mb-2">📧 Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200 transition-all text-lg"
                  placeholder="Nhập email của bạn"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">💡 Thử: nguyenvana@gmail.com</p>
              </div>
              <div>
                <label htmlFor="password" className="block font-bold text-secondary mb-2">🔒 Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200 transition-all text-lg"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">💡 Thử: password123</p>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 mt-8"
                disabled={loading}
              >
                {loading ? '⏳ Đang đăng nhập...' : '🚀 Đăng nhập'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">hoặc</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Register link */}
            <p className="text-center text-gray-600">
              Chưa có tài khoản? <Link to="/register" className="text-primary font-bold hover:text-blue-700 transition-colors">Đăng ký ngay 👉</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
