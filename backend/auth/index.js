require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const signToken = (data, opts) => {
  return jwt.sign(data, JWT_SECRET, opts);
};

const hashStr = async str => {
  try {
    return await bcrypt.hash(str, 10);
  } catch (err) {
    console.error('[HASHSTR]', err);
    return false;
  }
};

const compareStringToHash = async (str, hash) => {
  try {
    return await bcrypt.compare(str, hash);
  } catch (err) {
    console.error('[COMPAREHASH]', err);
    return false;
  }
};

module.exports = {
  signToken,
  hashStr,
  compareStringToHash,
};
