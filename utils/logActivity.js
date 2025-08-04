const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({ action, performedBy, target, targetId, meta = {} }) => {
    await ActivityLog.create({ action, performedBy, target, targetId, meta })
}