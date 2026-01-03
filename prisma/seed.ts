import { PrismaClient, SkinType, ProductCategory, RiskLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create sample brands
  const cerave = await prisma.brand.upsert({
    where: { name: 'CeraVe' },
    update: {},
    create: {
      name: 'CeraVe',
      description: 'Dermatologist-developed skincare',
      website: 'https://www.cerave.com',
    },
  })

  const laRoche = await prisma.brand.upsert({
    where: { name: 'La Roche-Posay' },
    update: {},
    create: {
      name: 'La Roche-Posay',
      description: 'French pharmacy skincare brand',
      website: 'https://www.laroche-posay.us',
    },
  })

  // Create sample ingredients
  const hyaluronicAcid = await prisma.ingredient.upsert({
    where: { inciName: 'Hyaluronic Acid' },
    update: {},
    create: {
      inciName: 'Hyaluronic Acid',
      commonName: 'Hyaluronic Acid',
      function: 'Humectant',
      description: 'A powerful hydrating ingredient that can hold up to 1000 times its weight in water. Generally safe for all skin types.',
      isIrritant: false,
      isComedogenic: false,
      comedogenicRating: 0,
      isAllergen: false,
      riskLevel: RiskLevel.LOW,
    },
  })

  const niacinamide = await prisma.ingredient.upsert({
    where: { inciName: 'Niacinamide' },
    update: {},
    create: {
      inciName: 'Niacinamide',
      commonName: 'Niacinamide',
      function: 'Antioxidant, Skin Conditioning',
      description: 'A form of vitamin B3 that helps reduce inflammation, minimize pores, and improve skin texture. Generally well-tolerated.',
      isIrritant: false,
      isComedogenic: false,
      comedogenicRating: 0,
      isAllergen: false,
      riskLevel: RiskLevel.LOW,
    },
  })

  const fragrance = await prisma.ingredient.upsert({
    where: { inciName: 'Fragrance' },
    update: {},
    create: {
      inciName: 'Fragrance',
      commonName: 'Fragrance',
      function: 'Fragrance',
      description: 'A blend of synthetic or natural ingredients used to add scent. Can cause irritation, especially for sensitive skin.',
      isIrritant: true,
      isComedogenic: false,
      isAllergen: true,
      isFragrance: true,
      riskLevel: RiskLevel.MEDIUM,
    },
  })

  const alcohol = await prisma.ingredient.upsert({
    where: { inciName: 'Alcohol Denat.' },
    update: {},
    create: {
      inciName: 'Alcohol Denat.',
      commonName: 'Denatured Alcohol',
      function: 'Solvent, Antimicrobial',
      description: 'A drying alcohol that can strip natural oils. May be too harsh for dry or sensitive skin types.',
      isIrritant: true,
      isComedogenic: false,
      isAlcohol: true,
      riskLevel: RiskLevel.MEDIUM,
    },
  })

  const coconutOil = await prisma.ingredient.upsert({
    where: { inciName: 'Cocos Nucifera Oil' },
    update: {},
    create: {
      inciName: 'Cocos Nucifera Oil',
      commonName: 'Coconut Oil',
      function: 'Emollient',
      description: 'A natural oil that can be comedogenic (pore-clogging) for some people, especially those with acne-prone skin.',
      isIrritant: false,
      isComedogenic: true,
      comedogenicRating: 4,
      isAllergen: false,
      riskLevel: RiskLevel.MEDIUM,
    },
  })

  // Create ingredient warnings
  await prisma.ingredientWarning.upsert({
    where: {
      id: 'fragrance-sensitive-warning',
    },
    update: {},
    create: {
      id: 'fragrance-sensitive-warning',
      ingredientId: fragrance.id,
      skinType: SkinType.SENSITIVE,
      warning: 'Fragrance can cause irritation and redness for sensitive skin types',
      severity: RiskLevel.HIGH,
    },
  })

  await prisma.ingredientWarning.upsert({
    where: {
      id: 'alcohol-dry-warning',
    },
    update: {},
    create: {
      id: 'alcohol-dry-warning',
      ingredientId: alcohol.id,
      skinType: SkinType.DRY,
      warning: 'Alcohol can be very drying and may worsen dry skin concerns',
      severity: RiskLevel.MEDIUM,
    },
  })

  await prisma.ingredientWarning.upsert({
    where: {
      id: 'coconut-acne-warning',
    },
    update: {},
    create: {
      id: 'coconut-acne-warning',
      ingredientId: coconutOil.id,
      concern: 'acne',
      warning: 'Coconut oil has a high comedogenic rating and may clog pores, worsening acne',
      severity: RiskLevel.HIGH,
    },
  })

  // Create sample products
  const product1 = await prisma.product.upsert({
    where: {
      name_brandId: {
        name: 'Hydrating Cleanser',
        brandId: cerave.id,
      },
    },
    update: {},
    create: {
      name: 'Hydrating Cleanser',
      brandId: cerave.id,
      category: ProductCategory.SKINCARE,
      description: 'A gentle, non-foaming cleanser with ceramides and hyaluronic acid',
    },
  })

  const product2 = await prisma.product.upsert({
    where: {
      name_brandId: {
        name: 'Daily Moisturizing Lotion',
        brandId: cerave.id,
      },
    },
    update: {},
    create: {
      name: 'Daily Moisturizing Lotion',
      brandId: cerave.id,
      category: ProductCategory.SKINCARE,
      description: 'Lightweight moisturizer with ceramides and hyaluronic acid',
    },
  })

  // Link ingredients to products
  await prisma.productIngredient.upsert({
    where: {
      productId_ingredientId: {
        productId: product1.id,
        ingredientId: hyaluronicAcid.id,
      },
    },
    update: {},
    create: {
      productId: product1.id,
      ingredientId: hyaluronicAcid.id,
      order: 5,
    },
  })

  await prisma.productIngredient.upsert({
    where: {
      productId_ingredientId: {
        productId: product2.id,
        ingredientId: hyaluronicAcid.id,
      },
    },
    update: {},
    create: {
      productId: product2.id,
      ingredientId: hyaluronicAcid.id,
      order: 3,
    },
  })

  await prisma.productIngredient.upsert({
    where: {
      productId_ingredientId: {
        productId: product2.id,
        ingredientId: niacinamide.id,
      },
    },
    update: {},
    create: {
      productId: product2.id,
      ingredientId: niacinamide.id,
      order: 8,
    },
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

