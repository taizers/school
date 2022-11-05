import express from 'express';
import {
  createStorageGroupAction,
  updateStorageGroupsAction,
  deleteStorageGroupAction,
  getStorageGroupAction,
  getStorageGroupsListAction,
} from '../controllers/storage-groups.controller';
import {
  createStorageGroupValidation,
  updateStorageGroupValidation,
} from '../validations/storage-groups.validation';
import { paramsIdValidation } from '../validations/global.validation';

const router = express.Router();

router.post('/', createStorageGroupValidation, createStorageGroupAction);
router.delete('/:id', paramsIdValidation, deleteStorageGroupAction);
router.put('/:id', updateStorageGroupValidation, updateStorageGroupsAction);
router.get('/:id', paramsIdValidation, getStorageGroupAction);
router.get('/', getStorageGroupsListAction);

export default router;
