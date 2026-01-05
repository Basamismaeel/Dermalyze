import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client optimized for serverless
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// In development, reuse the same instance
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Don't connect on module load - let it connect lazily when needed
// This is better for serverless environments

export default prisma
