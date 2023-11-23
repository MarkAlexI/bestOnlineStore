import logger from './logger.js';

const sendRes = (res, status, text, payload = null) => {
  const message = status.toString().startsWith('1') ||
    status.toString().startsWith('2') ||
    status.toString().startsWith('3')
    ? 'success'
    : 'fault';

  const logLevel = message === 'success'
    ? 'info'
    : 'error';

  logger[logLevel](`
    Response Status: ${status},
    Message: ${message},
    Text: ${text},
    Payload: ${payload}
  `);

  const answer = payload;

  res.status(status).json({
    message,
    text,
    payload: answer,
  });
};

export default sendRes;
