const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const { verifyToken, isOwnerOrAdmin } = require("../middleware/authMiddleware");

// Người dùng chỉ có thể xem giỏ hàng của chính mình
router.get("/:userId", verifyToken, isOwnerOrAdmin, (req, res) => 
  cartController.getCart(req, res));

// Người dùng chỉ có thể thêm sản phẩm vào giỏ hàng của chính mình
router.post("/:userId/add", verifyToken, isOwnerOrAdmin, (req, res) => 
  cartController.addToCart(req, res));

// Người dùng chỉ có thể cập nhật giỏ hàng của chính mình
router.put("/:userId/update", verifyToken, isOwnerOrAdmin, (req, res) =>
  cartController.updateCartItem(req, res),
);

// Người dùng chỉ có thể xóa sản phẩm khỏi giỏ hàng của chính mình
router.delete("/:userId/items/:productId", verifyToken, isOwnerOrAdmin, (req, res) =>
  cartController.removeFromCart(req, res),
);

// Người dùng chỉ có thể xóa giỏ hàng của chính mình
router.delete("/:userId/clear", verifyToken, isOwnerOrAdmin, (req, res) =>
  cartController.clearCart(req, res),
);

module.exports = router;
