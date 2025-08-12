// const router = require("router")
const express = require("express")
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require("../controllers/bookController");

const { bookValidationRoutes } = require("../validators/bookValidator");
const { validationRequest } = require("../middleware/validateRequest")

const { verifyToken, authorizeRoles, onlyApprovedAuthors } = require("../middleware/authMiddleware")

// Using this all routes under this method will need to have middleware
router.use(verifyToken);
router.get('/all', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.post('/create-book', bookValidationRoutes, validationRequest, authorizeRoles('author'), onlyApprovedAuthors, createBook);
router.delete('/:id', authorizeRoles('admin', 'operator', 'author'), onlyApprovedAuthors, deleteBook);


module.exports = router