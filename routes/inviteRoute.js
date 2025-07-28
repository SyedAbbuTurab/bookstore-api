const express = require('express');
const { createInvite } = require('../controllers/inviteController');
const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/', verifyToken, authorizeRoles('admin'), createInvite);

module.exports = router;