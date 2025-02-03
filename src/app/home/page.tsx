"use client"; // Indique que ce composant est un Client Component

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MyForm from "@/components/phone";
import MyForm_Phone from "@/components/phone";
import { createClient } from '@/utils/supabase/client'

interface User {
  firstName: string;
  lastName: string;
  email: string;
  subscription: string;
  credits: number;
  phone: string;
  address: string;
  company: string;
  jobTitle: string;
}


const CombinedPage = () => {

  // État pour l'édition des informations
  const [isEditing, setIsEditing] = useState(false);
  const [_user, _setUser] = useState<any>(null)
  const [user, setUser] = useState({
    firstName: "Saisissez votre prenom",
    lastName: "Saisissez votre nom",
    email: "Saisissez votre email",
    subscription: "Free",
    credits: 150,
    phone: "Saisissez votre numero de telephone",
    address: "Saisissez votre adresse",
    company: "Tech Solutions",
    jobTitle: "Développeur Full Stack",
  });
  const [formData, setFormData] = useState({ ...user });
  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      _setUser(data.user)
      setUser(prevUser => ({
        ...prevUser,
        email: data.user?.email!
      }));
      
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

  // Données des menus avec emojis
  const menus = [
    {
      title: "Préfectures",
      description: "Gérer les préfectures et leurs motifs.",
      link: "/prefecture",
      emoji: "🏛️", // Emoji pour les préfectures
    },
    {
      title: "Gérer Clients",
      description: "Gérer les clients de votre application.",
      link: "/admin-client",
      emoji: "👥", // Emoji pour les clients
    },
    {
      title: "Abonnements",
      description: "Gérer vos abonnements et crédits.",
      link: "/subscribe",
      emoji: "💳", // Emoji pour les abonnements
    },
    {
      title: "Gérer Préfectures",
      description: "Gérer les préfectures et leurs données.",
      link: "/admin-prefecture",
      emoji: "📊", // Emoji pour la gestion des préfectures
    },
    {
      title: "Préfectures Abonnées",
      description: "Voir les préfectures auxquelles vous êtes abonné.",
      link: "/my-prefectures",
      emoji: "📌", // Emoji représentant une liste d'abonnement
    },
  ];

    function handleUpdatePhone(telephone : string): void {
        setUser({ ...formData, ["phone"]: telephone });
        /*setFormData((prevState) => ({
            ...prevState, // Conserver les autres clés
            ["phone"]: telephone, // Mettre à jour la clé spécifique
          }));*/
    }

  return (
    <div className="min-h-scree p-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la page */}
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>

        {/* Conteneur principal (flex en colonne sur mobile, en ligne sur desktop) */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Section Profil (en haut sur mobile, à gauche sur desktop) */}
          <div className="w-full lg:w-1/3">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Profil Utilisateur</h2>

              {/* Informations de base */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                    {isEditing ? (
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-lg">{user.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    {isEditing ? (
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-lg">{user.lastName}</p>
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
          </div>

          {/* Section Dashboard (en bas sur mobile, à droite sur desktop) */}
          <div className="w-full lg:w-2/3">
            {/* Grille des menus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menus.map((menu, index) => (
                <Link key={index} href={menu.link}>
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{menu.emoji}</span> {/* Emoji */}
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{menu.title}</h2>
                        <p className="text-gray-600">{menu.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedPage;