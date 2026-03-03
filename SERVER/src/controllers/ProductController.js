const productService = require("../services/ProductService");

class ProductController {
  // Tạo sản phẩm
  async createProduct(req, res) {
    try {
      const productData = req.body;

      if (!productData.name || !productData.price || !productData.category) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng điền đầy đủ thông tin sản phẩm",
        });
      }

      const product = await productService.createProduct(productData);

      res.status(201).json({
        success: true,
        message: "Tạo sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy tất cả sản phẩm
  async getAllProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        category: req.query.category,
        status: req.query.status,
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice) : null,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice) : null,
        search: req.query.search,
      };

      const result = await productService.getAllProducts(filters, page, limit);

      res.status(200).json({
        success: true,
        message: "Lấy danh sách sản phẩm thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy sản phẩm theo ID
  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await productService.getProductById(productId);

      res.status(200).json({
        success: true,
        message: "Lấy thông tin sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await productService.updateProduct(productId, req.body);

      res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa sản phẩm
  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      await productService.deleteProduct(productId);

      res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy sản phẩm theo danh mục
  async getByCategory(req, res) {
    try {
      const category = req.params.category;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await productService.getProductsByCategory(
        category,
        page,
        limit,
      );

      res.status(200).json({
        success: true,
        message: "Lấy sản phẩm theo danh mục thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Tìm kiếm sản phẩm
  async searchProducts(req, res) {
    try {
      const searchTerm = req.query.q;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      if (!searchTerm) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập từ khóa tìm kiếm",
        });
      }

      const result = await productService.searchProducts(
        searchTerm,
        page,
        limit,
      );

      res.status(200).json({
        success: true,
        message: "Tìm kiếm sản phẩm thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Thêm review
  async addReview(req, res) {
    try {
      const productId = req.params.id;
      const { rating, comment, userName } = req.body;

      if (!rating) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng đánh giá sao",
        });
      }

      const review = {
        rating,
        comment,
        userName,
      };

      const product = await productService.addReview(productId, review);

      res.status(201).json({
        success: true,
        message: "Thêm đánh giá thành công",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
