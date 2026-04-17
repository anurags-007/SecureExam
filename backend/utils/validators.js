const CONSTANTS = require('../config/constants');

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - { isValid, errors }
 */
const validatePassword = (password) => {
  const errors = [];

  if (password.length < CONSTANTS.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${CONSTANTS.PASSWORD_MIN_LENGTH} characters`);
  }

  if (CONSTANTS.PASSWORD_REQUIREMENTS.uppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (CONSTANTS.PASSWORD_REQUIREMENTS.lowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (CONSTANTS.PASSWORD_REQUIREMENTS.numbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (CONSTANTS.PASSWORD_REQUIREMENTS.specialChars && !/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate role
 * @param {string} role - Role to validate
 * @returns {boolean} - True if valid
 */
const validateRole = (role) => {
  return Object.values(CONSTANTS.ROLES).includes(role);
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate file type
 * @param {string} fileName - File name to validate
 * @returns {boolean} - True if valid
 */
const validateFileType = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  return CONSTANTS.ALLOWED_FILE_TYPES.includes(extension);
};

/**
 * Validate file size
 * @param {number} fileSize - File size in bytes
 * @returns {boolean} - True if valid
 */
const validateFileSize = (fileSize) => {
  return fileSize <= CONSTANTS.FILE_SIZE_LIMIT;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateRole,
  sanitizeInput,
  validateFileType,
  validateFileSize,
};
