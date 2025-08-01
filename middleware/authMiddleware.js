const jwt = require("jsonwebtoken");

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

const onlyApprovedAuthors = (req, res) => {
    const { role, isAppproved } = req.user;

    if(role !== 'author') {
        return res.status(403).json({ message: 'Only authors can perform this action!'});
    };

    if(!isAppproved) {
        return res.status(403).json({ message: 'Auhtor is not yet approved.'});
    };
    next()
}

module.exports = {
    verifyToken,
    authorizeRoles,
    onlyApprovedAuthors
}