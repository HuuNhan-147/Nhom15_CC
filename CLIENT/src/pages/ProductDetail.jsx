import { Link } from "react-router-dom";
function ProductDetail() {
  if (loading) {
    return (
      <p className="text-center text-gray-600 py-5">
        Đang tải chi tiết sản phẩm...
      </p>
    );
  }

  if (error) {
    return (
      <div className="py-5">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-center mb-4">
          {error}
        </div>
        <div className="text-center">
          <Link to="/products" className="btn btn-primary">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-5 text-center">
        <p className="text-gray-600 mb-4">Không tìm thấy sản phẩm.</p>
        <Link to="/products" className="btn btn-primary">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const currentStock = Number(product.stock || 0);

  return (
    <div className="py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-md">
        <div>
          <img
            src={getProductImage(product)}
            alt={product?.name || "Product"}
            className="w-full rounded-lg object-cover max-h-[500px]"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3 text-gray-800">
            {product?.name || "Sản phẩm"}
          </h1>

          {product?.category && (
            <p className="inline-block text-sm px-3 py-1 rounded-full bg-green-50 text-green-700 mb-3">
              {product.category}
            </p>
          )}

          <p className="text-gray-600 mb-5 leading-relaxed">
            {product?.description || "Sản phẩm chưa có mô tả."}
          </p>

          <div className="mb-5 p-4 bg-gray-100 rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">
              {formatPrice(product?.price)}
            </p>
            {Number(product?.originalPrice || 0) >
              Number(product?.price || 0) && (
              <p className="text-gray-500 line-through mb-2">
                {formatPrice(product?.originalPrice)}
              </p>
            )}
            <div className="flex gap-5 text-sm">
              <span className="text-yellow-500">
                ⭐ {ratingText(product?.rating)}
              </span>
              <span className="text-gray-600">{reviews.length} đánh giá</span>
            </div>
          </div>

          <div className="mb-5">
            <label
              className="block font-bold text-gray-800 mb-2"
              htmlFor="quantity"
            >
              Số lượng:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={Math.max(1, currentStock)}
              value={quantity}
              onChange={(event) => {
                const value = Math.max(1, Number(event.target.value || 1));
                setQuantity(Math.min(value, Math.max(1, currentStock)));
              }}
              className="border border-gray-300 rounded-md px-3 py-2 w-24"
              disabled={currentStock < 1}
            />
            <p className="text-sm text-gray-600 mt-2">
              Kho: {currentStock} sản phẩm
              {product?.status && ` - Trạng thái: ${product.status}`}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="btn btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={currentStock < 1}
            >
              Thêm vào giỏ hàng
            </button>
            <Link
              to="/products"
              className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-md font-medium hover:bg-gray-50 text-center"
            >
              Xem thêm sản phẩm
            </Link>
          </div>

          {actionMessage && (
            <p className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
              {actionMessage}
            </p>
          )}
        </div>
      </div>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Đánh giá sản phẩm
        </h2>

        {reviews.length === 0 && (
          <p className="text-gray-600">
            Chưa có đánh giá nào cho sản phẩm này.
          </p>
        )}

        {reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review, index) => (
              <div
                key={`${review?.userName || "review"}-${index}`}
                className="border-b border-gray-100 pb-4"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-gray-800">
                    {review?.userName || "Người dùng"}
                  </p>
                  <span className="text-yellow-500 text-sm">
                    ⭐ {ratingText(review?.rating)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {review?.comment || "Không có nội dung đánh giá."}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((item) => {
              const itemId = getProductId(item);
              return (
                <Link
                  to={`/products/${itemId}`}
                  key={itemId}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={getProductImage(item)}
                    alt={item?.name || "Product"}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">
                      {item?.name}
                    </h3>
                    <p className="text-primary font-bold">
                      {formatPrice(item?.price)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
