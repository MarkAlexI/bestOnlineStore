import express from 'express';
import isAuth from '../utils/auth.js';
import {
  saveProductImage,
  saveArticleImage,
  deleteProductImage,
  deleteArticleImage
} from '../controllers/uploadController.js';
import { upload } from '../services/fileService.js';

const uploadRouter = express.Router();

uploadRouter.post('/product', isAuth, upload.single('file'), saveProductImage);
uploadRouter.post('/article', isAuth, upload.single('file'), saveArticleImage);
uploadRouter.post('/delete-file/product', isAuth, deleteProductImage);
uploadRouter.post('/delete-file/article', isAuth, deleteArticleImage);

export default uploadRouter;
