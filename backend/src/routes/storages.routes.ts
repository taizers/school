import express from 'express';
import {
  createStorageAction,
  deleteStorageAction,
} from '../controllers/storages.controller';
import {
  createStorageValidation,
} from '../validations/storages.validation';
import { paramsIdValidation } from '../validations/global.validation';
import { uploadFilesMiddleware } from '../middlewares/upload.middleware';

const router = express.Router();

router.post('/', uploadFilesMiddleware.single('file'), createStorageValidation, createStorageAction);
router.delete('/:id', paramsIdValidation, deleteStorageAction);

export default router;
