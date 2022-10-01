import dbClient from '../../utils/dbClient';

const getAll = async () => {
  const data = await dbClient.user.findMany({
    select: {
      username: true,
      id: true,
    },
  });

  return data;
};

const getById = async (id: string) => {
  const data = await dbClient.user.findUnique({
    where: { id },
    select: {
      username: true,
      id: true,
      chatrooms: {
        include: { conversation: true },
      },
    },
  });

  return data;
};

export default { getById, getAll };
