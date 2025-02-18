"use client"; // Indique que ce composant est un Client Component

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Utilisez next/navigation au lieu de next/router
import { Home, ChevronRight } from "lucide-react"; // Icônes pour le Breadcrumb
import Navbar from "@/components/navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname(); // Récupère le chemin actuel
  const pathnames = pathname.split("/").filter((x) => x); // Divise le chemin en segments

  return (
    <>
    <Navbar />
      <div className="">
        {/* Header 
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold">Prefalerte</h1>
          </div>
        </header>
        */}

        {/* Breadcrumb */}
        <nav className="bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2">
            <Link href="/home" className="text-gray-500 hover:text-gray-700">
              <Home className="h-4 w-4" />
            </Link>
            {pathnames.map((path, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              return (
                <div key={path} className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  {isLast ? (
                    <span className="text-gray-700">{path}</span>
                  ) : (
                    <Link href={routeTo} className="text-gray-500 hover:text-gray-700">
                      {path}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Prefalerte. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;