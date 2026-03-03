import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Nếu admin, redirect đến admin dashboard
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-96 py-10">
      <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng nhập</h1>
        
        {(error || authError) && (
          <div className="mb-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || authError}
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
              disabled={isLoading || loading}
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
              placeholder="Mật khẩu"
              required
              disabled={isLoading || loading}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition-colors"
            disabled={isLoading || loading}
          >
            {isLoading || loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-green-600 hover:underline font-bold">
            Đăng ký ngay
          </Link>
        </div>

        {/* Test Credentials */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm font-bold text-blue-800 mb-2">🧪 Test Credentials:</p>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>User:</strong> user@example.com / 123456</p>
            <p><strong>Admin:</strong> admin@example.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 
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
