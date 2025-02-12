import {Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from '@/utils/supabase/server'
import { List } from "lucide-react";
import PricingTable from "./card_plan";
import Navbar from "@/components/navbar";

const client: Client = {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    subscription: "Mensuel",
    phone: "+225 01 23 45 67 89",
    address: "Cocody, Abidjan",
    pastSubscriptions: [
      {
        id: 1,
        type: "Annuel",
        startDate: "2022-01-01",
        endDate: "2022-12-31",
      },
      {
        id: 2,
        type: "Mensuel",
        startDate: "2021-06-01",
        endDate: "2021-06-30",
      },
    ],
  };

export default async function SubscriptionPage() {

  const supabase = await createClient()
  const { data : {user : user} } = await supabase.auth.getUser()

      
  let { data: pricing, error } = await supabase
    .from('pricing')
    .select('*, description(*)')

    let { data: data_user } = await supabase
    .from('users')
    .select('*')
    .eq("user", user?.id)
    .limit(1)

    
    let { data: subscribes, error : err } = await supabase
      .from('subscribes')
      .select('*, pricing(*)')
      .eq("user", user?.id)


    //console.log(subscribes)


    function handleStripePayment(arg0: string): void {
        throw new Error("Function not implemented.");
    }

  return (
    <>
    <Navbar />
    <div className="p-4 flex justify-center">
    <div className="w-2/3"> {/* Conteneur à 2/3 de la largeur */}
        <ClientProfilePage Pricing={pricing ?? [] }  User = {user} Data_User = {data_user![0]} abonnements = {subscribes} />
    </div>
    </div>
    </>
  );
}

const ClientProfilePage = ({ Pricing, User, Data_User, abonnements }: { Pricing: any[], User : any, Data_User : any, abonnements : any}) => {
  //console.log(Pricing)
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Profil de {Data_User.full_name?.trim() || User?.email}</h2>
        <PricingTable pricing={Pricing ?? []} />
        <div className="space-y-6">
          <div className="flex gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">Abonnement actuel</h3>
              <p>{Data_User?.plan}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Crédits actuel</h3>
              <p>{Data_User?.credits}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Abonnements passés</h3>
            <PastSubscriptionsList abonnements={abonnements} client={client} />
          </div>
        </div>
      </div>
    );
  };

const PastSubscriptionsList = ({ client, abonnements }: { client: Client, abonnements : any }) => {
    if (abonnements.length === 0) {
      return <p className="text-gray-500">Aucun abonnement passé.</p>;
    }
  
    return (
      <div className="space-y-4">
        {abonnements.map((subscription : any, index : any) => (
          <Card key={index} className="p-4">
            <h3 className="font-bold">{subscription.pricing.plan}  : {subscription.pricing.details}</h3>
            <p>
              <span className="font-semibold">Début :</span>{" "}
              {new Date(subscription.created_at).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Fin :</span>{" "}
              {new Date(subscription.fin).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    );
  };

  
  