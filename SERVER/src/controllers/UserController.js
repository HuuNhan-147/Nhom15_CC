const userService = require("../services/UserService");

class UserController {
  // Đăng ký
  async register(req, res) {
    try {
      const { fullName, email, password, phone } = req.body;

      if (!fullName || !email || !password || !phone) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng điền đầy đủ thông tin",
        });
      }

      const user = await userService.createUser({
        fullName,
        email,
        password,
        phone,
      });

      res.status(201).json({
        success: true,
        message: "Đăng ký thành công",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Đăng nhập
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập email và mật khẩu",
        });
      }

      const result = await userService.login(email, password);

      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy tất cả người dùng
  async getAllUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await userService.getAllUsers(page, limit);

      res.status(200).json({
        success: true,
        message: "Lấy danh sách người dùng thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy thông tin cá nhân theo ID (dành cho admin hoặc mục đích admin)
  async getProfile(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);

      res.status(200).json({
        success: true,
        message: "Lấy thông tin người dùng thành công",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy profile của chính người dùng dựa trên token
  async getMe(req, res) {
    try {
      const userId = req.user.userId;
      const user = await userService.getUserById(userId);

      res.status(200).json({
        success: true,
        message: "Lấy thông tin người dùng thành công",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật thông tin cá nhân (chỉ chính chủ hoặc admin)
  async updateProfile(req, res) {
    try {
      const userId = req.params.id;
      // quyền: chính chủ hoặc admin
      if (req.user.userId !== userId && req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Không có quyền cập nhật người dùng khác",
        });
      }

      const user = await userService.updateUser(userId, req.body);

      res.status(200).json({
        success: true,
        message: "Cập nhật thông tin thành công",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa người dùng (admin hoặc chính chủ)
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      if (req.user.userId !== userId && req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Không có quyền xóa người dùng khác",
        });
      }

      await userService.deleteUser(userId);

      res.status(200).json({
        success: true,
        message: "Xóa người dùng thành công",
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Đổi mật khẩu
  async changePassword(req, res) {
    try {
      const userId = req.params.id;
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập mật khẩu cũ và mật khẩu mới",
        });
      }

      await userService.changePassword(userId, oldPassword, newPassword);

      res.status(200).json({
        success: true,
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
