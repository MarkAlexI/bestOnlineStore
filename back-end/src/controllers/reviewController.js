import ReviewService from '../services/reviewService.js';
import sendRes from '../utils/handleResponse.js';

const addReview = async (req, res) => {
  const result = await ReviewService.addReview(req.body);
  return sendRes(res, result.status, result.message, result.data);
};

const getReviewsForProduct = async (req, res) => {
  const result = await ReviewService.getReviewsForProduct(req.params.productId);
  return sendRes(res, result.status, result.message, result.data);
};

const updateReview = async (req, res) => {
  const result = await ReviewService.updateReview(req.params.reviewId, req.body, req.user);
  return sendRes(res, result.status, result.message, result.data);
};

const deleteReview = async (req, res) => {
  const result = await ReviewService.deleteReview(req.params.reviewId, req.user);
  return sendRes(res, result.status, result.message, result.data);
};

export {
  addReview,
  getReviewsForProduct,
  updateReview,
  deleteReview
};
