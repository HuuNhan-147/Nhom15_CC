const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// Auth routes
router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));

// User routes
router.get("/", (req, res) => userController.getAllUsers(req, res));
router.get("/:id", (req, res) => userController.getProfile(req, res));
router.put("/:id", (req, res) => userController.updateProfile(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));
router.post("/:id/change-password", (req, res) =>
  userController.changePassword(req, res),
);

module.exports = router;
