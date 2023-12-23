import logger from './utils/logger.js';

const chatHandler = (ws, req) => {
  ws.send('Hi!');

  ws.on('message', (message) => {
    logger.info(`Received message: ${message}`);
  });

  ws.on('close', () => {
    logger.info('WebSocket connection closed.');
  });
};

export default chatHandler;
