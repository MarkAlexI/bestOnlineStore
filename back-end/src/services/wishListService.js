import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import getUserById from '../utils/getUser.js';
import getProductById from '../utils/getProduct.js';

class WishListService {
  static async getWishList(userId) {
    try {
      const user = await getUserById(userId);
      const wishListProducts = user.wishList;
      return {
        status: HTTP_STATUS_CODES.OK,
        message: MESSAGES.WISHLIST_RETRIEVED,
        data: wishListProducts,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async addToWishList(userId, productId) {
    try {
      const user = await getUserById(userId);

      if (user.wishList.includes(productId)) {
        return {
          status: HTTP_STATUS_CODES.CONFLICT,
          message: MESSAGES.PRODUCT_ALREADY_IN_WISHLIST,
          data: null,
        };
      }

      const product = await getProductById(productId);

      if (!product) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_FOUND,
          data: null,
        };
      }

      user.wishList.push(productId);
      await user.save();

      const updatedUser = await getUserById(userId);

      return {
        status: HTTP_STATUS_CODES.CREATED,
        message: MESSAGES.PRODUCT_ADDED_TO_WISHLIST,
        data: updatedUser.wishList,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async removeFromWishList(userId, productId) {
    try {
      const user = await getUserById(userId);

      if (!user.wishList.includes(productId)) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.PRODUCT_NOT_IN_WISHLIST,
          data: null,
        };
      }

      user.wishList = user.wishList.filter(el => el !== null);
      user.wishList = user.wishList.filter(product => product.toString() !== productId);

      const updatedUser = await user.save();
      return {
        status: HTTP_STATUS_CODES.NO_CONTENT,
        message: MESSAGES.PRODUCT_REMOVED_FROM_WISHLIST,
        data: updatedUser.wishList,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }
}

export default WishListService;
