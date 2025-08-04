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
