const express = require('express');
const { authorizeRoles, verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// All routes below require admin access
router.use(verifyToken, authorizeRoles('admin'));

// Admin only route to get user based on role or all users.
router.get('/admin',  getAllUsers);
router.delete('/admin/:id', revokeUserPermission);