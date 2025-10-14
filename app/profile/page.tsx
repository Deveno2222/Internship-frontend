"use client";

import { Button } from "@/components/ui/button";
import { ApplicationList } from "@/entities/application/ui/ApplicationList";
import { MyInternshipList } from "@/entities/internship/ui/MyInternshipList";
import { StudentsList } from "@/entities/student/ui/StudentsList";
import { ProfileCard } from "@/entities/user/ui/ProfileCard";
import { useAuthStore } from "@/shared/stores/authStore";
import Link from "next/link";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <main className="container mx-auto py-6 px-4 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <ProfileCard />
        </div>

        <div className="md:flex-1">
          <h3 className="text-center mb-6 text-2xl">
            {user?.role === "employer"
              ? "Список заявок"
              : user?.role === "teacher"
              ? "Список студентов"
              : "Список стажировок"}
          </h3>

          <div className="flex flex-col">
            {user.role === "teacher" && <StudentsList />}
            {user.role !== "teacher" && <ApplicationList limit={2} />}

            <div className="flex justify-center">
              <Link
                href={
                  user?.role === "student"
                    ? "/"
                    : user?.role === "teacher"
                    ? "/students"
                    : "/application"
                }
              >
                <Button variant="link">Смотреть больше</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {user?.role === "employer" && <MyInternshipList />}
    </main>
  );
}
