const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['author', 'operator'],
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    used: {
        type: Boolean,
        default: false
    }
})