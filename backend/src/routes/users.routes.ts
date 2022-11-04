import express from 'express';
import { getUserAction, createUserAction } from '../controllers/users.controller';
import { paramsIdValidation } from '../validations/global.validation';
import { createUserValidation } from '../validations/users.validation';

const router = express.Router();

router.get('/:id', paramsIdValidation, getUserAction);
router.post('/', createUserValidation, createUserAction);

export default router;
