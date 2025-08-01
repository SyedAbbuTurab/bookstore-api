// const router = require("router")
const express = require("express")
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require("../controllers/bookController");

const { bookValidationRoutes } = require("../validators/bookValidator");
const { validationRequest } = require("../middleware/validateRequest")

const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware")


router.get('/all', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.post('/create-book', bookValidationRoutes, validationRequest, verifyToken, authorizeRoles('author'), createBook);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'operator', 'author'), deleteBook);


module.exports = router