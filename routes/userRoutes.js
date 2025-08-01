const express = require('express');
const router = express.Router();

const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware');

const { getPendingAuthors, approveAuthor, getAllUsers } = require('../controllers/userController');

router.get('/pending-authors', verifyToken, authorizeRoles('operator'), getPendingAuthors);
router.put('/approve-author', verifyToken, authorizeRoles('operator'),  approveAuthor);

// Admin only route to get user based on role or all users.
router.get('/admin', verifyToken, authorizeRoles('admin'), getAllUsers);

module.exports = router;