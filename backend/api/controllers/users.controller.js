const models = require('../models/users.model.js');

const getAll = async (req, res) => {
  const users = await models.getAll();
  res.status(200).json({ users });
};

module.exports = { getAll };
