const User = require("../models/User");

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, dob, password } = req.body;

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({ error: "Email already exists!" });
        };
        const user = await User.create({
            firstName,
            lastName,
            email,
            dob,
            password,
            role: 'user',
            isApproved: true
        });

        res.status(201).json({
            message: "User created successfully!",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}