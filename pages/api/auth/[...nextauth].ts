import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Check environment variables on startup
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not set')
  }
  if (!process.env.NEXTAUTH_SECRET) {
    console.warn('⚠️  NEXTAUTH_SECRET is not set')
  }
  if (!process.env.NEXTAUTH_URL) {
    console.warn('⚠️  NEXTAUTH_URL is not set')
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user || !user.password) {
            throw new Error('Invalid email or password')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('Invalid email or password')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error: any) {
          console.error('Sign in error:', error)
          
          // Handle database connection errors
          if (error.code === 'P1001' || error.message?.includes('connect') || error.message?.includes('DATABASE_URL')) {
            throw new Error('Database connection error. Please check your database configuration.')
          }
          
          // Re-throw authentication errors
          if (error.message === 'Invalid email or password') {
            throw error
          }
          
          // For other errors, throw a generic message
          throw new Error('An error occurred during sign in. Please try again.')
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
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
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
}

export default NextAuth(authOptions)

