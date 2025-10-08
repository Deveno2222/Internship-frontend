"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchInternshipId } from "../api/api";
import { InternshipDialogForm } from "@/features/create-application/ui/InternshipDialogForm";
import { IInternship } from "../model/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { useAuthStore } from "@/shared/stores/authStore";

export function InternshipDetails({ id }: { id: string }) {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, isError } = useQuery<IInternship>({
    queryKey: ["internship", id],
    queryFn: () => fetchInternshipId(id),
  });

  if (isLoading) return <div className="p-6">Загрузка...</div>;
  if (isError || !data)
    return <div className="p-6 text-red-500">Ошибка при загрузке</div>;

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="h-5 w-5" />
          <span>Работодатель: {data.employer}</span>
        </div>

        <p className="text-base leading-relaxed">{data.description}</p>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Начало: {formatDate(data.start_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Окончание: {formatDate(data.end_date)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        {user?.role === "student" && (
          <InternshipDialogForm internshipId={data.id} />
        )}
      </CardFooter>
    </Card>
  );
}
