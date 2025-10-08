"use client";

import { instance } from "@/shared/api/axios";
import { useAuthStore } from "@/shared/stores/authStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function UserLoader() {
  const setUser = useAuthStore((s) => s.setUser);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      if (pathname === "/login" || pathname === "/register") {
        return;
      }
      try {
        const res = await instance.get("/users/user-info/");
        setUser(res.data); // сохранили в zustand
      } catch {
        setUser(null); // гость
      }
    };

    fetchUser();
  }, [setUser]);

  return null; // компонент сам ничего не рендерит
}
