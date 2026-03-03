# 👥 Team Workflow Guide - Hướng Dẫn Làm Việc Nhóm Với GitHub Desktop

**Mục Tiêu:** Hướng dẫn chi tiết cách sử dụng GitHub Desktop để làm việc nhóm theo mô hình nhánh chuẩn (main → develop → feature/\*)

---

## 📋 Table of Contents

0. [Phân Công Công Việc](#phân-công-công-việc)
1. [Hướng Dẫn Chi Tiết Theo Vai Trò](#hướng-dẫn-chi-tiết-theo-vai-trò)
2. [Cài Đặt & Cấu Hình](#cài-đặt--cấu-hình)
3. [Clone Repository](#clone-repository)
4. [Workflow Feature Branch](#workflow-feature-branch)
5. [Commit & Push](#commit--push)
6. [Pull Request & Code Review](#pull-request--code-review)
7. [Merge & Sync](#merge--sync)
8. [Quản Lý Commit Nâng Cao](#quản-lý-commit-nâng-cao)
9. [Remote Operations](#remote-operations)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Phân Công Công Việc

### 📊 Phân Tích Project Structure

**Backend (Node.js + Express + MongoDB):**

```
✅ RESTful API (28 endpoints)
✅ 4 MongoDB Models (User, Product, Cart, Order)
✅ 4 Services (Business logic)
✅ 4 Controllers (API handlers)
✅ 4 Routes (API endpoints)
✅ Authentication (JWT + bcryptjs)
```

**Frontend (React/Vue - Cần Xây Dựng):**

```
🔲 Authentication UI (Login, Register, Profile)
🔲 Product Pages (List, Search, Detail, Filter)
🔲 Shopping Cart (View, Add, Remove, Checkout)
🔲 Order Management (History, Tracking, Status)
🔲 User Dashboard (Profile, Settings)
🔲 Admin Panel (Product Management)
🔲 UI/UX (Design, Responsive, Styling)
```

### 👥 Danh Sách Phân Công (7 Người)

#### **BACKEND TEAM (3 Người)**

| #   | Vai Trò      | Tên          | Feature Branches                               | Commit Min | Tasks                                                                                        |
| --- | ------------ | ------------ | ---------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| 1   | Backend Lead | Thành viên 1 | `feature/backend-setup`<br>`feature/user-auth` | ≥4         | • Setup backend project<br>• Models & Config<br>• User authentication<br>• Deployment config |
| 2   | Backend Dev  | Thành viên 2 | `feature/products`<br>`feature/cart`           | ≥4         | • Product CRUD<br>• Search & Filter<br>• Product Reviews<br>• Cart operations                |
| 3   | Backend Dev  | Thành viên 3 | `feature/orders`<br>`feature/payment`          | ≥4         | • Order Management<br>• Payment Status<br>• Order Tracking<br>• Integration Tests            |

#### **FRONTEND TEAM (4 Người)**

| #   | Vai Trò       | Tên          | Feature Branches                                    | Commit Min | Tasks                                                                                                     |
| --- | ------------- | ------------ | --------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| 4   | Frontend Lead | Thành viên 4 | `feature/frontend-setup`<br>`feature/auth-ui`       | ≥4         | • Frontend project setup<br>• Routing & Navigation<br>• Login/Register UI<br>• Layout & Header            |
| 5   | Frontend Dev  | Thành viên 5 | `feature/product-pages`<br>`feature/product-detail` | ≥4         | • Product List page<br>• Product Detail page<br>• Search UI<br>• Filter UI                                |
| 6   | Frontend Dev  | Thành viên 6 | `feature/cart-page`<br>`feature/checkout`           | ≥4         | • Cart page UI<br>• Checkout flow<br>• Payment form<br>• Order confirmation                               |
| 7   | Frontend Dev  | Thành viên 7 | `feature/user-dashboard`<br>`feature/admin-panel`   | ≥4         | • User profile page<br>• Order history<br>• Order tracking<br>• Admin dashboard<br>• Styling & Responsive |

---

### 📝 Commit Distribution & Timeline

**Commit Target Breakdown:**

```
Backend Team (3 người):
  Thành viên 1: 4 commits (backend-setup + user-auth)
  Thành viên 2: 4 commits (products + cart)
  Thành viên 3: 4 commits (orders + payment)
  Subtotal: 12 commits

Frontend Team (4 người):
  Thành viên 4: 4 commits (frontend-setup + auth-ui)
  Thành viên 5: 4 commits (product-pages + detail)
  Thành viên 6: 4 commits (cart-page + checkout)
  Thành viên 7: 5 commits (dashboard + admin)
  Subtotal: 17 commits

TOTAL: ~29 commits (spread across 7 people, not concentrated)
```

**Weekly Timeline:**

```
Week 1:
├── Day 1: Setup GitHub Desktop, clone repo
├── Day 2-3: Create feature branches
├── Day 4-5: Make initial commits
└── Review: Code review kickoff

Week 2:
├── Day 1-2: Continue development & commits
├── Day 3-4: Code review & feedback
├── Day 5: Merge PRs
└── Sync: Pull latest develop

Week 3:
├── Day 1-4: Polish, fix issues, final commits
├── Day 5: Final merge & testing
└── Preparation: Ready for submission
```

---

### 🔄 Review Checklist

**Mỗi PR phải có:**

- ✅ Ít nhất 2 commits
- ✅ Rõ ràng commit messages
- ✅ Screenshot (nếu là UI)
- ✅ Review từ 1 người khác
- ✅ Comments từ reviewer
- ✅ Approve trước merge

---

### 📸 Screenshot Collection Strategy

**Mỗi Thành Viên Phải Chụp (≈23 ảnh/người):**

- GitHub Desktop setup (1 ảnh)
- Clone repository (1 ảnh)
- Create branch (1 ảnh)
- Make commits (2 ảnh - message + files)
- Push to remote (1 ảnh)
- Create PR (2 ảnh - PR page)
- Code review process (2 ảnh - comments + approval)
- Merge PR (1 ảnh)
- Advanced Git operations (12 ảnh):
  - Undo (1 ảnh)
  - Amend (1 ảnh)
  - Revert (1 ảnh)
  - Cherry-pick (1 ảnh)
  - Squash (1 ảnh)
  - Reset (1 ảnh)
  - plus before/after states

**Team Total: ≈160 screenshots** → Organize by person in Google Doc

---

## 💼 Hướng Dẫn Chi Tiết Theo Vai Trò

### 🔴 Backend Lead - Thành viên 1

**Vai trò:** Setup backend, manage team, code review, deployment  
**Feature Branches:** `feature/backend-setup` + `feature/user-auth`  
**Commit Target:** ≥4 commits  
**Reviewers:** Thành viên 2 & 3 (you review their work)

#### **Công Việc Chi Tiết:**

**Branch 1: `feature/backend-setup` (2 commits)**

```
Commit 1: "Setup Express server with MongoDB connection"
  Làm những việc:
  ✓ Initialize Express app (app.js)
  ✓ Configure MongoDB connection with error handling
  ✓ Setup .env file with PORT, MONGO_URI
  ✓ Add middleware: cors, bodyParser, errorHandler
  ✓ Create config/config.js for settings

  Files to create/modify:
  - app.js
  - config/config.js
  - .env

Commit 2: "Create database models and schemas"
  Làm những việc:
  ✓ Create User model (name, email, password, phone, address, role)
  ✓ Create Product model (name, price, category, stock, rating)
  ✓ Create Cart model (userId, items array)
  ✓ Create Order model (orderCode, items, status)
  ✓ Add Mongoose schemas with validation

  Files to create:
  - models/User.js
  - models/Product.js
  - models/Cart.js
  - models/Order.js
```

**Branch 2: `feature/user-auth` (2 commits)**

```
Commit 1: "Implement user registration and login"
  Làm những việc:
  ✓ Create UserService.js with register/login logic
  ✓ Create UserController.js with auth endpoints
  ✓ Add password hashing with bcryptjs
  ✓ Add JWT token generation
  ✓ Create /users route file

  Endpoints to implement:
  - POST /users/register → register new user
  - POST /users/login → login and get JWT token

  Files to create:
  - services/UserService.js
  - controllers/UserController.js
  - routes/userRoutes.js

Commit 2: "Add security and deployment config"
  Làm những việc:
  ✓ Add JWT token validation middleware
  ✓ Add error handling middleware
  ✓ Create Heroku/Railway deployment config
  ✓ Setup environment variables for production
  ✓ Document API authentication in README

  Files to create/modify:
  - middleware/errorHandler.js
  - Procfile (for deployment)
  - .env.example
```

#### **Your Review Responsibilities:**

- ✅ Review every PR from Thành viên 2 before merge
- ✅ Review every PR from Thành viên 3 before merge
- ✅ Check commit messages are clear
- ✅ Verify no conflicts with main branch
- ✅ Approve when all checks pass

---

### 🔵 Backend Dev #1 - Thành viên 2

**Vai trò:** Implement Product & Cart API endpoints  
**Feature Branches:** `feature/products` + `feature/cart`  
**Commit Target:** ≥4 commits  
**Reviewer:** Thành viên 1 (Backend Lead)

#### **Công Việc Chi Tiết:**

**Branch 1: `feature/products` (2 commits)**

```
Commit 1: "Create product CRUD endpoints"
  Làm những việc:
  ✓ Create ProductService.js with CRUD operations
  ✓ Create ProductController.js with endpoints
  ✓ Create product validation rules
  ✓ Create /products route file

  Endpoints to implement:
  - GET /products → list all products (with pagination)
  - GET /products/:id → get one product
  - POST /products → create product (admin only)
  - PUT /products/:id → update product (admin only)
  - DELETE /products/:id → delete product (admin only)

  Files to create:
  - services/ProductService.js
  - controllers/ProductController.js
  - routes/productRoutes.js

Commit 2: "Add search, filter, and reviews"
  Làm những việc:
  ✓ Add search endpoint with keyword search
  ✓ Add filter by category
  ✓ Add filter by price range
  ✓ Add product rating calculations
  ✓ Add review endpoints

  Endpoints to add:
  - GET /products/search?q=keyword
  - GET /products?category=electronics&minPrice=100&maxPrice=1000
  - POST /products/:id/reviews → add product review
  - GET /products/:id/reviews → get product reviews

  Files to modify:
  - services/ProductService.js (add search/filter logic)
  - controllers/ProductController.js (add review endpoints)
```

**Branch 2: `feature/cart` (2 commits)**

```
Commit 1: "Create cart management endpoints"
  Làm những việc:
  ✓ Create CartService.js with cart operations
  ✓ Create CartController.js with endpoints
  ✓ Implement add to cart logic
  ✓ Implement cart item removal
  ✓ Create /carts route file

  Endpoints to implement:
  - GET /carts/:userId → get user's cart
  - POST /carts/:userId/add → add item to cart
  - PUT /carts/:userId/items/:productId → update quantity
  - DELETE /carts/:userId/items/:productId → remove item

  Files to create:
  - services/CartService.js
  - controllers/CartController.js
  - routes/cartRoutes.js

Commit 2: "Add cart calculations and validations"
  Làm những việc:
  ✓ Calculate total price automatically
  ✓ Validate product stock before adding
  ✓ Prevent negative quantities
  ✓ Clear cart after checkout
  ✓ Handle cart errors gracefully

  Endpoints to add:
  - DELETE /carts/:userId → clear entire cart

  Files to modify:
  - services/CartService.js (add validation)
  - controllers/CartController.js (add clear cart)
```

#### **Your Dev Process:**

1. Create feature/products from develop
2. Make 2 commits with clear messages
3. Push to GitHub
4. Create PR → request Thành viên 1 to review
5. Wait for feedback and fix if needed
6. After approve, GitHub Lead will merge
7. Sync your local develop
8. Repeat for feature/cart

---

### 🟡 Backend Dev #2 - Thành viên 3

**Vai trò:** Implement Order & Payment API endpoints  
**Feature Branches:** `feature/orders` + `feature/payment`  
**Commit Target:** ≥4 commits  
**Reviewer:** Thành viên 1 (Backend Lead)

#### **Công Việc Chi Tiết:**

**Branch 1: `feature/orders` (2 commits)**

```
Commit 1: "Create order CRUD endpoints"
  Làm những việc:
  ✓ Create OrderService.js with order operations
  ✓ Create OrderController.js with endpoints
  ✓ Implement create order from cart
  ✓ Get user's orders
  ✓ Create /orders route file

  Endpoints to implement:
  - POST /orders → create order from current cart
  - GET /orders → list all orders (admin)
  - GET /orders/user/:userId → get user's orders
  - GET /orders/:id → get order details

  Files to create:
  - services/OrderService.js
  - controllers/OrderController.js
  - routes/orderRoutes.js

Commit 2: "Add order status tracking"
  Làm những việc:
  ✓ Implement order status workflow
  ✓ Add status update endpoint
  ✓ Add order cancellation logic
  ✓ Calculate order totals (subtotal + shipping + tax)

  Endpoints to add:
  - PUT /orders/:id/status → update order status
  - PUT /orders/:id/cancel → cancel order

  Status workflow:
  - pending → confirmed → processing → shipped → delivered
  Or → cancelled (if before shipped)

  Files to modify:
  - services/OrderService.js (add status/cancel logic)
  - controllers/OrderController.js (add update endpoints)
```

**Branch 2: `feature/payment` (2 commits)**

```
Commit 1: "Create payment status management"
  Làm những việc:
  ✓ Create payment status endpoints
  ✓ Add payment method support (card, cash, bank transfer)
  ✓ Track payment state
  ✓ Add payment validation

  Endpoints to implement:
  - PUT /orders/:id/payment-status → update payment status
  - GET /orders/:id/payments → get payment history

  Payment methods:
  - credit_card
  - debit_card
  - cash_on_delivery
  - bank_transfer

  Payment statuses:
  - pending → completed or failed

  Files to modify:
  - services/OrderService.js (add payment logic)
  - controllers/OrderController.js (add payment endpoints)

Commit 2: "Add refund and notifications (optional)"
  Làm những việc:
  ✓ Implement refund workflow
  ✓ Add transaction logging
  ✓ Add payment notifications (email - optional)
  ✓ Handle payment errors

  Optional enhancements:
  - Stripe/PayPal integration (if time permits)
  - Email notifications on payment status
  - Transaction audit log
```

#### **Your Dev Process:**

1. Create feature/orders from develop
2. Make 2 commits with clear messages
3. Push to GitHub
4. Create PR → request Thành viên 1 to review
5. Address feedback and add commits if needed
6. Wait for approval and merge
7. Sync develop
8. Repeat for feature/payment

---

### 🟢 Frontend Lead - Thành viên 4

**Vai trò:** Setup frontend, manage code quality, code review  
**Feature Branches:** `feature/frontend-setup` + `feature/auth-ui`  
**Commit Target:** ≥4 commits  
**Reviewers:** Thành viên 5, 6, 7 (you review their work)

#### **Công Việc Chi Tiết:**

**Branch 1: `feature/frontend-setup` (2 commits)**

```
Commit 1: "Setup React/Vue project and routing"
  Làm những việc:
  ✓ Initialize React (npx create-react-app) or Vue (npm create vite)
  ✓ Setup folder structure:
    src/
    ├── components/ (reusable UI components)
    ├── pages/ (page-level components)
    ├── services/ (API calls - axiosAPI.js)
    ├── context/ or store/ (state management)
    ├── styles/ (global CSS)
    └── App.js/App.vue
  ✓ Install dependencies: axios, react-router-v6 (or vue-router)
  ✓ Setup API base URL in environment

  Files to create:
  - src/App.js (with routing)
  - src/services/api.js (axios instance)
  - src/components/Header.js (navbar)
  - src/components/Footer.js
  - src/pages/Home.js (home page placeholder)

Commit 2: "Create navigation and layout"
  Làm những việc:
  ✓ Create Header/Navbar component with:
    - Logo
    - Navigation links (Home, Products, Cart, Login)
    - User dropdown menu (if logged in)
  ✓ Create Footer component
  ✓ Create Layout wrapper component
  ✓ Setup routing structure:
    - / → Home page
    - /login → Login page
    - /register → Register page
    - /products → Product list
    - /products/:id → Product detail
    - /cart → Shopping cart
    - /checkout → Checkout page
    - /orders → User orders
    - /admin/* → Admin pages (protected)
  ✓ Setup TailwindCSS or Bootstrap

  Files to create/modify:
  - src/components/Header.js
  - src/components/Footer.js
  - src/components/Layout.js
  - src/App.js (routing configuration)
  - src/index.css (global styles)
```

**Branch 2: `feature/auth-ui` (2 commits)**

```
Commit 1: "Create login and register pages"
  Làm những việc:
  ✓ Create LoginPage component with:
    - Email input
    - Password input
    - "Remember me" checkbox
    - Login button
    - Link to register page
    - Client-side validation
  ✓ Create RegisterPage component with:
    - Full name input
    - Email input
    - Password input
    - Confirm password input
    - Phone input
    - Register button
    - Link to login page
    - Client-side validation
  ✓ Create form validation utilities

  Files to create:
  - src/pages/LoginPage.js
  - src/pages/RegisterPage.js
  - src/utils/validation.js

Commit 2: "Create auth context and protected routes"
  Làm những việc:
  ✓ Create AuthContext for state management
    - User state
    - Login action (POST /users/login)
    - Register action (POST /users/register)
    - Logout action
    - Store JWT in localStorage
  ✓ Create ProtectedRoute component
    - Redirect to login if not authenticated
    - Allow access if authenticated
  ✓ Update Header to show:
    - User name when logged in
    - Logout button
    - Profile link
  ✓ Connect API integration:
    - POST /users/register
    - POST /users/login

  Files to create:
  - src/context/AuthContext.js
  - src/components/ProtectedRoute.js

  Files to modify:
  - src/App.js (add auth routes)
  - src/components/Header.js (show user info)
  - src/services/api.js (add auth API calls)
```

#### **Your Review Responsibilities:**

- ✅ Review all frontend PRs (Thành viên 5, 6, 7)
- ✅ Ensure UI consistency (colors, fonts, spacing)
- ✅ Check component reusability
- ✅ Verify API integration is correct
- ✅ Test responsive design on mobile
- ✅ Approve when standards are met

---

### 🟣 Frontend Dev #1 - Thành viên 5

**Vai trò:** Build product listing and detail pages  
**Feature Branches:** `feature/product-pages` + `feature/product-detail`  
**Commit Target:** ≥4 commits  
**Reviewer:** Thành viên 4 (Frontend Lead)

#### **Công Việc Chi Tiết:**

**Branch 1: `feature/product-pages` (2 commits)**

```
Commit 1: "Create product list and filter sidebar"
  Làm những việc:
  ✓ Create ProductPage component
  ✓ Fetch products: GET /products (with pagination)
  ✓ Create ProductCard component:
    - Show product image
    - Show product name
    - Show price (and original price if on sale)
    - Show rating stars
    - "Add to Cart" button
  ✓ Create FilterSidebar component:
    - Category filter (checkboxes)
    - Price range filter (slider or inputs)
    - Rating filter (stars)
    - Clear filters button
  ✓ Display products in responsive grid (3 columns on desktop)

  Files to create:
  - src/pages/ProductPage.js (main product list)
  - src/components/ProductCard.js (product card)
  - src/components/FilterSidebar.js (filters)
  - src/utils/filters.js (filter logic)

Commit 2: "Add search and pagination"
  Làm những việc:
  ✓ Create SearchBar component with:
    - Search input
    - Real-time search (debounced)
    - Search button
  ✓ Add pagination:
    - Previous button
    - Page numbers
    - Next button
    - Items per page selector
  ✓ Connect to API:
    - GET /products/search?q=keyword
    - GET /products?page=1&limit=10&category=x&minPrice=y
  ✓ Update filters dynamically

  Files to create/modify:
  - src/components/SearchBar.js
  - src/components/Pagination.js
  - src/pages/ProductPage.js (add search/pagination)
  - src/services/api.js (add search API call)
```

**Branch 2: `feature/product-detail` (2 commits)**

```
Commit 1: "Create product detail page"
  Làm những việc:
  ✓ Create ProductDetailPage component
  ✓ Fetch single product: GET /products/:id
  ✓ Display product information:
    - Large product image (with zoom on hover)
    - Product name
    - Product description
    - Current price (highlight if on sale)
    - Original price (strikethrough)
    - Stock status (In Stock / Out of Stock)
    - Rating display (stars)
    - Number of reviews
  ✓ Create "Add to Cart" form:
    - Quantity selector (+ / - buttons)
    - "Add to Cart" button
    - Handle adding to cart (with feedback)

  Files to create:
  - src/pages/ProductDetailPage.js
  - src/components/ProductImage.js (image viewer)
  - src/components/AddToCartForm.js

Commit 2: "Add reviews and related products"
  Làm những việc:
  ✓ Display product reviews section:
    - List of reviews (user name, rating, date, comment)
    - Star rating display
    - Helpful/unhelpful buttons (optional)
  ✓ Create add review form:
    - Star rating (1-5)
    - Comment textarea
    - "Post Review" button
    - Client-side validation
  ✓ Connect to API:
    - GET /products/:id/reviews
    - POST /products/:id/reviews (add review)
  ✓ Add breadcrumb navigation
  ✓ Add "Related Products" section

  Files to create/modify:
  - src/components/ReviewsList.js
  - src/components/ReviewForm.js
  - src/components/Breadcrumb.js
  - src/components/RelatedProducts.js
  - src/pages/ProductDetailPage.js (add reviews section)
```

---

### 🟠 Frontend Dev #2 - Thành viên 6

**Vai trò:** Build shopping cart and checkout pages  
**Feature Branches:** `feature/cart-page` + `feature/checkout`  
**Commit Target:** ≥4 commits  
**Reviewer:** Thành viên 4 (Frontend Lead)

#### **Công Việc Chi Tiết:**

**Branch 1: `feature/cart-page` (2 commits)**

```
Commit 1: "Create shopping cart page layout"
  Làm những việc:
  ✓ Create CartPage component
  ✓ Fetch cart: GET /carts/:userId
  ✓ Display cart items in table/list:
    - Product image
    - Product name
    - Price per item
    - Quantity (with -/+ buttons)
    - Subtotal per item (quantity × price)
    - Remove button
  ✓ Create CartSummary section:
    - Subtotal
    - Shipping fee
    - Tax (calculate or hardcode)
    - Total price (bold/highlighted)
  ✓ Add "Continue Shopping" button (link to products)
  ✓ Add "Proceed to Checkout" button (navigate forward)
  ✓ Empty cart state (message + link to products)

  Files to create:
  - src/pages/CartPage.js
  - src/components/CartItem.js (single item)
  - src/components/CartSummary.js (totals section)

Commit 2: "Add quantity controls and remove items"
  Làm những việc:
  ✓ Quantity +/- buttons with:
    - Call PUT /carts/:userId/update
    - Update UI after response
    - Prevent 0 or negative quantity
  ✓ Remove item button with:
    - Call DELETE /carts/:userId/items/:productId
    - Remove from UI
    - Update totals
  ✓ Add "Clear Cart" button (optional):
    - DELETE /carts/:userId
    - Empty the cart display
  ✓ Add loading state during API calls
  ✓ Add error messages if something fails

  Files to modify:
  - src/pages/CartPage.js (add handlers)
  - src/services/api.js (add cart API calls)
```

**Branch 2: `feature/checkout` (2 commits)**

```
Commit 1: "Create checkout page with shipping form"
  Làm những việc:
  ✓ Create CheckoutPage component
  ✓ Show cart items summary (read-only, non-editable)
  ✓ Create ShippingForm with:
    - Full name input
    - Street address input
    - City/Province input
    - Postal code input
    - Phone number input
    - Form validation
  ✓ Add "Use profile address" checkbox:
    - Auto-fill from user profile
  ✓ Progress indicator:
    - Step 1: Shipping (active)
    - Step 2: Payment (next)
    - Step 3: Confirmation (final)

  Files to create:
  - src/pages/CheckoutPage.js
  - src/components/ShippingForm.js
  - src/components/CheckoutSummary.js
  - src/components/CheckoutProgress.js

Commit 2: "Create payment form and confirmation"
  Làm những việc:
  ✓ Create PaymentForm with:
    - Payment method selector:
      - Credit/Debit Card
      - Cash on Delivery
      - Bank Transfer
    - If Card selected, show:
      - Card number input
      - Expiry date (MM/YY)
      - CVC/CVV
      - Cardholder name
    - Validation (card format, CVC 3 digits, etc.)
  ✓ OrderSummary display:
    - Items list (non-editable)
    - Shipping address
    - Total price breakdown:
      - Subtotal
      - Shipping fee
      - Tax
      - Total (highlighted)
  ✓ Submit button: POST /orders
    - Create order with cart items
    - Include shipping address
    - Include payment method
  ✓ OrderConfirmation display (after successful order):
    - Order number
    - Success message
    - "Track Order" button (link to orders page)
    - "Continue Shopping" button
  ✓ Error handling (show error messages)

  Files to create/modify:
  - src/components/PaymentForm.js
  - src/components/OrderConfirmation.js
  - src/pages/CheckoutPage.js (add payment logic)
  - src/services/api.js (add order creation call)
```

---

### 🔵 Frontend Dev #3 - Thành viên 7

**Vai trò:** Build user dashboard, admin panel, and final styling  
**Feature Branches:** `feature/user-dashboard` + `feature/admin-panel`  
**Commit Target:** ≥5 commits  
**Reviewer:** Thành viên 4 (Frontend Lead)

#### **Công Việc Chi Tiết:**

**Branch 1: `feature/user-dashboard` (2 commits)**

```
Commit 1: "Create user profile page"
  Làm những việc:
  ✓ Create UserProfilePage component
  ✓ Fetch user: GET /users/:id
  ✓ Display user information:
    - Avatar/profile picture
    - Full name
    - Email
    - Phone number
    - Saved addresses (if multiple)
  ✓ Create edit profile form:
    - Name field (editable)
    - Phone field (editable)
    - Address field (editable)
    - Save button (PUT /users/:id)
  ✓ Change password link:
    - Open modal/separate page
    - Old password input
    - New password input
    - Confirm password input
    - Submit button (POST /users/:id/change-password)

  Files to create:
  - src/pages/UserProfilePage.js
  - src/components/EditProfileForm.js
  - src/components/ChangePasswordForm.js

Commit 2: "Create order history and tracking"
  Làm những việc:
  ✓ Create OrderHistoryPage component
  ✓ Fetch orders: GET /orders/user/:userId
  ✓ Display orders in table/list:
    - Order number / ID
    - Order date
    - Total price
    - Order status (with color badge):
      - Blue: pending
      - Yellow: confirmed
      - Orange: processing
      - Green: shipped/delivered
      - Red: cancelled
    - "View Details" button
  ✓ Create OrderTrackingDetail page:
    - Order number
    - Order timeline (visual):
      - pending ✓
      - confirmed ✓
      - processing ✗ (current)
      - shipped
      - delivered
    - Estimated delivery date
    - Tracking number (if applicable)
    - Shipping address
    - "Cancel Order" button (if status is pending/confirmed)
    - "Download Invoice" button (optional)
  ✓ Filter by status dropdown (optional)

  Files to create/modify:
  - src/pages/OrderHistoryPage.js
  - src/pages/OrderTrackingDetailPage.js
  - src/components/OrderTimeline.js
  - src/services/api.js (add order API calls)
```

**Branch 2: `feature/admin-panel` (3 commits)**

```
Commit 1: "Create admin dashboard with statistics"
  Làm những việc:
  ✓ Create AdminDashboard component (protected route)
  ✓ Display key metrics:
    - Total orders (today/this month/all time)
    - Total revenue
    - Total users
    - Out of stock products
  ✓ Create StatCard components showing:
    - Number
    - Label
    - Trend indicator (↑ or ↓ percentage)
  ✓ Add quick action buttons:
    - "View Recent Orders" (link to orders list)
    - "Add New Product" (link to product form)
    - "Manage Users" (link to users list)
  ✓ Optional: Add charts (using Chart.js or similar):
    - Sales trend (line chart)
    - Category distribution (pie chart)

  Files to create:
  - src/pages/AdminDashboard.js
  - src/components/StatCard.js
  - src/components/AdminHeader.js

Commit 2: "Create product management page"
  Làm những việc:
  ✓ Create ProductManagementPage component
  ✓ Fetch all products: GET /products
  ✓ Display products in admin table:
    - Product name
    - SKU
    - Category
    - Price
    - Stock quantity
    - Status (available/unavailable)
    - Action buttons:
      - Edit (open edit form)
      - Delete (with confirmation)
  ✓ Create EditProductForm:
    - Product name
    - Description
    - Price
    - Original price (if on sale)
    - Category dropdown
    - Stock quantity
    - SKU
    - Image upload
    - Save button (PUT /products/:id)
  ✓ Bulk actions (optional):
    - Select multiple products
    - Change status (archive/restore)
    - Delete multiple

  Files to create:
  - src/pages/ProductManagementPage.js
  - src/components/ProductManagementTable.js
  - src/components/EditProductForm.js
  - src/components/ProductImageUpload.js

Commit 3: "Apply responsive design and final styling"
  Làm những việc:
  ✓ Make all pages responsive:
    - Mobile: 1 column
    - Tablet: 2 columns
    - Desktop: 3+ columns
  ✓ Use consistent styling:
    - Tailwind CSS utility classes
    - Or Bootstrap classes
    - Consistent color scheme
    - Consistent spacing
  ✓ Add responsive navigation:
    - Mobile: hamburger menu
    - Tablet/Desktop: horizontal nav
  ✓ Dark mode support (optional):
    - Toggle button in header
    - Theme context
    - Dark color variables
  ✓ Animations and transitions:
    - Hover states on buttons
    - Smooth page transitions
    - Loading spinners
  ✓ Accessibility:
    - Proper button labels
    - ARIA attributes
    - Keyboard navigation

  Files to modify:
  - src/index.css (global styles)
  - Multiple component files (add responsive classes)
  - src/context/ThemeContext.js (optional dark mode)
```

---

## 🔧 Cài Đặt & Cấu Hình

### Bước 1: Tải GitHub Desktop

**Link tải:** https://desktop.github.com/

**Yêu cầu:**

- Windows 10+ hoặc macOS 10.12+
- Dung lượng: ~150 MB
- Kết nối internet

**Các bước cài đặt:**

1. Download file installer từ https://desktop.github.com/
2. Double-click file `.exe` để cài
3. Chọn "Install for me only" hoặc "Install for all users"
4. Đợi cài đặt hoàn tất (~2 phút)
5. GitHub Desktop sẽ tự động mở

---

### Bước 2: Đăng Nhập GitHub Account

**Trên GitHub Desktop:**

1. Click menu `File` → `Options` (Windows) hoặc `GitHub Desktop` → `Preferences` (Mac)
2. Chọn tab `Accounts`
3. Click `Sign in`
4. Chọn `GitHub.com` (or GitHub Enterprise if applicable)
5. Nhập:
   - GitHub username
   - GitHub password
6. Nếu có 2FA (Two Factor Authentication):
   - Nhập 6-digit code từ authenticator app
7. Click `Sign in`

**Kết Quả:**

```
✅ Account đã kết nối
✅ Có thể truy cập repositories
✅ Sẵn sàng clone projects
```

---

### Bước 3: Cấu Hình Git Username & Email

**Trên GitHub Desktop:**

1. Click `File` → `Options` (Windows) hoặc `GitHub Desktop` → `Preferences` (Mac)
2. Chọn tab `Git`
3. Nhập thông tin:
   - **Name:** Tên của bạn (VD: Nguyễn Văn A)
   - **Email:** Email GitHub của bạn (PHẢI KHỚP với email đăng ký GitHub)
4. Click `Save`

**Lưu ý:**

- Tên sẽ hiển thị trong commit history
- Email phải trùng với email GitHub account
- Không có ký tự đặc biệt trong tên

---

## 📥 Clone Repository

### Bước 1: Lấy Repository Link

**Trên GitHub.com:**

1. Truy cập: `https://github.com/[owner-name]/Nhom48_CongCu`
2. Click nút `Code` (xanh lá)
3. Copy SSH link (nếu có setup SSH) hoặc HTTPS link
4. Link sẽ giống: `https://github.com/owner/Nhom48_CongCu.git`

---

### Bước 2: Clone Repository Với GitHub Desktop

**Cách 1: Từ GitHub Desktop**

1. Click `File` → `Clone Repository`
2. Chọn tab `URL`
3. Paste repository link vào "Repository URL"
4. Chọn thư mục local:
   - **Recommended:** `C:\Users\[YourName]\Documents\GitHub\Nhom48_CongCu`
   - Tránh Desktop (dễ lag)
5. Click `Clone`
6. Đợi quá trình clone hoàn tất (1-2 phút)

**Cách 2: Click "Open with GitHub Desktop"**

1. Trên GitHub.com, click `Code` → `Open with GitHub Desktop`
2. GitHub Desktop sẽ tự động mở
3. Chọn local path
4. Click `Clone`

**Kết Quả:**

```
✅ Repository cloned locally
✅ Có thể bắt đầu làm việc
✅ Tất cả files đã tải xuống
```

---

### Bước 3: Mở Project Trong Code Editor

**Sau khi clone:**

1. Click GitHub Desktop → `Repository` → `Open in Visual Studio Code`
2. Hoặc mở folder manually:
   - Mở Visual Studio Code
   - `File` → `Open Folder`
   - Chọn folder `Nhom48_CongCu`
3. Kiểm tra files đã clone:
   - Thấy `package.json`, `src/`, `README.md`, etc.

---

## 🌿 Workflow Feature Branch

### Quy Tắc Branching

```
main (Production)
  ↓
develop (Integration)
  ↓
feature/* (Individual Work)
  - feature/backend-setup
  - feature/user-auth
  - feature/products
  - feature/cart
  - feature/orders
  - feature/payment
  - feature/frontend-setup
  - feature/auth-ui
  - feature/product-pages
  - feature/product-detail
  - feature/cart-page
  - feature/checkout
  - feature/user-dashboard
  - feature/admin-panel
```

### Bước 1: Tạo Feature Branch

**Trên GitHub Desktop:**

1. Click `Current Branch` tab
2. Click `New Branch` button
3. Nhập tên branch:
   - Format: `feature/[task-name]`
   - VD: `feature/backend-setup` hoặc `feature/products`
   - Lowercase, no spaces, use hyphens
4. Chọn "Based on branch": **develop**
   - KHÔNG phải main!
5. Click `Create Branch`

**Visual:**

```
┌─────────────────────────────────────────┐
│ Current Branch                          │
├─────────────────────────────────────────┤
│ [develop] ✓                             │
├─────────────────────────────────────────┤
│ [New Branch]                            │
│                                         │
│ Name: feature/backend-setup             │
│                                         │
│ Based on: develop ✓                     │
│                                         │
│ [Create Branch]  [Cancel]               │
└─────────────────────────────────────────┘
```

**Kết Quả:**

```
✅ Branch created locally
✅ Switched to new branch automatically
✅ Ready to start coding
```

---

### Bước 2: Commit Your Changes

**Mỗi lần bạn thay đổi code:**

1. Mở GitHub Desktop
2. Biểu đồ "Changes" sẽ hiển thị:
   - Files thay đổi (new, modified, deleted)
3. Click checkbox để select files (hoặc "Select All")
4. Nhập commit message:
   - Format: `[action] brief description`
   - VD:
     - "Setup Express server with MongoDB"
     - "Add user authentication"
     - "Create product CRUD endpoints"
5. Click `Commit to feature/backend-setup`

**Ví Dụ Commit Messages:**

```
✅ "Setup Express server with MongoDB connection"
✅ "Add user registration validation"
✅ "Create product search endpoint"
✅ "Implement cart total calculations"
❌ "fix stuff" (too vague)
❌ "aaa" (meaningless)
```

---

### Bước 3: Push Branch Lên GitHub

**Sau khi commit:**

1. Click `Publish branch` button (trên gray bar)
2. Hoặc: Click `Push to origin` (nếu đã push trước đó)
3. Đợi push hoàn tất

**Kết Quả:**

```
✅ Branch đã lên GitHub remote
✅ Có thể tạo PR từ GitHub.com
✅ Các bạn khác có thể xem code
```

---

## 🔄 Pull Request & Code Review

### Bước 1: Tạo Pull Request

**Trên GitHub.com:**

1. Truy cập: `https://github.com/owner/Nhom48_CongCu`
2. Bạn sẽ thấy notification: "Your branch feature/backend-setup had recent pushes"
3. Click `Compare & pull request` (xanh lá)
4. Hoặc click `Pull requests` tab → `New pull request`

**Trên PR Form:**

1. **Base branch:** develop (KHÔNG phải main)
2. **Compare branch:** feature/backend-setup
3. **Title:** Mô tả ngắn gọn công việc
   - VD: "Add backend setup and MongoDB configuration"
4. **Description:** Mô tả chi tiết:
   - Các files thay đổi
   - Chức năng thêm được
   - Testing notes (nếu có)
5. **Assignees:** Assign cho Backend Lead để review
6. **Labels:** Đánh label (backend, frontend, docs, etc.)
7. Click `Create pull request`

**Template PR Description:**

```markdown
## What was changed

- Setup Express server
- Configure MongoDB connection
- Added error handling middleware

## Files changed

- app.js (created)
- config/config.js (created)
- .env (created)

## Testing

- Tested MongoDB connection
- Verified error handling on bad mongo URI

## Screenshots (if applicable)

[Paste screenshots here]
```

---

### Bước 2: Code Review Process

**Trên PR Page:**

1. **Reviewer (Backend Lead):**
   - Click `Files changed` tab
   - Review từng file
   - Hover on line → clikck `+` để comment
   - Viết comment/feedback
   - Click `Start a review` → `Comment` (non-blocking) hoặc `Request changes` (blocks merge)

2. **Code Author (You):**
   - Đọc reviewer comments
   - Nếu đồng ý, reply "Done" hoặc "Fixed"
   - Nếu không đồng ý, discuss trong comment
   - Quay lại IDE, fix issues
   - Make additional commits
   - Push commits (auto-update PR)

**Tiêu Chí Code Review:**

- ✅ Code follows naming conventions
- ✅ Error handling is present
- ✅ No console.logs left (debug statements)
- ✅ Comments explain complex logic
- ✅ Tests pass (if applicable)
- ✅ No hardcoded values

---

### Bước 3: Approve & Merge

**Khi reviewer đồng ý:**

1. Click `Approve` button
2. Click `Merge pull request` (xanh lá)
3. Chọn merge strategy:
   - **Recommended:** "Create a merge commit"
4. Click `Confirm merge`
5. Click `Delete branch` (để dọn dẹp)

**Kết Quả:**

```
✅ PR merged to develop
✅ Feature branch deleted (on GitHub)
✅ developer can delete local branch
```

---

### Bước 4: Sync Local Repository

**Sau merge:**

1. Trở lại GitHub Desktop
2. Click `Current Branch` → `develop`
3. Click `Fetch origin` (lấy latest từ GitHub)
4. Code sẽ tự động update
5. Xóa local feature branch:
   - Click `Current Branch` → `feature/backend-setup`
   - Right-click → `Delete...`

**Chuẩn bị tác vụ tiếp theo:**

1. Click `Current Branch` → `develop`
2. Click `New Branch` → tạo feature branch tiếp theo
3. Repeat workflow

---

## 🚀 Quản Lý Commit Nâng Cao

> Tất cả dùng GitHub Desktop UI, KHÔNG cần terminal/command line

### 1. Undo Last Commit

**Nếu vừa commit nhưng muốn undo:**

GitHub Desktop:

1. Click `History` tab
2. Right-click trên commit muốn undo
3. Click `Revert This Commit`
4. Sẽ tạo 1 commit mới undo changes
5. Click `Push origin`

**Result:**

```
Commit A (original) → Commit B (revert) → History clean
```

---

### 2. Amend Last Commit

**Nếu vừa commit nhưng forgot add 1 file:**

GitHub Desktop:

1. Make thêm changes
2. On the Changes panel, select files changed
3. Check `Amend previous commit` checkbox (bottom)
4. Click `Amend`
5. Click `Force push origin` (update remote)

**Result:**

```
Before: Commit A (incomplete)
After: Commit A (updated with new files)
```

---

### 3. Revert Specific Commit

**Nếu muốn undo changes từ 1 commit cũ (không phải latest):**

GitHub Desktop:

1. Click `History` tab
2. Tìm commit muốn revert
3. Right-click → `Revert This Commit`
4. Sẽ tạo commit mới undo changes
5. Click `Push origin`

**Example:**

```
Commit A: "Setup backend"
Commit B: "Add auth" (want to undo)
Commit C: "Add products"

After revert:
Commit A: "Setup backend"
Commit B: "Add auth"
Commit C: "Add products"
Commit D: "Revert add auth" ← new commit
```

---

### 4. Cherry-pick Commit

**Nếu muốn copy 1 commit từ nhánh khác sang feature branch:**

GitHub Desktop:

1. Click `Current Branch` → Switch to target branch
2. Click `History`
3. Find commit từ branch khác (shift-click to see all branches)
4. Right-click → `Cherry-pick this commit`
5. Nếu conflicts, resolve manually
6. Click `Continue` sau resolve

**Example:**

```
feature/products:
  Commit A: "Add product validation"

feature/cart (current):
  Want: Copy validation logic từ feature/products
  → Cherry-pick Commit A
```

---

### 5. Squash Commits

**Nếu có 3 small commits suốt muốn merge thành 1 commit:**

GitHub Desktop:

1. Click `History` tab
2. Select first commit (oldest)
3. Hold Shift + click last commit (newest)
4. Right-click → `Squash commits` HOẶC `Rebase onto develop`
5. Sẽ merge tất cả selected commits
6. Click `Push origin`

**Example:**

```
Before:
  Commit A: "WIP"
  Commit B: "Fix typo"
  Commit C: "Final version"

After:
  Commit ABC: "Add product features" (squashed)
```

---

### 6. Reset/Undo Changes

**Nếu made mistakes và muốn quay lại previous commit:**

GitHub Desktop:

1. Click `History` tab
2. Right-click trên commit 5 commits trước
3. Click `Reset to this commit`
4. Chọn:
   - **Soft reset:** Keep changes in staging area
   - **Mixed reset:** Keep changes in working directory
   - **Hard reset:** Discard all changes (CAREFUL!)
5. Click `Reset`

**Warning:**

```
⚠️ Hard reset DELETES all work!
   Only use nếu absolutely sure!
✅ Soft/Mixed reset ← SAFE to use
```

---

## 👥 Best Practices

### Commit Message Convention

**Format:**

```
[TYPE] Brief description (50 chars max)

Optional detailed explanation
- What changed
- Why changed
- Any notes
```

**Types:**

- `[FEAT]` - New feature
- `[FIX]` - Bug fix
- `[REFACTOR]` - Code cleanup (no functionality change)
- `[DOCS]` - Documentation
- `[TEST]` - Test changes

**Examples:**

```
✅ [FEAT] Add product search endpoint
✅ [FIX] Fix cart total calculation bug
✅ [REFACTOR] Simplify authentication logic
✅ [DOCS] Update API documentation
❌ "fix" (too vague)
❌ "asdf" (meaningless)
❌ "Updated files" (no context)
```

---

### Daily Workflow

**Mỗi ngày:**

1. Start: Click GitHub Desktop → Pull latest develop

   ```
   File → Pull (or Ctrl+Shift+P)
   ```

2. Work:
   - Make changes in your feature branch
   - Test locally
   - Commit frequently (every feature, every fix)

3. End of day:
   - Push commits
   - Update PR with screenshots
   - Respond to review comments

---

### Conflict Resolution

**Nếu conflict xảy ra:**

1. GitHub Desktop sẽ notify: "Conflicting files"
2. Click `Resolve conflicts in external editor`
3. Mở file trong VS Code - sẽ thấy conflict markers:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```
4. Chọn/edit để keep both, one, hoặc custom
5. Delete conflict markers
6. Save file
7. Click `Mark as resolved` (GitHub Desktop)
8. Click `Commit merge`

---

## 🆘 Troubleshooting

### Issue 1: "Failed to Clone Repository"

**Nguyên nhân:**

- Wrong URL
- No internet connection
- SSH key not configured

**Fix:**

1. Check URL is correct: `https://github.com/owner/Nhom48_CongCu.git`
2. Test internet: open browser
3. Try HTTPS instead of SSH
4. Click `Clone` again

---

### Issue 2: "Your Branch is Behind Origin"

**Nguyên nhân:**

- Remote có commits mới mà local chưa có

**Fix:**

1. Click `Pull origin` (GitHub Desktop)
2. Or: Click `Fetch` then `Pull`
3. Wait for sync to complete

---

### Issue 3: "Merge Conflict"

**Nguyên nhân:**

- Same file edited in 2 different branches

**Fix - Using GitHub Desktop:**

1. "Open in VS Code" when conflict shown
2. Edit file, remove conflict markers
3. Save file
4. Back to GitHub Desktop
5. Click "Mark as resolved"
6. Click "Commit merge"

---

### Issue 4: "Committed to Wrong Branch"

**Example:** Committed to `develop` instead of `feature/products`

**Fix:**

1. GitHub Desktop → History
2. Right-click commit → `Revert this commit` (undo in develop)
3. Switch to `feature/products`
4. Make same changes
5. Commit again (to correct branch)
6. Force push both branches

---

### Issue 5: "Push Rejected - Please Pull First"

**Nguyên nhân:**

- Remote has newer commits

**Fix:**

1. Click `Pull origin` first
2. Resolve any conflicts if needed
3. Then `Push origin`

---

## 📞 Getting Help

**If stuck:**

1. Check GitHub Desktop Help: `Help` menu
2. Check this guide (Ctrl+F to search)
3. Google error message
4. Ask in team chat
5. Ask team lead for help

---

## ✅ Ready to Start!

**Checklist before starting:**

- ✅ GitHub Desktop installed
- ✅ GitHub account signed in
- ✅ Git config (username, email)
- ✅ Repository cloned
- ✅ Opened in VS Code
- ✅ Feature branch created
- ✅ Understood your task

**Next step:** Start coding! 🚀

---
