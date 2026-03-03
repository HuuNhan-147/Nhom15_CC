import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Về chúng tôi</h3>
            <p className="text-gray-300 leading-relaxed">E-Commerce là nền tảng bán hàng trực tuyến hàng đầu.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">Trang chủ</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-primary transition-colors">Sản phẩm</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-primary transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">Hỗ trợ</a></li>
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">Chính sách bảo mật</a></li>
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-5 text-center text-gray-400">
          <p>&copy; 2024 E-Commerce. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
