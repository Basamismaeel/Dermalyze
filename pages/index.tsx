import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'
import { Logo } from '@/components/Logo'

export default function Home({ hasProfile, hasSession }: { hasProfile: boolean; hasSession: boolean }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-in fade-in">
            <div className="flex justify-center mb-6 animate-float">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent mb-6 leading-tight animate-gradient-text">
              Dermalyze
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-right">
              Find out if skincare, haircare, makeup, and body care products are
              safe and suitable for your unique skin profile
            </p>

            <div className="bg-amber-50/80 backdrop-blur-sm border-l-4 border-amber-400 rounded-xl p-5 mb-10 max-w-2xl mx-auto shadow-sm hover-lift animate-bounce-in">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong className="font-semibold">Educational purposes only.</strong> This tool is not
                  medical advice. Always patch test products and consult a
                  dermatologist for medical concerns.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-20">
            {!hasSession ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-pulse-glow group"
                  >
                    <span className="group-hover:animate-wiggle inline-block">Get Started</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-primary-600 border-2 border-primary-600 px-10 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 group"
                  >
                    Sign In
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </Link>
                </div>
                <p className="text-gray-600 text-base">
                  Create an account or sign in to get started
                </p>
              </div>
            ) : !hasProfile ? (
              <div className="space-y-6">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Complete Your Skin Profile
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
                <p className="text-gray-600 text-base">
                  Tell us about your skin to get personalized recommendations
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Search Products
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
                <p className="text-gray-600 text-base">
                  Start evaluating products for your skin
                </p>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover-lift group animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:animate-float group-hover:animate-pulse-glow">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Personalized</h3>
              <p className="text-gray-600 leading-relaxed">
                Get recommendations based on your skin type, concerns, and
                ingredient preferences
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover-lift group animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:animate-float-slow group-hover:animate-pulse-glow">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Transparent</h3>
              <p className="text-gray-600 leading-relaxed">
                Clear explanations of why products are suitable or not, in simple
                English
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover-lift group animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:animate-float group-hover:animate-pulse-glow">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Educational</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn about ingredients and what they do, without medical claims
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  const hasProfile = session
    ? await prisma.userSkinProfile.findUnique({
        where: { userId: session.user?.id || '' },
      })
    : null

  return {
    props: {
      hasProfile: !!hasProfile,
      hasSession: !!session,
    },
  }
}

