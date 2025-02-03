"use client"; // Indique que ce composant est un Client Component

const Hero = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-white">
      {/* Section Texte */}
      <div className="flex flex-col items-center text-center mt-20 lg:mt-32 px-4 lg:px-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black tracking-wide max-w-2xl">
          Bienvenue sur PrefALERTE !
        </h1>
        <p className="mt-6 text-lg md:text-xl text-black font-medium max-w-2xl leading-7">
          Vous en avez assez de vérifier constamment la disponibilité des créneaux pour vos rendez-vous en préfecture ? Ne vous inquiétez plus ! Avec
          PrefALERTE, vous pouvez vous abonner pour recevoir des notifications PUSH et des SMS d'alerte dès qu'un créneau
          se libère.
        </p>
      </div>

      {/* Section Cartes avec SVG */}
      <div className="w-full flex justify-center mt-12 lg:mt-24 px-4">
        <div className="relative w-full max-w-4xl">
          {/* Carte 1 (Alerte) */}
          <div className="w-[200px] md:w-[250px] lg:w-[300px] h-[300px] md:h-[350px] lg:h-[400px] absolute left-0 md:left-[-50px] lg:left-[-100px] top-0 transform rotate-[-8deg] bg-gradient-to-b from-[#FF6B6B] to-[#FFE66D] rounded-tl-xl rounded-tr-xl shadow-lg overflow-hidden flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Carte 2 (Annonce) */}
          <div className="w-[250px] md:w-[300px] lg:w-[350px] h-[350px] md:h-[400px] lg:h-[450px] mx-auto relative bg-gradient-to-b from-[#4ECDC4] to-[#556270] rounded-tl-xl rounded-tr-xl shadow-lg overflow-hidden flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Carte 3 (Sonnerie) */}
          <div className="w-[200px] md:w-[250px] lg:w-[300px] h-[300px] md:h-[350px] lg:h-[400px] absolute right-0 md:right-[-50px] lg:right-[-100px] top-0 transform rotate-[8deg] bg-gradient-to-b from-[#FF9A9E] to-[#FAD0C4] rounded-tl-xl rounded-tr-xl shadow-lg overflow-hidden flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;