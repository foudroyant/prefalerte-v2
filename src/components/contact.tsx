import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="w-2/3 p-8 bg-gray-900 rounded-lg shadow-lg">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold text-gray-400 uppercase">
            Nous contacter
          </span>
          <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">
           Inscrivez-vous dès aujourd'hui et simplifiez votre vie administrative ! 📅
          </h1>
          <p className="text-lg text-gray-400">
          Ne manquez plus jamais une opportunité de rendez-vous en préfecture.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
              <Mail className="h-6 w-auto text-white" />
            </span>
            <p className="mb-2 text-lg font-semibold">Email</p>
            <p className="mb-3 text-gray-400">Nous vous assistons par email</p>
            <a
              href="#"
              className="font-semibold text-blue-400 hover:underline"
            >
              contact@prefalerte.com
            </a>
          </div>
          <div className="text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
              <MapPin className="h-6 w-auto text-white" />
            </span>
            <p className="mb-2 text-lg font-semibold">Visitez-nous</p>
            <p className="mb-3 text-gray-400">
              Rue 05
            </p>
            <a
              href="#"
              className="font-semibold text-blue-400 hover:underline"
            >
              Paris, France
            </a>
          </div>
          <div className="text-center">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
              <Phone className="h-6 w-auto text-white" />
            </span>
            <p className="mb-2 text-lg font-semibold">Appelez-nous</p>
            <p className="mb-3 text-gray-400">
              Nous sommes disponible de 24h/24
            </p>
            <a
              href="#"
              className="font-semibold text-blue-400 hover:underline"
            >
              +123 456 7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
