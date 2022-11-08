import express from 'express';
import {
  createNewsAction,
  deleteNewsAction,
  getAllNewsAction,
  getNewsAction,
  updateNewsAction,
} from '../controllers/news.controller';
import {
  createNewsValidation,
  updateNewsValidation,
  getAllNewsValidation,
} from '../validations/news.validation';
import { paramsIdValidation } from '../validations/global.validation';
import { uploadNewsCoverMiddleware } from '../middlewares/upload.middleware';

const router = express.Router();

router.post(
  '/',
  uploadNewsCoverMiddleware.single('file'),
  createNewsValidation,
  createNewsAction
);
router.delete('/:id', paramsIdValidation, deleteNewsAction);
router.put(
  '/:id',
  uploadNewsCoverMiddleware.single('file'),
  updateNewsValidation,
  updateNewsAction
);
router.get('/', getAllNewsValidation, getAllNewsAction);
router.get('/:id', paramsIdValidation, getNewsAction);

export default router;
