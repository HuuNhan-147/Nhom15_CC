import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="py-10">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary via-blue-600 to-accent text-white px-8 py-32 rounded-2xl text-center mb-16 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-6 leading-tight">🎉 Chào mừng đến ShopHub</h1>
          <p className="text-2xl mb-10 font-light text-blue-100">Khám phá hàng triệu sản phẩm với giá tốt nhất</p>
          <Link to="/products" className="inline-block px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
            🛍️ Mua sắm ngay
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-secondary">Tại sao chọn ShopHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-primary">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3 text-secondary">Giao hàng nhanh</h3>
            <p className="text-gray-600 leading-relaxed text-lg">Giao hàng miễn phí cho đơn hàng trên 500k và nhận hàng trong 24-48 giờ</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-success">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-2xl font-bold mb-3 text-secondary">Thanh toán an toàn</h3>
            <p className="text-gray-600 leading-relaxed text-lg">Nhiều phương thức thanh toán bảo mật và tiện lợi cho bạn</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-accent">
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold mb-3 text-secondary">Bảo vệ người mua</h3>
            <p className="text-gray-600 leading-relaxed text-lg">Hoàn tiền 100% nếu không hài lòng hoặc trả lại trong 30 ngày</p>
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <div className="bg-gradient-to-r from-accent to-pink-600 text-white px-8 py-16 rounded-2xl text-center shadow-xl mb-20">
        <h2 className="text-4xl font-bold mb-4">⚡ Ưu đãi đặc biệt hôm nay</h2>
        <p className="text-xl mb-8 font-light">Giảm giá đến 50% cho sản phẩm được chọn</p>
        <Link to="/products" className="inline-block px-8 py-4 bg-white text-accent rounded-full font-bold text-lg hover:bg-pink-50 transition-all duration-300 hover:scale-105">
          Xem ngay →
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-8 rounded-xl text-center shadow-lg">
          <div className="text-5xl font-bold mb-2">1M+</div>
          <p className="text-lg font-light">Sản phẩm</p>
        </div>
        <div className="bg-gradient-to-br from-success to-green-600 text-white p-8 rounded-xl text-center shadow-lg">
          <div className="text-5xl font-bold mb-2">500K+</div>
          <p className="text-lg font-light">Khách hàng</p>
        </div>
        <div className="bg-gradient-to-br from-warning to-orange-600 text-white p-8 rounded-xl text-center shadow-lg">
          <div className="text-5xl font-bold mb-2">99%</div>
          <p className="text-lg font-light">Hài lòng</p>
        </div>
        <div className="bg-gradient-to-br from-accent to-pink-600 text-white p-8 rounded-xl text-center shadow-lg">
          <div className="text-5xl font-bold mb-2">24/7</div>
          <p className="text-lg font-light">Hỗ trợ</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
