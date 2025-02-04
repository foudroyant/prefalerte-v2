'use client'
import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

function ErrorContent() {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('message') || "Une erreur inattendue s'est produite."

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Oups !</h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        <Link href="/">
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            Retour à l'accueil
          </Button>
        </Link>

        <p className="mt-4 text-sm text-gray-500">
          Besoin d'aide ?{' '}
          <Link href="/" className="text-red-500 hover:underline">
            Contactez le support
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ErrorContent />
    </Suspense>
  )
}
