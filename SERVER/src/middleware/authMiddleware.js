const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Kiểm tra token JWT có hợp lệ hay không
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Không tìm thấy token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    // gắn thông tin người dùng vào request để controller có thể dùng
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token không hợp lệ" });
  }
}

// Middleware chọn lọc: chỉ cho admin truy cập
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Yêu cầu quyền admin" });
}

module.exports = {
  verifyToken,
  isAdmin,
};
