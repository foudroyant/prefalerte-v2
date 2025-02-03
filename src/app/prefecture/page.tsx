import { Search, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { prefectures } from '@/lib/firebase'


async function explore() {
  const supabase = await createClient()
  const _prefectures: PrefectureData [] = await prefectures()
  _prefectures.map(async (pref,index)=>{
    const motifs = pref.motifs
    if(motifs != undefined){
      let { data: prefectures, error } = await supabase
      .from('prefectures')
      .select("*")
      .like('sousprefecture', `%${pref.sousPref}%`)
      //console.log(prefectures)
      pref.motifs.map( async (motif, index)=>{
      const { data, error } = await supabase
      .from('motifs')
      .insert([
        { motif: motif.motif, lien : motif.lien, prefecture : prefectures![0]["id"]},
      ])
      .select()
    })
    }

  })
}


export default async function Home() {
  const supabase = await createClient()

  // Récupérer les données des préfectures depuis Supabase
  let { data: prefectures, error } = await supabase.from('prefectures').select('*')

  // Gérer les erreurs de récupération des données
  if (error) {
    console.error('Erreur lors de la récupération des préfectures:', error.message)
    return <p>Une erreur s'est produite lors du chargement des données.</p>
  }
  

  return (
    <div className="p-6">
      {/* Barre de recherche */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Rechercher une préfecture..."
          className="pl-10 text-md py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Grille des préfectures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prefectures?.map((prefecture) => (
          <Link href={`/prefecture/${prefecture.id}`} key={prefecture.id}>
            <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer border border-gray-200 rounded-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  {prefecture.prefecture}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Sous-préfecture:</span>{' '}
                    {prefecture.sousprefecture}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Indicatif:</span>{' '}
                    {prefecture.indicative}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}