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
    <div className="flex justify-center items-center min-h-96 py-10">
      <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng nhập</h1>
        
        {error && (
          <div className="mb-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block font-bold text-gray-800 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
              placeholder="Email của bạn"
              required
            />
            <p className="text-xs text-gray-500 mt-1">💡 Thử: nguyenvana@gmail.com</p>
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block font-bold text-gray-800 mb-2">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
              placeholder="Mật khẩu"
              required
            />
            <p className="text-xs text-gray-500 mt-1">💡 Thử: password123</p>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-block w-full mb-5"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <p className="text-center text-gray-600">
          Chưa có tài khoản? <Link to="/register" className="text-primary font-bold hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
