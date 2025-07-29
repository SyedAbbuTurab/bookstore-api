const User = require("../models/User");
const Invite = require('../models/Invite');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
};

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password!" })
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password!" })
        };

        // Optional check account apporved or not other than user!
        if (!user.isApproved) {
            return res.status(403).json({ error: "Account is not approved yet!" })
        }

        //JWT sign
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, role: user.role })


    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });

    }
};

exports.signupWithInvite = async (req, res) => {
    try {
        const { token, firstName, lastName, dob, password } = req.body;

        const invite = await Invite.findOne({ token });

        if (!invite) return res.status(400).jsopn({ message: 'Invalid invite token' });
        if (invite.used) return res.status(400).json({ message: 'Invite already has been used!' });
        if (invite.expiresAt < Date.now()) return res.json({ message: 'Invite has expired. :(' });

        // Create user from invite 
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName,
            email: invite.email,
            dob,
            password: hashedPassword,
            role: invite.role,
            isApproved: invite.role == 'author' ? false : true, // authors need operator approval
        });

        invite.used = true;
        await invite.save();

        res.status(201).json({ message: `${invite.role} account created successfully.` });

    } catch (error) {
        res.status(500).json({
            message: "Signup failed", error: error.mssage
        })
    }
}