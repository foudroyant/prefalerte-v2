'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button' // Assurez-vous d'avoir un composant Button stylisé
import Link from 'next/link'

export default async function PrivatePage() {
  const supabase = await createClient()

  // Récupération de l'utilisateur connecté
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/sign-in') // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        {/* Icône de bienvenue */}
        <div className="mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenue !</h1>

        {/* Message de bienvenue */}
        <p className="text-gray-600 mb-6">
          Bonjour, <span className="font-semibold text-blue-500">{data.user.email}</span>.
          Vous êtes connecté avec succès.
        </p>

        {/* Bouton de déconnexion */}
        <form action="/auth/signout" method="POST" className="w-full">
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Se déconnecter
          </Button>
        </form>

        {/* Lien vers le tableau de bord */}
        <p className="mt-4 text-sm text-gray-500">
          Accédez à votre{' '}
          <Link href="/home" className="text-blue-500 hover:underline">
            tableau de bord
          </Link>
        </p>
      </div>
    </div>
  )
}