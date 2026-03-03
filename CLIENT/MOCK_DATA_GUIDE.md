# Mock Data Guide

## Giới thiệu

Dự án đã được setup với **Mock Data** để giúp bạn phát triển giao diện mà không cần backend API thực. Tất cả dữ liệu được lưu trữ trong file `src/utils/mockData.js`.

## 📊 Dữ Liệu Mock Có Sẵn

### 1. **Sản phẩm (mockProducts)**
- 8 sản phẩm mẫu (Laptop, iPhone, Headphones, TV, Camera, Tablet, Watch, Drone)
- Mỗi sản phẩm có: id, name, price, description, image, category, stock, rating, reviews

### 2. **Người dùng (mockUsers)**
```
Email: nguyenvana@gmail.com
Password: password123

Email: tranthib@gmail.com
Password: password456
```

### 3. **Giỏ hàng (mockCartItems)**
- 2 sản phẩm mẫu trong giỏ

### 4. **Đơn hàng (mockOrders)**
- 2 đơn hàng đã hoàn thành

### 5. **Danh mục (mockCategories)**
- 6 danh mục sản phẩm khác nhau

## 🎯 Các Trang Đã Sử Dụng Mock Data

### Trang Chủ (Home)
- ✅ Hiển thị các tính năng chính
- Status: Sẵn sàng

### Danh sách Sản phẩm (ProductList)
- ✅ Hiển thị 8 sản phẩm từ mockProducts
- ✅ Click vào sản phẩm để xem chi tiết
- Status: **Đã hoàn thành**

### Chi tiết Sản phẩm (ProductDetail)
- ✅ Lấy thông tin sản phẩm theo ID
- ✅ Thêm hàng vào giỏ
- ✅ Hiển thị tồn kho, đánh giá, số reviews
- Status: **Đã hoàn thành**

### Giỏ hàng (Cart)
- ✅ Hiển thị 2 sản phẩm mẫu
- ✅ Sửa số lượng
- ✅ Xóa sản phẩm
- ✅ Tính toán tổng tiền
- Status: **Đã hoàn thành**

### Thanh toán (Checkout)
- ✅ Điền thông tin giao hàng
- ✅ Chọn phương thức thanh toán
- ✅ Tạo đơn hàng mới
- ✅ Hiển thị tóm tắt đơn hàng
- Status: **Đã hoàn thành**

### Đăng nhập (Login)
- ✅ Xác thực người dùng
- ✅ Lưu thông tin vào localStorage
- ✅ Gợi ý tài khoản test: nguyenvana@gmail.com / password123
- Status: **Đã hoàn thành**

### Đăng ký (Register)
- ✅ Tạo tài khoản mới
- ✅ Xác thực email chưa tồn tại
- ✅ Kiểm tra mật khẩu hợp lệ
- Status: **Đã hoàn thành**

## 🔧 Cách Sử Dụng Mock API

### Import
```javascript
import { mockApi, mockProducts } from '../utils/mockData';

// hoặc từng item
import { mockProducts, mockUsers, mockApi } from '../utils/mockData';
```

### Các hàm sẵn có

```javascript
// Products
await mockApi.getProducts()           // Lấy tất cả sản phẩm
await mockApi.getProductById(id)      // Lấy 1 sản phẩm theo ID

// Users
await mockApi.getUsers()              // Lấy tất cả người dùng
await mockApi.getUserById(id)         // Lấy 1 người dùng theo ID

// Authentication
await mockApi.login(email, password)  // Đăng nhập
await mockApi.register(name, email, password)  // Đăng ký

// Cart
await mockApi.getCart()               // Lấy giỏ hàng
await mockApi.addToCart(product)      // Thêm vào giỏ

// Orders
await mockApi.getOrders(userId)       // Lấy đơn hàng của người dùng
await mockApi.createOrder(orderData)  // Tạo đơn hàng mới

// Categories
await mockApi.getCategories()         // Lấy tất cả danh mục

// Reviews
await mockApi.getProductReviews(productId)  // Lấy review của sản phẩm
```

## 📝 Ví dụ Sử Dụng

### Lấy danh sách sản phẩm:
```javascript
useEffect(() => {
  mockApi.getProducts().then(products => {
    console.log(products);
  });
}, []);
```

### Thêm vào giỏ hàng:
```javascript
const handleAddToCart = (product) => {
  mockApi.addToCart(product).then(item => {
    alert('Thêm vào giỏ hàng thành công!');
  });
};
```

### Tạo đơn hàng:
```javascript
const handleCheckout = async () => {
  const cartItems = await mockApi.getCart();
  const order = await mockApi.createOrder({
    userId: 1,
    items: cartItems,
    total: calculateTotal(),
    shippingAddress: '123 Đường ABC',
    paymentMethod: 'credit-card'
  });
  console.log('Đơn hàng:', order);
};
```

## 🔄 Chuyển sang API Thực

Khi bạn sẵn sàng kết nối API thực, bạn chỉ cần:

1. Tạo file `src/services/api.js` hoặc `src/api/client.js`
2. Thay thế import từ mockData sang API thực:
```javascript
// Trước:
import { mockApi } from '../utils/mockData';

// Sau:
import { api } from '../services/api'; // hoặc api client thực của bạn
```

3. Các hàm sẽ vẫn giữ nguyên interface, chỉ cần thay đổi implementation

## 💡 Mẹo Hữu Ích

### Thêm sản phẩm mới vào mock data:
```javascript
// Thêm vào mockProducts array trong mockData.js
{
  id: 9,
  name: 'Sản phẩm mới',
  price: 1000000,
  description: 'Mô tả',
  image: 'URL hình ảnh',
  category: 'Category',
  stock: 10,
  rating: 4.5,
  reviews: 50
}
```

### Thay đổi dữ liệu người dùng:
```javascript
// Chỉnh sửa mockUsers array hoặc tạo tài khoản mới qua Register
mockUsers.push({
  id: 3,
  fullName: 'Người dùng mới',
  email: 'new@example.com',
  password: 'password123',
  // ... thông tin khác
});
```

## ⚠️ Lưu Ý Quan Trọng

1. **Mock data sẽ reset**: Khi refresh trang, tất cả thay đổi sẽ mất (ngoại trừ localStorage)
2. **localStorage**: Thông tin đăng nhập được lưu trong localStorage
3. **Delay**: Các API mock có delay 300-500ms để mô phỏng API thực
4. **Validation**: Có kiểm tra cơ bản (email tồn tại, mật khẩu hợp lệ)

## 🚀 Bước Tiếp Theo

Khi đã phát triển xong giao diện:

1. ✅ Tạo API backend (Express.js trong SERVER/)
2. ✅ Thay MockApi bằng Axios/Fetch API thực
3. ✅ Kết nối Database
4. ✅ Deploy

---

**Prepared for:** E-Commerce Application  
**Last Updated:** March 2, 2026
