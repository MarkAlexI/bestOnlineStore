import express from 'express';
import {
  addToCart,
  getCart,
  clearCart
} from '../controllers/cartController.js';
import isAuth from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add-to-cart', isAuth, addToCart);
cartRouter.get('/get-cart', isAuth, getCart);
cartRouter.delete('/clear-cart', isAuth, clearCart);

export default cartRouter;
