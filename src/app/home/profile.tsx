"use client"; // Indique que ce composant est un Client Component

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MyForm_Phone from "@/components/phone";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  subscription: string;
  credits: number;
  phone: string;
}


const Profile = ({Data_User} : {Data_User : any}) => {

  // État pour l'édition des informations
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    phone : Data_User![0].phone,
    email: Data_User?.email!,
    credits: Data_User![0].credits,
    full_name :Data_User![0].full_name,
    subscription : Data_User![0].plan,
  });
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    const init = async () => {
    }

    init()
  }, [user])

  // Gestion de l'édition
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(formData); // Met à jour les données de l'utilisateur
    setIsEditing(false); // Désactive le mode édition
  };

  const handleCancel = () => {
    setFormData({ ...user }); // Réinitialise les données du formulaire
    setIsEditing(false); // Désactive le mode édition
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


    function handleUpdatePhone(telephone : string): void {
        setUser({ ...formData, ["phone"]: telephone });
        /*setFormData((prevState) => ({
            ...prevState, // Conserver les autres clés
            ["phone"]: telephone, // Mettre à jour la clé spécifique
          }));*/
    }

  return (
    <>
    
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Profil Utilisateur</h2>

              {/* Informations de base */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                    {isEditing ? (
                      <Input
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-lg">{user.full_name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                    {isEditing ? (
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-lg">{user.email}</p>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <MyForm_Phone onUpdate={handleUpdatePhone} />
                    ) : (
                        <>
                            <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                            <p className="text-lg">{user.phone}</p>
                        </>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Abonnement actuel</label>
                    <p className="text-lg">{user.subscription}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Crédits disponibles</label>
                    <p className="text-lg">{user.credits} crédits</p>
                  </div>
                </div>
                

                {/* Boutons d'action */}
                <div className="mt-6 flex space-x-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave}>Enregistrer</Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEdit}>Modifier le profil</Button>
                  )}
                </div>
              </div>
            </Card>
    </>
  );
};

export default Profile;