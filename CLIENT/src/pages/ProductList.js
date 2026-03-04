import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../utils/mockData';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');\n\n  useEffect(() => {
    setLoading(true);
    mockApi.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);\n\n  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'sale') {
      return matchesSearch && product.discount > 0;
    }
    if (filter === 'inStock') {
      return matchesSearch && product.stock > 0;
    }
    return matchesSearch;
  });\n\n  return (
    <div className=\"py-10\">
      <div className=\"mb-10\">
        <h1 className=\"text-5xl font-bold mb-4 text-secondary\">💎 Danh sách sản phẩm</h1>
        <p className=\"text-gray-600 text-lg\">Khám phá bộ sưu tập sản phẩm tuyệt vời của chúng tôi</p>
      </div>\n\n      <div className=\"bg-white p-6 rounded-xl shadow-lg mb-10\">
        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4\">
          <input
            type=\"text\"
            placeholder=\"🔍 Tìm kiếm sản phẩm...\"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=\"px-5 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg\"
          />
          <div className=\"flex gap-2 flex-wrap\">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-3 rounded-lg font-bold transition-all ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter('sale')}
              className={`px-5 py-3 rounded-lg font-bold transition-all ${filter === 'sale' ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              ⚡ Khuyến mãi
            </button>
            <button
              onClick={() => setFilter('inStock')}
              className={`px-5 py-3 rounded-lg font-bold transition-all ${filter === 'inStock' ? 'bg-success text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              ✅ Còn hàng
            </button>
          </div>
        </div>
      </div>\n\n      {loading ? (
        <div className=\"text-center py-20\">
          <div className=\"inline-block\">
            <div className=\"text-6xl mb-4\">⏳</div>
            <p className=\"text-xl text-gray-600\">Đang tải sản phẩm...</p>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className=\"text-center py-20\">
          <div className=\"text-6xl mb-4\">😔</div>
          <p className=\"text-xl text-gray-600\">Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">
          {filteredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className=\"group card card-hover overflow-hidden\">
              <div className=\"relative overflow-hidden\">
                <img src={product.image} alt={product.name} className=\"w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500\" />
                {product.discount > 0 && (
                  <div className=\"absolute top-3 right-3 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold\">
                    -{product.discount}%
                  </div>
                )}
                {product.stock === 0 && (
                  <div className=\"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center\">
                    <span className=\"text-white text-xl font-bold\">Hết hàng</span>
                  </div>
                )}
              </div>
              <div className=\"p-5\">
                <h3 className=\"text-base font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors\">{product.name}</h3>
                <div className=\"flex items-center justify-between mb-4 pb-4 border-b border-gray-200\">
                  <div className=\"flex items-center gap-1\">
                    <span className=\"text-lg\">⭐</span>
                    <span className=\"font-bold text-gray-700\">{product.rating}</span>
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-success bg-opacity-20 text-success' : 'bg-danger bg-opacity-20 text-danger'}`}>
                    {product.stock > 0 ? `Kho: ${product.stock}` : 'Hết hàng'}
                  </span>
                </div>
                <div className=\"flex items-end justify-between\">
                  <div>
                    <p className=\"text-primary text-2xl font-bold\">{Math.floor(product.price * (1 - product.discount / 100)).toLocaleString('vi-VN')}<span className=\"text-sm\">₫</span></p>
                    {product.discount > 0 && (
                      <p className=\"text-gray-400 line-through text-sm\">{product.price.toLocaleString('vi-VN')}₫</p>
                    )}
                  </div>
                  <div className=\"text-2xl group-hover:scale-125 transition-transform\">→</div>
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
