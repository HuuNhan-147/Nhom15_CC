import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockApi } from '../utils/mockData';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    mockApi.getProductById(parseInt(id)).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      mockApi.addToCart(product).then(() => {
        alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
      });
    }
  };

  return (
    <div className="py-5">
      {loading ? (
        <p className="text-center text-gray-600">Đang tải...</p>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full max-w-sm rounded-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3 text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mb-5 leading-relaxed">{product.description}</p>
            
            <div className="mb-5 p-4 bg-gray-100 rounded-lg">
              <p className="text-4xl font-bold text-primary mb-2">
                {product.price.toLocaleString('vi-VN')} VND
              </p>
              <div className="flex gap-5 text-sm">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐ {product.rating}</span>
                <span className="text-gray-600">{product.reviews} reviews</span>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-bold text-gray-800 mb-2">Số lượng:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="border border-gray-300 rounded-md px-3 py-2 w-20"
              />
              <p className="text-sm text-gray-600 mt-2">Kho: {product.stock} sản phẩm</p>
            </div>

            <div className="flex gap-3">
              <button 
                className="btn btn-primary flex-1" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                🛒 Thêm vào giỏ hàng
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-md font-medium hover:bg-gray-50">
                ❤️ Yêu thích
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-2">📦 Thông tin giao hàng</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Miễn phí giao hàng cho đơn hàng trên 500k</li>
                <li>✓ Giao hàng từ 2-3 ngày</li>
                <li>✓ Đổi trả 30 ngày</li>
                <li>✓ Bảo hành chính hãng</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Không tìm thấy sản phẩm</p>
      )}
    </div>
  );
}

export default ProductDetail;
