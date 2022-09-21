const { hashStr } = require('../auth');
const prisma = require('../utils/prisma');

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'User 1',
        email: 'user1@gmail.com',
        password: await hashStr('123'),
      },
      {
        username: 'User 2',
        email: 'user2@gmail.com',
        password: await hashStr('123'),
      },
    ],
  });
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
