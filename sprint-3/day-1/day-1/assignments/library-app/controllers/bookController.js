// /controllers/bookController.js
const Book = require('../models/bookModel');

const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = new Book({ title, author, createdBy: req.user.id });
    await book.save();
    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooks = async (req, res) => {
  const { old, new: isNew } = req.query;
  let query = {};
  if (old) {
    query = { createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) } };
  } else if (isNew) {
    query = { createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } };
  }
  const books = await Book.find(query).populate('createdBy', 'username');
  res.json(books);
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own books' });
    }
    
    await book.remove();
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBook, getBooks, deleteBook };
