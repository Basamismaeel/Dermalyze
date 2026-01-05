import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Environment variable validation
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}

if (process.env.NODE_ENV === 'development') {
  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)
  
  if (missing.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(', ')}`)
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('[AUTH] Missing credentials')
          return null
        }

        try {
          // Ensure database connection
          await prisma.$connect()

          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase().trim() },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              image: true,
            },
          })

          if (!user) {
            console.error('[AUTH] User not found:', credentials.email)
            return null
          }

          if (!user.password) {
            console.error('[AUTH] User has no password (OAuth only):', credentials.email)
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.error('[AUTH] Invalid password for user:', credentials.email)
            return null
          }

          console.log('[AUTH] Sign in successful:', user.email)
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error: any) {
          console.error('[AUTH] Authorization error:', error.message)
          console.error('[AUTH] Error code:', error.code)
          
          // Log database connection errors specifically
          if (error.code === 'P1001' || 
              error.code === 'P1000' ||
              error.message?.includes('connect') || 
              error.message?.includes('DATABASE_URL') ||
              error.message?.includes('Can\'t reach database')) {
            console.error('[AUTH] Database connection issue detected')
          }
          
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow sign in if user exists (from authorize or OAuth)
      if (user) {
        return true
      }
      return false
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  events: {
    async signIn({ user }) {
      console.log('[AUTH] User signed in:', user.email)
    },
  },
}

export default NextAuth(authOptions)
