import { Joi, validate } from 'express-validation';

export const createPageValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      content: Joi.string().max(20000).required(),
      mainpage_id: Joi.number(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updatePageValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      content: Joi.string().max(20000).required(),
      mainpage_id: Joi.number(),
    }),
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
