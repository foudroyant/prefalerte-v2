'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    // Initialiser Supabase et récupérer l'état d'authentification
    const initSupabase = async () => {
      const supabaseClient = createClient();
      setSupabase(supabaseClient);

      const { data: { user } } = await supabaseClient.auth.getUser();
      setIsAuthenticated(!!user);

      // Écouter les changements d'état d'authentification
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
        setIsAuthenticated(!!session?.user);
      });
      
      return () => subscription?.unsubscribe();
    };

    initSupabase();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Prefalerte
            </Link>
          </div>

          {/* Menu pour les écrans larges */}
          <div className="hidden md:flex items-center space-x-4">
            
            {isAuthenticated ? (
              <>
                <Link href="/home" className="text-gray-800 hover:text-blue-500">
                  Accueil
                </Link>
                <Link href="/private">
                  <Button variant="outline">Mon compte</Button>
              </Link>
              </>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline">Connexion</Button>
              </Link>
            )}
          </div>

          {/* Bouton du menu hamburger pour les petits écrans */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            
            {isAuthenticated ? (
              <>
                  <Link
                  href="/home"
                  className="block text-gray-800 hover:text-blue-500"
                  onClick={toggleMenu}
                >
                  Accueil
                </Link>
                <Link href="/private">
                <Button variant="outline">Mon compte</Button>
              </Link>
              </>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline">Connexion</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
