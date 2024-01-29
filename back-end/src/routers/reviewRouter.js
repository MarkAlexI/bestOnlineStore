import express from 'express';
import {
  addReview,
  addReviewAnswer,
  addReviewDislike,
  addReviewLike,
  getReviewsForProduct,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import isAuth from '../middlewares/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', isAuth, addReview);
reviewRouter.post('/add/:reviewId/answer', isAuth, addReviewAnswer);
reviewRouter.post('/add/:reviewId/dislike', isAuth, addReviewDislike);
reviewRouter.post('/add/:reviewId/like', isAuth, addReviewLike);
reviewRouter.get('/product/:productId', getReviewsForProduct);
reviewRouter.put('/update/:reviewId', isAuth, updateReview);
reviewRouter.delete('/delete/:reviewId', isAuth, deleteReview);

export default reviewRouter;
