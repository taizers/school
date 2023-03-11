import express from 'express';
import {
  createCommentAction,
  deleteCommentAction,
  getCommentsAction,
} from '../controllers/comments.controller';
import verifyToken from '../middlewares/auth.middleware';
import {
  createCommentValidation,
  getCommentsValidation,
} from '../validations/comments.validation';
import { paramsIdValidation } from '../validations/global.validation';

const router = express.Router();

router.post('/', verifyToken, createCommentValidation, createCommentAction);
router.delete('/:id', verifyToken, paramsIdValidation, deleteCommentAction);
router.get('/', getCommentsValidation, getCommentsAction);

export default router;
