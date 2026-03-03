# 🛍️ Website Thương Mại Điện Tử - E-Commerce

Dự án website thương mại điện tử được xây dựng bằng Node.js với mô hình kiến trúc **MVC** (Model - View - Controller).

## 📁 Cấu Trúc Dự Án

```
Nhom48_CongCu/
├── src/
│   ├── app.js                 # File chính khởi tạo server
│   ├── controllers/           # Xử lý logic request/response
│   │   ├── UserController.js
│   │   ├── ProductController.js
│   │   └── OrderController.js
│   ├── services/              # Business logic
│   │   ├── UserService.js
│   │   ├── ProductService.js
│   │   └── OrderService.js
│   ├── models/                # Định nghĩa cấu trúc dữ liệu
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/                # Định tuyến API
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── config/
│   │   └── config.js          # Cấu hình ứng dụng
│   └── middleware/
│       └── errorHandler.js    # Xử lý lỗi
├── package.json               # Dependencies và scripts
├── .env.example               # Các biến môi trường mẫu
└── .gitignore
```

## 🗂️ Mô Tả Từng Thành Phần

### Models (Mô Hình Dữ Liệu)

- **User.js**: Mô hình người dùng (tên, email, mật khẩu, địa chỉ, điện thoại)
- **Product.js**: Mô hình sản phẩm (tên, mô tả, giá, số lượng, danh mục)
- **Order.js**: Mô hình đơn hàng (người dùng, sản phẩm, tổng tiền, trạng thái)

### Services (Dịch Vụ - Business Logic)

- **UserService.js**: Quản lý người dùng (đăng ký, đăng nhập, cập nhật, xóa)
- **ProductService.js**: Quản lý sản phẩm (tạo, tìm kiếm, lọc theo danh mục)
- **OrderService.js**: Quản lý đơn hàng (tạo, cập nhật trạng thái, hủy)

### Controllers (Điều Khiển)

- Xử lý HTTP requests
- Gọi Services để thực hiện business logic
- Trả về JSON responses

### Routes (Đường Dẫn API)

Định tuyến các endpoint API cho các module

## 🚀 Cài Đặt & Chạy Dự Án

### 1. Cài đặt Dependencies

```bash
npm install
```

### 2. Thiết lập Biến Môi Trường

Tao file `.env` từ `.env.example`:

```bash
PORT=5000
NODE_ENV=development
DB_PATH=./database.db
```

### 3. Khởi Động Server

```bash
# Chế độ production
npm start

# Chế độ development (auto-reload)
npm run dev
```

Server sẽ chạy tại: http://localhost:5000

## 📡 API Endpoints

### Users (Người Dùng)

```
POST   /api/v1/users/register     - Đăng ký người dùng
POST   /api/v1/users/login        - Đăng nhập
GET    /api/v1/users              - Lấy tất cả người dùng
GET    /api/v1/users/:id          - Lấy người dùng theo ID
PUT    /api/v1/users/:id          - Cập nhật người dùng
DELETE /api/v1/users/:id          - Xóa người dùng
```

### Products (Sản Phẩm)

```
POST   /api/v1/products           - Tạo sản phẩm
GET    /api/v1/products           - Lấy tất cả sản phẩm
GET    /api/v1/products/search    - Tìm kiếm sản phẩm
GET    /api/v1/products/stock/available - Lấy sản phẩm còn hàng
GET    /api/v1/products/category/:category - Sản phẩm theo danh mục
GET    /api/v1/products/:id       - Lấy sản phẩm theo ID
PUT    /api/v1/products/:id       - Cập nhật sản phẩm
DELETE /api/v1/products/:id       - Xóa sản phẩm
```

### Orders (Đơn Hàng)

```
POST   /api/v1/orders             - Tạo đơn hàng
GET    /api/v1/orders             - Lấy tất cả đơn hàng
GET    /api/v1/orders/status/:status - Lấy đơn hàng theo trạng thái
GET    /api/v1/orders/user/:userId    - Lấy đơn hàng của người dùng
GET    /api/v1/orders/:id         - Lấy đơn hàng theo ID
PUT    /api/v1/orders/:id/status  - Cập nhật trạng thái đơn hàng
PUT    /api/v1/orders/:id/cancel  - Hủy đơn hàng
DELETE /api/v1/orders/:id         - Xóa đơn hàng
```

## 📝 Ví Dụ Sử Dụng API

### Đăng Ký Người Dùng

```bash
curl -X POST http://localhost:5000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "password": "password123",
    "address": "123 Đường ABC, Hà Nội",
    "phone": "0901234567"
  }'
```

### Tạo Sản Phẩm

```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Dell",
    "description": "Laptop Dell high-end",
    "price": 15000000,
    "quantity": 10,
    "category": "Electronics",
    "image": "laptop.jpg"
  }'
```

### Tạo Đơn Hàng

```bash
curl -X POST http://localhost:5000/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "products": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 15000000
      }
    ],
    "shippingAddress": "123 Đường ABC, Hà Nội"
  }'
```

## 🔧 Công Nghệ Sử Dụng

- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **CORS** - Cross-Origin Resource Sharing
- **Body-parser** - Middleware xử lý request body
- **Dotenv** - Quản lý biến môi trường
- **Nodemon** - Auto-reload during development

## 📚 Quy Tắc Phản Hồi API

Tất cả API đều trả về định dạng JSON:

```json
{
  "success": true/false,
  "message": "Thông báo",
  "data": {}
}
```

## 🚦 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## 📧 Trạng Thái Đơn Hàng

- `pending` - Chờ xác nhận
- `confirmed` - Đã xác nhận
- `shipped` - Đã gửi
- `delivered` - Đã giao
- `cancelled` - Đã hủy

## 🎯 Hướng Phát Triển Tiếp Theo

- [ ] Kết nối cơ sở dữ liệu (MongoDB, PostgreSQL, MySQL)
- [ ] Xác thực JWT
- [ ] Thanh toán trực tuyến
- [ ] Notification/Email
- [ ] Admin dashboard
- [ ] Testing (Jest, Mocha)
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📄 License

ISC

## ✏️ Tác Giả

Nhóm 48
