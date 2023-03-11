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
import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

router.delete('/:id', verifyToken, paramsIdValidation, deletePageAction);
router.get('/', getPagesAction);
router.get('/:id', getPageAction);
router.put('/:id', verifyToken, updatePageValidation, updatePageAction);
router.post('/', verifyToken, createPageValidation, createPageAction);

export default router;
