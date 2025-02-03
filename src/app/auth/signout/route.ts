
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()

  // Déconnexion de l'utilisateur
  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Redirection vers la page de connexion après la déconnexion
  return NextResponse.redirect('/sign-in')
}