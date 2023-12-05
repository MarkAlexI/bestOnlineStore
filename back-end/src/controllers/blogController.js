import BlogService from '../services/blogService.js';
import sendRes from '../utils/handleResponse.js';

const getAllArticles = async (req, res) => {
  const result = await BlogService.getAllArticles();
  return sendRes(res, result.status, result.message, result.data);
};

const getArticleById = async (req, res) => {
  const result = await BlogService.getArticleById(req.params.articleId);
  return sendRes(res, result.status, result.message, result.data);
};

const createArticle = async (req, res) => {
  const articleData = req.body;
  const authorId = req.user._id;

  const result = await BlogService.createArticle(articleData, authorId);
  return sendRes(res, result.status, result.message, result.data);
};

const updateArticle = async (req, res) => {
  const articleId = req.params.id;
  const updateFields = req.body;
  const authorId = req.user._id;
  const isAdmin = req.user.isAdmin === true;

  const result = await BlogService.updateArticle(articleId, updateFields, authorId, isAdmin);
  return sendRes(res, result.status, result.message, result.data);
};

const deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  const authorId = req.user._id;
  const isAdmin = req.user.isAdmin === true;

  const result = await BlogService.deleteArticle(articleId, authorId, isAdmin);
  return sendRes(res, result.status, result.message, result.data);
};

export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
