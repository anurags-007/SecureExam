const crypto = require('crypto');

/**
 * Generate SHA-256 hash of content
 * @param {string|Buffer} content - Content to hash
 * @returns {string} - SHA-256 hash
 */
const generateHash = (content) => {
  try {
    const hash = crypto
      .createHash('sha256')
      .update(content)
      .digest('hex');
    return hash;
  } catch (error) {
    throw new Error(`Hash Generation Error: ${error.message}`);
  }
};

/**
 * Verify hash matches content
 * @param {string|Buffer} content - Content to verify
 * @param {string} hash - Hash to compare against
 * @returns {boolean} - True if hash matches
 */
const verifyHash = (content, hash) => {
  const generatedHash = generateHash(content);
  return generatedHash === hash;
};

/**
 * Generate random unique key (for MFA)
 * @returns {string} - Random unique key
 */
const generateUniqueKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateHash,
  verifyHash,
  generateUniqueKey,
};
