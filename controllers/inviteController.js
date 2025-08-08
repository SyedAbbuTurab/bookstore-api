const crypto = require('crypto');
const Invite = require('../models/Invite');
const logActivity = require('../utils/logActivity');
const { INVITE_SENT } = require('../utils/constants');

exports.createInvite = async (req, res) => {
    try {
        const { email, role } = req.body;

        if (!email || !role) {
            return res.status(400).json({ error: "Email and Role are required!" })
        };

        const token = crypto.randomBytes(20).toString('hex');

        const invite = await Invite.create({ email, role, token });

        const inviteLink = `${process.env.BASE_URL}/signup-invite?token=${token}`;

        res.status(201).json({ message: "Invite created", inviteLink });

        await logActivity({
            action: INVITE_SENT,
            performedBy: req.user.id, // admin or operator
            target: "User",
            meta: { email, role, inviteId: invite._id }
        })

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}