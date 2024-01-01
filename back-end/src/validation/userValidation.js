import { body } from 'express-validator';
import userNameRegex from './userNameRegex.js';

const validateUserData = [
  body('firstName')
    .exists({ checkFalsy: true })
    .withMessage('User firstname is required')
    .isString()
    .withMessage('User firstname should be string')
    .matches(userNameRegex)
    .withMessage('Firstname must be between 3 and 30 characters.'),
  body('lastName')
    .exists({ checkFalsy: true })
    .withMessage('User lastname is required')
    .isString()
    .withMessage('User lastname should be string')
    .matches(userNameRegex)
    .withMessage('Lastname must be between 3 and 30 characters.'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters.')
    .custom((value) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      if (!passwordRegex.test(value)) {
        throw new Error('Password must have required parameters.');
      }
      return true;
    }),
  body('email')
    .isEmail()
    .withMessage('Invalid email format.'),
  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\+\d{1,3}\s?\(\d{1,3}\)\s?\d{3,}-\d{2,}-\d{2,}$/)
    .withMessage('Invalid phone number format. For example: +38(050)123-45-67')
];

export default validateUserData;
