import Product from '../models/productSchema.js';
import logger from '../utils/logger.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';
import sendRes from '../utils/handleResponse.js';
import { FileService } from '../services/fileService.js';

const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (product) {
      const imagePath = await FileService.uploadFile(file);

      if (product.allImages[0] === '' || !product.allImages[0]) {
        product.allImages[0] = imagePath;
        product.baseImage = imagePath;
      } else {
        product.allImages.push(imagePath);
      }

      await product.save();

      logger.info('The image successfully added to product.');

      return sendRes(res, HTTP_STATUS_CODES.CREATED, MESSAGES.FILE_SAVED_ON_GCS, imagePath);
    } else {
      return sendRes(res, HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    return sendRes(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR_HANDLING_FILE_UPLOAD, error);
  }
};

const deleteFile = async (req, res) => {
  try {
    const { productId, imageIndex } = req.body;
    const product = await Product.findById(productId);

    if (product) {
      const images = product.allImages;

      if (imageIndex >= 0 && imageIndex < images.length) {
        const imagePath = images[imageIndex];

        await FileService.deleteFile(imagePath);

        product.allImages.splice(imageIndex, 1);

        if (product.baseImage === imagePath) {
          product.baseImage = '';
          if (product.allImages.length > 0) {
            product.baseImage = product.allImages[0];
          }
        }

        await product.save();

        logger.info('Image deleted from product and Google Cloud Storage:', imagePath);

        return sendRes(res, HTTP_STATUS_CODES.OK, MESSAGES.IMAGE_DELETED_SUCCESSFULLY);
      } else {
        return sendRes(res, HTTP_STATUS_CODES.BAD_REQUEST, MESSAGES.INVALID_IMAGE_INDEX);
      }
    } else {
      return sendRes(res, HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    return sendRes(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.ERROR_DELETING_IMAGE, error);
  }
};

export {
  uploadFile,
  deleteFile
};
