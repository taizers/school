import express from 'express';
import {
  createGaleryAction,
  deleteGaleryAction,
  getGaleryAction,
  updateGaleryAction,
  getGaleriesAction,
} from '../controllers/galeries.controller';
import { updateGaleryValidation, createGaleryValidation } from '../validations/galeries.validation';
import { paramsIdValidation } from '../validations/global.validation';
import { uploadGaleryMiddleware } from '../middlewares/upload.middleware';

const router = express.Router();

router.post('/', uploadGaleryMiddleware.array('files', 15), createGaleryValidation, createGaleryAction);
router.delete('/:id', paramsIdValidation, deleteGaleryAction);
router.put(
  '/:id',
  uploadGaleryMiddleware.array('files', 15),
  updateGaleryValidation,
  updateGaleryAction
);
router.get('/:id', paramsIdValidation, getGaleryAction);
router.get('/', getGaleriesAction);

export default router;
