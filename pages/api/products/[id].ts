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
    const { id } = req.query
    const product = await prisma.product.findUnique({
      where: { id: id as string },
      include: {
        brand: true,
        ingredients: {
          include: {
            ingredient: {
              include: {
                warnings: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        affiliateLinks: {
          where: { isActive: true },
        },
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    return res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

