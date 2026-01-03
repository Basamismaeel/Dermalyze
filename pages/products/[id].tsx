import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { EvaluationDisplay } from '@/components/EvaluationDisplay'
import { IngredientList } from '@/components/IngredientList'
import { Verdict } from '@prisma/client'

interface Product {
  id: string
  name: string
  category: string
  description: string | null
  imageUrl: string | null
  brand: {
    name: string
  }
  ingredients: Array<{
    ingredient: any
    order: number
    concentration: string | null
  }>
  affiliateLinks: Array<{
    id: string
    platform: string
    url: string
  }>
}

interface Evaluation {
  verdict: Verdict
  goodFor: string[]
  cautionFor: string[]
  notRecommendedFor: string[]
  reasoning: string[]
}

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const productId = id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [loading, setLoading] = useState(true)
  const [evaluating, setEvaluating] = useState(false)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEvaluate = async () => {
    setEvaluating(true)
    try {
      const response = await fetch(`/api/products/${productId}/evaluate`, {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        setEvaluation(data)
      } else if (response.status === 400) {
        const data = await response.json()
        alert(data.error || 'Please complete your skin profile first')
      }
    } catch (error) {
      console.error('Error evaluating product:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setEvaluating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{product.brand.name}</p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {product.category}
              </span>
              {product.description && (
                <p className="text-gray-600 mt-4">{product.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Evaluation Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Personalized Evaluation
            </h2>
            {!evaluation && (
              <button
                onClick={handleEvaluate}
                disabled={evaluating}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                {evaluating ? 'Evaluating...' : 'Evaluate for Me'}
              </button>
            )}
          </div>

          {evaluation ? (
            <EvaluationDisplay
              verdict={evaluation.verdict}
              goodFor={evaluation.goodFor}
              cautionFor={evaluation.cautionFor}
              notRecommendedFor={evaluation.notRecommendedFor}
              reasoning={evaluation.reasoning}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Click "Evaluate for Me" to get a personalized assessment</p>
            </div>
          )}
        </div>

        {/* Ingredients */}
        {product.ingredients.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <IngredientList ingredients={product.ingredients} />
          </div>
        )}

        {/* Affiliate Links */}
        {product.affiliateLinks.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Where to Buy
            </h3>
            <div className="space-y-2">
              {product.affiliateLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="font-medium text-gray-900">
                    Buy on {link.platform}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">(affiliate link)</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

