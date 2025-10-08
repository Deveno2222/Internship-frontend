"use client";

import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { Logout } from "../api/api";
import { toast } from "sonner";
import { useAuthStore } from "@/shared/stores/authStore";
import { useRouter } from "next/navigation";

export function LogoutButton({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await Logout();
      console.log(res);
      toast.success("Успешно вышли с аккаунта!");
      logout();
      route.push("/login");
    } catch (error) {
      toast.error(`Возникла ошибка при выходе ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {children}
    </Button>
  );
}
