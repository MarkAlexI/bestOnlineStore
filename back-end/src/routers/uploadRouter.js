import express from 'express';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';
import {
  saveProductImage,
  saveArticleImage,
  deleteProductImage,
  deleteArticleImage
} from '../controllers/uploadController.js';
import { upload } from '../services/fileService.js';

const uploadRouter = express.Router();

uploadRouter.post('/product', isAuth, isAdmin, upload.single('file'), saveProductImage);
uploadRouter.post('/article', isAuth, isAdmin, upload.single('file'), saveArticleImage);
uploadRouter.post('/delete-file/product', isAuth, isAdmin, deleteProductImage);
uploadRouter.post('/delete-file/article', isAuth, isAdmin, deleteArticleImage);

export default uploadRouter;
