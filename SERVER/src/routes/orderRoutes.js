const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const { verifyToken, isAdmin, isOwnerOrAdmin } = require("../middleware/authMiddleware");

// Người dùng đã xác thực có thể tạo đơn hàng
router.post("/:userId", verifyToken, isOwnerOrAdmin, (req, res) => 
  orderController.createOrder(req, res));

// Chỉ admin có thể xem tất cả đơn hàng
router.get("/", verifyToken, isAdmin, (req, res) => 
  orderController.getAllOrders(req, res));

// Người dùng có thể xem đơn hàng của chính mình, admin có thể xem đơn hàng của bất kỳ ai
router.get("/user/:userId", verifyToken, isOwnerOrAdmin, (req, res) =>
  orderController.getUserOrders(req, res),
);

// Người dùng và admin có thể xem chi tiết đơn hàng
router.get("/:id", verifyToken, (req, res) => 
  orderController.getOrderById(req, res));

// Chỉ admin có thể cập nhật trạng thái đơn hàng
router.put("/:id/status", verifyToken, isAdmin, (req, res) =>
  orderController.updateOrderStatus(req, res),
);

// Chỉ admin có thể cập nhật trạng thái thanh toán
router.put("/:id/payment-status", verifyToken, isAdmin, (req, res) =>
  orderController.updatePaymentStatus(req, res),
);

// Người dùng có thể hủy đơn hàng của chính mình
router.put("/:id/cancel", verifyToken, (req, res) => 
  orderController.cancelOrder(req, res));

module.exports = router;
