const User = require('../models/User');
const { logActivity } = require("../utils/logActivity");

exports.getPendingAuthors = async (req, res) => {
    try {
        const authors = await User.find({ role: 'author', isApproved: false });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'failed to fetch authors', error: error.message });
    }
};

exports.approveAuthor = async (req, res) => {
    try {
        const { id } = req.body;

        const author = await User.findOne({ _id: id, role: 'author' });

        if (!author) return res.status(404).json({ message: 'Author not found!' });
        if (author.isApproved) return res.status(400).json({ message: 'Author approved already!' });

        author.isApproved = true;
        await author.save();

        await logActivity({
            action: USER_APPROVED,
            performedBy: req.user.id, // operator
            target: "User",
            targetId: author._id,
            meta: { email: author.email, role: author.role }
        });

        res.json({ message: 'Author approved successfully', author });

    } catch (error) {
        res.status(500).json({ message: 'Failed to update Author!' })
    }
};

