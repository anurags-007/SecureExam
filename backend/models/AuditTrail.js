const mongoose = require('mongoose');

const auditTrailSchema = new mongoose.Schema(
  {
    performedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      enum: ['user', 'exam_paper', 'access_grant', 'role_change', 'security_event'],
      required: true,
    },

    entityId: mongoose.Schema.ObjectId,

    changes: {
      before: mongoose.Schema.Types.Mixed,
      after: mongoose.Schema.Types.Mixed,
    },

    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },

    ipAddress: String,

    description: String,

    status: {
      type: String,
      enum: ['success', 'failure'],
      default: 'success',
    },
  },
  { timestamps: true }
);

// Index for queries
auditTrailSchema.index({ performedBy: 1, createdAt: -1 });
auditTrailSchema.index({ severity: 1, createdAt: -1 });
auditTrailSchema.index({ entityType: 1, entityId: 1 });

module.exports = mongoose.model('AuditTrail', auditTrailSchema);
