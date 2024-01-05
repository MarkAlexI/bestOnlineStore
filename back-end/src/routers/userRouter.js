import express from 'express';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';
import validateUserData from '../validation/userValidation.js';
import {
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
} from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.get('/', isAuth, isAdmin, getAllUsers);
userRouter.post('/register', validateUserData, registerUser);
userRouter.get('/reganonymous', registerAnonymous);
userRouter.post('/google', registerUserByGoogle);
userRouter.post('/signin', signInUser);
userRouter.post('/forgot-password', initRestorePassword);
userRouter.post('/reset-password', restorePassword);
userRouter.get('/:id', getUserById);
userRouter.put('/profile', isAuth, updateProfile);
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);
userRouter.put('/:id', isAuth, isAdmin, updateUser);

export default userRouter;
