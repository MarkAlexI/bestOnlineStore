import { validationResult } from 'express-validator';
import sendRes from '../utils/handleResponse.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import ProductService from '../services/productService.js';
import logger from '../utils/logger.js';
import addLinks from '../utils/addLinks.js';

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const result = await ProductService.getAllProducts(req.query, skip, perPage);

  addLinks(res, page, perPage, result.data.totalProducts);

  return sendRes(res, result.status, result.message, result.data);
};

const searchProducts = async (req, res) => {
  const query = JSON.parse(JSON.stringify(req.query))['keyword'];

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendRes(res, HTTP_STATUS_CODES.BAD_REQUEST, MESSAGES.VALIDATION_ERROR, errors.array());
  }

  const result = await ProductService.searchProducts(query);
  return sendRes(res, result.status, result.message, result.data);
};

const getProductById = async (req, res) => {
  const result = await ProductService.getProductById(req.params.id);
  return sendRes(res, result.status, result.message, result.data);
};

const createProduct = async (req, res) => {
  const newProductData = req.body;
  const result = await ProductService.createProduct(newProductData);
  return sendRes(res, result.status, result.message, result.data);
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {logger.error(errors.array());
    return sendRes(res, HTTP_STATUS_CODES.BAD_REQUEST, MESSAGES.VALIDATION_ERROR, errors.array());
  }

  const result = await ProductService.updateProduct(productId, req.body);
  return sendRes(res, result.status, result.message, result.data);
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const result = await ProductService.deleteProduct(productId);
  return sendRes(res, result.status, result.message, result.data);
};

export {
  getAllProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
