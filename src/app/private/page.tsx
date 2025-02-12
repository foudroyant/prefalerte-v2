'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button' // Assurez-vous d'avoir un composant Button stylisé
import Link from 'next/link'
import UserProfile from './userInfo'
import Navbar from '@/components/navbar'

interface UserInfo {
  name : string;
  email : string;
  phone : string;
  credits : number;
  plan : string
}

export default async function PrivatePage() {
  const supabase = await createClient()

  // Récupération de l'utilisateur connecté
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/sign-in') // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
  }

  let { data: data_user } = await supabase
    .from('users')
    .select('*')
    .eq("user", data.user?.id)
    .limit(1)

    const user : UserInfo = {
      email : data_user![0].email,
      name : data_user![0].full_name,
      phone : data_user![0].phone,
      credits : data_user![0].credits,
      plan : data_user![0].plan
    }

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <UserProfile userInfo={user} />
    </div>
    </>
  )
}