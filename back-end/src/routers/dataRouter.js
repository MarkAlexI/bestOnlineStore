import express from 'express';
import {
  fetchAndSendData,
  getPopularProducts
} from '../controllers/dataController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';

const dataRouter = express.Router();

dataRouter.get('/compare-data', isAuth, isAdmin, fetchAndSendData);
dataRouter.get('/popular-products', isAuth/*, isAdmin*/, getPopularProducts);

export default dataRouter;
