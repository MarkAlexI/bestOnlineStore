import { validationResult } from 'express-validator';
import Product from '../models/productSchema.js';
import logger from '../utils/logger.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import handleResponse from '../utils/handleResponse.js';

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;
  console.dir(req.query);
  try {
    let query = Product.find();

    if (req.query.minPrice) {
      query = query.where('price').gte(parseInt(req.query.minPrice, 10));
    }
    if (req.query.maxPrice) {
      query = query.where('price').lte(parseInt(req.query.maxPrice, 10));
    }

    if (req.query.category) {
      query = query.where('category').equals(req.query.category);
    }
    console.log('sort: ' + req.query.sortByPrice);
    if (req.query.sortByPrice === 'asc') {
      query = query.sort({ price: 1 });
    } else if (req.query.sortByPrice === 'desc') {
      query = query.sort({ price: -1 });
    }

    if (req.query.sortByRating === 'asc') {
      query = query.sort({ raiting: 1 });
    } else if (req.query.sortByRating === 'desc') {
      query = query.sort({ raiting: -1 });
    }

    query = query.skip(skip).limit(perPage);

    const products = await query.exec();
    const totalProducts = await Product.countDocuments(query.getQuery());
    return handleResponse(res, HTTP_STATUS_CODES.OK, 'success', 'All products in payload.', { products, totalProducts });
  } catch (error) {
    logger.error('Error while fetching all products', error);
    return handleResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'fault', MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const searchProductsByName = async (req, res) => {
  const query = JSON.parse(JSON.stringify(req.query))['keyword'];

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return handleResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, 'fault', MESSAGES.VALIDATION_ERROR, errors.array());
    }

    const products = await Product.find({
      name: { $regex: new RegExp(`${query}`, 'i') },
    });

    if (products.length > 0) {
      logger.info('Products found by name:', query);
      return handleResponse(res, HTTP_STATUS_CODES.OK, 'success', 'Products found.', products);
    } else {
      logger.info('No products found by name:', query);
      return handleResponse(res, HTTP_STATUS_CODES.NOT_FOUND, 'fault', MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    logger.error('Error while searching for products by name:', query, error);
    return handleResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, 'fault', MESSAGES.EMPTY_QUERY_ERROR, error);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (product) {
      logger.info('Product found by ID:', req.params.id);
      return handleResponse(res, HTTP_STATUS_CODES.OK, 'success', 'Product found.', product);
    } else {
      logger.error('Product not found by ID:', req.params.id);
      return handleResponse(res, HTTP_STATUS_CODES.NOT_FOUND, 'fault', MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    logger.error('Error while fetching product by ID:', req.params.id, error);
    return handleResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'fault', MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProductData = req.body;
    const createdProduct = await Product.create(newProductData);
    logger.info('Product created:', createdProduct._id);
    return handleResponse(res, HTTP_STATUS_CODES.CREATED, 'success', 'Product created.', createdProduct);
  } catch (error) {
    logger.error('Error while creating product', error);
    return handleResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'fault', MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (updatedProduct) {
      logger.info('Product updated:', productId);
      return handleResponse(res, HTTP_STATUS_CODES.OK, 'success', 'Product updated.', updatedProduct);
    } else {
      logger.error('Product not found for update:', productId);
      return handleResponse(res, HTTP_STATUS_CODES.NOT_FOUND, 'fault', MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    logger.error('Error while updating product:', req.params.id, error);
    return handleResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'fault', MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (deletedProduct) {
      logger.info('Product deleted:', productId);
      return handleResponse(res, HTTP_STATUS_CODES.OK, 'success', 'Product deleted.', deletedProduct);
    } else {
      logger.error('Product not found for delete:', productId);
      return handleResponse(res, HTTP_STATUS_CODES.NOT_FOUND, 'fault', MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    logger.error('Error while deleting product:', req.params.id, error);
    return handleResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'fault', MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

export {
  getAllProducts,
  searchProductsByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};