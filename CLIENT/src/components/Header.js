import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Lỗi đăng xuất:', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        <div className="logo">
          <Link to="/" className="text-white text-2xl font-bold hover:text-green-500 transition-colors">
            E-Commerce
          </Link>
        </div>

        <nav className="flex gap-5 flex-wrap justify-center items-center">
          <Link to="/" className="text-white hover:text-green-500 transition-colors">
            Trang chủ
          </Link>
          <Link to="/products" className="text-white hover:text-green-500 transition-colors">
            Sản phẩm
          </Link>

          {/* Admin Link */}
          {isAdmin() && (
            <Link 
              to="/admin" 
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-bold"
            >
              👨‍💼 Admin
            </Link>
          )}

          {isAuthenticated() ? (
            <>
              {/* Cart */}
              <Link to="/cart" className="text-white hover:text-green-500 transition-colors">
                🛒 Giỏ hàng
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user?.fullName?.[0] || 'U'}
                  </div>
                  <span className="text-sm">{user?.fullName?.split(' ')[0]}</span>
                  <span className="text-xs">▼</span>
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-bold text-gray-800">{user?.fullName}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                      {user?.role === 'admin' && (
                        <p className="text-xs text-yellow-600 font-bold">👨‍💼 Admin</p>
                      )}
                    </div>
                    
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Hồ sơ cá nhân
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-bold transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-green-500 transition-colors">
                Đăng nhập
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
