'use client'
import { Search, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
//import { prefectures } from '@/lib/firebase'

/*
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
*/

export default function Home() {
  const [prefectures, setPrefectures] = useState<any[]>([])
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(()=>{
    async function init(){
      const supabase = await createClient()
      // Récupérer les données des préfectures depuis Supabase
      let { data: prefs, error } = await supabase.from('prefectures').select('*')
      setPrefectures(prefs || [])
      setLoading(false)
    }

    init()
  })

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filtrer les éléments en fonction du terme de recherche
    /*const filtered = items.filter(item =>
      item.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);*/
  };
  

  // Gérer les erreurs de récupération des données
  if (loading) {
    return <>
      <div className='flex items-center justify-center min-h-screen'>
        <div className="w-8 h-8 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Chargement en cours...</p>
      </div>
    </>
  }
  

  return (
    <>
    <div className="p-6">
      {/* Barre de recherche */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Rechercher une préfecture..."
          className="pl-10 text-md py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          
        />
      </div>

      {/* Grille des préfectures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prefectures?.filter((pref, index)=>{
          return pref.prefecture.toLowerCase().includes(searchTerm.toLowerCase()) || pref.sousprefecture.toLowerCase().includes(searchTerm.toLowerCase()) || pref.indicatif.toLowerCase().includes(searchTerm.toLowerCase())
        })
        .map((prefecture) => (
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
                    {prefecture.indicatif}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
    
    </>
  )
}