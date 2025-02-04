import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MyForm from "@/components/phone";
import MyForm_Phone from "@/components/phone";
import Menu from "./menu";
import { createClient } from '@/utils/supabase/server'
import Profile from "./profile";
import { redirect } from "next/navigation";


export default async function Home() {

  const supabase = await createClient()
    const { data : {user : user}, error : err } = await supabase.auth.getUser()

    if(err){
      redirect("/sign-in");
    }

    let { data: data_user } = await supabase
    .from('users')
    .select('*')
    .eq("user", user?.id)
    .limit(1)

    const menus = [
      {
        title: "Préfectures",
        description: "Gérer les préfectures et leurs motifs.",
        link: "/prefecture",
        emoji: "🏛️", // Emoji pour les préfectures
        display : data_user![0].compte == "CLIENT"
      },
      {
        title: "Gérer Clients",
        description: "Gérer les clients de votre application.",
        link: "/admin-client",
        emoji: "👥", // Emoji pour les clients
        display : data_user![0].compte == "ADMIN"
      },
      {
        title: "Abonnements",
        description: "Gérer vos abonnements et crédits.",
        link: "/subscribe",
        emoji: "💳", // Emoji pour les abonnements
        display : data_user![0].compte == "CLIENT"
      },
      {
        title: "Gérer Préfectures",
        description: "Gérer les préfectures et leurs données.",
        link: "/admin-prefecture",
        emoji: "📊", // Emoji pour la gestion des préfectures
        display : data_user![0].compte == "ADMIN"
      },
      {
        title: "Préfectures Abonnées",
        description: "Voir les préfectures auxquelles vous êtes abonné.",
        link: "/my-prefectures",
        emoji: "📌", // Emoji représentant une liste d'abonnement
        display : data_user![0].compte == "CLIENT"
      },
    ];

  return (
    <div className="min-h-scree p-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la page */}
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Section Profil (en haut sur mobile, à gauche sur desktop) */}
          <div className="w-full lg:w-1/3">
            <Profile Data_User={data_user} />
          </div>
        
        

        <div className="w-full lg:w-2/3">
            {/* Grille des menus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {menus.filter((menu)=>menu.display == true).map((menu, index) => (
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
