const Product = require("../models/Product");

class ProductService {
  // Tạo sản phẩm
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw new Error(`Lỗi tạo sản phẩm: ${error.message}`);
    }
  }

  // Lấy tất cả sản phẩm
  async getAllProducts(filters = {}, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const query = {};

      // Lọc theo category
      if (filters.category) {
        query.category = filters.category;
      }

      // Lọc theo status
      if (filters.status) {
        query.status = filters.status;
      }

      // Lọc theo giá
      if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = filters.minPrice;
        if (filters.maxPrice) query.price.$lte = filters.maxPrice;
      }

      // Tìm kiếm
      if (filters.search) {
        query.$or = [
          { name: { $regex: filters.search, $options: "i" } },
          { description: { $regex: filters.search, $options: "i" } },
        ];
      }

      const products = await Product.find(query).skip(skip).limit(limit);
      const total = await Product.countDocuments(query);

      return {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Lỗi lấy danh sách sản phẩm: ${error.message}`);
    }
  }

  // Lấy sản phẩm theo ID
  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Sản phẩm không tồn tại");
      }
      return product;
    } catch (error) {
      throw new Error(`Lỗi lấy thông tin sản phẩm: ${error.message}`);
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(productId, updateData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        throw new Error("Sản phẩm không tồn tại");
      }

      return product;
    } catch (error) {
      throw new Error(`Lỗi cập nhật sản phẩm: ${error.message}`);
    }
  }

  // Xóa sản phẩm
  async deleteProduct(productId) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        throw new Error("Sản phẩm không tồn tại");
      }
      return { message: "Xóa sản phẩm thành công" };
    } catch (error) {
      throw new Error(`Lỗi xóa sản phẩm: ${error.message}`);
    }
  }

  // Lấy sản phẩm theo danh mục
  async getProductsByCategory(category, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const products = await Product.find({ category, status: "available" })
        .skip(skip)
        .limit(limit);
      const total = await Product.countDocuments({
        category,
        status: "available",
      });

      return {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Lỗi lấy sản phẩm theo danh mục: ${error.message}`);
    }
  }

  // Tìm kiếm sản phẩm
  async searchProducts(searchTerm, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const products = await Product.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
        status: "available",
      })
        .skip(skip)
        .limit(limit);

      const total = await Product.countDocuments({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
        status: "available",
      });

      return {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Lỗi tìm kiếm sản phẩm: ${error.message}`);
    }
  }

  // Thêm review
  async addReview(productId, review) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { $push: { reviews: review } },
        { new: true },
      );

      if (!product) {
        throw new Error("Sản phẩm không tồn tại");
      }

      return product;
    } catch (error) {
      throw new Error(`Lỗi thêm review: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
