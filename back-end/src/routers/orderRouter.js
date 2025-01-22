import express from 'express';
import {
  getAllOrders,
  getOrderHistory,
  createOrder,
  getOrderById,
  makePaymentOrder,
  changeOrder,
  deleteOrder
} from '../controllers/orderController.js';
import isAuth from '../middlewares/auth.js';
import  isAdmin from '../middlewares/admin.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, getAllOrders);
orderRouter.get('/order-history', isAuth, getOrderHistory);
orderRouter.post('/', isAuth, createOrder);
orderRouter.get('/:id', isAuth, getOrderById);
orderRouter.put('/:id/pay', isAuth, makePaymentOrder);
orderRouter.put('/:orderId/checkout', isAuth, changeOrder);
orderRouter.delete('/:id', isAuth, isAdmin, deleteOrder);

export default orderRouter;
