import { useState } from 'react'
import { useRouter } from 'next/router'
import { SkinType } from '@prisma/client'
import { Toast } from '@/components/Toast'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const SKIN_TYPES = [
  { value: SkinType.OILY, label: 'Oily' },
  { value: SkinType.DRY, label: 'Dry' },
  { value: SkinType.COMBINATION, label: 'Combination' },
  { value: SkinType.SENSITIVE, label: 'Sensitive' },
  { value: SkinType.NORMAL, label: 'Normal' },
]

const CONCERNS = [
  'acne',
  'sensitivity',
  'dryness',
  'redness',
  'hyperpigmentation',
  'fine lines',
  'dark spots',
  'uneven texture',
]

const COMMON_INGREDIENTS_TO_AVOID = [
  'fragrance',
  'alcohol',
  'sulfates',
  'parabens',
  'retinol',
  'AHA',
  'BHA',
]

export default function OnboardingPage() {
  const router = useRouter()
  const [skinType, setSkinType] = useState<SkinType | ''>('')
  const [concerns, setConcerns] = useState<string[]>([])
  const [ingredientsToAvoid, setIngredientsToAvoid] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [customAllergy, setCustomAllergy] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false,
  })

  const toggleConcern = (concern: string) => {
    setConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    )
  }

  const toggleIngredient = (ingredient: string) => {
    setIngredientsToAvoid((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  const addAllergy = () => {
    if (customAllergy.trim() && !allergies.includes(customAllergy.trim())) {
      setAllergies([...allergies, customAllergy.trim()])
      setCustomAllergy('')
    }
  }

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter((a) => a !== allergy))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!skinType) return

    setLoading(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skinType,
          concerns,
          ingredientsToAvoid,
          allergies,
        }),
      })

      if (response.ok) {
        setToast({ message: 'Profile saved successfully!', type: 'success', isVisible: true })
        setTimeout(() => {
          router.push('/search')
        }, 1000)
      } else {
        setToast({ message: 'Failed to save profile. Please try again.', type: 'error', isVisible: true })
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      setToast({ message: 'An error occurred. Please try again.', type: 'error', isVisible: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl mb-6 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-3">
            Create Your Skin Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Help us personalize product recommendations for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 space-y-10 border border-white/20">
          {/* Skin Type */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              What's your skin type? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {SKIN_TYPES.map((type, index) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSkinType(type.value)}
                  className={`px-4 py-4 rounded-xl border-2 font-medium transition-all duration-300 transform animate-bounce-in ${
                    skinType === type.value
                      ? 'border-primary-600 bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700 shadow-lg scale-110 animate-pulse-glow'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 hover:scale-105 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Concerns */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are your main skin concerns? (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map((concern) => (
                <button
                  key={concern}
                  type="button"
                  onClick={() => toggleConcern(concern)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    concerns.includes(concern)
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-600'
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients to Avoid */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ingredients you want to avoid (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_INGREDIENTS_TO_AVOID.map((ingredient) => (
                <button
                  key={ingredient}
                  type="button"
                  onClick={() => toggleIngredient(ingredient)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    ingredientsToAvoid.includes(ingredient)
                      ? 'bg-red-100 text-red-700 border-2 border-red-600'
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Known allergies or sensitivities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={customAllergy}
                onChange={(e) => setCustomAllergy(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addAllergy()
                  }
                }}
                placeholder="Enter ingredient name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addAllergy}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            {allergies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeAllergy(allergy)}
                      className="hover:text-red-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This information is used to personalize
              product recommendations. It's stored securely and only used for
              your evaluations.
            </p>
          </div>

          <button
            type="submit"
            disabled={!skinType || loading}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Saving Profile...
              </>
            ) : (
              <>
                Save Profile & Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  )
}

