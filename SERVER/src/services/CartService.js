const Cart = require("../models/Cart");
const Product = require("../models/Product");

class CartService {
  // Lấy giỏ hàng của người dùng
  async getCart(userId) {
    try {
      let cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart) {
        cart = new Cart({ userId, items: [] });
        await cart.save();
      }
      return cart;
    } catch (error) {
      throw new Error(`Lỗi lấy giỏ hàng: ${error.message}`);
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  async addToCart(userId, productId, quantity) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Sản phẩm không tồn tại");
      }

      if (product.stock < quantity) {
        throw new Error(`Số lượng không đủ. Còn lại: ${product.stock}`);
      }

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      // Kiểm tra sản phẩm đã có trong giỏ hàng
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
        });
      }

      // Tính lại tổng giá và số lượng
      this.calculateCartTotals(cart);
      await cart.save();

      return cart.populate("items.productId");
    } catch (error) {
      throw new Error(`Lỗi thêm vào giỏ hàng: ${error.message}`);
    }
  }

  // Cập nhật số lượng sản phẩm
  async updateCartItem(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error("Giỏ hàng không tồn tại");
      }

      const item = cart.items.find(
        (item) => item.productId.toString() === productId,
      );
      if (!item) {
        throw new Error("Sản phẩm không có trong giỏ hàng");
      }

      if (quantity <= 0) {
        // Xóa sản phẩm nếu số lượng <= 0
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId,
        );
      } else {
        // Kiểm tra stock
        const product = await Product.findById(productId);
        if (product.stock < quantity) {
          throw new Error(`Số lượng không đủ. Còn lại: ${product.stock}`);
        }
        item.quantity = quantity;
      }

      this.calculateCartTotals(cart);
      await cart.save();

      return cart.populate("items.productId");
    } catch (error) {
      throw new Error(`Lỗi cập nhật giỏ hàng: ${error.message}`);
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  async removeFromCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error("Giỏ hàng không tồn tại");
      }

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId,
      );
      this.calculateCartTotals(cart);
      await cart.save();

      return cart.populate("items.productId");
    } catch (error) {
      throw new Error(`Lỗi xóa khỏi giỏ hàng: ${error.message}`);
    }
  }

  // Xóa tất cả sản phẩm trong giỏ hàng
  async clearCart(userId) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { items: [], totalPrice: 0, totalQuantity: 0 },
        { new: true },
      );

      if (!cart) {
        throw new Error("Giỏ hàng không tồn tại");
      }

      return cart;
    } catch (error) {
      throw new Error(`Lỗi xóa giỏ hàng: ${error.message}`);
    }
  }

  // Tính tổng giá và số lượng
  calculateCartTotals(cart) {
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    cart.totalQuantity = cart.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    cart.updatedAt = new Date();
  }
}

module.exports = new CartService();
