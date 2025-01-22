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

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Маршрути для роботи зі статтями
 */

/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Отримати всі статті
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Успішний запит
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
blogRouter.get('/', getAllArticles);

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Отримати статтю за ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID статті
 *     responses:
 *       200:
 *         description: Успішний запит
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Статтю не знайдено
 */
blogRouter.get('/:id', getArticleById);

/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Створити нову статтю
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Статтю створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Помилка при створенні
 */
blogRouter.post('/', isAuth, isAdmin, createArticle);

/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Оновити статтю за ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID статті
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Статтю оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Статтю не знайдено
 */
blogRouter.put('/:id', isAuth, isAdmin, updateArticle);

/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Видалити статтю за ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID статті
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Статтю видалено
 *       404:
 *         description: Статтю не знайдено
 */
blogRouter.delete('/:id', isAuth, isAdmin, deleteArticle);

export default blogRouter;
