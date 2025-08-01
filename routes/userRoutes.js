const express = require('express');
const router = express.Router();

const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware');

const { getPendingAuthors, approveAuthor, getAllUsers, revokeUserPermission } = require('../controllers/userController');

router.use(verifyToken);

router.get('/pending-authors', authorizeRoles('operator'), getPendingAuthors);
router.put('/approve-author', authorizeRoles('operator'),  approveAuthor);

// Admin only route to get user based on role or all users.
router.get('/admin', authorizeRoles('admin'), getAllUsers);
router.delete('/admin/:id', authorizeRoles('admin'), revokeUserPermission);

module.exports = router;