// const router = require("router")
const express = require("express")
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook} = require("../controllers/bookController");

const { bookValidationRoutes } = require("../validators/bookValidator");
const { validationRequest } = require("../middleware/validateRequest")


router.get('/all', getAllBooks);   
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.post('/create-book', bookValidationRoutes, validationRequest, createBook);
router.delete('/:id', deleteBook);
   


module.exports = router