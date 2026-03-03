// Mock Data cho Sản phẩm
export const mockProducts = [
  {
    id: 1,
    name: 'Laptop Dell XPS 13',
    price: 25000000,
    description: 'Laptop cao cấp với màn hình 4K, CPU Intel i7, RAM 16GB',
    image: 'https://via.placeholder.com/300x200?text=Laptop+Dell+XPS',
    category: 'Electronics',
    stock: 5,
    rating: 4.5,
    reviews: 120
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 30000000,
    description: 'Smartphone cao cấp với camera 48MP, chip A17 Pro',
    image: 'https://via.placeholder.com/300x200?text=iPhone+15+Pro',
    category: 'Electronics',
    stock: 10,
    rating: 4.8,
    reviews: 256
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 8000000,
    description: 'Tai nghe chống ồn với pin 30 giờ',
    image: 'https://via.placeholder.com/300x200?text=Sony+Headphones',
    category: 'Audio',
    stock: 15,
    rating: 4.6,
    reviews: 189
  },
  {
    id: 4,
    name: 'Samsung 55" QLED TV',
    price: 20000000,
    description: 'TV 4K với công nghệ QLED mới nhất',
    image: 'https://via.placeholder.com/300x200?text=Samsung+TV',
    category: 'Electronics',
    stock: 3,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 5,
    name: 'Canon EOS R5',
    price: 50000000,
    description: 'Máy ảnh mirrorless chuyên nghiệp 45MP',
    image: 'https://via.placeholder.com/300x200?text=Canon+Camera',
    category: 'Cameras',
    stock: 2,
    rating: 4.9,
    reviews: 145
  },
  {
    id: 6,
    name: 'iPad Pro 12.9"',
    price: 18000000,
    description: 'Máy tính bảng cao cấp với M2 chip',
    image: 'https://via.placeholder.com/300x200?text=iPad+Pro',
    category: 'Tablets',
    stock: 8,
    rating: 4.5,
    reviews: 167
  },
  {
    id: 7,
    name: 'Apple Watch Series 9',
    price: 10000000,
    description: 'Đồng hồ thông minh với sức khỏe và fitness tracking',
    image: 'https://via.placeholder.com/300x200?text=Apple+Watch',
    category: 'Wearables',
    stock: 12,
    rating: 4.4,
    reviews: 203
  },
  {
    id: 8,
    name: 'DJI Air 3S',
    price: 22000000,
    description: 'Drone 4K với camera kép',
    image: 'https://via.placeholder.com/300x200?text=DJI+Drone',
    category: 'Drones',
    stock: 4,
    rating: 4.7,
    reviews: 87
  },
];

// Mock Data cho Users
export const mockUsers = [
  {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    password: 'password123',
    phone: '0901234567',
    address: '123 Đường Lê Lợi, Tp.HCM',
    city: 'Ho Chi Minh',
    zipCode: '70000',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    fullName: 'Trần Thị B',
    email: 'tranthib@gmail.com',
    password: 'password456',
    phone: '0912345678',
    address: '456 Đường Nguyễn Huệ, Tp.HCM',
    city: 'Ho Chi Minh',
    zipCode: '70000',
    createdAt: '2024-02-10'
  },
];

// Mock Data cho Cart
export const mockCartItems = [
  {
    id: 1,
    productId: 1,
    productName: 'Laptop Dell XPS 13',
    price: 25000000,
    quantity: 1,
    image: 'https://via.placeholder.com/300x200?text=Laptop+Dell+XPS',
    addedAt: '2024-03-01'
  },
  {
    id: 2,
    productId: 3,
    productName: 'Sony WH-1000XM5',
    price: 8000000,
    quantity: 2,
    image: 'https://via.placeholder.com/300x200?text=Sony+Headphones',
    addedAt: '2024-03-02'
  },
];

// Mock Data cho Orders
export const mockOrders = [
  {
    id: 'ORD-001',
    userId: 1,
    items: [
      { productId: 1, productName: 'Laptop Dell XPS 13', price: 25000000, quantity: 1 },
      { productId: 3, productName: 'Sony WH-1000XM5', price: 8000000, quantity: 1 }
    ],
    total: 33000000,
    status: 'delivered',
    shippingAddress: '123 Đường Lê Lợi, Tp.HCM',
    paymentMethod: 'credit-card',
    createdAt: '2024-02-20',
    deliveredAt: '2024-02-25'
  },
  {
    id: 'ORD-002',
    userId: 1,
    items: [
      { productId: 2, productName: 'iPhone 15 Pro', price: 30000000, quantity: 1 }
    ],
    total: 30000000,
    status: 'processing',
    shippingAddress: '123 Đường Lê Lợi, Tp.HCM',
    paymentMethod: 'bank-transfer',
    createdAt: '2024-03-01',
    deliveredAt: null
  },
];

// Mock Data cho Categories
export const mockCategories = [
  { id: 1, name: 'Electronics', count: 4 },
  { id: 2, name: 'Audio', count: 1 },
  { id: 3, name: 'Cameras', count: 1 },
  { id: 4, name: 'Tablets', count: 1 },
  { id: 5, name: 'Wearables', count: 1 },
  { id: 6, name: 'Drones', count: 1 },
];

