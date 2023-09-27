import express from 'express';
import {
  getOrders,
  getUserCart,
  createNewOrder,
  getOrderById,
  updateOrderToPaid,
  deleteOrder
} from '../controllers/orderController.js';
import isAuth from '../utils/auth.js';
import  isAdmin from '../utils/admin.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, getOrders);
orderRouter.get('/cart', isAuth, getUserCart);
orderRouter.post('/', isAuth, createNewOrder);
orderRouter.get('/:id', isAuth, getOrderById);
orderRouter.put('/:id/pay', isAuth, updateOrderToPaid);
orderRouter.delete('/:id', isAuth, isAdmin, deleteOrder);

export default orderRouter;
