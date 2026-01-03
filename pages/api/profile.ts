import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '@/lib/prisma'
import { SkinType } from '@prisma/client'

// GET user profile
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session?.user?.id) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const profile = await prisma.userSkinProfile.findUnique({
        where: { userId: session.user.id },
      })

      return res.json(profile)
    } catch (error) {
      console.error('Error fetching profile:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session?.user?.id) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const { skinType, concerns, ingredientsToAvoid, allergies } = req.body

      if (!skinType || !Object.values(SkinType).includes(skinType)) {
        return res.status(400).json({ error: 'Valid skin type is required' })
      }

      const profile = await prisma.userSkinProfile.upsert({
        where: { userId: session.user.id },
        update: {
          skinType: skinType as SkinType,
          concerns: concerns || [],
          ingredientsToAvoid: ingredientsToAvoid || [],
          allergies: allergies || [],
        },
        create: {
          userId: session.user.id,
          skinType: skinType as SkinType,
          concerns: concerns || [],
          ingredientsToAvoid: ingredientsToAvoid || [],
          allergies: allergies || [],
        },
      })

      return res.json(profile)
    } catch (error) {
      console.error('Error creating/updating profile:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

