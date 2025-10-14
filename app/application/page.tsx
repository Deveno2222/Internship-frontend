"use client";

import { ApplicationList } from "@/entities/application/ui/ApplicationList";
import { useAuthStore } from "@/shared/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApplicationPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    } else if (user.role !== "employer") {
      router.replace("/");
    }
  }, [user, router]);

  if (user === null || user.role !== "employer") {
    return (
      <div className="container mx-auto text-center text-2xl py-6">
        Проверка доступа...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4">
        <h2 className="text-center text-2xl">Список заявок</h2>
        <ApplicationList />
      </div>
    </div>
  );
}
