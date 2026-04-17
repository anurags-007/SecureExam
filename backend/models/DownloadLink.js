const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const downloadLinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },

    paperId: {
      type: mongoose.Schema.ObjectId,
      ref: 'ExamPaper',
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    validUntil: {
      type: Date,
      required: true,
    },

    downloaded: {
      type: Boolean,
      default: false,
    },

    downloadedAt: Date,

    downloadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },

    usageCount: {
      type: Number,
      default: 0,
    },

    maxUsage: {
      type: Number,
      default: 1,
    },

    ipAddress: String,

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  },
  { timestamps: true }
);

// Index for efficient lookup
downloadLinkSchema.index({ link: 1 });
downloadLinkSchema.index({ paperId: 1 });
downloadLinkSchema.index({ validUntil: 1 });

// TTL index to auto-delete expired links
downloadLinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('DownloadLink', downloadLinkSchema);
