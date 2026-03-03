# JWT Authorization - Quick Reference

## Các Middleware Có Sẵn

```javascript
const { 
  verifyToken,        // Kiểm tra token hợp lệ
  requireAuth,        // Yêu cầu xác thực (=verifyToken)
  isAdmin,            // Chỉ admin
  isUser,             // Chỉ user thường
  isOwnerOrAdmin,     // Chủ sở hữu hoặc admin
  requireRole,        // Yêu cầu một trong các role
  checkUserStatus     // Kiểm tra tài khoản active
} = require("../middleware/authMiddleware");
```

## Cách Sử Dụng Nhanh

### 1️⃣ Public Endpoint (Không cần xác thực)
```javascript
router.get("/products", (req, res) => {
  // Tất cả mọi người có thể truy cập
  productController.getAllProducts(req, res);
});
```

### 2️⃣ Chỉ Cần Xác Thực
```javascript
router.post("/reviews", verifyToken, (req, res) => {
  // Người dùng đã đăng nhập mới có thể viết đánh giá
  productController.addReview(req, res);
});
```

### 3️⃣ Chỉ Admin
```javascript
router.delete("/products/:id", verifyToken, isAdmin, (req, res) => {
  // Chỉ admin mới có thể xóa sản phẩm
  productController.deleteProduct(req, res);
});
```

### 4️⃣ Chủ Sở Hữu Hoặc Admin
```javascript
router.get("/users/:id", verifyToken, isOwnerOrAdmin, (req, res) => {
  // Người dùng xem thông tin bản thân, admin xem bất kỳ ai
  userController.getProfile(req, res);
});
```

### 5️⃣ Yêu Cầu Một Trong Các Role
```javascript
router.put("/settings", verifyToken, requireRole("admin", "moderator"), (req, res) => {
  // Admin hoặc moderator (nếu có)
  settingsController.update(req, res);
});
```

### 6️⃣ Kiểm Tra Tài Khoản Active
```javascript
router.post("/orders", verifyToken, checkUserStatus, (req, res) => {
  // Tài khoản phải active mới được tạo đơn hàng
  orderController.createOrder(req, res);
});
```

## Trong Controller - Truy Cập Thông Tin Người Dùng

```javascript
const user = req.user; // {userId, email, role}

console.log(user.userId);  // ID người dùng
console.log(user.email);   // Email
console.log(user.role);    // "user" hoặc "admin"
```

## Thứ Tự Middleware Đúng

```javascript
// ❌ SAI - verifyToken phải trước
router.delete("/admin/users/:id", isAdmin, verifyToken, (req, res) => {
  // Lỗi!
});

// ✅ ĐÚNG
router.delete("/admin/users/:id", verifyToken, isAdmin, (req, res) => {
  // Tốt!
});
```

## Client - Gửi Token

```javascript
const token = localStorage.getItem('token');

const response = await fetch('/api/v1/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // Quan trọng!
  },
  body: JSON.stringify(data)
});
```

## Mã Lỗi

| Mã | Nghĩa | Giải Pháp |
|---|---|---|
| 401 | Không có token hoặc token không hợp lệ | Đăng nhập lại |
| 403 | Không có quyền truy cập | Kiểm tra role |
| 400 | Dữ liệu không hợp lệ | Kiểm tra request body |

## Tạo API Mới

**Template:**
```javascript
// routes/newRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/NewController");
const { verifyToken, isAdmin, isOwnerOrAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/", (req, res) => controller.getAll(req, res));

// User only
router.post("/", verifyToken, (req, res) => controller.create(req, res));

// Admin only
router.delete("/:id", verifyToken, isAdmin, (req, res) => controller.delete(req, res));

// Owner or Admin
router.put("/:id", verifyToken, isOwnerOrAdmin, (req, res) => controller.update(req, res));

module.exports = router;
```

---

**Xem chi tiết:** [JWT_AUTHORIZATION_GUIDE.md](./JWT_AUTHORIZATION_GUIDE.md)
