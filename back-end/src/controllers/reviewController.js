import ReviewService from '../services/reviewService.js';
import sendRes from '../utils/handleResponse.js';

const addReview = async (req, res) => {
  const result = await ReviewService.addReview(req.body);
  return sendRes(res, result.status, result.message, result.data);
};

const addReviewAnswer = async (req, res) => {
  const { reviewId } = req.params;
  const commenterId = req.user._id;
  const { comment } = req.body;

  const result = await ReviewService.addReviewAnswer(reviewId, commenterId, comment);
  return sendRes(res, result.status, result.message, result.data);
};

const updateReviewReaction = async (req, res) => {
  const { reviewId } = req.params;
  const { reaction } = req.body;
  const commenterId = req.user._id;

  const result = await ReviewService.updateReviewReaction(reviewId, commenterId, reaction);
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
  addReviewAnswer,
  updateReviewReaction,
  getReviewsForProduct,
  updateReview,
  deleteReview
};
