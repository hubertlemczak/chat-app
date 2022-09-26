const { hashStr } = require('../auth');
const prisma = require('../utils/prisma');

async function main() {
  const password = await hashStr('123');

  const user1 = await prisma.user.create({
    data: {
      username: 'User 1',
      email: 'user1@gmail.com',
      password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'User 2',
      email: 'user2@gmail.com',
      password,
    },
  });

  const convo = await prisma.conversation.create({
    data: {
      name: 'Convo 1',
      chatrooms: {
        createMany: {
          data: [{ userId: user1.id }, { userId: user2.id }],
        },
      },
      messages: {
        createMany: {
          data: [
            {
              content: 'Huss 1',
              userId: user1.id,
            },
            {
              content: 'Huss 2',
              userId: user2.id,
            },
          ],
        },
      },
    },
    include: {
      chatrooms: true,
      messages: true,
    },
  });

  console.log(JSON.stringify({ user1, user2, convo }, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
