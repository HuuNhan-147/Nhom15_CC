const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

// Cart routes
router.get("/:userId", (req, res) => cartController.getCart(req, res));
router.post("/:userId/add", (req, res) => cartController.addToCart(req, res));
router.put("/:userId/update", (req, res) =>
  cartController.updateCartItem(req, res),
);
router.delete("/:userId/items/:productId", (req, res) =>
  cartController.removeFromCart(req, res),
);
router.delete("/:userId/clear", (req, res) =>
  cartController.clearCart(req, res),
);

module.exports = router;
