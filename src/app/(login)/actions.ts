'use server'
import Stripe from "stripe";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function login(formData: FormData) {
    const supabase = await createClient()
  
    // Extraction des données du formulaire
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    console.log(data)
  
    // Connexion de l'utilisateur avec Supabase
    const { error } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      // Redirection vers une page d'erreur avec un message détaillé
      redirect(`/error?message=${encodeURIComponent(error.message)}`)
    }
  
    // Revalidation du cache et redirection vers la page d'accueil
    revalidatePath('/home', 'layout')
    redirect('/home')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()
  
    // Extraction des données du formulaire
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
    }
  
    // Vérification que les mots de passe correspondent
    const confirmPassword = formData.get('confirmPassword') as string
    if (data.password !== confirmPassword) {
      redirect('/error?message=Les mots de passe ne correspondent pas')
    }
  
    // Inscription de l'utilisateur avec Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.name, phone: data.phone } }
    })
  
    if (authError) {
      redirect(`/error?message=${encodeURIComponent(authError.message)}`)
    }
  
    // Ajout des informations supplémentaires dans la table `profiles`
    if (authData.user) {
      // Créer un client Stripe pour cet utilisateur
    const customer = await stripe.customers.create({
      email: authData.user.email,
      name: data.name,
    });

    // Stocker le customerId dans la base de données
      const { error: profileError } = await supabase
        .from('users')
        .upsert([
          {
            id: authData.user.id, // L'ID de l'utilisateur créé dans `auth.users`
            name: data.name,
            phone: data.phone,
            stripe_consumer: customer.id,
            compte : 'CLIENT'
          },
        ])
  
      if (profileError) {
        redirect(`/error?message=${encodeURIComponent(profileError.message)}`)
      }
    }
  
    // Revalidation du cache et redirection
    //revalidatePath('/home', 'layout')
    redirect('/home')
  }