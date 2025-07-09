// const router = require("router")
const express = require("express")
const router = express.Router();

const { getAllBooks, getBookById, createBook} = require("../controllers/bookController")

router.get('/all', getAllBooks);   
router.get('/:id', getBookById);
router.post('/create-book', createBook);
   


module.exports = router