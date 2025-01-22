import express from 'express';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';
import validateProductSearch from '../validation/productSearchValidation.js';
import validateProductViewed from '../validation/productViewedValidation.js';
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
productRouter.patch('/:id', validateProductViewed, updateProduct);
productRouter.delete('/:id', isAuth, isAdmin, deleteProduct);

export default productRouter;
