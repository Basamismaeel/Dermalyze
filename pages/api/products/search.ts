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
    const query = (req.query.q as string) || ''
    const limit = parseInt((req.query.limit as string) || '20')
    const offset = parseInt((req.query.offset as string) || '0')

    if (!query) {
      return res.json({ products: [], total: 0 })
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { brand: { name: { contains: query, mode: 'insensitive' } } },
        ],
      },
      include: {
        brand: true,
      },
      take: limit,
      skip: offset,
      orderBy: {
        name: 'asc',
      },
    })

    const total = await prisma.product.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { brand: { name: { contains: query, mode: 'insensitive' } } },
        ],
      },
    })

    return res.json({ products, total })
  } catch (error) {
    console.error('Error searching products:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

