// Config file
module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  apiVersion: process.env.API_VERSION || "/api/v1",
  database: {
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  email: {
    service: process.env.EMAIL_SERVICE || "gmail",
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
    from: process.env.EMAIL_FROM || "no-reply@example.com",
  },
  // địa chỉ front-end dùng trong link email
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};
