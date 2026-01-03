import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { prisma } from '@/lib/prisma'
import { evaluateProduct } from '@/lib/evaluation'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id } = req.query

    // Get user profile
    const profile = await prisma.userSkinProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      return res.status(400).json({
        error: 'Please complete your skin profile first',
      })
    }

    // Evaluate product
    const evaluation = await evaluateProduct(id as string, {
      skinType: profile.skinType,
      concerns: profile.concerns,
      ingredientsToAvoid: profile.ingredientsToAvoid,
      allergies: profile.allergies,
    })

    // Save evaluation
    const savedEvaluation = await prisma.productEvaluation.upsert({
      where: {
        productId_userId: {
          productId: id as string,
          userId: session.user.id,
        },
      },
      update: {
        verdict: evaluation.verdict,
        reasoning: evaluation.reasoning,
        goodFor: evaluation.goodFor,
        cautionFor: evaluation.cautionFor,
        notRecommendedFor: evaluation.notRecommendedFor,
      },
      create: {
        productId: id as string,
        userId: session.user.id,
        verdict: evaluation.verdict,
        reasoning: evaluation.reasoning,
        goodFor: evaluation.goodFor,
        cautionFor: evaluation.cautionFor,
        notRecommendedFor: evaluation.notRecommendedFor,
      },
    })

    return res.json(savedEvaluation)
  } catch (error) {
    console.error('Error evaluating product:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

