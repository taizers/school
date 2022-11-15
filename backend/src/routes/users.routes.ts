import express from 'express';
import {
  getUserAction,
  createUserAction,
  getUsersAction,
  updateUserAction,
  updateUserProfileAction,
  deleteUserAction,
} from '../controllers/users.controller';
import { paramsIdValidation } from '../validations/global.validation';
import {
  createUserValidation,
  getUsersValidation,
  updateProfileValidation,
  updateUserValidation,
} from '../validations/users.validation';

const router = express.Router();

router.get('/:id', paramsIdValidation, getUserAction);
router.post('/', createUserValidation, createUserAction);
router.get('/', getUsersValidation, getUsersAction);
router.put('/', updateProfileValidation, updateUserProfileAction);
router.put('/:id', updateUserValidation, updateUserAction);
router.delete('/:id', paramsIdValidation, deleteUserAction);

export default router;
