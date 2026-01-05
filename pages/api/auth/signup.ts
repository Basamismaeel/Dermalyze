import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

// Validation schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long').optional(),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    })
  }

  try {
    // Ensure database connection
    await prisma.$connect()

    // Validate request body
    const validationResult = signupSchema.safeParse(req.body)
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: firstError.message,
        field: firstError.path[0]
      })
    }

    const { name, email, password } = validationResult.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true }
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists',
        message: 'An account with this email already exists. Please sign in instead.'
      })
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        image: true,
        createdAt: true,
      },
    })

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    })

  } catch (error: any) {
    console.error('[SIGNUP API] Error:', error)
    console.error('[SIGNUP API] Error code:', error.code)
    console.error('[SIGNUP API] Error message:', error.message)
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: 'Duplicate entry',
        message: 'An account with this email already exists.'
      })
    }
    
    // Database connection errors
    if (error.code === 'P1001' || 
        error.code === 'P1000' ||
        error.message?.includes('connect') || 
        error.message?.includes('DATABASE_URL') ||
        error.message?.includes('Environment variable') ||
        error.message?.includes('Can\'t reach database')) {
      return res.status(503).json({
        success: false,
        error: 'Database connection error',
        message: 'Unable to connect to database. Please check your database configuration.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
    
    // Prisma client errors
    if (error.message?.includes('PrismaClient')) {
      return res.status(503).json({
        success: false,
        error: 'Database initialization error',
        message: 'Database client failed to initialize. Please check your database connection.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
    
    // Generic error response
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'An unexpected error occurred. Please try again.',
      code: error.code || 'UNKNOWN'
    })
  } finally {
    // Don't disconnect in serverless - let Prisma handle connection pooling
    // await prisma.$disconnect()
  }
}
