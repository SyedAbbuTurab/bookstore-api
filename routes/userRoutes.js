const express = require('express');
const router = express.Router();

const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware');

const { getPendingAuthors, approveAuthor } = require('../controllers/userController');

router.get('/pending-authors', authorizeRoles('operator'), verifyToken, getPendingAuthors);
router.put('/approve-author', authorizeRoles('operator'), verifyToken, approveAuthor);

module.exports = router;