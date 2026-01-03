import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
      } as any,
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return res.status(201).json({
      message: 'User created successfully',
      user,
    })
  } catch (error: any) {
    console.error('Error creating user:', error)
    
    // Provide more specific error messages
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'User with this email already exists' })
    }
    
    if (error.code === 'P1001' || error.message?.includes('connect')) {
      return res.status(500).json({ error: 'Database connection error. Please check your database configuration.' })
    }
    
    // In development, show more details
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error.message || String(error)
      })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

