import express from 'express';
import {
  getPagesAction,
  deletePageAction,
  updatePageAction,
  createPageAction,
  getPageAction,
} from '../controllers/pages.controller';
import {
  createPageValidation,
  updatePageValidation,
} from '../validations/pages.validation';
import { paramsIdValidation } from '../validations/global.validation';

const router = express.Router();

router.delete('/:id', paramsIdValidation, deletePageAction);
router.get('/', getPagesAction);
router.get('/:id', getPageAction);
router.put('/:id', updatePageValidation, updatePageAction);
router.post('/', createPageValidation, createPageAction);

export default router;
