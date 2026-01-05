import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {},
  }

  // Check environment variables
  diagnostics.checks.env = {
    DATABASE_URL: {
      exists: !!process.env.DATABASE_URL,
      length: process.env.DATABASE_URL?.length || 0,
      startsWith: process.env.DATABASE_URL?.substring(0, 12) || 'N/A',
    },
    NEXTAUTH_SECRET: {
      exists: !!process.env.NEXTAUTH_SECRET,
      length: process.env.NEXTAUTH_SECRET?.length || 0,
    },
    NEXTAUTH_URL: {
      exists: !!process.env.NEXTAUTH_URL,
      value: process.env.NEXTAUTH_URL || 'N/A',
    },
  }

  // Test database connection
  try {
    await prisma.$connect()
    diagnostics.checks.database = {
      connected: true,
      userCount: await prisma.user.count(),
      canQuery: true,
    }
  } catch (error: any) {
    diagnostics.checks.database = {
      connected: false,
      error: error.message,
      code: error.code,
      canQuery: false,
    }
  }

  // Test Prisma client
  try {
    const testQuery = await prisma.$queryRaw`SELECT 1 as test`
    diagnostics.checks.prisma = {
      working: true,
      testQuery: 'success',
    }
  } catch (error: any) {
    diagnostics.checks.prisma = {
      working: false,
      error: error.message,
    }
  }

  // Overall status
  const allChecksPass = 
    diagnostics.checks.env.DATABASE_URL.exists &&
    diagnostics.checks.env.NEXTAUTH_SECRET.exists &&
    diagnostics.checks.database.connected &&
    diagnostics.checks.prisma.working

  diagnostics.status = allChecksPass ? 'healthy' : 'unhealthy'
  diagnostics.recommendations = []

  if (!diagnostics.checks.env.DATABASE_URL.exists) {
    diagnostics.recommendations.push('Set DATABASE_URL in environment variables')
  }
  if (!diagnostics.checks.env.NEXTAUTH_SECRET.exists) {
    diagnostics.recommendations.push('Set NEXTAUTH_SECRET in environment variables')
  }
  if (!diagnostics.checks.database.connected) {
    diagnostics.recommendations.push('Check database connection string and network access')
  }

  return res.status(allChecksPass ? 200 : 500).json(diagnostics)
}

