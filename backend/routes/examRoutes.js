const express = require('express');
const examPaperController = require('../controllers/examPaperController');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All exam routes require authentication
router.use(authenticate);

// Create exam paper (Faculty and Admin only)
router.post('/', authorize('faculty', 'admin'), examPaperController.createExamPaper);

// Upload exam paper file
router.post('/upload', authorize('faculty', 'admin'), upload.single('paper'), examPaperController.uploadExamPaper);

// Get all exam papers
router.get('/', examPaperController.listExamPapers);

// Get specific exam paper
router.get('/:paperId', examPaperController.getExamPaper);

// Download exam paper file
router.get('/:paperId/download', examPaperController.downloadExamFile);

// Update exam paper (Only creator)
router.put('/:paperId', examPaperController.updateExamPaper);

// Publish exam paper (Only creator)
router.post('/:paperId/publish', examPaperController.publishExamPaper);

// Archive exam paper (Admin only)
router.post('/:paperId/archive', authorize('admin'), examPaperController.archiveExamPaper);

module.exports = router;
