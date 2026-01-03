'use client'

interface Ingredient {
  id: string
  inciName: string
  commonName: string | null
  function: string | null
  description: string | null
  isIrritant: boolean
  isComedogenic: boolean
  comedogenicRating: number | null
  isAllergen: boolean
  isFragrance: boolean
  isAlcohol: boolean
  isSulfate: boolean
  isParaben: boolean
  riskLevel: string
}

interface IngredientListProps {
  ingredients: Array<{
    ingredient: Ingredient
    order: number
    concentration?: string | null
  }>
}

export function IngredientList({ ingredients }: IngredientListProps) {
  const getRiskBadge = (ingredient: Ingredient) => {
    const badges = []
    if (ingredient.isFragrance) badges.push({ label: 'Fragrance', color: 'bg-yellow-100 text-yellow-800' })
    if (ingredient.isAlcohol) badges.push({ label: 'Alcohol', color: 'bg-orange-100 text-orange-800' })
    if (ingredient.isSulfate) badges.push({ label: 'Sulfate', color: 'bg-orange-100 text-orange-800' })
    if (ingredient.isParaben) badges.push({ label: 'Paraben', color: 'bg-purple-100 text-purple-800' })
    if (ingredient.isIrritant) badges.push({ label: 'Irritant', color: 'bg-red-100 text-red-800' })
    if (ingredient.isComedogenic && ingredient.comedogenicRating && ingredient.comedogenicRating >= 3) {
      badges.push({ label: `Comedogenic (${ingredient.comedogenicRating})`, color: 'bg-red-100 text-red-800' })
    }
    return badges
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Ingredients</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-4">
          Ingredients are listed in order of concentration (highest to lowest)
        </p>
        <div className="space-y-3">
          {ingredients.map((item, idx) => {
            const badges = getRiskBadge(item.ingredient)
            return (
              <div
                key={item.ingredient.id}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-500">
                        #{idx + 1}
                      </span>
                      <h4 className="font-semibold text-gray-900">
                        {item.ingredient.commonName || item.ingredient.inciName}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 italic">
                      {item.ingredient.inciName}
                    </p>
                    {item.ingredient.function && (
                      <p className="text-sm text-gray-600 mt-1">
                        Function: {item.ingredient.function}
                      </p>
                    )}
                    {item.ingredient.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {item.ingredient.description}
                      </p>
                    )}
                  </div>
                </div>
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {badges.map((badge, badgeIdx) => (
                      <span
                        key={badgeIdx}
                        className={`text-xs px-2 py-1 rounded ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

