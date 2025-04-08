import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);
  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      username: 'admin',
      password,
      name: 'Admin Test',
    },
  });
}

main();
