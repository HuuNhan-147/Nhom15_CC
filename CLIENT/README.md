# E-Commerce Client

Giao diện ReactJS cho ứng dụng bán hàng trực tuyến với TailwindCSS.

## Cấu trúc thư mục

```
CLIENT/
├── public/
│   └── index.html           # HTML chính
├── src/
│   ├── components/          # Các component tái sử dụng
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── pages/              # Các trang
│   │   ├── Home.js
│   │   ├── ProductList.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── App.js              # Component chính
│   ├── index.js            # Entry point
│   └── index.css           # Tailwind imports
├── tailwind.config.js      # Cấu hình Tailwind
├── postcss.config.js       # Cấu hình PostCSS
├── package.json            # Dependencies
└── README.md              # Tài liệu này
```

## Cài đặt

1. Cài đặt dependencies:
```bash
cd CLIENT
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

3. Build cho production:
```bash
npm build
```

## Các trang chính

- **Trang chủ** (`/`) - Hiển thị giới thiệu và các tính năng chính
- **Danh sách sản phẩm** (`/products`) - Hiển thị tất cả sản phẩm
- **Chi tiết sản phẩm** (`/products/:id`) - Xem chi tiết 1 sản phẩm
- **Giỏ hàng** (`/cart`) - Xem giỏ hàng
- **Thanh toán** (`/checkout`) - Hoàn tất đơn hàng
- **Đăng nhập** (`/login`) - Đăng nhập tài khoản
- **Đăng ký** (`/register`) - Tạo tài khoản mới

## Technologies

- **React 18** - JavaScript library cho UI
- **React Router** - Navigation
- **Axios** - HTTP client
- **TailwindCSS 3** - Utility-first CSS framework
- **PostCSS** - CSS transformation

## Các tính năng TailwindCSS

Dự án sử dụng TailwindCSS cho toàn bộ styling với các lợi thế:
- ✅ Responsive design tích hợp (sm, md, lg, xl)
- ✅ Utility classes trực tiếp trong JSX
- ✅ Dark mode ready
- ✅ Custom theme colors (primary: #4CAF50)
- ✅ Không cần viết CSS riêng biệt
- ✅ File size tối ưu với PurgeCSS

## Các custom classes

Được định nghĩa trong `index.css`:
- `.btn` - Button base styles
- `.btn-primary` - Primary button
- `.btn-large` - Large button
- `.btn-block` - Full width button

## TODO

- [ ] Kết nối API từ SERVER
- [ ] Xây dựng Context/Redux để quản lý state
- [ ] Thêm xác thực người dùng
- [ ] Triển khai giỏ hàng
- [ ] Tích hợp thanh toán
- [ ] Thêm tìm kiếm và lọc sản phẩm
- [ ] Responsive design hoàn chỉnh

#test