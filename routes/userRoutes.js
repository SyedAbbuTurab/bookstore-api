const express = require('express');
const router = express.Router();

const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware');

const { getPendingAuthors, approveAuthor, } = require('../controllers/userController');
// Using this all routes under this method will need to have middleware
router.use(verifyToken);

router.get('/pending-authors', authorizeRoles('operator'), getPendingAuthors);
router.put('/approve-author', authorizeRoles('operator'),  approveAuthor);


module.exports = router;