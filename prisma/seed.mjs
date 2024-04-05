import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('stockmate', 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@stockmate.com' },
    update: {},
    create: {
      email: 'admin@stockmate.com',
      username: 'stockmate',
      password,
      role: 'admin',
    },
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
