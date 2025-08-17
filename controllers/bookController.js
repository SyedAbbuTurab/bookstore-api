const Book = require("../models/Book");
const { BOOK_UPDATED, BOOK_DELETED } = require("../utils/constants");
const { logActivity } = require('../utils/logActivity');

// Get all books from DB
exports.getAllBooks = async (req, res) => {
  try {
    const filters = { isDeleted: false };

    // Loop through all query params and add to filters
    for (let key in req.query) {
      if (key === 'id') {
        filters['_id'] = req.query[key]; // exact match for _id
      } else {
        filters[key] = { $regex: req.query[key], $options: 'i' };
      }
    }

    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [books, totalCount] = await Promise.all([
      Book.find(filters).skip(skip).limit(limit),
      Book.countDocuments(filters)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    // send response
    res.json({
      page,
      totalPages,
      totalCount,
      books
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve books",
      error: error
    });
  }
}

// Get books by ID
exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;

    const checkBook = await Book.findOne({ id: id, isDeleted: false })

    if (!checkBook) {
      return res.status(404).json({ message: "Book not found!!" })
    };

    res.json(checkBook)
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in fetching books!", error: error });
  }
}

// Create resource in books DB
exports.createBook = async (req, res) => {
  try {

    const { title, author } = req.body;

    const newBook = await Book.create({ title, author });
    // Action performed by any user will be logged with certain details and meta data will be stored
    await logActivity({
      action: 'BOOK_CREATED',
      performedBy: req.user.id,
      target: 'BOOK',
      targetId: newBook.id,
      meta: { title: newBook.title }
    });

    res.status(201).json(newBook);

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in book creation", error: error });
  }
}

// Update books depending on params
exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found!!" });
    };

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    const updatedBook = await book.save();

    // Action performed by any user will be logged with certain details and meta data will be stored
    await logActivity({
      action: BOOK_UPDATED,
      performedBy: req.user.id,
      target: "BOOK",
      targetId: updatedBook.id,
      meta: { title: book.title, author: book.author }
    });

    res.status(200).json(updatedBook);

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in book updation", error: error.message })
  }
}

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    const checkBook = await Book.findOne({ _id: id });

    if (!checkBook) {
      return res.status(404).json({ message: "Book not found!!" })
    };

    checkBook.isDeleted = true;

    checkBook.save();

    await logActivity({
      action: BOOK_DELETED,
      performedBy: req.user.id,
      target: "BOOK",
      targetId: checkBook.id,
      meta: { title: checkBook.title, author: checkBook.author }
    });

    res.json({ message: "Book soft - deleted successfully" })

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in deletion", error: error });
  }
};
