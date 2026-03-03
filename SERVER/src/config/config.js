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
  },
};
