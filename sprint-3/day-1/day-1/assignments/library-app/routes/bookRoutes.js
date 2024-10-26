// /routes/bookRoutes.js
const express = require('express');
const { addBook, getBooks, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/books', authMiddleware(['CREATOR']), addBook);
router.get('/books', authMiddleware(['CREATOR', 'VIEWER', 'VIEW_ALL']), getBooks);
router.delete('/books/:id', authMiddleware(['CREATOR']), deleteBook);

module.exports = router;