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
    <div className="flex justify-center items-center min-h-96 py-10">
      <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng ký</h1>
        
        {error && (
          <div className="mb-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="fullName" className="block font-bold text-gray-800 mb-2">Họ và tên:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
              placeholder="Họ và tên"
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
              placeholder="Email của bạn"
              required
            />
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
              placeholder="Mật khẩu (tối thiểu 6 ký tự)"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block font-bold text-gray-800 mb-2">Xác nhận mật khẩu:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-green-300"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-block w-full mb-5"
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
        <p className="text-center text-gray-600">
          Đã có tài khoản? <Link to="/login" className="text-primary font-bold hover:underline">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
