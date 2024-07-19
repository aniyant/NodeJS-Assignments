const Book = require('../models/book');
const moment = require('moment');

exports.createBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    const newBook = new Book({ title, author, createdBy: req.user.id });
    await newBook.save();
    res.status(201).json({ message: 'Book created' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    await book.remove();
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
};

exports.getBooks = async (req, res) => {
  const { old, new: isNew } = req.query;
  try {
    const query = {};
    if (old) {
      query.createdAt = { $lte: moment().subtract(10, 'minutes').toDate() };
    } else if (isNew) {
      query.createdAt = { $gte: moment().subtract(10, 'minutes').toDate() };
    }
    const books = await Book.find(query).populate('createdBy', 'username');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};
