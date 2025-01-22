import Article from '../models/articleSchema.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';

class BlogService {
  static async getAllArticles() {
    try {
      const articles = await Article.find();

      return {
        status: HTTP_STATUS_CODES.OK,
        message: MESSAGES.DATA_RETRIEVED,
        data: articles,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_FETCHING_ARTICLES,
        data: error,
      };
    }
  }

  static async getArticleById(articleId) {
    try {
      const article = await Article.findById(articleId);
      console.log(article);
      if (article) {
        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.DATA_RETRIEVED,
          data: article,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.ARTICLE_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {console.log(error);
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_FETCHING_ARTICLE,
        data: error,
      };
    }
  }

  static async createArticle(articleData, authorId) {
    try {
      Object.assign(articleData, { author: authorId });

      const article = new Article(articleData);

      const newArticle = await article.save();

      return {
        status: HTTP_STATUS_CODES.CREATED,
        message: MESSAGES.ARTICLE_CREATED_SUCCESSFULLY,
        data: newArticle,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.ERROR_CREATING_ARTICLE,
        data: error,
      };
    }
  }

  static async updateArticle(articleId, updateFields, authorId) {
    try {
      const article = await Article.findById(articleId);

      if (!article) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.ARTICLE_NOT_FOUND,
          data: null,
        };
      }

      if (authorId === article.author.toString()) {
        article.set(updateFields);
        const updatedArticle = await article.save();

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.ARTICLE_UPDATED_SUCCESSFULLY,
          data: updatedArticle,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.UNAUTHORIZED,
          message: MESSAGES.UNAUTHORIZED_TO_UPDATE_ARTICLE,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_WHILE_UPDATING_ARTICLE,
        data: error,
      };
    }
  }

  static async deleteArticle(articleId, authorId, isAdmin) {
    try {
      const article = await Article.findById(articleId);

      if (!article) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.ARTICLE_NOT_FOUND,
          data: null,
        };
      }

      if (authorId === article.author.toString() || isAdmin === true) {
        const deletedArticle = await article.deleteOne();

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.REVIEW_DELETED_SUCCESSFULLY,
          data: deletedArticle,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.UNAUTHORIZED,
          message: MESSAGES.UNAUTHORIZED_TO_DELETE_ARTICLE,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_WHILE_DELETING_ARTICLE,
        data: error,
      };
    }
  }
}

export default BlogService;
