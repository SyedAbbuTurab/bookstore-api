const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({ action, performedBy, target, targetId, meta = {} }) => {
    try {
        await ActivityLog.create({ action, performedBy, target, targetId, meta })        
    } catch (error) {
        console.error("Something wrong in logger");
    }
};

