let books = [
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