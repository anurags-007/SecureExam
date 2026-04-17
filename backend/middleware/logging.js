/**
 * Middleware to get client IP address
 */
const getClientIp = (req, res, next) => {
  req.clientIp =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress ||
    'UNKNOWN';

  // Handle IPv6 loopback
  if (req.clientIp === '::1') {
    req.clientIp = '127.0.0.1';
  }

  next();
};

/**
 * Middleware to get user agent
 */
const getUserAgent = (req, res, next) => {
  req.userAgent = req.headers['user-agent'] || 'UNKNOWN';
  next();
};

module.exports = {
  getClientIp,
  getUserAgent,
};
