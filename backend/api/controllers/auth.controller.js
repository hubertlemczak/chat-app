const { compareStringToHash, signToken } = require('../../auth/index.js');
const prisma = require('../../utils/prisma.js');
const models = require('../models/auth.model.js');

const login = async (req, res) => {
  const user = await validateCredentials(req.body);
  const token = await signToken(user);

  res.status(200).json({ token });
};

const validateCredentials = async ({ username, email, password }) => {
  if (!(username || email) || !password) {
    throw Error('Missing fields in request body');
  }

  const user = await prisma.user.findUnique({ where: { username, email } });

  const isValid = await compareStringToHash(password, user?.password);
  if (!isValid) {
    throw Error('Invalid credentials');
  }
  return { id: user.id, username: user.username, email: user.email };
};

module.exports = { login };
