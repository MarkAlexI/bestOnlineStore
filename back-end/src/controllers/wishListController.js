import WishListService from '../services/wishListService.js';
import sendRes from '../utils/handleResponse.js';

const getWishList = async (req, res) => {
  const userId = req.user._id;
  const result = await WishListService.getWishList(userId);

  return sendRes(res, result.status, result.message, result.data);
};

const addToWishList = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const result = await WishListService.addToWishList(userId, productId);

  return sendRes(res, result.status, result.message, result.data);
};

const removeFromWishList = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const result = await WishListService.removeFromWishList(userId, productId);

  return sendRes(res, result.status, result.message, result.data);
};

export {
  getWishList,
  addToWishList,
  removeFromWishList
};

