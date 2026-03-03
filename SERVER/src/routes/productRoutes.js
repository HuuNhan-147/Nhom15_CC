const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Public routes - không cần xác thực
router.get("/", (req, res) => productController.getAllProducts(req, res));
router.get("/search", (req, res) => productController.searchProducts(req, res));
router.get("/category/:category", (req, res) =>
  productController.getByCategory(req, res),
);
router.get("/:id", (req, res) => productController.getProductById(req, res));

// Admin-only routes - chỉ admin có thể tạo, sửa, xóa sản phẩm
router.post("/", verifyToken, isAdmin, (req, res) => 
  productController.createProduct(req, res));
router.put("/:id", verifyToken, isAdmin, (req, res) => 
  productController.updateProduct(req, res));
router.delete("/:id", verifyToken, isAdmin, (req, res) => 
  productController.deleteProduct(req, res));

// Review routes - người dùng đã xác thực có thể thêm đánh giá
router.post("/:id/reviews", verifyToken, (req, res) =>
  productController.addReview(req, res),
);

module.exports = router;
