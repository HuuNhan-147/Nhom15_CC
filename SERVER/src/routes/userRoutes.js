const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Auth routes
router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.post("/forgot-password", (req, res) => userController.forgotPassword(req, res));
router.post("/reset-password", (req, res) => userController.resetPassword(req, res));

// User routes
// trang cá nhân của chính người dùng, cần xác thực
router.get("/me", verifyToken, (req, res) => userController.getMe(req, res));

// các route quản lý user (có thể cần admin hoặc xác thực)
router.get("/", verifyToken, isAdmin, (req, res) => userController.getAllUsers(req, res));
router.get("/:id", verifyToken, isAdmin, (req, res) => userController.getProfile(req, res));
router.put("/:id", verifyToken, (req, res) => userController.updateProfile(req, res));
router.delete("/:id", verifyToken, isAdmin, (req, res) => userController.deleteUser(req, res));
router.post("/:id/change-password", verifyToken, (req, res) =>
  userController.changePassword(req, res),
);

module.exports = router;
