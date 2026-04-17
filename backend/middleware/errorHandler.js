const { v4: uuidv4 } = require('uuid');

/**
 * Middleware to add request ID and session ID
 */
const requestLogger = (req, res, next) => {
  req.id = uuidv4();
  req.sessionId = req.headers['x-session-id'] || uuidv4();
  req.timestamp = new Date();

  console.log(`[${req.timestamp.toISOString()}] ${req.id}: ${req.method} ${req.path}`);

  res.on('finish', () => {
    const duration = new Date() - req.timestamp;
    console.log(`[${req.id}] Response: ${res.statusCode} (${duration}ms)`);
  });

  next();
};

/**
 * Middleware to sanitize inputs
 */
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    } else if (typeof obj === 'object' && obj !== null) {
      for (let key in obj) {
        obj[key] = sanitize(obj[key]);
      }
    }
    return obj;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  next();
};

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.id}:`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    requestId: req.id,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  requestLogger,
  sanitizeInput,
  errorHandler,
};
