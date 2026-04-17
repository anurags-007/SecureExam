const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    questionId: String,
    text: String,
    marks: Number,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
    },
    questionType: {
      type: String,
      enum: ['mcq', 'short', 'essay'],
    },
    options: [String],
    correctAnswer: String,
  },
  { _id: true }
);

const examPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: String,
    
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },

    subject: {
      type: String,
      required: true,
    },

    class: String,

    totalMarks: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },

    questions: [questionSchema],

    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },

    version: {
      type: Number,
      default: 1,
    },

    // Encryption and security
    encryptedContent: {
      iv: String,
      encryptedData: String,
    },

    fileHash: {
      type: String,
      unique: true,
      sparse: true,
    },

    blockchainHash: {
      type: String,
      default: null,
    },

    watermark: {
      userId: String,
      timestamp: Date,
      identifier: String,
    },

    // Access control
    accessibleFrom: Date,
    accessibleUntil: Date,

    // Distribution settings
    allowDownload: {
      type: Boolean,
      default: false,
    },

    downloadLimit: {
      type: Number,
      default: 1,
    },

    currentDownloads: {
      type: Number,
      default: 0,
    },

    isRandomized: {
      type: Boolean,
      default: false,
    },

    randomSeed: String,

    // Revisions/Version control
    revisions: [
      {
        version: Number,
        changes: String,
        changedBy: mongoose.Schema.ObjectId,
        changedAt: Date,
      },
    ],

    publicFile: {
      path: String,
      fileName: String,
    },

    fileAttachment: {
      path: String,
      originalName: String,
      mimeType: String,
      size: Number,
    },
  },
  { timestamps: true }
);

// Index for faster queries
examPaperSchema.index({ createdBy: 1, status: 1 });
examPaperSchema.index({ subject: 1 });

module.exports = mongoose.model('ExamPaper', examPaperSchema);
