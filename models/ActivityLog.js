const mongoose = require('mongoose');

const activityLogSchema = {
    action: { type: String, required: true },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    target: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId },

    meta : {
        type: Object,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.Model('ActivityLog', activityLogSchema)