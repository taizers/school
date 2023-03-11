import express from 'express';
import {
  createGaleryAction,
  deleteGaleryAction,
  getGaleryAction,
  updateGaleryAction,
  getGaleriesAction,
} from '../controllers/galeries.controller';
import {
  updateGaleryValidation,
  createGaleryValidation,
} from '../validations/galeries.validation';
import { paramsIdValidation } from '../validations/global.validation';
import { uploadGaleryMiddleware } from '../middlewares/upload.middleware';
import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/',
  verifyToken,
  uploadGaleryMiddleware.array('files', 15),
  createGaleryValidation,
  createGaleryAction
);
router.delete('/:id', verifyToken, paramsIdValidation, deleteGaleryAction);
router.put(
  '/:id',
  verifyToken,
  uploadGaleryMiddleware.array('files', 15),
  updateGaleryValidation,
  updateGaleryAction
);
router.get('/:id', paramsIdValidation, getGaleryAction);
router.get('/', getGaleriesAction);

export default router;
