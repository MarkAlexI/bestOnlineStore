import express from 'express';
import { fileURLToPath } from 'url';
import logger from './utils/logger.js';
import path from 'path';
import sendRes from './utils/handleResponse.js';
import dbConnection from './db.js';
import configureApp from './serverSetup.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import cartRouter from './routers/cartRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import reviewRouter from './routers/reviewRouter.js';
import wishListRouter from './routers/wishListRouter.js';
import dataRouter from './routers/dataRouter.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const args = process.argv.slice(2);

let mode = 'develop';
let pathToIndex = '../../tests/';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--mode' && i + 1 < args.length) {
    mode = args[i + 1];
    break;
  }
}
logger.info('mode: ' + mode);
if (mode === 'production') pathToIndex = '../../front-end/dist/front-end/';

const port = process.env.PORT || 30000;
const app = express();

configureApp(app);

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/review', reviewRouter);
app.use('/api/wishlist', wishListRouter);
app.use('/api/data', dataRouter);
app.get('/ip', (req, res) => res.send(req.ip));

const staticPath = path.join(__dirName, pathToIndex);

app.use(express.static(staticPath));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(staticPath, 'favicon.ico'));
});

app.get('*', (req, res) => {
  logger.info(JSON.stringify(req.headers));
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use((error, req, res, next) => {
  sendRes(res, 'Something went wrong!', error);
});

const server = app.listen(port, () => {
  logger.info(`Server at http://localhost:${port}`);
});

server.on('close', () => {
  logger.info('Server is shutting down. Disconnecting from DB...');
  dbConnection.close(() => {
    logger.info('Disconnected from DB.');
    process.exit(0);
  });
});

app.on('error', error => {
  if (error.code === 'EACCES') {
    logger.error(`No access to port: ${port}.`);
  }
});

export default app;
