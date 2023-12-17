import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import logger from '../utils/logger.js';

const bucketPath = `${process.env.BUCKET_PATH}`;

const storage = new Storage({
  projectId: `${process.env.GCLOUD_PROJECT}`,
  keyFilename: './credentials.json',
});

const bucket = storage.bucket(`${process.env.GCS_BUCKET}`);

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Можна завантажувати лише файли з розширенням .jpg, .jpeg або .png.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: imageFilter,
});

const FileService = {
  uploadFile: async (file) => {
    return new Promise((resolve, reject) => {
      try {
        const fileName = `${Date.now()}_${file['originalname']}`;
        const fileStream = bucket.file(fileName).createWriteStream();

        fileStream.on('error', (error) => {
          reject(error);
        });

        fileStream.on('finish', async () => {
          logger.info('File uploaded to GCS successfully:', fileName);

          const imagePath = bucketPath.concat(fileName);

          resolve(imagePath);
        });

        fileStream.end(file.buffer);
      } catch(error) {
        logger.error(error);
        reject(error);
      }
    });
  },

  deleteFile: async (imagePath) => {
    try {
      await bucket.file(imagePath).delete();

      logger.info(`File deleted successfully: ${imagePath}`);
    } catch (error) {
      logger.error(`Error deleting file ${imagePath}:`, error);
      throw error;
    }
    return;
  },
};

export {
  upload,
  FileService
};
