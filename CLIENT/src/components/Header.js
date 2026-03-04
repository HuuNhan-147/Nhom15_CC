import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="sticky top-0 z-100 bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        <div className="logo">
          <Link to="/" className="text-white text-2xl font-bold hover:text-primary transition-colors">
            E-Commerce
          </Link>
        </div>
        <nav className="flex gap-5 flex-wrap justify-center">
          <Link to="/" className="text-white hover:text-primary transition-colors">Trang chủ</Link>
          <Link to="/products" className="text-white hover:text-primary transition-colors">Sản phẩm</Link>
          <Link to="/cart" className="text-white hover:text-primary transition-colors">Giỏ hàng</Link>
          <Link to="/login" className="text-white hover:text-primary transition-colors">Đăng nhập</Link>
          <Link to="/register" className="text-white hover:text-primary transition-colors">Đăng ký</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
