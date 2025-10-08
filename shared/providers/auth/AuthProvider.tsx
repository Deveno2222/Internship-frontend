"use client";

import { useAuthStore } from "@/shared/stores/authStore";
import { useEffect } from "react";

type Props = {
  user: { id: number; username: string; email: string; role: string } | null;
  children: React.ReactNode;
};

export default function AuthProvider({ user, children }: Props) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
