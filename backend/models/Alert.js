const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    alertType: {
      type: String,
      enum: ['unauthorized_access', 'multiple_failed_attempts', 'data_breach', 'suspicious_activity'],
      required: true,
    },

    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    relatedPaperId: {
      type: mongoose.Schema.ObjectId,
      ref: 'ExamPaper',
      default: null,
    },

    metadata: mongoose.Schema.Types.Mixed,

    read: {
      type: Boolean,
      default: false,
    },

    readAt: Date,

    actionTaken: {
      type: String,
      default: null,
    },

    resolvedAt: Date,
  },
  { timestamps: true }
);

// Index for queries
alertSchema.index({ userId: 1, read: 1, createdAt: -1 });
alertSchema.index({ severity: 1, createdAt: -1 });
alertSchema.index({ alertType: 1 });

module.exports = mongoose.model('Alert', alertSchema);
