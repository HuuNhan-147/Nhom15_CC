import { Link } from "react-router-dom";

function ProductList() {
  return (
    <div className="py-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Danh sách sản phẩm
      </h1>

      <form
        onSubmit={applyFilters}
        className="bg-white rounded-lg shadow-sm p-4 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Tìm theo tên hoặc mô tả..."
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <select
            value={categoryInput}
            onChange={(event) => setCategoryInput(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            value={minPriceInput}
            onChange={(event) => setMinPriceInput(event.target.value)}
            placeholder="Giá từ"
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <input
            type="number"
            min="0"
            value={maxPriceInput}
            onChange={(event) => setMaxPriceInput(event.target.value)}
            placeholder="Giá đến"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="flex gap-3 mt-3">
          <button type="submit" className="btn btn-primary">
            Lọc sản phẩm
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50"
          >
            Đặt lại
          </button>
        </div>
      </form>

      {loading && (
        <p className="text-center text-gray-600">
          Đang tải danh sách sản phẩm...
        </p>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-center">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-600">
          Không có sản phẩm phù hợp với bộ lọc hiện tại.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => {
              const productId = getProductId(product);
              const reviewCount = getReviewsCount(product);

              return (
                <Link
                  to={`/products/${productId}`}
                  key={productId}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <img
                    src={getProductImage(product)}
                    alt={product?.name || "Product"}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
                      {product?.name || "Sản phẩm chưa đặt tên"}
                    </h3>

                    <p className="text-primary text-lg font-bold mb-1">
                      {formatPrice(product?.price)}
                    </p>

                    {product?.originalPrice > product?.price && (
                      <p className="text-sm text-gray-500 line-through mb-2">
                        {formatPrice(product?.originalPrice)}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-yellow-500">
                        ⭐ {Number(product?.rating || 0).toFixed(1)}
                      </span>
                      <span className="text-gray-500">
                        {reviewCount} đánh giá
                      </span>
                    </div>

                    <div className="mt-2 text-sm text-gray-500">
                      <span>Kho: {Number(product?.stock || 0)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: currentPage - 1 }))
                }
                disabled={currentPage <= 1}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Trước
              </button>

              <span className="text-sm text-gray-700">
                Trang {currentPage}/{totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: currentPage + 1 }))
                }
                disabled={currentPage >= totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
