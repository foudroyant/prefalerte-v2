import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell } from "lucide-react";

export function Navigation() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Bell className="h-6 w-6" />
              <span className="text-xl font-bold">Prefalerte</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/prefectures" className="text-muted-foreground hover:text-foreground">
                Préfectures
              </Link>
              <Link href="/clients" className="text-muted-foreground hover:text-foreground">
                Clients
              </Link>
              <Link href="/abonnement" className="text-muted-foreground hover:text-foreground">
                Abonnement
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Link href="/profile">
              <Button variant="outline">Mon Profil</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}