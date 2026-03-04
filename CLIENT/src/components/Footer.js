import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary to-slate-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🛍️</span>
              ShopHub
            </h3>
            <p className="text-gray-300 leading-relaxed">Nền tảng mua sắm trực tuyến tàn tiên, kết nối bạn với hàng triệu sản phẩm chất lượng.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">✨ Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">→ Trang chủ</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-primary transition-colors">→ Sản phẩm</a></li>
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">→ Giới thiệu</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">💬 Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">→ Hỗ trợ khách hàng</a></li>
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">→ Chính sách bảo mật</a></li>
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">→ Điều khoản dịch vụ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">📱 Theo dõi</h3>
            <div className="flex gap-4 text-2xl">
              <a href="/" className="hover:text-primary transition-colors hover:scale-125 duration-300">📘</a>
              <a href="/" className="hover:text-primary transition-colors hover:scale-125 duration-300">🐦</a>
              <a href="/" className="hover:text-primary transition-colors hover:scale-125 duration-300">📷</a>
              <a href="/" className="hover:text-primary transition-colors hover:scale-125 duration-300">▶️</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ShopHub. Tất cả quyền được bảo lưu. | Thiết kế bởi Nhóm 15</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
