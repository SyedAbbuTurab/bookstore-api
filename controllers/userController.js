const User = require('../models/User');

exports.getPendingAuthors = async (req, res) => {
    try {
        const authors = await User.find({ role: 'author', isApproved: false });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'failed to fetch authors', error: error.message });
    }
};

// PUT call for updating or approving authors.
exports.approveAuthor = async (req, res) => {
    try {
        const { id } = req.body;

        const author = await User.findOne({ _id: id, role: 'author' });

        if (!author) return res.status(404).json({ message: 'Author not found!' });
        if (author.isApproved) return res.status(400).json({ message: 'Author approved already!' });

        author.isApproved = true;
        await author.save();

        res.json({ message: 'Author approved successfully', author });

    } catch (error) {
        res.status(500).json({ message: 'Failed to update Author!' })
    }
};

// Admin controller to get all user's
exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const users = role ? await User.find({ role }) : await User.find();
        res.json({ message: users })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong in fetching users!' })
    }
};

exports.revokeUserPermission = async (req, res) => {
    try {
        const { id } = req.params.id;
        const user = await User.findByIdAndDelete({ id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };
        res.json({ message: 'User deleted successfully.' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong in deleting user!' })
    }
}