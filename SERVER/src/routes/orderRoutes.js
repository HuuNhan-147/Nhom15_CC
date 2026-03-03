const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

// Order routes
router.post("/:userId", (req, res) => orderController.createOrder(req, res));
router.get("/", (req, res) => orderController.getAllOrders(req, res));
router.get("/user/:userId", (req, res) =>
  orderController.getUserOrders(req, res),
);
router.get("/:id", (req, res) => orderController.getOrderById(req, res));
router.put("/:id/status", (req, res) =>
  orderController.updateOrderStatus(req, res),
);
router.put("/:id/payment-status", (req, res) =>
  orderController.updatePaymentStatus(req, res),
);
router.put("/:id/cancel", (req, res) => orderController.cancelOrder(req, res));

module.exports = router;
