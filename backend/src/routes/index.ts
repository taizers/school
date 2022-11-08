import express from 'express';

import {
  signUpAction,
  loginAction,
  refreshAction,
  logoutAction,
} from '../controllers/auth.controller';
import { uploadUserAvatarAction } from '../controllers/users.controller';
// import {
//   searchProjectAction,
//   getProjectsStatisticAction,
//   getUserProjectsAction,
// } from '../controllers/news.controller';
// import {
//   getAssignedTasksAction,
//   getMemberTasksAction,
//   getProjectTasksAction,
//   getUserTasksAction,
//   uploadTaskAttachmentAction,
// } from '../controllers/tasks.controller';
import {
  getAdministartionGroupAction,
  getGroupsListAction,
} from '../controllers/groups.controller';

import {
  signUpValidation,
  loginValidation,
  cookiesValidation,
} from '../validations/auth.validation';

import galeriesRouter from './galeries.routes';
import groupsRouter from './groups.routes';
import pagesRouter from './pages.routes';
import newsRouter from './news.routes';
import commentsRouter from './comments.routes';
import usersRouter from './users.routes';
import storageGroupsRouter from './storage-groups.routes';
import storageRouter from './storages.routes';

import {
  uploadAvatarMiddleware,
} from '../middlewares/upload.middleware';
import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

// Authorization

router.post('/sign-up', signUpValidation, signUpAction);
router.post('/sign-in', loginValidation, loginAction);
router.post('/refresh-token', cookiesValidation, refreshAction);
router.post('/sign-out', cookiesValidation, logoutAction);

// Routers

router.use('/galeries', verifyToken, galeriesRouter);
router.use('/groups', verifyToken, groupsRouter);
router.use('/storage', verifyToken, storageRouter);
router.use('/storage-groups', verifyToken, storageGroupsRouter);
router.use('/pages', verifyToken, pagesRouter);
router.use('/news', verifyToken, newsRouter);
router.use('/comments', verifyToken, commentsRouter);
router.use('/users', verifyToken, usersRouter);

// Search

// router.get(
//   '/projects-search',
//   verifyToken,
//   searchValidation,
//   searchProjectAction
// );
// router.get(
//   '/task-members-search',
//   verifyToken,
//   searchValidation,
//   searchMembersAction
// );

// Upload Files

router.post(
  '/users-avatar',
  verifyToken,
  uploadAvatarMiddleware.single('file'),
  uploadUserAvatarAction
);

// Get Files

router.use('/avatars', express.static('storage/avatars'));
router.use('/galeries-image', express.static('storage/galeries'));
router.use('/files', express.static('storage/files'));
router.use('/news-covers', express.static('storage/news-covers'));


router.get('/administration-group', verifyToken, getAdministartionGroupAction);
router.get('/groups-list', verifyToken, getGroupsListAction);

export default router;
