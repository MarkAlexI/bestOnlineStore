import Product from '../models/productSchema.js';
import Article from '../models/articleSchema.js';
import logger from '../utils/logger.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import sendRes from '../utils/handleResponse.js';
import { FileService } from '../services/fileService.js';

const uploadFileForEntity = async (req, res, EntityModel, entityName) => {
  try {
    const { file } = req;
    const { entityId } = req.body;
    const entity = await EntityModel.findById(entityId);

    if (entity) {
      const imagePath = await FileService.uploadFile(file);

      if (entity.allImages[0] === '' || !entity.allImages[0]) {
        entity.allImages[0] = imagePath;
        entity.baseImage = imagePath;
      } else {
        entity.allImages.push(imagePath);
      }

      await entity.save();

      logger.info(`The image successfully added to ${entityName}.`);

      return sendRes(res, HTTP_STATUS_CODES.CREATED, MESSAGES.FILE_SAVED_ON_GCS, imagePath);
    } else {
      return sendRes(res, HTTP_STATUS_CODES.NOT_FOUND, MESSAGES[`${entityName.toUpperCase()}_NOT_FOUND`]);
    }
  } catch (error) {
    return sendRes(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR_HANDLING_FILE_UPLOAD, error);
  }
};

const deleteFileForEntity = async (req, res, EntityModel, entityName) => {
  try {
    const { entityId, imageIndex } = req.body;
    const entity = await EntityModel.findById(entityId);

    if (entity) {
      const images = entity.allImages;

      if (imageIndex >= 0 && imageIndex < images.length) {
        const imagePath = images[imageIndex];

        await FileService.deleteFile(imagePath);

        entity.allImages.splice(imageIndex, 1);

        if (entity.baseImage === imagePath) {
          entity.baseImage = '';
          if (entity.allImages.length > 0) {
            entity.baseImage = entity.allImages[0];
          }
        }

        await entity.save();

        logger.info(`Image deleted from ${entityName} and Google Cloud Storage:`, imagePath);

        return sendRes(res, HTTP_STATUS_CODES.OK, MESSAGES.IMAGE_DELETED_SUCCESSFULLY);
      } else {
        return sendRes(res, HTTP_STATUS_CODES.BAD_REQUEST, MESSAGES.INVALID_IMAGE_INDEX);
      }
    } else {
      return sendRes(res, HTTP_STATUS_CODES.NOT_FOUND, MESSAGES[`${entityName.toUpperCase()}_NOT_FOUND`]);
    }
  } catch (error) {
    return sendRes(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR_DELETING_IMAGE, error);
  }
};

const saveProductImage = async (req, res) => {
  return uploadFileForEntity(req, res, Product, 'product');
};

const saveArticleImage = async (req, res) => {
  return uploadFileForEntity(req, res, Article, 'article');
};

const deleteProductImage = async (req, res) => {
  return deleteFileForEntity(req, res, Product, 'product');
};

const deleteArticleImage = async (req, res) => {
  return deleteFileForEntity(req, res, Article, 'article');
};


export {
  saveProductImage,
  saveArticleImage,
  deleteProductImage,
  deleteArticleImage
};
