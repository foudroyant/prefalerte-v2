import { Infinity, MessagesSquare, SmilePlus, Timer, Zap, ZoomIn } from "lucide-react";

const feature = [
  {
    title: "🚀 Instantanéité",
    description:
      "Recevez des notifications en temps réel dès qu'un créneau est disponible.",
    icon: <Timer className="size-6" />,
  },
  {
    title: "🎯 Simplicité",
    description:
      "Plus besoin de surveiller constamment le site de la préfecture, nous faisons le travail pour vous.",
    icon: <SmilePlus className="size-6" />,
  },
  {
    title: "👌 Personnalisé",
    description:
      "Choisissez vos préférences de notification pour correspondre à votre emploi du temps et à vos besoins.",
    icon: <Infinity className="size-6" />,
  },
  /*{
    title: "Reliability",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    icon: <Infinity className="size-6" />,
  },*/
];

export  function Feature () {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <h2 className="text-3xl font-medium md:text-5xl">
              Pourquoi choisir PrefALERTE ? 🤔
            </h2>

          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {feature.map((feature, idx) => (
            <div
              className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8"
              key={idx}
            >
              <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export function Feature2() {
    return (
      <section className="py-32 bg-gray-900 text-white">
        <div className="container">
          <p className="mb-4 text-sm text-gray-400 lg:text-base">OUR VALUES</p>
          <h2 className="text-3xl font-medium lg:text-4xl">Why Choose Us?</h2>
          <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-5">
              <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-gray-700">
                <Timer className="size-6 text-white" />
              </span>
              <h3 className="mb-2 text-xl font-medium">Performance</h3>
              <p className="leading-7 text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
                doloremque! Eligendi.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-5">
              <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-gray-700">
                <ZoomIn className="size-6 text-white" />
              </span>
              <h3 className="mb-2 text-xl font-medium">Quality</h3>
              <p className="leading-7 text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
                doloremque! Eligendi.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-5">
              <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-gray-700">
                <Zap className="size-6 text-white" />
              </span>
              <h3 className="mb-2 text-xl font-medium">Innovation</h3>
              <p className="leading-7 text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
                doloremque! Eligendi.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

