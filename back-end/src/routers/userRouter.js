import express from 'express';
import isAuth from '../utils/auth.js';
import isAdmin from '../utils/admin.js';
import validateUserData from '../validation/userValidation.js';
import {
  getAllUsers,
  registerUser,
  registerUserByGoogle,
  signInUser,
  getUserById,
  updateProfile,
  deleteUser,
  updateUser
} from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.get('/all', getAllUsers);
userRouter.post('/regtest', registerUser);
userRouter.post('/register', validateUserData, registerUser);
userRouter.post('/google', registerUserByGoogle);
userRouter.post('/signin', signInUser);
userRouter.get('/:id', getUserById);
userRouter.put('/profile', isAuth, updateProfile);
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);
userRouter.put('/:id', isAuth, isAdmin, updateUser);

export default userRouter;