'use client'
import {Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

export default function SubscriptionPage() {
    function handleStripePayment(arg0: string): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="p-4 flex justify-center">
    <div className="w-2/3"> {/* Conteneur à 2/3 de la largeur */}
        <ClientProfilePage />
    </div>
    </div>
  );
}

const ClientProfilePage = () => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Profil de {client.name}</h2>
        <PricingTable />
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Abonnement actuel</h3>
            <p>{client.subscription}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Abonnements passés</h3>
            <PastSubscriptionsList client={client} />
          </div>
        </div>
      </div>
    );
  };

const PastSubscriptionsList = ({ client }: { client: Client }) => {
    if (client.pastSubscriptions.length === 0) {
      return <p className="text-gray-500">Aucun abonnement passé.</p>;
    }
  
    return (
      <div className="space-y-4">
        {client.pastSubscriptions.map((subscription) => (
          <Card key={subscription.id} className="p-4">
            <h3 className="font-bold">{subscription.type}</h3>
            <p>
              <span className="font-semibold">Début :</span>{" "}
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Fin :</span>{" "}
              {new Date(subscription.endDate).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    );
  };

  const PricingTable = () => {
    return (
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan BASIC */}
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4">BASIC</h3>
              <p className="text-gray-600 mb-4">$57/mo</p>
              <p className="text-gray-600 mb-4">$68/yr</p>
              <ul className="mb-6">
                <li className="text-gray-600 mb-2">LIMILITY $125,000</li>
                <li className="text-gray-600 mb-2">FEDEROMA PROPERTY $134,343</li>
                <li className="text-gray-600 mb-2">MEDICAL $1,500</li>
              </ul>
              <Button className="w-full">BUY</Button>
            </Card>
  
            {/* Plan STANDARD */}
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4">STANDARD</h3>
              <p className="text-gray-600 mb-4">$70/mo</p>
              <p className="text-gray-600 mb-4">$834/yr</p>
              <ul className="mb-6">
                <li className="text-gray-600 mb-2">LIMILITY $4,55,000</li>
                <li className="text-gray-600 mb-2">FEDEROMA PROPERTY $150,500</li>
                <li className="text-gray-600 mb-2">MEDICAL $1,600</li>
              </ul>
              <Button className="w-full">BUY</Button>
            </Card>
  
            {/* Plan PREMIUM */}
            <Card className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4">PREMIUM</h3>
              <p className="text-gray-600 mb-4">$82/mo</p>
              <p className="text-gray-600 mb-4">$979/yr</p>
              <ul className="mb-6">
                <li className="text-gray-600 mb-2">LIMILITY $1,43,000</li>
                <li className="text-gray-600 mb-2">FEDEROMA PROPERTY $175,200</li>
                <li className="text-gray-600 mb-2">MEDICAL $1,900</li>
              </ul>
              <Button className="w-full">BUY</Button>
            </Card>
          </div>
        </div>
      </div>
    );
  };