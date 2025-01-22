import express from 'express';
import isAuth from '../middlewares/auth.js';
import {
  getWishList,
  addToWishList,
  removeFromWishList
} from '../controllers/wishListController.js';

const wishListRouter = express.Router();

wishListRouter.get('/', isAuth, getWishList);
wishListRouter.post('/', isAuth, addToWishList);
wishListRouter.delete('/:productId', isAuth, removeFromWishList);

export default wishListRouter;
