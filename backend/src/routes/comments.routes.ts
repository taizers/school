import express from 'express';
import {
  createCommentAction,
  deleteCommentAction,
  getCommentsAction,
} from '../controllers/comments.controller';
import { createCommentValidation, getCommentsValidation } from '../validations/comments.validation';
import { paramsIdValidation } from '../validations/global.validation';

const router = express.Router();

router.post('/', createCommentValidation, createCommentAction);
router.delete('/:id', paramsIdValidation, deleteCommentAction);
router.get('/', getCommentsValidation, getCommentsAction);

export default router;
