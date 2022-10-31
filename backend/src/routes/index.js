const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
const galeriesRouter = require('./galeries.routes');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/galeries', galeriesRouter);

module.exports = router;
