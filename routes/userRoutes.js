const express = require('express');
const router = express.Router();

const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware');

const { getPendingAuthors } = require('../controllers/userController');

router.get('/pending-authors', authorizeRoles('operator'), verifyToken, getPendingAuthors);

module.exports = router;