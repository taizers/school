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

export const updateUserValidation = validate(
  {
    body: Joi.object({
      username: Joi.string().max(256),
      group_id: Joi.number(),
      role: Joi.string().max(256),
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

export const updateProfileValidation = validate(
  {
    body: Joi.object({
      username: Joi.string().max(256),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const getUsersValidation = validate(
  {
    query: Joi.object({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