// Mock Data cho Reviews
export const mockReviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: 'Nguyễn Văn A',
    rating: 5,
    title: 'Tuyệt vời!',
    comment: 'Laptop này rất tốt, hiệu năng mạnh mẽ và pin lâu',
    createdAt: '2024-02-15'
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    userName: 'Trần Thị B',
    rating: 4,
    title: 'Rất hài lòng',
    comment: 'Sản phẩm chất lượng, giao hàng nhanh',
    createdAt: '2024-02-20'
  },
];

// Mock Data cho Statistics
export const mockStatistics = {
  totalProducts: mockProducts.length,
  totalUsers: mockUsers.length,
  totalOrders: mockOrders.length,
  totalRevenue: 63000000,
  avgRating: 4.6,
  bestSeller: mockProducts[1], // iPhone 15 Pro
};

// Mock Data cho Addresses (Sổ địa chỉ)
export const mockAddresses = [
  {
    id: 1,
    userId: 1,
    label: 'Nhà riêng',
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường Lê Lợi',
    ward: 'Phường Bến Thành',
    district: 'Quận 1',
    city: 'Tp. Hồ Chí Minh',
    zipCode: '70000',
    isDefault: true,
  },
  {
    id: 2,
    userId: 1,
    label: 'Văn phòng',
    fullName: 'Nguyễn Văn A',
    phone: '0909876543',
    address: '456 Đường Nguyễn Du',
    ward: 'Phường 7',
    district: 'Quận 3',
    city: 'Tp. Hồ Chí Minh',
    zipCode: '70000',
    isDefault: false,
  },
  {
    id: 3,
    userId: 1,
    label: 'Nhà ba mẹ',
    fullName: 'Nguyễn Văn B',
    phone: '0918765432',
    address: '789 Đường Trần Hưng Đạo',
    ward: 'Phường 2',
    district: 'Quận 5',
    city: 'Tp. Hồ Chí Minh',
    zipCode: '70000',
    isDefault: false,
  },
];

// Mock Data cho Wishlist (Sản phẩm yêu thích)
export const mockWishlist = [
  {
    id: 1,
    userId: 1,
    productId: 2,
    addedAt: '2024-02-10',
  },
  {
    id: 2,
    userId: 1,
    productId: 5,
    addedAt: '2024-02-18',
  },
  {
    id: 3,
    userId: 1,
    productId: 7,
    addedAt: '2024-03-01',
  },
];

// API Service Mock Functions
export const mockApi = {
  // Products
  getProducts: () => new Promise(resolve => setTimeout(() => resolve(mockProducts), 500)),
  getProductById: (id) => new Promise(resolve => setTimeout(() => 
    resolve(mockProducts.find(p => p.id === id)), 300)),
  
  // Users
  getUsers: () => new Promise(resolve => setTimeout(() => resolve(mockUsers), 500)),
  getUserById: (id) => new Promise(resolve => setTimeout(() => 
    resolve(mockUsers.find(u => u.id === id)), 300)),
  
  // Authentication
  login: (email, password) => new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve({ ...userWithoutPassword, token: 'mock-token-' + user.id });
      } else {
        reject({ message: 'Email hoặc mật khẩu không đúng' });
      }
    }, 500);
  }),
  
  register: (fullName, email, password) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers.find(u => u.email === email)) {
        reject({ message: 'Email đã tồn tại' });
      } else {
        const newUser = {
          id: mockUsers.length + 1,
          fullName,
          email,
          password,
          phone: '',
          address: '',
          city: '',
          zipCode: '',
          createdAt: new Date().toISOString().split('T')[0]
        };
        resolve(newUser);
      }
    }, 500);
  }),
  
  // Cart
  getCart: () => new Promise(resolve => setTimeout(() => resolve(mockCartItems), 300)),
  addToCart: (product) => new Promise(resolve => setTimeout(() => {
    const newItem = {
      id: mockCartItems.length + 1,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      addedAt: new Date().toISOString().split('T')[0]
    };
    mockCartItems.push(newItem);
    resolve(newItem);
  }, 300)),
  
  // Orders
  getOrders: (userId) => new Promise(resolve => setTimeout(() => 
    resolve(mockOrders.filter(o => o.userId === userId)), 500)),
  createOrder: (orderData) => new Promise(resolve => setTimeout(() => {
    const newOrder = {
      id: 'ORD-' + String(mockOrders.length + 1).padStart(3, '0'),
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total,
      status: 'pending',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      createdAt: new Date().toISOString().split('T')[0],
      deliveredAt: null
    };
    mockOrders.push(newOrder);
    resolve(newOrder);
  }, 500)),
  
  // Categories
  getCategories: () => new Promise(resolve => setTimeout(() => resolve(mockCategories), 300)),
  
  // Reviews
  getProductReviews: (productId) => new Promise(resolve => setTimeout(() => 
    resolve(mockReviews.filter(r => r.productId === productId)), 300)),
};
