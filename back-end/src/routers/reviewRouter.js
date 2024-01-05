import express from 'express';
import {
  addReview,
  getReviewsForProduct,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import isAuth from '../middlewares/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', isAuth, addReview);
reviewRouter.get('/product/:productId', getReviewsForProduct);
reviewRouter.put('/update/:reviewId', isAuth, updateReview);
reviewRouter.delete('/delete/:reviewId', isAuth, deleteReview);

export default reviewRouter;
