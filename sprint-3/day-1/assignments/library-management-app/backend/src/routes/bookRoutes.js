const express = require('express');
const { createBook, deleteBook, getBooks } = require('../controllers/bookControllers');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/role');
const bookRouter = express.Router();

bookRouter.post('/', auth, roles(['admin']), createBook);
bookRouter.delete('/:id', auth, roles(['admin']), deleteBook);
bookRouter.get('/',auth, getBooks);

module.exports = bookRouter;
