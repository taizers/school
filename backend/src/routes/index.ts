import express from 'express';

import {
  signUpAction,
  loginAction,
  refreshAction,
  logoutAction,
} from '../controllers/auth.controller';
import {
  uploadUserAvatarAction,
} from '../controllers/users.controller';
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
// import { paramsIdValidation } from '../validations/global.validation';

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
  uploadFilesMiddleware,
  uploadGaleryMiddleware,
} from '../middlewares/upload.middleware';
import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

// Authorization

router.post('/sign-up', signUpValidation, signUpAction);
router.post('/sign-in', loginValidation, loginAction);
router.post('/refresh-token', cookiesValidation, refreshAction);
router.post('/sign-out', cookiesValidation, logoutAction);

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

// Get Relations

// router.get(
//   '/project-tasks/:id',
//   verifyToken,
//   paramsIdValidation,
//   getProjectTasksAction
// );
// router.get(
//   '/assigned-tasks/:id',
//   verifyToken,
//   paramsIdValidation,
//   getAssignedTasksAction
// );
// router.get(
//   '/tasks-comments/:id',
//   verifyToken,
//   paramsIdValidation,
//   getTaskCommentsAction
// );
// router.get(
//   '/participate-in-tasks/:id',
//   verifyToken,
//   paramsIdValidation,
//   getMemberTasksAction
// );
// router.get(
//   '/user-tasks/:id',
//   verifyToken,
//   paramsIdValidation,
//   getUserTasksAction
// );
// router.get(
//   '/user-projects/:id',
//   verifyToken,
//   paramsIdValidation,
//   getUserProjectsAction
// );
// router.get(
//   '/user-checklists/:id',
//   verifyToken,
//   paramsIdValidation,
//   getUserChecklistsAction
// );

// Get Statistics

// router.get(
//   '/projects-statistics/:id',
//   verifyToken,
//   paramsIdValidation,
//   getProjectsStatisticAction
// );

// Upload Files

// router.post(
//   '/tasks-attachments',
//   verifyToken,
//   uploadGaleryMiddleware.array('files'),
//   uploadTaskAttachmentValidation,
//   uploadTaskAttachmentAction
// );
router.post(
  '/users-avatar',
  verifyToken,
  uploadAvatarMiddleware.single('file'),
  uploadUserAvatarAction
);

// Get Files

router.use('/avatars', express.static('files/avatars'));
router.use('/galeries-image', express.static('files/galeries'));
router.use('/files', express.static('files/files'));
router.use('/news-covers', express.static('files/news-covers'));

// Routers

router.get('/administration-group', verifyToken, getAdministartionGroupAction);
router.get('/groups-list', verifyToken, getGroupsListAction);

router.use('/galeries', verifyToken, galeriesRouter);
router.use('/groups', verifyToken, groupsRouter);
router.use('/storage', verifyToken, storageRouter);
router.use('/storage-groups', verifyToken, storageGroupsRouter);
router.use('/pages', verifyToken, pagesRouter);
router.use('/news', verifyToken, newsRouter);
router.use('/comments', verifyToken, commentsRouter);
router.use('/users', verifyToken, usersRouter);

export default router;
