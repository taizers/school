import express from 'express';
import {
  createGroupAction,
  updateGroupAction,
  deleteGroupAction,
  getGroupAction,
  getGroupsAction,
} from '../controllers/groups.controller';
import {
  createGroupValidation,
  updateGroupValidation,
} from '../validations/groups.validation';
import { paramsIdValidation } from '../validations/global.validation';
import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createGroupValidation, createGroupAction);
router.delete('/:id', verifyToken, paramsIdValidation, deleteGroupAction);
router.put('/:id', verifyToken, updateGroupValidation, updateGroupAction);
router.get('/:id', paramsIdValidation, getGroupAction);
router.get('/', getGroupsAction);

export default router;
