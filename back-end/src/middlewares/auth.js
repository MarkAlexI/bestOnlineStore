import jwt from 'jsonwebtoken';
import sendRes from '../utils/handleResponse.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES
} from '../utils/constants.js';

const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization;

    jwt.verify(token, `${process.env.JWT_SECRET}`, (error, decode) => {
      if (error) {
        return sendRes(res, HTTP_STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_TOKEN, error);
      } else {
        const nowInSeconds = Math.floor(Date.now() / 1000);
        if (decode.exp && decode.exp < nowInSeconds) {
          return sendRes(res, HTTP_STATUS_CODES.UNAUTHORIZED, MESSAGES.TOKEN_HAS_EXPIRED);
        }
        req.user = decode;
        next();
      }
    });
  } else {
    return sendRes(res, HTTP_STATUS_CODES.UNAUTHORIZED, MESSAGES.NO_TOKEN);
  }
};

export default isAuth;
