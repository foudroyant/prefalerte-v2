"use client"; // Indique que ce composant est un Client Component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const ProfilePage = () => {
  // Données de l'utilisateur (simulées)
  const [user, setUser] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    subscription: "Premium",
    credits: 150,
    phone: "+225 01 23 45 67 89",
    address: "Cocody, Abidjan",
    company: "Tech Solutions",
    jobTitle: "Développeur Full Stack",
  });

  // État pour l'édition des informations
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

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

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Profil Utilisateur</h1>

        <Card className="p-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
              {isEditing ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-lg">{user.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse</label>
              {isEditing ? (
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-lg">{user.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Entreprise</label>
              {isEditing ? (
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-lg">{user.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Poste</label>
              {isEditing ? (
                <Input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-lg">{user.jobTitle}</p>
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
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;