const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Middleware xác thực JWT token
 * Kiểm tra token có hợp lệ hay không
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      success: false, 
      message: "Không tìm thấy token" 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    // gắn thông tin người dùng vào request để controller có thể dùng
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: "Token không hợp lệ hoặc đã hết hạn" 
    });
  }
}

/**
 * Middleware kiểm tra người dùng đã xác thực (có token hợp lệ)
 */
function requireAuth(req, res, next) {
  return verifyToken(req, res, next);
}

/**
 * Middleware kiểm tra người dùng là admin
 */
function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "Không tìm thấy token" 
    });
  }
  
  if (req.user.role === "admin") {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: "Yêu cầu quyền admin" 
  });
}

/**
 * Middleware kiểm tra người dùng là user (không phải admin)
 */
function isUser(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "Không tìm thấy token" 
    });
  }
  
  if (req.user.role === "user") {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: "Yêu cầu quyền người dùng thường" 
  });
}

/**
 * Middleware kiểm tra người dùng có đủ quyền (cho phép admin hoặc người dùng của chính mình)
 */
function isOwnerOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "Không tìm thấy token" 
    });
  }
  
  const userId = req.params.id || req.query.userId;
  const isOwner = req.user.userId === userId;
  const isAdminUser = req.user.role === "admin";
  
  if (isOwner || isAdminUser) {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: "Bạn không có quyền truy cập tài nguyên này" 
  });
}

/**
 * Middleware kiểm tra người dùng có một trong các vai trò được chỉ định
 * Sử dụng: requireRole("admin", "manager") hoặc requireRole(["admin", "manager"])
 */
function requireRole(...roles) {
  // Nếu array được truyền vào
  const allowedRoles = Array.isArray(roles[0]) ? roles[0] : roles;
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Không tìm thấy token" 
      });
    }
    
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }
    
    return res.status(403).json({ 
      success: false, 
      message: `Yêu cầu một trong các vai trò: ${allowedRoles.join(", ")}` 
    });
  };
}

/**
 * Middleware kiểm tra người dùng đang được vô hiệu hóa
 */
function checkUserStatus(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "Không tìm thấy token" 
    });
  }
  
  if (req.user.status === "inactive") {
    return res.status(403).json({ 
      success: false, 
      message: "Tài khoản của bạn đã bị vô hiệu hóa" 
    });
  }
  
  next();
}

module.exports = {
  verifyToken,
  requireAuth,
  isAdmin,
  isUser,
  isOwnerOrAdmin,
  requireRole,
  checkUserStatus,
};
