import Order from '../models/orderSchema.js';
import ShippingAddress from '../models/shippingAddressSchema.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';

class OrderService {
  static async getAllOrders(status) {
    try {
      const orders = await Order.find(status ? { status } : {}).populate('user', 'cart', ShippingAddress);

      if (!orders || orders.length === 0) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.ORDER_NOT_FOUND,
          data: null,
        };
      }

      return {
        status: HTTP_STATUS_CODES.OK,
        message: 'All orders in payload.',
        data: orders,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching all orders.',
        data: error,
      };
    }
  }

  static async getOrderHistory(userId) {
    try {
      const orders = await Order.find({ user: userId }).populate('cart');
      return {
        status: HTTP_STATUS_CODES.OK,
        message: 'Your order(s) in payload.',
        data: orders,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while getting order history.',
        data: error,
      };
    }
  }
}

export default OrderService;
