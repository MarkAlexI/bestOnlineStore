import mongoose from 'mongoose';
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
        const errorMessage = !productToUpdate ? MESSAGES.PRODUCT_NOT_FOUND : MESSAGES.USER_NOT_FOUND;

        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: errorMessage,
          data: null,
        };
      }

      const newReviewId = new mongoose.Types.ObjectId();
      const intRating = parseInt(rating, 10);

      const newReview = {
        _id: newReviewId,
        user,
        product,
        rating: intRating,
        comment,
      };

      productToUpdate.reviews.push(newReview);

      await calculateNewRating(productToUpdate);

      await productToUpdate.save();

      existingUser.reviews.push(newReviewId);
      await existingUser.save();

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
      const product = await Product.findById(productId);
      const reviews = product.reviews.slice();

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
      const product = await Product.findOne({ 'reviews._id': reviewId });

      if (!product) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }

      const reviewToUpdate = product.reviews.find(review => review._id.toString() === reviewId);

      if (!reviewToUpdate) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.REVIEW_NOT_FOUND,
          data: null,
        };
      }

      if (user._id === reviewToUpdate.user.toString()) {
        reviewToUpdate.set(updateFields);
        await calculateNewRating(product);
        await product.save();

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.REVIEW_UPDATED_SUCCESSFULLY,
          data: { review: reviewToUpdate },
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
      const product = await Product.findOne({ 'reviews._id': reviewId });

      if (!product) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }

      const reviewToDeleteIndex = product.reviews.findIndex(review => review._id.toString() === reviewId);

      if (reviewToDeleteIndex === -1) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.REVIEW_NOT_FOUND,
          data: null,
        };
      }

      if (user._id === product.reviews[reviewToDeleteIndex].user.toString() || user.isAdmin === true) {
        const updatedUser = await User.findById(user._id);

        updatedUser.reviews = updatedUser.reviews.filter(id => id.toString() !== reviewId);
        await updatedUser.save();

        product.reviews.splice(reviewToDeleteIndex, 1);
        await calculateNewRating(product);
        await product.save();

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.REVIEW_DELETED_SUCCESSFULLY,
          data: null,
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
