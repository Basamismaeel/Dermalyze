# Personal Care Product Advisor

A trustworthy, user-first platform that helps users understand whether personal care products (skincare, haircare, makeup, body care) are safe or risky for them, based on their skin type, concerns, and ingredient preferences.

## 🎯 Features

- **Personalized Skin Profile**: Create a profile with your skin type, concerns, and ingredient preferences
- **Product Search**: Search for products by name or brand
- **Ingredient Analysis**: View detailed ingredient information with risk flags
- **Personalized Evaluation**: Get product evaluations based on your unique profile
- **Clear Verdicts**: Simple ✅ Generally Suitable, ⚠️ Use with Caution, ❌ Not Recommended

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (e.g., `http://localhost:3000`)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - From Google OAuth

3. Set up the database:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed initial data
npm run db:seed
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
skincare/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── onboarding/        # User onboarding
│   ├── search/            # Product search
│   └── products/          # Product detail pages
├── components/            # React components
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   └── evaluation.ts     # Evaluation engine
└── prisma/               # Database schema
    └── schema.prisma
```

## 🗄️ Database Schema

The app uses PostgreSQL with Prisma ORM. Key models:

- **User**: User accounts and authentication
- **UserSkinProfile**: User's skin type, concerns, and preferences
- **Product**: Products with brand and category
- **Ingredient**: Ingredient information with risk flags
- **ProductIngredient**: Many-to-many relationship
- **ProductEvaluation**: Personalized evaluations
- **IngredientWarning**: Warnings for specific skin types/concerns

## 🔧 Development

### Database Commands

```bash
# Generate Prisma Client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Create a migration
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Adding Products

Products can be added via:
1. Prisma Studio (`npm run db:studio`)
2. API endpoints (to be built)
3. Admin interface (future feature)

## 🧪 Evaluation Engine

The evaluation engine is rules-based (not AI) and considers:

- User's skin type (oily, dry, combination, sensitive, normal)
- User's concerns (acne, sensitivity, dryness, etc.)
- Ingredients to avoid
- Known allergies
- Ingredient risk flags (irritant, comedogenic, fragrance, etc.)
- Ingredient warnings for specific skin types

## ⚠️ Legal & Safety

- **Educational purposes only** - Not medical advice
- **No diagnoses** - Does not diagnose conditions
- **No medical claims** - Does not promise results or cures
- **Patch test recommended** - Always shown to users

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The app is optimized for Vercel deployment.

## 📝 License

This is a private project. All rights reserved.

## 🤝 Contributing

This is an MVP. Future enhancements may include:
- Barcode scanning
- AI skin analysis
- User reviews
- Routine builder
- Mobile app
- Multi-language support

---

**Built with**: Next.js, TypeScript, TailwindCSS, PostgreSQL, Prisma, NextAuth

