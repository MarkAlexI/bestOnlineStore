import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/blogController.js';
import isAuth from '../middlewares/auth.js';

const blogRouter = express.Router();

blogRouter.get('/', getAllArticles);
blogRouter.get('/:id', getArticleById);
blogRouter.post('/', isAuth, createArticle);
blogRouter.put('/:id', isAuth, updateArticle);
blogRouter.delete('/:id', isAuth, deleteArticle);

export default blogRouter;
