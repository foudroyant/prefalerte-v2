"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import EditPrefectureDialog from "./edit";
import Link from "next/link";

interface PrefectureModel {
    id: number; // Identifiant unique
    label: string; // Nom de la préfecture
    sousPrefecture: string; // Sous-préfecture
    indicatif: string; // Indicatif
  }
  
export const columns: ColumnDef<PrefectureModel>[] = [
  {
    id: "actions",
    header : "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const prefecture = row.original

      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [formData, setFormData] = useState({
        prefecture: "",
        sousPrefecture: "",
        indicatif: "",
      });
      
      const supabase = createClient()
      const { toast } = useToast()

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    

      async function ajouter_pref(){
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
      }

      async function deletePrefecture(){
        const { error } = await supabase.from("prefectures").delete().eq("id", prefecture.id);
        if(error){
          toast(
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Une erreur s'est produite !</code>
            </pre>
          );
        }
        toast(
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Prefecture supprimé avec succè !</code>
          </pre>
        );
      }
 
      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
              Ajouter
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditPrefectureDialog _prefecture={prefecture} />
            <Link href={"/admin-prefecture/"+prefecture.id}><DropdownMenuItem>Sous prefectures</DropdownMenuItem></Link>
            <DropdownMenuItem onClick={deletePrefecture}>Supprimer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>Ajouter une préfecture</DialogHeader>
          <DialogHeader>Ajouter une préfecture</DialogHeader>
          <Input name="prefecture" value={formData.prefecture} onChange={handleChange} placeholder="Prefecture" />
          <Input name="sousPrefecture" value={formData.sousPrefecture} onChange={handleChange} placeholder="Sous-préfecture" />
          <Input name="indicatif" value={formData.indicatif} onChange={handleChange} placeholder="Indicatif" />
          <Button onClick={() => ajouter_pref()}>Enregistrer</Button>
        </DialogContent>
      </Dialog>
      </>
      )
    },
  },
  {
    accessorKey: "prefecture",
    header: "Prefecture",
  },
  {
    accessorKey: "sousprefecture",
    header: "Sous prefecture",
  },
  {
    accessorKey: "indicatif",
    header: "Indicatif",
  },
]
