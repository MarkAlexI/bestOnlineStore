import Order from '../models/orderSchema.js';
import CartService from './cartService.js';
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

  static async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId)
        .populate('cart')
        .populate('shippingAddress');

      if (order) {
        const { image } = order.cart?.items[0] || '';
        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'Order found.',
          data: { order, image },
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.ORDER_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching order by ID.',
        data: error,
      };
    }
  }

  static async createOrder(userId, orderData) {
    try {
      const cart = await CartService.findLatestCart(userId);

      if (!cart) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: 'Consumer cart is empty.',
          data: null,
        };
      }

      let existAddress = await ShippingAddress.findOne({ user: userId });

      if (!existAddress) {
        existAddress = new ShippingAddress({
          user: userId,
          ...orderData,
        });
      } else {
        const { address, city, country, postalCode, deliveryMethod, novaPoshtaAddress } = orderData;

        existAddress.address = address || existAddress.address;
        existAddress.city = city || existAddress.city;
        existAddress.country = country || existAddress.country;
        existAddress.postalCode = postalCode || existAddress.postalCode;
        existAddress.deliveryMethod = deliveryMethod || existAddress.deliveryMethod;
        existAddress.novaPoshtaAddress = novaPoshtaAddress || existAddress.novaPoshtaAddress;
      }

      const newAddress = await existAddress.save();

      const order = new Order({
        cart: cart._id,
        shippingAddress: newAddress,
        paymentMethod: orderData.paymentMethod,
        itemsPrice: cart.totalPrice,
        user: userId,
      });

      const savedOrder = await order.save();

      const createdOrder = await Order.findById(savedOrder._id).populate('cart');

      return {
        status: HTTP_STATUS_CODES.CREATED,
        message: 'Order created successfully.',
        data: createdOrder,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.DATABASE_ERROR,
        data: error,
      };
    }
  }
}

export default OrderService;
