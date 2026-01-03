import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl md:text-4xl',
  }

  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden animate-float-slow group-hover:animate-pulse-glow`}>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/50 to-primary-600/50 blur-sm animate-glow-pulse"></div>
        
        {/* Main logo icon - Skincare droplet */}
        <svg 
          className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-10 h-10'} text-white relative z-10`} 
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Main droplet shape */}
          <path
            d="M12 2C8 2 5 5 5 9c0 4 3 7 7 7s7-3 7-7c0-4-3-7-7-7z"
            fill="currentColor"
            opacity="0.9"
          />
          {/* Inner highlight */}
          <path
            d="M12 4c2.5 0 4.5 2 4.5 4.5S14.5 13 12 13s-4.5-2-4.5-4.5S9.5 4 12 4z"
            fill="white"
            opacity="0.3"
          />
          {/* Small sparkle dots */}
          <circle cx="9" cy="7" r="1" fill="white" opacity="0.6" />
          <circle cx="15" cy="7" r="1" fill="white" opacity="0.6" />
        </svg>
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-primary-900 transition-all duration-300`}>
          Dermalyze
        </span>
      )}
    </Link>
  )
}

