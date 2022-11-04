import express from 'express';
import {
  createGroupAction,
  updateGroupsAction,
  deleteGroupAction,
  getGroupAction,
  getGroupsAction,
} from '../controllers/groups.controller';
import {
  createGroupValidation,
  updateGroupValidation,
} from '../validations/groups.validation';
import { paramsIdValidation } from '../validations/global.validation';

const router = express.Router();

router.post('/', createGroupValidation, createGroupAction);
router.delete('/:id', paramsIdValidation, deleteGroupAction);
router.put('/:id', updateGroupValidation, updateGroupsAction);
router.get('/:id', paramsIdValidation, getGroupAction);
router.get('/', getGroupsAction);

export default router;
