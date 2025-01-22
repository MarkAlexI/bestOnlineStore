import { body } from 'express-validator';

const validateProductViewed = [
  body('viewed')
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage('Viewed should be a non-negative integer'),

  body()
    .custom((value, { req }) => {
      const allowedFields = ['viewed'];
      const bodyKeys = Object.keys(req.body);
      const disallowedFields = bodyKeys.filter(key => !allowedFields.includes(key));

      if (disallowedFields.length > 0) {
        throw new Error(`Disallowed fields: ${disallowedFields.join(', ')}`);
      }

      return true;
    }),
];

export default validateProductViewed;
