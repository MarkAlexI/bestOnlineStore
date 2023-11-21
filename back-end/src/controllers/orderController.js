import sendRes from '../utils/handleResponse.js';
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
  const userEmail = req.user.email;
  const result = await OrderService.makePaymentOrder(req.params.id, req.body, userEmail);
  return sendRes(res, result.status, result.message, result.data);
};

const changeOrder = async (req, res) => {
  const userId = req.user._id;
  const userEmail = req.user.email;
  const {orderId} = req.params;
  const updateFields = { ...req.body };
  const result = await OrderService.changeOrder(userId, orderId, updateFields, userEmail);
  return sendRes(res, result.status, result.message, result.data);
};

const deleteOrder = async (req, res) => {
  const result = await OrderService.deleteOrder(req.params.id);
  return sendRes(res, result.status, result.message, result.data);
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
