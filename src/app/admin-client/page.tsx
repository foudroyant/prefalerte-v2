'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Button,} from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Client {
    id: number; // Identifiant unique
    name: string; // Nom du client
    email: string; // Adresse email du client
    subscription: string; // Type d'abonnement (ex: "Mensuel", "Annuel", "Gratuit")
    phone?: string; // Numéro de téléphone (optionnel)
    address?: string; // Adresse (optionnel)
  }



export default function AdminClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
      const _clients: Client[] = [
        {
          id: 1,
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          subscription: "Mensuel",
          phone: "+225 01 23 45 67 89",
          address: "Cocody, Abidjan",
        },
        {
          id: 2,
          name: "Marie Koné",
          email: "marie.kone@example.com",
          subscription: "Annuel",
          phone: "+225 07 89 12 34 56",
        },
        {
          id: 3,
          name: "Paul Yao",
          email: "paul.yao@example.com",
          subscription: "Gratuit",
          address: "Yamoussoukro",
        },
        {
          id: 4,
          name: "Alice Kouadio",
          email: "alice.kouadio@example.com",
          subscription: "Mensuel",
          phone: "+225 05 67 89 12 34",
        },
        {
          id: 5,
          name: "Lucie Traoré",
          email: "lucie.traore@example.com",
          subscription: "Annuel",
          address: "San-Pédro",
        },
      ];
      setClients(_clients);
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'au montage du composant
  

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Abonnement</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.subscription}</TableCell>
              <TableCell>
                <Button variant="ghost">Éditer</Button>
                <Button variant="destructive">Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}