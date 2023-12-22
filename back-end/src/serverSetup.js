import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import logger from './utils/logger.js';

const configureApp = (app) => {
  const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50
  });

  const corsOptions = {
    origin: true,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, Key, Authorization'],
    credentials: true
  };

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(limiter);
  app.use(xss());
  app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );
  app.use('*', (req, res, next) => {
    logger.info(req.originalUrl);
    next();
  });
};

export default configureApp;
