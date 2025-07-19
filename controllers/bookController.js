const { uuid } = require("uuidv4");
const { readBooksFromFile, writeBooksFromFile } = require("../utils/helper");
const Book = require("../models/Book")


exports.getAllBooks = (req, res) => {
  try {
    const books = readBooksFromFile();

    const { title, author } = req.query;

    let filteredBooks = books;
    if (title || author) {
      filteredBooks = books.filter(book => {
        const matchesTitle = title ? book.title.toLowerCase().includes(title.toLowerCase()) : true
        const matchesAuthor = author ? book.author.toLowerCase().includes(author.toLowerCase()) : true
        return matchesTitle && matchesAuthor;
      });
    };

    res.json(filteredBooks)
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve books",
      error: error
    });
  }
}

exports.getBookById = async(req, res) => {
  try {
    const id = req.params.id;

    const checkBook = await Book.findOne({ _id: id })

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

    const checkBook = await Book.findOne({ _id: id })

    if (!checkBook) {
      return res.status(404).json({ message: "Book not found!!" })
    };

    await Book.deleteOne({ _id: id })
    res.json({ message: "Book deleted successfully" })

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in book creation", error: error.message })
  }
}

exports.deleteBook = async(req, res) => {
  try {
    const id = req.params.id;

    const checkBook = await Book.findOne({ _id: id })

    if (!checkBook) {
      return res.status(404).json({ message: "Book not found!!" })
    };

    await Book.deleteOne({ _id: id })
    res.json({ message: "Book deleted successfully" })

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in deletion", error: error });
  }
};
