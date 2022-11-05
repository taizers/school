import express from 'express';
import {
  getPagesListAction,
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
router.get('/', getPagesListAction);
router.get('/:id', getPageAction);
router.put('/:id', updatePageValidation, updatePageAction);
router.post('/', createPageValidation, createPageAction);

export default router;
