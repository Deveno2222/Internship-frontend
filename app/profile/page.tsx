"use client";

import { ApplicationList } from "@/entities/application/ui/ApplicationList";
import { MyInternshipList } from "@/entities/internship/ui/MyInternshipList";
import { ProfileCard } from "@/entities/user/ui/ProfileCard";
import { useAuthStore } from "@/shared/stores/authStore";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <main className="container mx-auto py-6 px-4 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <ProfileCard />
        </div>

        <div className="md:flex-1">
          <h3 className="text-center mb-6 text-2xl">
            {user?.role === "employer" ? "Список заявок" : "Список стажировок"}
          </h3>
          <ApplicationList />
        </div>
      </div>
      {user?.role === "employer" && <MyInternshipList />}
    </main>
  );
}
