import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="py-5">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-20 rounded-lg text-center mb-10">
        <h1 className="text-5xl font-bold mb-5">Chào mừng đến E-Commerce</h1>
        <p className="text-xl mb-8">Mua sắm các sản phẩm chất lượng với giá tốt nhất</p>
        <Link to="/products" className="btn btn-primary">Mua sắm ngay</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
          <h3 className="text-xl font-bold mb-2 text-gray-800">🚚 Giao hàng nhanh</h3>
          <p className="text-gray-600 leading-relaxed">Giao hàng miễn phí cho đơn hàng trên 500k</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
          <h3 className="text-xl font-bold mb-2 text-gray-800">💳 Thanh toán an toàn</h3>
          <p className="text-gray-600 leading-relaxed">Nhiều phương thức thanh toán tuyệt vời</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
          <h3 className="text-xl font-bold mb-2 text-gray-800">🔒 Bảo vệ người mua</h3>
          <p className="text-gray-600 leading-relaxed">Chính sách hoàn tiền 100% nếu không hài lòng</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
