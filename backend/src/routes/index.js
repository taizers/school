const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
const galeriesRouter = require('./galeries.routes');

router.post(
    '/users-avatar',
    authMiddleware,
    uploadPhotoMiddleware.single('file'),
    uploadUserAvatarAction
  );

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/galeries', galeriesRouter);


module.exports = router;
