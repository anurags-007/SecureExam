const AccessLog = require('../models/AccessLog');
const AuditTrail = require('../models/AuditTrail');

/**
 * Log access action
 * @param {object} logData - Log data
 * @returns {object} - Access log
 */
const logAccess = async (logData) => {
  const accessLog = new AccessLog({
    userId: logData.userId,
    paperIds: logData.paperIds || [],
    action: logData.action,
    resourceType: logData.resourceType || 'exam_paper',
    ipAddress: logData.ipAddress,
    userAgent: logData.userAgent,
    details: logData.details,
    status: logData.status || 'success',
    sessionId: logData.sessionId,
  });

  await accessLog.save();
  return accessLog;
};

/**
 * Get access logs
 * @param {object} filters - Filter options
 * @returns {array} - Access logs
 */
const getAccessLogs = async (filters = {}) => {
  const query = {};

  if (filters.userId) {
    query.userId = filters.userId;
  }
  if (filters.action) {
    query.action = filters.action;
  }
  if (filters.paperId) {
    query.paperIds = filters.paperId;
  }
  if (filters.status) {
    query.status = filters.status;
  }

  const logs = await AccessLog.find(query)
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .limit(filters.limit || 100);

  return logs;
};

/**
 * Get user access history
 * @param {string} userId - User ID
 * @returns {array} - User access history
 */
const getUserAccessHistory = async (userId) => {
  const logs = await AccessLog.find({ userId })
    .sort({ createdAt: -1 })
    .limit(50);

  return logs;
};

/**
 * Log audit trail
 * @param {object} auditData - Audit data
 * @returns {object} - Audit trail
 */
const logAudit = async (auditData) => {
  const audit = new AuditTrail({
    performedBy: auditData.performedBy,
    action: auditData.action,
    entityType: auditData.entityType,
    entityId: auditData.entityId,
    changes: auditData.changes || {},
    severity: auditData.severity || 'low',
    ipAddress: auditData.ipAddress,
    description: auditData.description,
    status: auditData.status || 'success',
  });

  await audit.save();
  return audit;
};

/**
 * Get audit trail
 * @param {object} filters - Filter options
 * @returns {array} - Audit trail
 */
const getAuditTrail = async (filters = {}) => {
  const query = {};

  if (filters.performedBy) {
    query.performedBy = filters.performedBy;
  }
  if (filters.entityType) {
    query.entityType = filters.entityType;
  }
  if (filters.severity) {
    query.severity = filters.severity;
  }
  if (filters.action) {
    query.action = filters.action;
  }

  const trail = await AuditTrail.find(query)
    .populate('performedBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(filters.limit || 100);

  return trail;
};

/**
 * Get suspicious activities
 * @returns {array} - Suspicious activities
 */
const getSuspiciousActivities = async () => {
  const logs = await AccessLog.find({ status: 'suspicious' })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .limit(50);

  return logs;
};

module.exports = {
  logAccess,
  getAccessLogs,
  getUserAccessHistory,
  logAudit,
  getAuditTrail,
  getSuspiciousActivities,
};
