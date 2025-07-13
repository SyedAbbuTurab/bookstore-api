const { body } = require("express-validator");

exports.bookValidationRoutes = [
    body('title').notEmpty().withMessage("Title is required!")
        .isLength({ min: 3 }).withMessage("Title must be at leaest 3 characters"),
    body('author').notEmpty().withMessage("author is required!")
        .isAlpha('en-US', { ignore: ' ' }).withMessage("Author name must only contain letters"),
]