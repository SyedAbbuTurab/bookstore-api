const mongoose = require('mongoose');

const activityLogSchema = {
    action: { type: String, required: true },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
};
