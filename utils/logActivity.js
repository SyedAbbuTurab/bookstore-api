const ActivityLog = require('../models/ActivityLog');

// Works as reusabel function to log data to Activity logger
const logActivity = async ({ action, performedBy, target, targetId, meta = {} }) => {
    try {
        await ActivityLog.create({ action, performedBy, target, targetId, meta })        
    } catch (error) {
        console.error("Something wrong in logger", error);
    }
};

module.exports ={
    logActivity
}