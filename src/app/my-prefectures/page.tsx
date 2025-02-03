import { MapPin } from 'lucide-react'
import React from 'react'
import Modele from './modele'
import { createClient } from '@/utils/supabase/server'

interface PrefData {
  id: number;
  indicatif: string;
  created_at: string;
  prefecture: string;
  sousprefecture: string;
}

  export default async function MesPrefectures() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    let { data, error } = await supabase
  .from("abonnements")
  .select(`
    id,
    motifs(*, 
      prefectures(*)
    )
  `)
  .eq("user", user?.id)
  //.eq("motif", "motifs.id"); // Filtrer par l'ID de l'utilisateur

  if (error) {
    console.error("Erreur :", error);
  } else {
    console.log("Préfectures, motifs et abonnements de l'utilisateur :", data);
  }

    return (
      <div className="space-y-8 max-w-5xl mx-auto py-10">
        {/* Titre avec icône */}
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Mes motifs
        </h1>
  
        {/* Liste des motifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data!.map((el, index) => {
            return (
              <Modele key={index} motif={el.motifs["motif"]} prefecture={el.motifs["prefectures"]['prefecture']} id={el.motifs['id']}
               />
            );
          })
          }
        </div>
      </div>
    )
  }