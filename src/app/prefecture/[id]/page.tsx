'use client'

import { MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ConfirmationModal from '@/components/confirm'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface Motif {
  id: number
  motif: string
  lien: string
  prefecture: number
}

export default function PrefecturePage({ params }: { params: { id: string } }) {
  const [motifs, setMotifs] = useState<Motif[]>([])
  const [loading, setLoading] = useState(true)
  const [abonnements, setAbonnements] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [changed, setChanged] = useState(true)
  const supabase = createClient()

  function isSubscribe(motif : number){
    const l = abonnements.filter((m, index)=>{
      return m.motif == motif
    }).length
    return l
  }

  // Récupérer l'utilisateur et les données au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      // Récupérer l'utilisateur
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      // Récupérer les motifs
      const { data: motifs, error: motifsError } = await supabase
        .from('motifs')
        .select('*')
        .eq('prefecture', Number.parseInt(params.id))

      if (motifsError) {
        console.error('Erreur lors de la récupération des motifs:', motifsError.message)
      } else {
        setMotifs(motifs || [])
      }

      // Récupérer les abonnements de l'utilisateur
      if (user) {
        const { data: _abonnements, error: abonnementsError } = await supabase
          .from('abonnements')
          .select('*')
          .eq('user', user.id)

        if (abonnementsError) {
          console.error('Erreur lors de la récupération des abonnements:', abonnementsError.message)
        } else {
          setAbonnements(_abonnements || [])
        }
      }

      setLoading(false)
    }

    fetchData()
  }, [params.id, supabase, changed])

  const unsubscribe = async (motif : Motif)=>{
    const { error,data } = await supabase
      .from('abonnements')
      .delete()
      .eq("user", user.id)
      .eq('motif', motif.id)

      if(error){
        console.log(error)
      }else {
        console.log(data)
        setChanged(!changed)
      }
  }

  // Fonction pour gérer la confirmation
  const handleConfirm = async (motif: Motif) => {
    if (motif && user) {
      const { data, error } = await supabase
        .from('abonnements')
        .insert([
          { user: user.id, motif: motif.id, prefecture : Number.parseInt(params.id)},
        ])
        .select('*')

      if (error) {
        console.error('Erreur lors de l\'abonnement:', error.message)
      } else {
        setChanged(!changed)
        console.log('Abonnement réussi:', data)
        //setAbonnements([...abonnements, data[0]]) // Mise à jour immuable de l'état
      }
    } else {
      console.log('Aucun utilisateur ou motif sélectionné')
    }
  }

  // Fonction pour gérer l'annulation
  const handleCancel = () => {
    console.log('Action annulée !')
  }

  if (loading) {
    return <p>Chargement en cours...</p>
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-10">
      {/* Titre avec icône */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <MapPin className="h-6 w-6" />
        Motifs disponibles
      </h1>

      {/* Liste des motifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {motifs.map((motif) => (
          <Card key={motif.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{motif.motif}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {isSubscribe(motif.id) == 0 ?
                (<>
                  <ConfirmationModal
                    triggerText="S'abonner"
                    title="Abonnez-vous"
                    description="Êtes-vous sûr de vouloir accéder à ce motif ?"
                    onCancel={handleCancel}
                    onConfirm={() => handleConfirm(motif)} // Passer le motif à la fonction de confirmation
                    variant={'outline'}                />
                </>) : (
                  <>
                    <ConfirmationModal
                      triggerText="Se desabonner"
                      title="Désabonnez-vous"
                      description="Êtes-vous sûr de vouloir vous désabonner à ce motif ?"
                      onCancel={handleCancel}
                      onConfirm={() => unsubscribe(motif)} // Passer le motif à la fonction de confirmation
                      variant={'destructive'}                  />
                  </>
                )
            }
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}