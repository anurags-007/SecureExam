const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    paperIds: {
      type: [mongoose.Schema.ObjectId],
      ref: 'ExamPaper',
    },

    action: {
      type: String,
      enum: ['viewed', 'downloaded', 'created', 'updated', 'deleted', 'attempted', 'uploaded'],
      required: true,
    },

    resourceType: {
      type: String,
      enum: ['exam_paper', 'user', 'access_log'],
    },

    ipAddress: String,

    userAgent: String,

    details: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ['success', 'failed', 'suspicious'],
      default: 'success',
    },

    sessionId: String,

    duration: Number, // in seconds

    location: {
      country: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
  },
  { timestamps: true }
);

// Index for efficient querying
accessLogSchema.index({ userId: 1, createdAt: -1 });
accessLogSchema.index({ action: 1, createdAt: -1 });
accessLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AccessLog', accessLogSchema);
