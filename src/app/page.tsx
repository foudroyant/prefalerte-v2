"use client"; // Indique que ce composant est un Client Component

import Contact from "@/components/contact";
import { Feature, Feature2 } from "@/components/features";
import Hero from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
    <Hero />
    <Feature />
    <Contact />
    </>
  );
};

export default LandingPage;