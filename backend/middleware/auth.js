const { verifyToken } = require('../utils/generateToken');
const CONSTANTS = require('../config/constants');

/**
 * Middleware to authenticate JWT token
 */
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Middleware to check user role
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

/**
 * Middleware to verify unique key (MFA)
 */
const verifyUniqueKey = (req, res, next) => {
  const uniqueKey = req.headers['x-unique-key'] || req.body.uniqueKey;

  if (!uniqueKey) {
    return res.status(400).json({ error: 'Unique key required' });
  }

  req.uniqueKey = uniqueKey;
  next();
};

module.exports = {
  authenticate,
  authorize,
  verifyUniqueKey,
};
