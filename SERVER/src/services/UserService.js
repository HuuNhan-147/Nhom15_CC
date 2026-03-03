const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// setup mail transporter
const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

class UserService {
  // Tạo người dùng mới
  async createUser(userData) {
    try {
      // Kiểm tra email đã tồn tại
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error("Email đã tồn tại");
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();

      // Trả về user mà không có password
      const userResponse = user.toObject();
      delete userResponse.password;
      return userResponse;
    } catch (error) {
      throw new Error(`Lỗi tạo người dùng: ${error.message}`);
    }
  }

  // Đăng nhập
  async login(email, password) {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new Error("Email hoặc mật khẩu không đúng");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Email hoặc mật khẩu không đúng");
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn },
      );
      // generate refresh token

      const userResponse = user.toObject();
      delete userResponse.password;

      return {
        user: userResponse,
        token,
      };
    } catch (error) {
      throw new Error(`Lỗi đăng nhập: ${error.message}`);
    }
  }

  // ----- refresh token helpers -----
  // ----- password reset helpers -----
  async createPasswordResetToken(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email không tồn tại");
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${config.clientUrl || "http://localhost:3000"}/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
      from: config.email.from,
      subject: "Yêu cầu đặt lại mật khẩu",
      text: `Bạn nhận được email vì đã yêu cầu đặt lại mật khẩu.

Vui lòng click vào link sau hoặc dán vào trình duyệt:

${resetUrl}

Nếu bạn không yêu cầu, hãy bỏ qua email này.
`,
    };

    await transporter.sendMail(mailOptions);
    return { message: "Email đặt lại mật khẩu đã được gửi" };
  }

  async resetPassword(token, newPassword) {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return { message: "Mật khẩu đã được đặt lại" };
  }

  // Lấy tất cả người dùng
  async getAllUsers(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const users = await User.find()
        .skip(skip)
        .limit(limit)
        .select("-password");
      const total = await User.countDocuments();

      return {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Lỗi lấy danh sách người dùng: ${error.message}`);
    }
  }

  // Lấy người dùng theo ID
  async getUserById(userId) {
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      return user;
    } catch (error) {
      throw new Error(`Lỗi lấy thông tin người dùng: ${error.message}`);
    }
  }

  // Cập nhật người dùng
  async updateUser(userId, updateData) {
    try {
      // Không cập nhật trực tiếp password qua endpoint này
      delete updateData.password;
      delete updateData.email;

      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");

      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }

      return user;
    } catch (error) {
      throw new Error(`Lỗi cập nhật người dùng: ${error.message}`);
    }
  }

  // Xóa người dùng
  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      return { message: "Xóa người dùng thành công" };
    } catch (error) {
      throw new Error(`Lỗi xóa người dùng: ${error.message}`);
    }
  }

  // Đổi mật khẩu
  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await User.findById(userId).select("+password");
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Mật khẩu cũ không đúng");
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return { message: "Đổi mật khẩu thành công" };
    } catch (error) {
      throw new Error(`Lỗi đổi mật khẩu: ${error.message}`);
    }
  }
}

module.exports = new UserService();
