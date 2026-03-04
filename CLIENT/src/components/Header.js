import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="logo">
            <Link
              to="/"
              className="text-white text-3xl font-bold hover:text-blue-100 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-4xl">🛍️</span>
              <span>ShopHub</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            <Link
              to="/"
              className="text-white hover:text-blue-100 transition-colors font-medium"
            >
              Trang chủ
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-blue-100 transition-colors font-medium"
            >
              Sản phẩm
            </Link>
            <Link
              to="/orders"
              className="text-white hover:text-blue-100 transition-colors font-medium"
            >
              Đơn hàng
            </Link>
          </nav>

          <div className="hidden md:flex gap-4 items-center">
            <Link
              to="/cart"
              className="relative text-white hover:text-blue-100 transition-colors text-2xl hover:scale-110 duration-300"
            >
              🛒
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 bg-white text-primary rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-accent text-white rounded-lg font-bold hover:bg-pink-600 transition-colors"
            >
              Đăng ký
            </Link>
          </div>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-blue-500 pt-4 space-y-3">
            <Link
              to="/"
              className="block text-white hover:text-blue-100 transition-colors font-medium py-2"
            >
              Trang chủ
            </Link>
            <Link
              to="/products"
              className="block text-white hover:text-blue-100 transition-colors font-medium py-2"
            >
              Sản phẩm
            </Link>
            <Link
              to="/cart"
              className="block text-white hover:text-blue-100 transition-colors font-medium py-2"
            >
              Giỏ hàng
            </Link>
            <Link
              to="/orders"
              className="block text-white hover:text-blue-100 transition-colors font-medium py-2"
            >
              Đơn hàng
            </Link>
            <Link
              to="/login"
              className="block px-6 py-2 bg-white text-primary rounded-lg font-bold hover:bg-blue-50 transition-colors text-center"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="block px-6 py-2 bg-accent text-white rounded-lg font-bold hover:bg-pink-600 transition-colors text-center"
            >
              Đăng ký
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
