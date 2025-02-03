"use client"; // Indique que ce composant est un Client Component

import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";

interface ConfirmationModalProps {
  triggerText: string;  // Texte du bouton qui ouvre le modal
  title: string;        // Titre du modal
  description: string;  // Description du modal
  variant?: "default" | "outline" | "destructive" | "secondary"; // Variante du bouton
  onConfirm: () => void; // Fonction à exécuter lors de la confirmation
  onCancel?: () => void; // Fonction à exécuter lors de l'annulation (optionnelle)
}

const ConfirmationModal = ({ 
  triggerText, 
  title, 
  description, 
  variant = "default", // Valeur par défaut
  onConfirm, 
  onCancel 
}: ConfirmationModalProps) => {
  
  return (
    <Dialog>
      {/* Bouton pour ouvrir le modal */}
      <DialogTrigger asChild>
        <Button variant={variant}>{triggerText}</Button>
      </DialogTrigger>

      {/* Contenu du modal */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Boutons de confirmation et d'annulation */}
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant={variant} onClick={onConfirm}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
