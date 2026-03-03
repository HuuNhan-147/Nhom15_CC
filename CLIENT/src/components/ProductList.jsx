import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_CANDIDATES = Array.from(
  new Set(
    [
      process.env.REACT_APP_API_URL,
      "http://localhost:5000/api/v1",
      "http://localhost:5000/api",
      "/api/v1",
      "/api",
    ]
      .filter(Boolean)
      .map((base) => base.replace(/\/+$/, "")),
  ),
);

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  return query.toString();
};

const normalizeProductListResponse = (payload) => {
  if (Array.isArray(payload)) {
    return { products: payload, pagination: null };
  }

  const root = payload?.data ?? payload;

  if (Array.isArray(root)) {
    return { products: root, pagination: null };
  }

  if (Array.isArray(root?.products)) {
    return { products: root.products, pagination: root.pagination ?? null };
  }

  if (Array.isArray(payload?.products)) {
    return {
      products: payload.products,
      pagination: payload.pagination ?? null,
    };
  }

  return { products: [], pagination: null };
};

const fetchJsonWithFallback = async (path, queryParams = {}) => {
  const query = buildQuery(queryParams);
  const suffix = `${path}${query ? `?${query}` : ""}`;

  let lastError = null;

  for (const base of API_BASE_CANDIDATES) {
    const url = `${base}${suffix}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        lastError = new Error(
          `API Error ${response.status}: ${response.statusText}`,
        );
        continue;
      }

      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Không thể kết nối API sản phẩm");
};

const getProductId = (product) => product?._id || product?.id;
const getProductImage = (product) =>
  product?.image || product?.images?.[0] || FALLBACK_IMAGE;
const getReviewsCount = (product) =>
  Array.isArray(product?.reviews)
    ? product.reviews.length
    : Number(product?.reviews) || 0;
const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("vi-VN")} VND`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    status: "available",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 1,
  });

  const categories = useMemo(() => {
    const unique = new Set(
      products.map((item) => item?.category).filter(Boolean),
    );
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [products]);

  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchJsonWithFallback("/products", {
          ...appliedFilters,
          page: pagination.page,
          limit: pagination.limit,
        });

        const { products: items, pagination: paging } =
          normalizeProductListResponse(response);

        if (isCancelled) {
          return;
        }

        setProducts(Array.isArray(items) ? items : []);

        if (paging && typeof paging === "object") {
          setPagination((prev) => ({
            ...prev,
            page: Number(paging.page) || prev.page,
            limit: Number(paging.limit) || prev.limit,
            total: Number(paging.total) || 0,
            pages: Number(paging.pages) || 1,
          }));
        } else {
          setPagination((prev) => ({
            ...prev,
            total: Array.isArray(items) ? items.length : 0,
            pages: 1,
          }));
        }
      } catch (err) {
        if (!isCancelled) {
          setProducts([]);
          setError(err.message || "Không thể tải danh sách sản phẩm");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [appliedFilters, pagination.page, pagination.limit]);

  const applyFilters = (event) => {
    event.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    setAppliedFilters({
      search: searchInput.trim(),
      category: categoryInput,
      minPrice: minPriceInput,
      maxPrice: maxPriceInput,
      status: "available",
    });
  };

  const resetFilters = () => {
    setSearchInput("");
    setCategoryInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setPagination((prev) => ({ ...prev, page: 1 }));
    setAppliedFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      status: "available",
    });
  };

  const currentPage = Number(pagination.page) || 1;
  const totalPages = Number(pagination.pages) || 1;
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
