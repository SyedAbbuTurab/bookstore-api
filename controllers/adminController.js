const User = require('../models/User');
const { logActivity } = require('../utils/logActivity')

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
        const { id } = req.params;
        
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };
        res.json({ message: 'User deleted successfully.' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong in deleting user!' })
    }
}