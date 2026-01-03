'use client'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary-100/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-primary-100/30 animate-gradient"></div>
    </div>
  )
}

