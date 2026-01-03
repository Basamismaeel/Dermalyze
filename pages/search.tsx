import { useState } from 'react'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface Product {
  id: string
  name: string
  category: string
  brand: {
    name: string
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-3">
            Search Products
          </h1>
          <p className="text-gray-600 text-lg">
            Find the perfect products for your skin
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-10 animate-bounce-in">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:animate-pulse">
              <svg className="h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-all duration-300 group-focus-within:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by product name or brand (e.g., CeraVe, La Roche-Posay)..."
                className="flex-1 pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg shadow-lg focus:scale-105 focus:shadow-xl"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 disabled:transform-none flex items-center gap-2 animate-pulse-glow hover:animate-wiggle"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Search</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {searched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loading ? (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600 font-medium">Searching products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try a different search term or check your spelling
                </p>
                <p className="text-sm text-gray-500">
                  Note: Products need to be added to the database first. This is a demo MVP.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4 font-medium">
                  Found {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
                <div className="grid gap-4">
                  {products.map((product, index) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="block bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 group animate-bounce-in hover-lift"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mb-3 font-medium">{product.brand.name}</p>
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200">
                            {product.category}
                          </span>
                        </div>
                        <div className="ml-4 flex items-center text-primary-600 group-hover:translate-x-1 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center border border-white/20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600">
              Enter a product name or brand to discover personalized recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

