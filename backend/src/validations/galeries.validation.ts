import { Joi, validate } from 'express-validation';
import { colorTemplate } from '../helpers/regex';

// export const createNoteValidation = validate(
//   {
//     body: Joi.object({
//       title: Joi.string().max(512).required(),
//       color: Joi.string().pattern(colorTemplate).max(7).required(),
//     }),
//   },
//   {
//     context: true,
//   },
//   {
//     stripUnknown: true,
//   }
// );

export const updateGaleryValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256),
      deleted: Joi.string().max(256),
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
