/**
 * API Service - Kết nối với Backend Server
 * 
 * Cách sử dụng:
 * import api from '../services/api';
 * 
 * Test môi trường:
 * API_URL hiện tại: http://localhost:5000 (có thể thay đổi)
 */

class ApiService {
  constructor() {
    // Thay đổi URL khi deploy
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    this.token = localStorage.getItem('token');
  }

  // Thiết lập header
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
  }

  // Hàm chung để fetch
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, {
        headers,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
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
    return this.request(`/products?category=${category}`);
  }

  async searchProducts(keyword) {
    return this.request(`/products/search?keyword=${keyword}`);
  }

  // ==================== USERS ====================
  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  // ==================== AUTHENTICATION ====================
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  }

  async register(fullName, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password })
    });
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // ==================== CART ====================
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productId, quantity = 1) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    });
  }

  async updateCartItem(itemId, quantity) {
    return this.request(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  }

  async removeFromCart(itemId) {
    return this.request(`/cart/${itemId}`, {
      method: 'DELETE'
    });
  }

  async clearCart() {
    return this.request('/cart', {
      method: 'DELETE'
    });
  }

  // ==================== ORDERS ====================
  async getOrders(userId) {
    return this.request(`/orders?userId=${userId}`);
  }

  async getOrderById(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async updateOrder(orderId, updateData) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    });
  }

  async cancelOrder(orderId) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'POST'
    });
  }

  // ==================== REVIEWS ====================
  async getProductReviews(productId) {
    return this.request(`/reviews?productId=${productId}`);
  }

  async createReview(productId, reviewData) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify({ productId, ...reviewData })
    });
  }

  async updateReview(reviewId, reviewData) {
    return this.request(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData)
    });
  }

  async deleteReview(reviewId) {
    return this.request(`/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  }

  // ==================== CATEGORIES ====================
  async getCategories() {
    return this.request('/categories');
  }

  async getCategoryById(id) {
    return this.request(`/categories/${id}`);
  }

  // ==================== PAYMENTS ====================
  async processPayment(paymentData) {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  }

  async getPaymentStatus(paymentId) {
    return this.request(`/payments/${paymentId}`);
  }

  // ==================== STATISTICS ====================
  async getStatistics() {
    return this.request('/statistics');
  }

  async getSalesReport(startDate, endDate) {
    return this.request(`/statistics/sales?start=${startDate}&end=${endDate}`);
  }

  // ==================== UPLOAD ====================
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': this.token ? `Bearer ${this.token}` : ''
      },
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

/**
 * Cách sử dụng API Service:
 * 
 * 1. Import:
 *    import api from '../services/api';
 * 
 * 2. Sử dụng trong component:
 *    
 *    useEffect(() => {
 *      api.getProducts()
 *        .then(data => setProducts(data))
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
