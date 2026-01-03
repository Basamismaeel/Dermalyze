# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/skincare?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth (Google)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

## 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# (Optional) Seed sample data
npm run db:seed
```

## 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. First Steps

1. Sign in with Google
2. Complete your skin profile at `/onboarding`
3. Search for products at `/search`
4. View product evaluations

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check DATABASE_URL format: `postgresql://user:password@host:port/database`
- Verify database exists

### Authentication Issues

- Check NEXTAUTH_SECRET is set
- Verify Google OAuth credentials
- Ensure redirect URI matches in Google Console

### Prisma Issues

- Run `npm run db:generate` after schema changes
- Use `npm run db:studio` to view database

