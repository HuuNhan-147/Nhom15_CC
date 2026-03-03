const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

// CRUD routes
router.post("/", (req, res) => productController.createProduct(req, res));
router.get("/", (req, res) => productController.getAllProducts(req, res));
router.get("/search", (req, res) => productController.searchProducts(req, res));
router.get("/category/:category", (req, res) =>
  productController.getByCategory(req, res),
);
router.get("/:id", (req, res) => productController.getProductById(req, res));
router.put("/:id", (req, res) => productController.updateProduct(req, res));
router.delete("/:id", (req, res) => productController.deleteProduct(req, res));

// Review routes
router.post("/:id/reviews", (req, res) =>
  productController.addReview(req, res),
);

module.exports = router;
