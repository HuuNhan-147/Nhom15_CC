# Hướng Dẫn Khởi Động Dự Án

## 🚀 Cài Đặt Ban Đầu

### Bước 1: Cài đặt Dependencies
```bash
cd CLIENT
npm install
```

### Bước 2: Khởi động Development Server
```bash
npm start
```

Ứng dụng sẽ tự động mở tại `http://localhost:3000`

## 📋 Các Script Có Sẵn

```bash
# Chạy trong chế độ development
npm start

# Build cho production
npm build

# Chạy các unit tests
npm test

# Eject (không thể hoàn tác!)
npm eject
```

## 🧪 Tài Khoản Test

Bạn có thể đăng nhập với tài khoản sau:

**Tài khoản 1:**
- Email: `nguyenvana@gmail.com`
- Password: `password123`

**Tài khoản 2:**
- Email: `tranthib@gmail.com`
- Password: `password456`

Hoặc tạo tài khoản mới qua trang **Đăng ký**

## 🎨 Sử Dụng TailwindCSS

Dự án sử dụng **TailwindCSS** cho styling. Các class utility đã:
- ✅ Được cấu hình sẵn
- ✅ Hỗ trợ dark mode
- ✅ Custom colors (primary: #4CAF50)
- ✅ Responsive breakpoints (sm, md, lg, xl)

Không cần viết CSS riêng!

## 📱 Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

**Ví dụ:**
```jsx
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive content
</div>
```

## 🔌 Mock Data

Tất cả dữ liệu được mock từ file `src/utils/mockData.js`

**Các dữ liệu sẵn có:**
- 📦 8 sản phẩm mẫu
- 👥 2 tài khoản người dùng
- 🛒 Giỏ hàng mẫu
- 📋 2 đơn hàng mẫu
- 📂 6 danh mục sản phẩm

Xem [MOCK_DATA_GUIDE.md](./MOCK_DATA_GUIDE.md) để biết chi tiết

## 📂 Cấu Trúc Dự Án

```
CLIENT/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── ProductList.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── utils/
│   │   └── mockData.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🔧 Cài đặt Thêm (Tùy chọn)

### Cài đặt Redux (cho State Management)
```bash
npm install redux react-redux @reduxjs/toolkit
```

### Cài đặt Form Validation
```bash
npm install react-hook-form yup
```

### Cài đặt Toast Notifications
```bash
npm install react-toastify
```

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Module not found"
```bash
# Xóa node_modules và reinstall
rm -r node_modules
npm install
```

### Lỗi: "Port 3000 đã được sử dụng"
```bash
# Chạy trên port khác
PORT=3001 npm start
```

### Lỗi: "npm command not found"
- Cài đặt Node.js từ https://nodejs.org/
- Restart terminal sau khi cài đặt

## 📖 Tài Liệu Hữu Ích

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Mock Data Guide](./MOCK_DATA_GUIDE.md)

## 🎯 Các Trang Chủ

| Trang | URL | Trạng Thái |
|-------|-----|----------|
| Trang chủ | `/` | ✅ Hoàn thành |
| Danh sách sản phẩm | `/products` | ✅ Hoàn thành |
| Chi tiết sản phẩm | `/products/:id` | ✅ Hoàn thành |
| Giỏ hàng | `/cart` | ✅ Hoàn thành |
| Thanh toán | `/checkout` | ✅ Hoàn thành |
| Đăng nhập | `/login` | ✅ Hoàn thành |
| Đăng ký | `/register` | ✅ Hoàn thành |

## 🚀 Deploy

### Build cho Production
```bash
npm run build
```

Thư mục `build/` chứa các tệp tối ưu hóa sẵn sàng để deploy

### Deploy lên Vercel (Khuyến nghị)
```bash
npm install -g vercel
vercel
```

### Deploy lên Netlify
```bash
npm run build
# Drag and drop thư mục build lên https://app.netlify.com
```

## 💡 Mẹo

- 👀 Sử dụng **React DevTools** browser extension để debug
- 🎨 Xem thử các TailwindCSS utilities: https://tailwindui.com
- 📝 Giữ các component nhỏ và tái sử dụng được
- 🔄 Sử dụng React Router cho navigation

## 📞 Liên Hệ & Hỗ Trợ

- 📧 Email: support@ecommerce.local
- 💬 Discord: discord.gg/ecommerce
- 🐛 Report bugs: GitHub Issues

---

**Happy Coding! 🎉**
