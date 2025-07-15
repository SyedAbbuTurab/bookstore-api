const { uuid } = require("uuidv4");
const {readBooksFromFile, writeBooksFromFile} = require("../utils/helper")

// var books = [
//   { id: "1", title: "1984", author: "George Orwell" },
//   { id: "2", title: "The Alchemist", author: "Paulo Coelho" },
// ];

exports.getAllBooks = (req, res) => {
  try {
    const books = readBooksFromFile();
    res.json(books)
  } catch (error) {
    res.json(error)
  }
}

exports.getBookById = (req, res) => {
  try {    
    const books = readBooksFromFile();

    const id = req.params.id;
  
    const book = books.find(b => b.id === id)
    book ? res.json(book) : res.status(404).json({ message: "Book not found! :(" });

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in fetching books!", error: error });
  }
}

exports.createBook = (req, res) => {
  try {
    const books = readBooksFromFile();

    const { title, author } = req.body;
    const newBook = {
      id: uuid(),
      title: title,
      author: author
    };

    books.push(newBook);
    writeBooksFromFile(books);

    res.status(201).json(books);

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in book creation", error: error });
  }
}

exports.updateBook = (req, res) => {
  try {
    const books = readBooksFromFile();
    const id = req.params.id;
    const index = books.findIndex(b => b.id === id);
    console.log("index", index);
    

    if(index == -1) {
      return res.status(404).json({message: "Book not found!!"})
    };

    const updatedBooks = {
      ...books[index],
      title: req.body.title || books[index].title,
      author: req.body.author || books[index].author,
    }
    books[index] = updatedBooks
    writeBooksFromFile(books);
    res.json(updatedBooks)

  } catch (error) {
    res.status(400).json({message:"Something went wrong in book creation", error: error.message})
  }
}

exports.deleteBook = (req, res) => {
  try {
    const books = readBooksFromFile();
    const id = req.params.id;

    
    const updatedBooks = books.filter(b => b.id !== id);

    writeBooksFromFile(updatedBooks);

    res.json({ message: "Book Deleted!", data: updatedBooks});

  } catch (error) {
    res.status(400).json({ message: "Something went wrong in deletion", error: error });
  }
};
