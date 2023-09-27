import express from 'express';
import isAuth from '../utils/auth.js';
import isAdmin from '../utils/admin.js';
import {
  getAllUsers,
  seedUsers,
  registerUser,
  getUserById,
  updateProfile,
  deleteUser,
  updateUser
} from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.get('/all', getAllUsers);
userRouter.get('/seed', seedUsers);
userRouter.post('/register', registerUser);
userRouter.get('/:id', getUserById);
userRouter.put('/profile', isAuth, updateProfile);
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);
userRouter.put('/:id', isAuth, isAdmin, updateUser);

export default userRouter;
