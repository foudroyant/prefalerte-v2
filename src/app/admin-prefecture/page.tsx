'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Button,} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import { createClient } from '@/utils/supabase/client'

import { useEffect, useState } from "react";
import EditPrefectureDialog from "./edit";
import Link from "next/link";

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";

interface Prefecture {
    id: number; // Identifiant unique
    label: string; // Nom de la préfecture
    sousPrefecture: string; // Sous-préfecture
    indicatif: string; // Indicatif
  }

export default function AdminPrefecturesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prefs, setPrefs] = useState<PrefData[]>([])
  const [changed, setChanged] = useState(false)

  const [formData, setFormData] = useState({
    prefecture: "",
    sousPrefecture: "",
    indicatif: "",
  });
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(()=>{
    async function init(){
      const { data } = await supabase.auth.getUser()
      let { data: prefectures, error } = await supabase
      .from('prefectures')
      .select('*')
      .order("prefecture", { ascending: true }); // Trie par ordre croissant
      setPrefs(prefectures || [])
    }
    init()
  }, [changed])

  const handleSave = (updatedPrefecture: PrefData) => {
    console.log("Préfecture mise à jour :", updatedPrefecture);
    // Ici, vous pouvez mettre à jour la préfecture dans votre état ou base de données
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  async function ajouter_pref() {
    console.log(formData)
    const { data, error } = await supabase
      .from('prefectures')
      .insert([
        { sousprefecture: formData.sousPrefecture, prefecture: formData.prefecture, indicatif : formData.indicatif},
      ])
      .select()
    setFormData({
      prefecture: "",
      sousPrefecture: "",
      indicatif: "",
    })
    toast({
      title: "Ajout de prefecture",
      description: `${formData.prefecture} a été ajouté avec succès`,
      action: (
        <ToastAction altText="Goto schedule to undo">Fermer</ToastAction>
      ),
    })
    setChanged(!changed)
  }

  async function deletePref(prefecture: PrefData) {
    console.log(prefecture)
    const { error } = await supabase
      .from('prefectures')
      .delete()
      .eq("id", prefecture.id)
    /*toast({
      title: "Supression de prefecture",
      description: `${prefecture.prefecture} a été supprimé avec succès`,
      action: (
        <ToastAction altText="Goto schedule to undo">Fermer</ToastAction>
      )
    }),*/
    if(error){
      console.log(error)
    }else {
      setChanged(!changed)
    }
    
  }

  return (
    <div className="p-4 space-y-8 max-w-5xl mx-auto py-10">
      <Button onClick={() => setIsDialogOpen(true)}>Ajouter une préfecture</Button>
      <Button className="mx-5" variant={"secondary"} >{prefs.length}  préfecture(s)</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prefecture</TableHead>
            <TableHead>Sous-préfecture</TableHead>
            <TableHead>Indicatif</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prefs.map((prefecture) => (
            <TableRow key={prefecture.id}>
              <TableCell>{prefecture.prefecture}</TableCell>
              <TableCell>{prefecture.sousprefecture}</TableCell>
              <TableCell>{prefecture.indicatif}</TableCell>
              <TableCell className="flex justify-between">
                <EditPrefectureDialog prefecture={prefecture} onSave={handleSave} />
                <Link href={`/admin-prefecture/${prefecture.id}`}>
                  <Button variant="default">Motifs</Button>
                </Link>
                <Button onClick={() => deletePref(prefecture)} variant="destructive">Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>Ajouter une préfecture</DialogHeader>
          <Input name="prefecture" value={formData.prefecture} onChange={handleChange} placeholder="Prefecture" />
          <Input name="sousPrefecture" value={formData.sousPrefecture} onChange={handleChange} placeholder="Sous-préfecture" />
          <Input name="indicatif" value={formData.indicatif} onChange={handleChange} placeholder="Indicatif" />
          <Button onClick={() => ajouter_pref()}>Enregistrer</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}