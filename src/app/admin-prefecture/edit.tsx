'use client'
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Prefecture {
  id: number;
  label: string;
  sousPrefecture: string;
  indicatif: string;
}

const EditPrefectureDialog = ({ prefecture, onSave }: { prefecture: Prefecture; onSave: (updatedPrefecture: Prefecture) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(prefecture.label);
  const [sousPrefecture, setSousPrefecture] = useState(prefecture.sousPrefecture);
  const [indicatif, setIndicatif] = useState(prefecture.indicatif);

  const handleSave = () => {
    const updatedPrefecture: Prefecture = {
      ...prefecture,
      label,
      sousPrefecture,
      indicatif,
    };
    onSave(updatedPrefecture);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Éditer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Éditer la préfecture</DialogTitle>
          <DialogDescription>Modifiez les informations de la préfecture.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Label</Label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div>
            <Label>Sous-préfecture</Label>
            <Input value={sousPrefecture} onChange={(e) => setSousPrefecture(e.target.value)} />
          </div>
          <div>
            <Label>Indicatif</Label>
            <Input value={indicatif} onChange={(e) => setIndicatif(e.target.value)} />
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