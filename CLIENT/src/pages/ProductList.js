import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../utils/mockData';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockApi.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="py-5">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Danh sách sản phẩm</h1>
      {loading ? (
        <p className="text-center text-gray-600">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-primary text-lg font-bold mb-2">{product.price.toLocaleString('vi-VN')} VND</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-yellow-500">⭐ {product.rating}</span>
                  <span className="text-gray-500">Kho: {product.stock}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
