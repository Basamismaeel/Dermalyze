import { PrismaClient, SkinType, Verdict, RiskLevel } from '@prisma/client'
import { prisma } from './prisma'

export interface UserProfile {
  skinType: SkinType
  concerns: string[]
  ingredientsToAvoid: string[]
  allergies: string[]
}

export interface IngredientInfo {
  id: string
  inciName: string
  commonName: string | null
  isIrritant: boolean
  isComedogenic: boolean
  comedogenicRating: number | null
  isAllergen: boolean
  isFragrance: boolean
  isAlcohol: boolean
  isSulfate: boolean
  isParaben: boolean
  riskLevel: RiskLevel
  warnings: Array<{
    skinType: SkinType | null
    concern: string | null
    warning: string
    severity: RiskLevel
  }>
}

export interface EvaluationResult {
  verdict: Verdict
  reasoning: string[]
  goodFor: string[]
  cautionFor: string[]
  notRecommendedFor: string[]
}

/**
 * Personalized evaluation engine - rules-based system
 * Evaluates a product based on user profile and ingredients
 */
export async function evaluateProduct(
  productId: string,
  userProfile: UserProfile
): Promise<EvaluationResult> {
  // Fetch product with all ingredients
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
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
    },
  })

  if (!product) {
    throw new Error('Product not found')
  }

  const reasoning: string[] = []
  const goodFor: string[] = []
  const cautionFor: string[] = []
  const notRecommendedFor: string[] = []

  // Check each ingredient against user profile
  for (const productIngredient of product.ingredients) {
    const ingredient = productIngredient.ingredient

    // Check if ingredient is in user's avoid list
    if (
      userProfile.ingredientsToAvoid.some(
        (avoid) =>
          avoid.toLowerCase() === ingredient.inciName.toLowerCase() ||
          (ingredient.commonName &&
            avoid.toLowerCase() === ingredient.commonName.toLowerCase())
      )
    ) {
      notRecommendedFor.push(
        `Contains ${ingredient.commonName || ingredient.inciName}, which you've marked to avoid`
      )
      reasoning.push(
        `You've indicated you want to avoid ${ingredient.commonName || ingredient.inciName}`
      )
      continue
    }

    // Check allergies
    if (
      userProfile.allergies.some(
        (allergy) =>
          allergy.toLowerCase() === ingredient.inciName.toLowerCase() ||
          (ingredient.commonName &&
            allergy.toLowerCase() === ingredient.commonName.toLowerCase())
      )
    ) {
      notRecommendedFor.push(
        `Contains ${ingredient.commonName || ingredient.inciName}, which you're allergic to`
      )
      reasoning.push(
        `This product contains ${ingredient.commonName || ingredient.inciName}, which you're allergic to`
      )
      continue
    }

    // Check fragrance for sensitive skin
    if (ingredient.isFragrance && userProfile.skinType === SkinType.SENSITIVE) {
      cautionFor.push(
        'Contains fragrance, which may irritate sensitive skin'
      )
      reasoning.push(
        'Fragrance can cause irritation for sensitive skin types'
      )
    }

    // Check alcohol for dry skin
    if (ingredient.isAlcohol && userProfile.skinType === SkinType.DRY) {
      cautionFor.push(
        'Contains alcohol, which may be drying for dry skin'
      )
      reasoning.push(
        'Alcohol can be drying and may worsen dry skin concerns'
      )
    }

    // Check comedogenic rating for acne-prone skin
    if (
      ingredient.isComedogenic &&
      ingredient.comedogenicRating &&
      ingredient.comedogenicRating >= 3 &&
      userProfile.concerns.includes('acne')
    ) {
      cautionFor.push(
        `Contains ${ingredient.commonName || ingredient.inciName}, which has a high comedogenic rating (${ingredient.comedogenicRating})`
      )
      reasoning.push(
        `High comedogenic ingredients (rating ${ingredient.comedogenicRating}) may clog pores and worsen acne`
      )
    }

    // Check irritants for sensitive skin
    if (ingredient.isIrritant && userProfile.skinType === SkinType.SENSITIVE) {
      cautionFor.push(
        `Contains ${ingredient.commonName || ingredient.inciName}, a known irritant`
      )
      reasoning.push(
        `This ingredient is known to cause irritation, especially for sensitive skin`
      )
    }

    // Check specific warnings for user's skin type and concerns
    for (const warning of ingredient.warnings) {
      if (
        (warning.skinType === userProfile.skinType || !warning.skinType) &&
        (!warning.concern || userProfile.concerns.includes(warning.concern))
      ) {
        if (warning.severity === RiskLevel.HIGH) {
          notRecommendedFor.push(warning.warning)
        } else {
          cautionFor.push(warning.warning)
        }
        reasoning.push(warning.warning)
      }
    }

    // Check sulfates for sensitive or dry skin
    if (
      ingredient.isSulfate &&
      (userProfile.skinType === SkinType.SENSITIVE ||
        userProfile.skinType === SkinType.DRY)
    ) {
      cautionFor.push(
        'Contains sulfates, which may be harsh for sensitive or dry skin'
      )
      reasoning.push(
        'Sulfates can strip natural oils and cause irritation'
      )
    }
  }

  // Determine overall verdict
  let verdict: Verdict = Verdict.SUITABLE

  if (notRecommendedFor.length > 0) {
    verdict = Verdict.NOT_RECOMMENDED
  } else if (cautionFor.length > 0) {
    verdict = Verdict.CAUTION
  }

  // Add positive notes if suitable
  if (verdict === Verdict.SUITABLE) {
    goodFor.push('No major concerns identified for your skin type')
    if (userProfile.concerns.length > 0) {
      goodFor.push(
        `May help address your concerns: ${userProfile.concerns.join(', ')}`
      )
    }
  }

  return {
    verdict,
    reasoning: [...new Set(reasoning)], // Remove duplicates
    goodFor: [...new Set(goodFor)],
    cautionFor: [...new Set(cautionFor)],
    notRecommendedFor: [...new Set(notRecommendedFor)],
  }
}

