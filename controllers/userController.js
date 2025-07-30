const User = require('../models/User');

exports.getPendingAuthors = async (req, res) => {
    try {
        const authors = await User.find({ role: 'author', isApproved: false });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'failed to fetch authors', error: error.message });
    }
}