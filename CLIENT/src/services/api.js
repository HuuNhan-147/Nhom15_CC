/**
 * API Service - Kết nối với Backend Server
 * 
 * Hỗ trợ JWT Authentication
 * 
 * Cách sử dụng:
 * import api from '../services/api';
 * api.setToken(token);  // Đặt token
 * await api.login(email, password);
 * await api.getProducts();
 */

class ApiService {
  constructor() {
    // Thay đổi URL khi deploy
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
    this.token = localStorage.getItem('token');
  }

  // Đặt token mới
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Thiết lập header với JWT token
  getHeaders(isFormData = false) {
    const headers = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
    return headers;
  }

  // Hàm chung để fetch với error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const isFormData = options.body instanceof FormData;
    const headers = this.getHeaders(isFormData);

    try {
      const response = await fetch(url, {
        headers,
        ...options,
      });

      const data = await response.json();

      // Nếu response không ok
      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || `API Error: ${response.status}`,
          data: data
        };
      }

      return data;
    } catch (error) {
      // Re-throw lỗi để có thể handle ở AuthContext
      throw error;
    }
  }

  // ==================== AUTHENTICATION ====================
  async login(email, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(fullName, email, password, phone) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, phone })
    });
  }

  async logout(refreshToken) {
    return this.request('/users/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    });
  }

  async refreshToken(refreshToken) {
    return this.request('/users/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    });
  }

  // ==================== PRODUCTS ====================
  async getProducts(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/products${query ? '?' + query : ''}`);
  }

  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  async getProductsByCategory(category) {
    return this.request(`/products/category/${category}`);
  }

  async searchProducts(keyword) {
    return this.request(`/products/search?keyword=${keyword}`);
  }

  // Admin: Tạo sản phẩm
  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  // Admin: Cập nhật sản phẩm
  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  }

  // Admin: Xóa sản phẩm
  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE'
    });
  }

  // ==================== USERS ====================
  async getMe() {
    return this.request('/users/me');
  }

  // Admin: Lấy tất cả users
  async getAllUsers(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/users${query ? '?' + query : ''}`);
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  // Admin: Xóa user
  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    });
  }

  async changePassword(id, passwordData) {
    return this.request(`/users/${id}/change-password`, {
      method: 'POST',
      body: JSON.stringify(passwordData)
    });
  }

  // ==================== CART ====================
  async getCart(userId) {
    return this.request(`/carts/${userId}`);
  }

  async addToCart(userId, productData) {
    return this.request(`/carts/${userId}/add`, {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  async updateCartItem(userId, updateData) {
    return this.request(`/carts/${userId}/update`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    });
  }

  async removeFromCart(userId, productId) {
    return this.request(`/carts/${userId}/items/${productId}`, {
      method: 'DELETE'
    });
  }

  async clearCart(userId) {
    return this.request(`/carts/${userId}/clear`, {
      method: 'DELETE'
    });
  }

  // ==================== ORDERS ====================
  async getMyOrders(userId) {
    return this.request(`/orders/user/${userId}`);
  }

  // Admin: Lấy tất cả orders
  async getAllOrders(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/orders${query ? '?' + query : ''}`);
  }

  async getOrderById(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  async createOrder(userId, orderData) {
    return this.request(`/orders/${userId}`, {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  // Admin: Cập nhật trạng thái order
  async updateOrderStatus(orderId, status) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  // Admin: Cập nhật trạng thái thanh toán
  async updatePaymentStatus(orderId, paymentStatus) {
    return this.request(`/orders/${orderId}/payment-status`, {
      method: 'PUT',
      body: JSON.stringify({ paymentStatus })
    });
  }

  async cancelOrder(orderId) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'PUT'
    });
  }

  // ==================== REVIEWS ====================
  async addProductReview(productId, reviewData) {
    return this.request(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }

  // ==================== STATISTICS ====================
  async getDashboardStats() {
    return this.request('/statistics');
  }

  // ==================== UPLOAD ====================
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/upload`;
    const headers = {
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }
}

// Khởi tạo instance duy nhất
const api = new ApiService();

export default api;
 *        .catch(error => console.error('Error:', error));
 *    }, []);
 * 
 * 3. POST request (Login):
 *    api.login(email, password)
 *      .then(user => console.log('Logged in as:', user))
 *      .catch(error => alert('Login failed'));
 * 
 * 4. PUT request (Update):
 *    api.updateUser(userId, { name: 'New Name' })
 *      .then(() => alert('Updated!'))
 *      .catch(error => alert('Update failed'));
 * 
 * 5. DELETE request:
 *    api.removeFromCart(itemId)
 *      .then(() => alert('Removed!'))
 *      .catch(error => alert('Delete failed'));
 */

export { ApiService };
