const express = require('express');
const router = express.Router();

const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware');

const { getPendingAuthors, approveAuthor } = require('../controllers/userController');

router.get('/pending-authors', verifyToken, authorizeRoles('operator'), getPendingAuthors);
router.put('/approve-author', authorizeRoles('operator'), verifyToken, approveAuthor);

module.exports = router;