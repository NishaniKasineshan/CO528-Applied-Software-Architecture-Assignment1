const Book = require('../models/bookModel');

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ id : 1 });;
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({id:req.params.id});
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { id, title, author } = req.body;
  
    // Check if id is provided
    if (!id) {
      return res.status(400).json({ message: 'id is required.' });
    }
  
    const newBook = new Book({
      id,
      title,
      author
    });
  
    try {
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({id:req.params.id});
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.id = req.body.id || book.id;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({id:req.params.id});
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.deleteOne();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
