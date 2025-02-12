"use client"; // Indique que ce composant est un Client Component

import Contact from "@/components/contact";
import { Feature, Feature2 } from "@/components/features";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-scree p-4">
      <Hero />
      <Feature />
      <Contact />
    </div>
    
    </>
  );
};

export default LandingPage;