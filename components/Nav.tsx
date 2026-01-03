'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { Logo } from './Logo'

export function Nav() {
  const { data: session } = useSession()
  const router = useRouter()
  const currentPath = router.pathname

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(path)
  }

  const tabs = session
    ? [
        { href: '/', label: 'Home', icon: 'home' },
        { href: '/search', label: 'Search', icon: 'search' },
        { href: '/onboarding', label: 'Profile', icon: 'profile' },
      ]
    : [
        { href: '/', label: 'Home', icon: 'home' },
        { href: '/auth/signin', label: 'Sign In', icon: 'signin' },
        { href: '/auth/signup', label: 'Sign Up', icon: 'signup' },
      ]

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Logo and tabs row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-3">
          <Logo size="md" />
          
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-gray-100/80 rounded-xl p-1.5 w-full md:w-auto overflow-x-auto">
            {tabs.map((tab) => {
              const active = isActive(tab.href)
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                    transition-all duration-300 whitespace-nowrap transform
                    ${
                      active
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md scale-105 animate-pulse-glow'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-white/60 hover:scale-105'
                    }
                    hover:animate-wiggle
                  `}
                >
                  {tab.icon === 'home' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {tab.icon === 'search' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  {tab.icon === 'profile' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {tab.icon === 'signin' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  )}
                  {tab.icon === 'signup' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                  <span>{tab.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Sign Out button (only when logged in) */}
          {session && (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors font-medium px-4 py-2.5 rounded-lg hover:bg-red-50 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

