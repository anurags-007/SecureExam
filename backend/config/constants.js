module.exports = {
  ROLES: {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    REVIEWER: 'reviewer',
  },
  
  EXAM_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
  },

  ACCESS_ACTION: {
    VIEWED: 'viewed',
    DOWNLOADED: 'downloaded',
    CREATED: 'created',
    UPDATED: 'updated',
    DELETED: 'deleted',
  },

  ALERT_TYPES: {
    UNAUTHORIZED_ACCESS: 'unauthorized_access',
    MULTIPLE_ATTEMPTS: 'multiple_failed_attempts',
    DATA_BREACH: 'data_breach',
    SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  },

  ENCRYPTION_ALGORITHM: 'aes-256-cbc',
  JWT_EXPIRY: '7d',
  REFRESH_TOKEN_EXPIRY: '30d',
  
  FILE_SIZE_LIMIT: 50 * 1024 * 1024, // 50MB
  ALLOWED_FILE_TYPES: ['pdf', 'doc', 'docx', 'txt'],
  
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },

  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIREMENTS: {
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialChars: true,
  },
};
