import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const EditMotifDialog = ({ motif, onSave }: { motif: Motif; onSave: (updatedMotif: Motif) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(motif.motif);
  const [lien, setLien] = useState(motif.lien);

  const handleSave = () => {
    const updatedMotif: Motif = {
      ...motif,
      motif,
      lien,
    };
    onSave(updatedMotif);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Éditer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Éditer le motif</DialogTitle>
          <DialogDescription>Modifiez les informations du motif.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Motif</Label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div>
            <Label>Lien</Label>
            <Input value={lien} onChange={(e) => setLien(e.target.value)} />
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

export default EditMotifDialog;