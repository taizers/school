import express from 'express';
import {
  getUserAction,
  createUserAction,
  getUsersAction,
  updateUserAction,
  updateUserProfileAction,
  deleteUserAction,
} from '../controllers/users.controller';
import { uploadAvatarMiddleware } from '../middlewares/upload.middleware';
import { paramsIdValidation } from '../validations/global.validation';
import {
  createUserValidation,
  getUsersValidation,
  updateUserValidation,
} from '../validations/users.validation';

const router = express.Router();

router.get('/:id', paramsIdValidation, getUserAction);
router.post('/', createUserValidation, createUserAction);
router.get('/', getUsersValidation, getUsersAction);
router.put('/', uploadAvatarMiddleware.single('file'), updateUserProfileAction);
router.put('/:id', updateUserValidation, updateUserAction);
router.delete('/:id', paramsIdValidation, deleteUserAction);

export default router;
