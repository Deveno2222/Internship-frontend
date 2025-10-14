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
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { useAuthStore } from "@/shared/stores/authStore";
import { UpdateInternshipForm } from "@/features/update-internship/ui/UpdateInternshipForm";
import { Badge } from "@/components/ui/badge";

export function InternshipDetails({ id }: { id: string }) {
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, isError } = useQuery<IInternship>({
    queryKey: ["internship", id],
    queryFn: () => fetchInternshipId(id),
  });

  if (isLoading) return <div className="p-6">Загрузка...</div>;
  if (isError || !data)
    return <div className="p-6 text-red-500">Ошибка при загрузке данных</div>;

  // Цвет бейджа статуса
  const statusColor = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    closed: "bg-gray-200 text-gray-800",
    finished: "bg-blue-100 text-blue-800",
  }[data.status];

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">{data.title}</CardTitle>
          <Badge className={`${statusColor} capitalize`}>
            {data.status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Работодатель */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="h-5 w-5" />
          <span>Работодатель ID: {data.employer}</span>
        </div>

        {/* Описание */}
        <p className="text-base leading-relaxed">{data.description}</p>

        {/* Локация */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <span>{data.location}</span>
        </div>

        {/* Дата */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-5 w-5" />
          <span>Создано: {formatDate(data.created_at)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        {user?.role === "student" && (
          <InternshipDialogForm internshipId={data.id} />
        )}

        {user?.role === "employer" && (
          <UpdateInternshipForm internshipId={String(data.id)} defaultValues={data} />
        )}
      </CardFooter>
    </Card>
  );
}
