const { v4, uuid } = require("uuidv4");

var books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "The Alchemist", author: "Paulo Coelho" },
];

exports.getAllBooks = (req, res) => {
  res.json(books)
}

exports.getBookById = (req, res) => {
  try {    
    const id = req.params.id;
  
    const book = books.find(b => b.id === id)
  
    book ? res.json(book) : res.status(404).json({ message: "Book not found! :(" })
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in fetching books!", error: error });
  }
}

exports.createBook = (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = {
      id: uuid(),
      title: title,
      author: author
    }
    books.push(newBook);

    res.status(201).json(books)
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in book creation", error: error });
  }
}

exports.deleteBook = (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting book with ID:", id);

    books = books.filter(b => b.id !== id);

    res.json({ message: "Book Deleted!" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in deletion", error: error });
  }
};
