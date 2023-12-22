import { validationResult } from 'express-validator';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import sendRes from '../utils/handleResponse.js';
import UserService from '../services/userService.js';
import AuthService from '../services/authService.js';

const getAllUsers = async (req, res) => {
  const result = await UserService.getAllUsers();
  return sendRes(res, result.status, result.message, result.data);
};

const registerUser = async (req, res, next, anonymous = null) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendRes(res, HTTP_STATUS_CODES.BAD_REQUEST, MESSAGES.MISSING_REQUIRED_FIELDS, errors.array());
  }

  const { firstName, lastName, password, email, phone } = anonymous || req.body;
  const result = await UserService.registerUser(firstName, lastName, password, email, phone, anonymous, req.headers.authorization);
  return sendRes(res, result.status, result.message, result.data);
};

const registerAnonymous = async (req, res, next) => {
  const anonymousUser = {
    firstName: 'Anonymous',
    lastName: 'Unknown',
    email: `anonymous${Date.now()}@example.com`,
    password: 'qwW5#ertY1$',
    phone: '+38(000)000-00-00'
  };

  registerUser(req, res, next, anonymousUser);
};

const registerUserByGoogle = async (req, res) => {
  const result = await UserService.registerUserByGoogle(req.body);
  return sendRes(res, result.status, result.message, result.data);
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.signInUser(email, password);
  return sendRes(res, result.status, result.message, result.data);
};

const initRestorePassword = async (req, res) => {
  const { email } = req.body;
  const result = await AuthService.initRestorePassword(email);
  return sendRes(res, result.status, result.message, result.data);
};

const restorePassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const result = await AuthService.restorePassword(token, newPassword);
  return sendRes(res, result.status, result.message, result.data);
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const result = await UserService.getUserById(userId);
  return sendRes(res, result.status, result.message, result.data);
};

const updateProfile = async (req, res) => {
  const result = await UserService.updateProfile(req.user._id, req.body);
  return sendRes(res, result.status, result.message, result.data);
};

const deleteUser = async (req, res) => {
  const result = await UserService.deleteUser(req.params.id);
  return sendRes(res, result.status, result.message, result.data);
};

const updateUser = async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  return sendRes(res, result.status, result.message, result.data);
};
export {
  getAllUsers,
  registerUser,
  registerAnonymous,
  registerUserByGoogle,
  signInUser,
  initRestorePassword,
  restorePassword,
  getUserById,
  updateProfile,
  deleteUser,
  updateUser
};
