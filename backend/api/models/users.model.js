const prisma = require('../../utils/prisma');

const getAll = async () => {
  const data = await prisma.user.findMany();
  return data;
};

module.exports = { getAll };
