import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

