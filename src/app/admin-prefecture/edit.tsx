'use client'
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface PrefectureModel {
  id: number;
  label: string; 
  sousPrefecture: string; 
  indicatif: string
}

const EditPrefectureDialog = ({ _prefecture }: { _prefecture: PrefectureModel}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(_prefecture.label);
  const [sousPrefecture, setSousPrefecture] = useState(_prefecture.sousPrefecture);
  const [indicatif, setIndicatif] = useState(_prefecture.indicatif);
  const [changed, setChanged] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()

  console.log(_prefecture)
  
  const handleSave = async () => {
    
    const { data, error } = await supabase
     .from('prefectures')
     .update({ 'prefecture': label,  'sousprefecture': sousPrefecture, 'indicatif' : indicatif})
     .eq("id", _prefecture.id)
     .select()

     setChanged(!changed)
    setIsOpen(false);

     toast({
      title: "Supression de prefecture",
      description: `${_prefecture.label} a été supprimé avec succès`,
      action: (
        <ToastAction altText="Goto schedule to undo">Fermer</ToastAction>
      )
  })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
      <Button variant="default" className="w-full">Editer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Éditer la préfecture</DialogTitle>
          <DialogDescription>Modifiez les informations de la préfecture.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Label</Label>
            <Input placeholder="La prefecture" value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div>
            <Label>Sous-préfecture</Label>
            <Input placeholder="La sous prefecture" value={sousPrefecture} onChange={(e) => setSousPrefecture(e.target.value)} />
          </div>
          <div>
            <Label>Indicatif</Label>
            <Input placeholder="L'indicatif" value={indicatif} onChange={(e) => setIndicatif(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPrefectureDialog;