import Order from '../models/orderSchema.js';
import CartService from './cartService.js';
import Product from '../models/productSchema.js';
import Cart from '../models/cartSchema.js';
import ShippingAddress from '../models/shippingAddressSchema.js';
import sendEmail from '../utils/email.js';
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
          message: MESSAGES.CART_NOT_FOUND,
          data: null,
        };
      }

      if (cart.items.length === 0) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.CART_IS_EMPTY,
          data: null,
        };
      }

      let existAddress = await ShippingAddress.findOne({ user: userId });
      const { isCourier } = orderData;

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

      const itemsPrice = cart.totalPrice;
      const deliveryPrice = isCourier ? 700 : 0;

      const order = new Order({
        cart: cart._id,
        shippingAddress: newAddress,
        paymentMethod: orderData.paymentMethod,
        itemsPrice: itemsPrice,
        deliveryPrice: deliveryPrice,
        totalPrice: itemsPrice + deliveryPrice,
        user: userId,
        isCourier: isCourier,
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

  static async makePaymentOrder(orderId, paymentData, userEmail) {
    try {
      const order = await Order.findById(orderId);

      if (order.isPaid === true) {
        return {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: MESSAGES.ORDER_IS_PAID,
          data: null,
        };
      }

      if (order) {
        const { id } = paymentData;

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id,
          status: 'success',
          update_time: Date.now(),
          email_address: userEmail,
        };

        const updatedOrder = await order.save();

        sendEmail(userEmail, 'Changes on your order', `Order ${orderId} was paid.`);

        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'Order has been paid.',
          data: updatedOrder,
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
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async changeOrder(userId, orderId, updateFields, userEmail) {
    try {
      const order = await Order.findById(orderId);

      if (!order) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.ORDER_NOT_FOUND,
          data: null,
        };
      }

      let updatedOrder = null;

      if (updateFields.status === 'Відправлено' && order.status === 'Комплектується') {
        const cart = await CartService.findLatestCart(userId);

        for (const cartItem of cart.items) {
          const product = await Product.findById(cartItem.product);

          if (product) {
            const quantityToReduce = cartItem.quantity;
            if (product.instock && quantityToReduce <= product.countInStock) {
              product.countInStock -= quantityToReduce;
              await product.save();
            }
          }
        }

        const newCart = new Cart({ user: userId, items: [] });
        await newCart.save();

        order.status = 'Відправлено';
        updatedOrder = await order.save();
      } else {
        updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          updateFields,
          { new: true }
        );
      }

      sendEmail(userEmail, 'Changes on your order', `Order ${orderId} was updated.`);

      return {
        status: HTTP_STATUS_CODES.OK,
        message: 'Order updated.',
        data: updatedOrder,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async deleteOrder(orderId) {
    try {
      const deletedOrder = await Order.findByIdAndRemove(orderId);
      if (deletedOrder) {
        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'Order deleted.',
          data: deletedOrder,
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
        message: 'Error while deleting order.',
        data: error,
      };
    }
  }
}

export default OrderService;
