import express from 'express';
import isAuth from '../utils/auth.js';
import isAdmin from '../utils/admin.js';
import validateProductSearch from '../validation/productSearchValidation.js';
import {
  getAllProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/search', validateProductSearch, searchProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', isAuth, isAdmin, createProduct);
productRouter.put('/:id', isAuth, isAdmin, updateProduct);
productRouter.delete('/:id', isAuth, isAdmin, deleteProduct);

export default productRouter;
