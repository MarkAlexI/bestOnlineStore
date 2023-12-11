import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import logger from '../utils/logger.js';

const bucketPath = `${process.env.BUCKET_PATH}`;

const storage = new Storage({
  projectId: `${process.env.GCLOUD_PROJECT}`,
  keyFilename: './credentials.json',
});

const bucket = storage.bucket(`${process.env.GCS_BUCKET}`);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const FileService = {
  uploadFile: async (file) => {
    try {
      const fileName = `${Date.now()}_${file['originalname']}`;
      const fileStream = bucket.file(fileName).createWriteStream();

      fileStream.on('error', (error) => {
        throw error;
      });

      fileStream.on('finish', async () => {
        logger.info('File uploaded to GCS successfully:', fileName);

        const imagePath = bucketPath.concat(fileName);

        return imagePath;
      });

      fileStream.end(file.buffer);
    } catch(error) {
      logger.error(error);
      throw error;
    }
  },

  deleteFile: async (imagePath) => {
    bucket.file(imagePath).delete();
    return;
  },
};

export {
  upload,
  FileService
};
