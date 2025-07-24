const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    DoB: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ["admin", "operator", "author", "user"],
        default: "user"
    },
    isApproved: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);

