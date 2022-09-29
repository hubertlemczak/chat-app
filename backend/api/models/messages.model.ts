import dbClient from '../../utils/dbClient';
import { HttpException } from '../errors';

export type TCreateMessage = {
  content: string;
  userId: string;
  conversationId: string;
};

const getAll = async () => {
  const data = await dbClient.message.findMany({});

  return data;
};

const getById = async (id: string) => {
  const data = await dbClient.message.findUnique({
    where: { id },
  });

  return data;
};

const createMessage = async ({
  content,
  userId,
  conversationId,
}: TCreateMessage) => {
  const data = await dbClient.message.create({
    data: {
      content,
      conversationId,
      userId,
    },
    include: {
      user: true,
    },
  });

  return data;
};

export default { getById, getAll, createMessage };
