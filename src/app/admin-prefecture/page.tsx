import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { DataTable } from './data-table';
import { columns } from './columns';
import { redirect } from 'next/navigation';

interface PrefectureModel {
  id: number; // Identifiant unique
  label: string; // Nom de la préfecture
  sousPrefecture: string; // Sous-préfecture
  indicatif: string; // Indicatif
}

export default async function page() {
  const supabase = await createClient()
  const { data : _data, error }  = await supabase
      .from('prefectures')
      .select('*')
      .order("prefecture", { ascending: true }); 

      if(error){
        console.log(error)
        redirect('/home')
      }
      console.log(_data)
      const data = _data as unknown as PrefectureModel[]

  return (
    <>
    <DataTable columns={columns} data={data} />
    </>
  )
}
