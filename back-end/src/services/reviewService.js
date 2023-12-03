import Review from '../models/reviewSchema.js';
import User from '../models/userSchema.js';
import Product from '../models/productSchema.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import calculateNewRating from '../utils/calculateNewRating.js';

class ReviewService {
  static async addReview(reviewData) {
    try {
      const { user, product, rating, comment } = reviewData;

      if (!user || !product || !rating || !comment) {
        return {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: MESSAGES.MISSING_REQUIRED_FIELDS,
          data: null,
        };
      }

      const existingUser = await User.findById(user);
      const productToUpdate = await Product.findById(product);

      if (!productToUpdate || !existingUser) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }

      const intRating = parseInt(rating, 10);
      const newReview = new Review({
        user,
        product,
        rating: intRating,
        comment,
      });

      const savedReview = await newReview.save();

      productToUpdate.reviews.push(savedReview._id);

      await calculateNewRating(productToUpdate);

      await productToUpdate.save();

      return {
        status: HTTP_STATUS_CODES.CREATED,
        message: MESSAGES.REVIEW_ADDED_SUCCESSFULLY,
        data: { review: newReview },
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_WHILE_ADDING_REVIEW,
        data: error,
      };
    }
  }

  static async getReviewsForProduct(productId) {
    try {
      const reviews = await Review.find({ product: productId });
      return {
        status: HTTP_STATUS_CODES.OK,
        message: MESSAGES.REVIEWS_RETRIEVED_SUCCESSFULLY,
        data: { reviews },
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_WHILE_RETRIEVING_REVIEWS,
        data: error,
      };
    }
  }

  static async updateReview(reviewId, updateFields, user) {
    try {
      const reviewToUpdate = await Review.findById(reviewId);

      if (!reviewToUpdate) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.REVIEW_NOT_FOUND,
          data: null,
        };
      }

      if (user._id === reviewToUpdate.user.toString()) {
        const updatedReview = await Review.findByIdAndUpdate(
          reviewId,
          updateFields,
          { new: true }
        );

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.REVIEW_UPDATED_SUCCESSFULLY,
          data: { review: updatedReview },
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.UNAUTHORIZED,
          message: MESSAGES.UNAUTHORIZED_TO_UPDATE_REVIEW,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_WHILE_UPDATING_REVIEW,
        data: error,
      };
    }
  }

  static async deleteReview(reviewId, user) {
    try {
      const reviewToDelete = await Review.findById(reviewId);

      if (!reviewToDelete) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.REVIEW_NOT_FOUND,
          data: null,
        };
      }

      if (user._id === reviewToDelete.user.toString() || user.isAdmin === true) {
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.REVIEW_DELETED_SUCCESSFULLY,
          data: { review: deletedReview },
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.UNAUTHORIZED,
          message: MESSAGES.UNAUTHORIZED_TO_DELETE_REVIEW,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_WHILE_DELETING_REVIEW,
        data: error,
      };
    }
  }
}

export default ReviewService;
