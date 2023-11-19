import Order from '../models/orderSchema.js';
import Cart from '../models/cartSchema.js';
import Product from '../models/productSchema.js';
import sendEmail from '../utils/email.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import sendRes from '../utils/handleResponse.js';
import CartService from '../services/cartService.js';
import OrderService from '../services/orderService.js';

const getAllOrders = async (req, res) => {
  const { status } = req.query;
  const result = await OrderService.getAllOrders(status);
  return sendRes(res, result.status, result.message, result.data);
};

const getOrderHistory = async (req, res) => {
  const result = await OrderService.getOrderHistory(req.user._id);
  return sendRes(res, result.status, result.message, result.data);
};

const getOrderById = async (req, res) => {
  const result = await OrderService.getOrderById(req.params.id);
  return sendRes(res, result.status, result.message, result.data);
};

const createOrder = async (req, res) => {
  const userId = req.user._id;
  const result = await OrderService.createOrder(userId, req.body);
  return sendRes(res, result.status, result.message, result.data);
};

const makePaymentOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      const { id } = req.body;

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id,
        status: 'success',
        update_time: Date.now(),
        email_address: req.user.email,
      };

      const updatedOrder = await order.save();

      sendEmail(req.user.email, 'Changes on your order', `Order ${req.params.id} was paid.`);

      return sendRes(res, HTTP_STATUS_CODES.OK, 'Order has been paid.', updatedOrder);
    } else {
      return sendRes(res, HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.ORDER_NOT_FOUND);
    }
  } catch (error) {
    return sendRes(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const changeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;
    const updateFields = { ...req.body };

    const order = await Order.findById(orderId);

    if (!order) {
      return sendRes(res, HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.ORDER_NOT_FOUND);
    }

    let updatedOrder = null;

    if (updateFields.status === 'Відправлено' &&
      order.status === 'Комплектується') {

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
        {
          updateFields
        },
        { new: true }
      );
    }

    sendEmail(req.user.email, 'Changes on your order', `Order ${orderId} was updated.`);

    return sendRes(res, HTTP_STATUS_CODES.OK, 'Order updated.', updatedOrder);
  } catch (error) {
    return sendRes(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndRemove(orderId);
    if (deletedOrder) {
      return sendRes(res, HTTP_STATUS_CODES.OK, 'Order deleted.', deletedOrder);
    } else {
      return sendRes(res, HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.ORDER_NOT_FOUND);
    }
  } catch (error) {
    return sendRes(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error while deleting order.', error);
  }
};

export {
  getAllOrders,
  getOrderHistory,
  getOrderById,
  createOrder,
  makePaymentOrder,
  changeOrder,
  deleteOrder,
};
