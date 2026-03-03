const cartService = require("../services/CartService");

class CartController {
  async getCart(req, res) {
    try {
      const userId = req.params.userId;
      const cart = await cartService.getCart(userId);

      res.status(200).json({
        success: true,
        message: "Lấy giỏ hàng thành công",
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async addToCart(req, res) {
    try {
      const userId = req.params.userId;
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập productId và quantity",
        });
      }

      const cart = await cartService.addToCart(userId, productId, quantity);

      res.status(201).json({
        success: true,
        message: "Thêm vào giỏ hàng thành công",
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateCartItem(req, res) {
    try {
      const userId = req.params.userId;
      const { productId, quantity } = req.body;

      if (!productId || quantity === undefined) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập mã sản phẩm và số lượng",
        });
      }

      const cart = await cartService.updateCartItem(
        userId,
        productId,
        quantity,
      );

      res.status(200).json({
        success: true,
        message: "Cập nhật giỏ hàng thành công",
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async removeFromCart(req, res) {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;

      const cart = await cartService.removeFromCart(userId, productId);

      res.status(200).json({
        success: true,
        message: "Xóa khỏi giỏ hàng thành công",
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async clearCart(req, res) {
    try {
      const userId = req.params.userId;
      const cart = await cartService.clearCart(userId);

      res.status(200).json({
        success: true,
        message: "Xóa giỏ hàng thành công",
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CartController();
