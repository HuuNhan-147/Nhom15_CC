const orderService = require("../services/OrderService");

class OrderController {
  async createOrder(req, res) {
    try {
      const userId = req.params.userId;
      const orderData = req.body;

      if (!orderData.shippingAddress || !orderData.paymentMethod) {
        return res.status(400).json({
          success: false,
          message:
            "Vui lòng điền đầy đủ thông tin giao hàng và phương thức thanh toán",
        });
      }

      const order = await orderService.createOrder(userId, orderData);

      res.status(201).json({
        success: true,
        message: "Tạo đơn hàng thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy tất cả đơn hàng
  async getAllOrders(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await orderService.getAllOrders(page, limit);

      res.status(200).json({
        success: true,
        message: "Lấy danh sách đơn hàng thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy đơn hàng của người dùng
  async getUserOrders(req, res) {
    try {
      const userId = req.params.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await orderService.getUserOrders(userId, page, limit);

      res.status(200).json({
        success: true,
        message: "Lấy đơn hàng của bạn thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy thông tin đơn hàng
  async getOrderById(req, res) {
    try {
      const orderId = req.params.id;
      const order = await orderService.getOrderById(orderId);

      res.status(200).json({
        success: true,
        message: "Lấy thông tin đơn hàng thành công",
        data: order,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.id;
      const { orderStatus } = req.body;

      if (!orderStatus) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập trạng thái đơn hàng",
        });
      }

      const order = await orderService.updateOrderStatus(orderId, orderStatus);

      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái đơn hàng thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật trạng thái thanh toán
  async updatePaymentStatus(req, res) {
    try {
      const orderId = req.params.id;
      const { paymentStatus } = req.body;

      if (!paymentStatus) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập trạng thái thanh toán",
        });
      }

      const order = await orderService.updatePaymentStatus(
        orderId,
        paymentStatus,
      );

      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thanh toán thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Hủy đơn hàng
  async cancelOrder(req, res) {
    try {
      const orderId = req.params.id;
      const order = await orderService.cancelOrder(orderId);

      res.status(200).json({
        success: true,
        message: "Hủy đơn hàng thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();
