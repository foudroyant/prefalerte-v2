'use client'
import { createClient } from '@/utils/supabase/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Button,} from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Client {
    id: number; // Identifiant unique
    full_name: string; // Nom du client
    email: string; // Adresse email du client
    plan: string; // Type d'abonnement (ex: "Mensuel", "Annuel", "Gratuit")
    phone?: string; // Numéro de téléphone (optionnel)
    user : string;
    credits : number;
  }



export default function AdminClientsPage() {
  const supabase = createClient()
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {

      const init = async () => {
        const { data } = await supabase.auth.getUser()
        let { data: users, error } = await supabase
          .from('users')
          .select('*')
          setClients(users || []);
      }
  
      init()
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
              <TableCell>{client.full_name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.plan}</TableCell>
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