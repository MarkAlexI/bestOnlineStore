import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/blogController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';

const blogRouter = express.Router();

blogRouter.get('/', getAllArticles);
blogRouter.get('/:id', getArticleById);
blogRouter.post('/', isAuth, isAdmin, createArticle);
blogRouter.put('/:id', isAuth, isAdmin, updateArticle);
blogRouter.delete('/:id', isAuth, isAdmin, deleteArticle);

export default blogRouter;
