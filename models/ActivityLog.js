const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
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
});

activityLogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.Model('ActivityLog', activityLogSchema)