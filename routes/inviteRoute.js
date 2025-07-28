const express = require('express');
const { createInvite } = require('../controllers/inviteController');
const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware')

const route = express.Router();

route.post('/', verifyToken, authorizeRoles('admin'), createInvite);