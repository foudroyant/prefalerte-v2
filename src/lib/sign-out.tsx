import { createClient } from '@/utils/supabase/server'

async function signOut() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
  }