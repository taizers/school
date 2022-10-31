const Router = require('express');
const router = new Router();
const galeriesController = require('../controller/galeries.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, galeriesController.getGaleries);
// router.get('/author', authMiddleware, booksController.getBooksByAuthor);

module.exports = router;
