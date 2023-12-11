import express from 'express';
import isAuth from '../utils/auth.js';
import {
  uploadFile,
  deleteFile
} from '../controllers/uploadController.js';
import { upload } from '../services/fileService.js';

const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, upload.single('file'), uploadFile);
uploadRouter.post('/delete-file', isAuth, deleteFile);

export default uploadRouter;
