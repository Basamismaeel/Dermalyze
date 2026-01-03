'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-primary-200">
          <div className="h-full bg-gradient-to-r from-primary-600 to-primary-700 animate-progress" />
        </div>
      )}
      <div className={isLoading ? 'opacity-75 transition-opacity duration-300' : 'transition-opacity duration-300'}>
        {children}
      </div>
    </>
  )
}

