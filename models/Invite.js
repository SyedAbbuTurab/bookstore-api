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
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type:Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Invite', inviteSchema);