'use client'
import ConfirmationModal from '@/components/confirm'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface PrefData {
    id: number;
    indicatif: string;
    created_at: string;
    prefecture: string;
    sousprefecture: string;
}

interface MotifProps {
    key: number;
    motif: string; // ou 'string' si tu veux gérer cela comme une chaîne de caractères
    prefecture: string;
    id: number;
  }

  export default function Modele(motif : MotifProps ) {
    const supabase = createClient()
    const [id, setID] = useState<any>(null)
    const [changed, setChanged] = useState<any>(true)

    useEffect(() => {
        async function init(){
            const { data } = await supabase.auth.getUser()
            setID(data.user?.id)
        }
        init()
    })
    
    const unsubscribe = async ({motif} : {motif : any})=>{
        const { error,data } = await supabase
          .from('abonnements')
          .delete()
          .eq("user", id)
          .eq('motif', motif.id)
    
          if(error){
            console.log(error)
          }else {
            console.log(data)
            setChanged(!changed)
          }
      }

  // Fonction pour gérer l'annulation
  const handleCancel = () => {
    console.log('Action annulée !')
  }
    return (
            <Card  className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{motif.motif}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                    {motif.prefecture}
                </p>
              </CardContent>
              <CardFooter>
                    <ConfirmationModal
                        triggerText="Se desabonner"
                        title="Désabonnez-vous"
                        description="Êtes-vous sûr de vouloir vous désabonner à ce motif ?"
                        onCancel={handleCancel}
                        onConfirm={() => unsubscribe(motif)} // Passer le motif à la fonction de confirmation
                        variant={'destructive'}
                    />  
            </CardFooter>
            </Card>
    )
  }
