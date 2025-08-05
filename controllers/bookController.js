const Book = require("../models/Book");
const { logActivity } = require('../utils/logActivity');


exports.getAllBooks = async (req, res) => {
  try {
    const filters = {};

    // Loop through all query params and add to filters
    for (let key in req.query) {
      if (key === 'id') {
        filters['_id'] = req.query[key]; // exact match for _id
      } else {
        filters[key] = { $regex: req.query[key], $options: 'i' }; // partial, case-insensitive
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

exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;

    const checkBook = await Book.findOne({ id: id })

    if (!checkBook) {
      return res.status(404).json({ message: "Book not found!!" })
    };

    res.json(checkBook)
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in fetching books!", error: error });
  }
}

exports.createBook = async (req, res) => {
  try {

    const { title, author } = req.body;

    const newBook = await Book.create({ title, author })

    res.status(201).json(newBook);

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in book creation", error: error });
  }
}

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await Book.findById(id)

    if (!book) {
      return res.status(404).json({ message: "Book not found!!" })
    };

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    const updatedBook = await book.save();

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

    await Book.deleteOne({ id: id })
    res.json({ message: "Book deleted successfully" })

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in deletion", error: error });
  }
};
