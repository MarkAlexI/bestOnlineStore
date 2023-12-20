import Product from '../models/productSchema.js';
import buildProductQuery from '../utils/buildProductQuery.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';

class ProductService {
  static async getAllProducts(queryParams, skip, perPage) {
    try {
      const query = buildProductQuery(queryParams);
      query.skip(skip).limit(perPage);

      const [products, totalProducts] = await Promise.all([
        query.exec(),
        Product.countDocuments(query.getQuery()),
      ]);

      return {
        status: HTTP_STATUS_CODES.OK,
        message: MESSAGES.ALL_PRODUCTS_IN_PAYLOAD,
        data: { products, totalProducts },
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async searchProducts(query) {
    try {
      const regexOptions = { $regex: new RegExp(`${query}`, 'i') };
      const searchCriteria = {
        $or: [
          { name: regexOptions },
          { brand: regexOptions },
          { category: regexOptions },
          { subcategory: regexOptions },
        ],
      };

      const products = await Product.find(searchCriteria);

      if (products.length > 0) {
        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'Products found.',
          data: products,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async getProductById(productId) {
    try {
      const product = await Product.findById(productId).populate('reviews');
      if (product) {
        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'Product found.',
          data: product,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching product by ID.',
        data: error,
      };
    }
  }

  static async createProduct(newProductData) {
    try {
      const newProduct = await Product.create(newProductData);

      newProduct.markModified('characteristics');
      const createdProduct = await newProduct.save();

      return {
        status: HTTP_STATUS_CODES.CREATED,
        message: 'Product created.',
        data: createdProduct,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while creating product.',
        data: error,
      };
    }
  }

  static async updateProduct(productId, updatedData) {
    try {
      let updateObject = { ...updatedData };

      if (updatedData['viewed'] !== undefined) {
        delete updateObject.viewed;
        updateObject.$inc = { viewed: 1 };
      }

      let updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateObject,
        { new: true }
      );

      if (updatedProduct) {
        if (updatedData['characteristics'] !== undefined) {
          updatedProduct.markModified('characteristics');
        }

        updatedProduct = await updatedProduct.save();

        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'Product updated.',
          data: updatedProduct,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while updating product.',
        data: error,
      };
    }
  }

  static async deleteProduct(productId) {
    try {
      const deletedProduct = await Product.findByIdAndRemove(productId);

      if (deletedProduct) {
        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'Product deleted.',
          data: deletedProduct,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while deleting product.',
        data: error,
      };
    }
  }
}

export default ProductService;
