const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secret-key-min-32-characters-long-1234567890ab';
const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypt data using AES-256-CBC
 * @param {string} data - Data to encrypt
 * @returns {object} - { iv, encryptedData }
 */
const encrypt = (data) => {
  try {
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').substring(0, 32));
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(typeof data === 'string' ? data : JSON.stringify(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  } catch (error) {
    throw new Error(`Encryption Error: ${error.message}`);
  }
};

/**
 * Decrypt data using AES-256-CBC
 * @param {object} data - { iv, encryptedData }
 * @returns {string} - Decrypted data
 */
const decrypt = (data) => {
  try {
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').substring(0, 32));
    const iv = Buffer.from(data.iv, 'hex');
    const encryptedText = Buffer.from(data.encryptedData, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error(`Decryption Error: ${error.message}`);
  }
};

/**
 * Encrypt file content
 * @param {Buffer} fileBuffer - File buffer
 * @returns {object} - { iv, encryptedData }
 */
const encryptFile = (fileBuffer) => {
  try {
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').substring(0, 32));
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(fileBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  } catch (error) {
    throw new Error(`File Encryption Error: ${error.message}`);
  }
};

/**
 * Decrypt file content
 * @param {object} data - { iv, encryptedData }
 * @returns {Buffer} - Decrypted file buffer
 */
const decryptFile = (data) => {
  try {
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').substring(0, 32));
    const iv = Buffer.from(data.iv, 'hex');
    const encryptedText = Buffer.from(data.encryptedData, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted;
  } catch (error) {
    throw new Error(`File Decryption Error: ${error.message}`);
  }
};

module.exports = {
  encrypt,
  decrypt,
  encryptFile,
  decryptFile,
};
