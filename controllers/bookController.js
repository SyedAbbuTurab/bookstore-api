const { v4, uuid } = require("uuidv4");

var books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
];

exports.getAllBooks = (req, res) => {
    res.json(books)
}

exports.getBookById = (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id)

    book ? res.json(book) : res.status(404).json({ message: "Book not found! :(" })
}

exports.createBook = (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: uuid(),
        title: title,
        author: author
    }
    books.push(newBook);

    res.status(201).json(books)
}

exports.deleteBook = (req, res) => {
    try {
        const { id } = req.params;
        const book = books.filter(b => b.id !== id)
        res.json({ message: "Book Deleted!" })
    } catch (error) {
        res.status(400).json({message : "Something went wrong in deletion"})
    }
}