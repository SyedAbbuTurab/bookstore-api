const jwt = require("jsonwebtoken");

// Verify JWT token with the provided secret key
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "No token provided!" });
    };

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: `Access denied! - JWT` });
    };
};

const authorizeRoles = (...allowedUsers) => {
    return (req, res, next) => {
        if (!req.user || !allowedUsers.includes(req.user.role))
            return res.status(403).json({ error: `Role - Access denied!` });
        next();
    };
};

// This function only for handling approved authors!
const onlyApprovedAuthors = (req, res, next) => {
    const { role, isApproved } = req.user;

    if (role !== 'author') {
        return res.status(403).json({ message: 'Only authors can perform this action!' });
    };

    if (!isApproved) {
        return res.status(403).json({ message: 'Author is not yet approved.' });
    };
    next();
}

module.exports = {
    verifyToken,
    authorizeRoles,
    onlyApprovedAuthors
};