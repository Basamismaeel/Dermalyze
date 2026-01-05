import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Test database connection
    await prisma.$connect()
    const userCount = await prisma.user.count()
    
    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      userCount,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      }
    })
  } catch (error: any) {
    console.error('[TEST] Error:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown error',
      code: error.code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}

