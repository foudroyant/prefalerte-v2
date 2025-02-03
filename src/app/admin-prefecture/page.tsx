'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Button,} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";

import { useState } from "react";
import EditPrefectureDialog from "./edit";
import Link from "next/link";
interface Prefecture {
    id: number; // Identifiant unique
    label: string; // Nom de la préfecture
    sousPrefecture: string; // Sous-préfecture
    indicatif: string; // Indicatif
  }

export default function AdminPrefecturesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (updatedPrefecture: Prefecture) => {
    console.log("Préfecture mise à jour :", updatedPrefecture);
    // Ici, vous pouvez mettre à jour la préfecture dans votre état ou base de données
  };

  const prefectures: Prefecture[] = [
    {
      id: 1,
      label: "Abidjan",
      sousPrefecture: "Cocody",
      indicatif: "ABJ",
    },
    {
      id: 2,
      label: "Yamoussoukro",
      sousPrefecture: "Koumassi",
      indicatif: "YMS",
    },
    {
      id: 3,
      label: "Bouaké",
      sousPrefecture: "Brobo",
      indicatif: "BKE",
    },
    {
      id: 4,
      label: "San-Pédro",
      sousPrefecture: "Sassandra",
      indicatif: "SPE",
    },
    {
      id: 5,
      label: "Korhogo",
      sousPrefecture: "Ferkessédougou",
      indicatif: "KHO",
    },
  ];

  return (
    <div className="p-4 space-y-8 max-w-5xl mx-auto py-10">
      <Button onClick={() => setIsDialogOpen(true)}>Ajouter une préfecture</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Sous-préfecture</TableHead>
            <TableHead>Indicatif</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prefectures.map((prefecture) => (
            <TableRow key={prefecture.id}>
              <TableCell>{prefecture.label}</TableCell>
              <TableCell>{prefecture.sousPrefecture}</TableCell>
              <TableCell>{prefecture.indicatif}</TableCell>
              <TableCell className="flex justify-between">
                <EditPrefectureDialog prefecture={prefecture} onSave={handleSave} />
                <Link href={`/admin-prefecture/${prefecture.id}`}>
                  <Button variant="default">Motifs</Button>
                </Link>
                <Button variant="destructive">Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>Ajouter une préfecture</DialogHeader>
          <Input placeholder="Label" />
          <Input placeholder="Sous-préfecture" />
          <Input placeholder="Indicatif" />
          <Button>Enregistrer</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}