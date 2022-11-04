import { Joi, validate } from 'express-validation';

export const createUserValidation = validate(
  {
    body: Joi.object({
      username: Joi.string().max(256),
      group_id: Joi.number(),
      role: Joi.string().max(256).required(),
      post: Joi.string().max(256),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
