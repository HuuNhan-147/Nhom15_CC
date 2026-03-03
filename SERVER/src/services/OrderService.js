const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

class OrderService {
  // Tạo đơn hàng từ giỏ hàng
  async createOrder(userId, orderData) {
    try {
      // Lấy giỏ hàng
      const cart = await Cart.findOne({ userId });
      if (!cart || cart.items.length === 0) {
        throw new Error("Giỏ hàng trống");
      }

      // Kiểm tra stock các sản phẩm
      for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (product.stock < item.quantity) {
          throw new Error(
            `${item.name} không đủ số lượng. Còn lại: ${product.stock}`,
          );
        }
      }

      // Tạo mã đơn hàng
      const orderCode = "ORD" + Date.now();

      // Tạo đơn hàng
      const order = new Order({
        orderCode,
        userId,
        items: cart.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress: orderData.shippingAddress,
        totalPrice: cart.totalPrice,
        shippingFee: orderData.shippingFee || 0,
        discount: orderData.discount || 0,
        finalTotal:
          cart.totalPrice +
          (orderData.shippingFee || 0) -
          (orderData.discount || 0),
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes,
      });

      // Giảm stock
      for (const item of cart.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }

      // Xóa giỏ hàng
      await Cart.findOneAndDelete({ userId });

      await order.save();
      return order;
    } catch (error) {
      throw new Error(`Lỗi tạo đơn hàng: ${error.message}`);
    }
  }

  // Lấy tất cả đơn hàng
  async getAllOrders(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const orders = await Order.find()
        .skip(skip)
        .limit(limit)
        .populate("userId", "fullName email phone")
        .sort({ createdAt: -1 });

      const total = await Order.countDocuments();

      return {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Lỗi lấy danh sách đơn hàng: ${error.message}`);
    }
  }

  // Lấy đơn hàng của người dùng
  async getUserOrders(userId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const orders = await Order.find({ userId })
        .skip(skip)
        .limit(limit)
        .populate("items.productId")
        .sort({ createdAt: -1 });

      const total = await Order.countDocuments({ userId });

      return {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Lỗi lấy đơn hàng: ${error.message}`);
    }
  }

  // Lấy đơn hàng theo ID
  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId)
        .populate("userId", "fullName email phone address")
        .populate("items.productId");

      if (!order) {
        throw new Error("Đơn hàng không tồn tại");
      }

      return order;
    } catch (error) {
      throw new Error(`Lỗi lấy thông tin đơn hàng: ${error.message}`);
    }
  }

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(orderId, orderStatus) {
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus, updatedAt: new Date() },
        { new: true },
      );

      if (!order) {
        throw new Error("Đơn hàng không tồn tại");
      }

      return order;
    } catch (error) {
      throw new Error(`Lỗi cập nhật trạng thái: ${error.message}`);
    }
  }

  // Cập nhật trạng thái thanh toán
  async updatePaymentStatus(orderId, paymentStatus) {
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus, updatedAt: new Date() },
        { new: true },
      );

      if (!order) {
        throw new Error("Đơn hàng không tồn tại");
      }

      return order;
    } catch (error) {
      throw new Error(`Lỗi cập nhật trạng thái thanh toán: ${error.message}`);
    }
  }

  // Hủy đơn hàng
  async cancelOrder(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error("Đơn hàng không tồn tại");
      }

      if (
        order.orderStatus !== "pending" &&
        order.orderStatus !== "confirmed"
      ) {
        throw new Error("Không thể hủy đơn hàng này");
      }

      // Hoàn lại stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity },
        });
      }

      order.orderStatus = "cancelled";
      order.updatedAt = new Date();
      await order.save();

      return order;
    } catch (error) {
      throw new Error(`Lỗi hủy đơn hàng: ${error.message}`);
    }
  }
}

module.exports = new OrderService();
