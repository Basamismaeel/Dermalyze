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
  // PrismaAdapter is needed for OAuth providers (Google)
  // It's safe to use with JWT strategy and credentials
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error('[NEXTAUTH] Error:', code, metadata)
    },
    warn(code) {
      console.warn('[NEXTAUTH] Warning:', code)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[NEXTAUTH] Debug:', code, metadata)
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('[AUTH] Missing credentials')
            return null
          }

          console.log('[AUTH] Attempting to sign in:', credentials.email)

          // Check database connection first
          let user
          try {
            user = await prisma.user.findUnique({
              where: { email: credentials.email },
            })
            console.log('[AUTH] User lookup result:', user ? 'Found' : 'Not found')
          } catch (dbError: any) {
            console.error('[AUTH] Database error during sign in:', dbError)
            console.error('[AUTH] Error code:', dbError.code)
            console.error('[AUTH] Error message:', dbError.message)
            
            // Log full error details in development
            if (process.env.NODE_ENV === 'development') {
              console.error('[AUTH] Full database error:', JSON.stringify(dbError, null, 2))
            }
            
            // Check for specific database errors
            if (dbError.code === 'P1001' || 
                dbError.message?.includes('connect') || 
                dbError.message?.includes('DATABASE_URL') ||
                dbError.message?.includes('Environment variable')) {
              console.error('[AUTH] Database connection issue detected')
            }
            
            // Return null to trigger NextAuth error handling
            return null
          }

          if (!user) {
            console.error('[AUTH] User not found:', credentials.email)
            return null
          }

          if (!user.password) {
            console.error('[AUTH] User has no password set:', credentials.email)
            return null
          }

          console.log('[AUTH] Validating password...')
          let isPasswordValid = false
          try {
            isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            )
          } catch (bcryptError: any) {
            console.error('[AUTH] Bcrypt error:', bcryptError)
            return null
          }

          if (!isPasswordValid) {
            console.error('[AUTH] Invalid password for user:', credentials.email)
            return null
          }

          console.log('[AUTH] Sign in successful for:', credentials.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error: any) {
          console.error('[AUTH] Unexpected sign in error:', error)
          console.error('[AUTH] Error stack:', error.stack)
          // Return null to indicate authentication failure
          // NextAuth will handle this and show an error
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
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // If user exists, allow sign in
        // authorize returning null will prevent this from being called
        if (user) {
          console.log('[AUTH] SignIn callback - allowing sign in for:', user.email)
          return true
        }
        return false
      } catch (error: any) {
        console.error('[AUTH] SignIn callback error:', error)
        return false
      }
    },
    async session({ session, token }) {
      try {
        if (session.user && token.sub) {
          session.user.id = token.sub as string
        }
        return session
      } catch (error: any) {
        console.error('[AUTH] Session callback error:', error)
        return session
      }
    },
    async jwt({ token, user, account }) {
      try {
        if (user) {
          token.sub = user.id
        }
        return token
      } catch (error: any) {
        console.error('[AUTH] JWT callback error:', error)
        return token
      }
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('[AUTH] Sign in successful:', user.email)
    },
  },
}

export default NextAuth(authOptions)

