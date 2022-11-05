import { Joi, validate } from 'express-validation';

export const createStorageValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
