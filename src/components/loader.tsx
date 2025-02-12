'use client'
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Loader className="w-12 h-12 animate-spin text-gray-700" />
        <p className="mt-4 text-gray-700">Veuillez patienter...</p>
      </div>
    </div>
  );
}