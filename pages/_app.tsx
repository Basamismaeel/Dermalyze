import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Nav } from '@/components/Nav'
import { PageTransition } from '@/components/PageTransition'
import { AnimatedBackground } from '@/components/AnimatedBackground'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <AnimatedBackground />
        <Nav />
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </div>
    </SessionProvider>
  )
}

