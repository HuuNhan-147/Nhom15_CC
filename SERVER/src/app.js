const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Config
const config = require("./config/config");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} - ${new Date().toLocaleString("vi-VN")}`,
  );
  next();
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(config.database.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Kết nối MongoDB thành công");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
    process.exit(1);
  }
};

connectDB();

// Base route
app.get("/", (req, res) => {
  res.json({
    message: "Chào mừng đến trang web thương mại điện tử",
    version: "1.0.0",
    endpoints: {
      users: config.apiVersion + "/users",
      products: config.apiVersion + "/products",
      orders: config.apiVersion + "/orders",
      carts: config.apiVersion + "/carts",
    },
  });
});

// API Routes
app.use(config.apiVersion + "/users", userRoutes);
app.use(config.apiVersion + "/products", productRoutes);
app.use(config.apiVersion + "/orders", orderRoutes);
app.use(config.apiVersion + "/carts", cartRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`Môi trường: ${config.nodeEnv}`);
  console.log(`\nAPI endpoints:`);
  console.log(
    `  - Users:    GET/POST http://localhost:${PORT}${config.apiVersion}/users`,
  );
  console.log(
    `  - Products: GET/POST http://localhost:${PORT}${config.apiVersion}/products`,
  );
  console.log(
    `  - Orders:   GET/POST http://localhost:${PORT}${config.apiVersion}/orders`,
  );
  console.log(
    `  - Carts:    GET/POST http://localhost:${PORT}${config.apiVersion}/carts`,
  );
});

module.exports = app;
