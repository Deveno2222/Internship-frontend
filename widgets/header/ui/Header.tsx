"use client";

import { Button } from "@/components/ui/button";
import { CreateInternshipForm } from "@/features/create-internship/ui/CreateInternshipForm";
import { LogoutButton } from "@/features/logout/ui/LogoutButton";
import { useAuthStore } from "@/shared/stores/authStore";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();

  console.log(user);

  return (
    <header className="min-h-18 flex items-center border-b-1 bg-background">
      <div className="flex justify-between container mx-auto px-4 items-center">
        <Link href={"/"} className="text-2xl font-medium">
          INTERNSHIP
        </Link>
        <nav className="space-x-4 hidden xl:block">
          <Link
            href={"/"}
            className="rounded-[12px] py-2 px-4 hover:bg-secondary/90 transition-colors"
          >
            Стажировки
          </Link>
          <Link
            href={"/"}
            className="rounded-[12px] py-2 px-4 hover:bg-secondary/90 transition-colors"
          >
            О проекте
          </Link>
          <Link
            href={"/"}
            className="rounded-[12px] py-2 px-4 hover:bg-secondary/90 transition-colors"
          >
            Контакты
          </Link>
        </nav>
        <div className="space-x-4 flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {user ? (
            <>
              <Link
                className="text-secondary-foreground hover:text-muted-foreground transition-colors"
                href="/profile"
              >
                Профиль
              </Link>
              {user.role === "employer" && <CreateInternshipForm />}
              <LogoutButton>Выйти</LogoutButton>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-secondary-foreground hover:text-muted-foreground transition-colors"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="rounded-md px-4 py-2 text-secondary-foreground hover:bg-secondary/90 transition-colors"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
