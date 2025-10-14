"use client";

import { useQuery } from "@tanstack/react-query";
import { IApplication } from "../model/types";
import { fetchApplicationById } from "../api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteApplicationButton } from "@/features/delete-application/ui/DeleteApplicationButton";
import { UpdateApplicationForm } from "@/features/update-application/ui/UpdateApplicationForm";
import { useAuthStore } from "@/shared/stores/authStore";
import { UpdateApplicationStatus } from "@/features/update-application/ui/UpdateApplicationStatus";

interface ApplicationDetailsProps {
  id: string;
}

export function ApplicationDetails({ id }: ApplicationDetailsProps) {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, isError } = useQuery<IApplication>({
    queryKey: ["application", id],
    queryFn: () => fetchApplicationById(id),
  });

  const getStatusProps = (status: IApplication["status"]) => {
    switch (status) {
      case "approved":
        return {
          color: "text-green-600",
          Icon: CheckCircle,
          label: "Одобрено",
        };
      case "rejected":
        return { color: "text-destructive", Icon: XCircle, label: "Отклонено" };
      case "pending":
      default:
        return {
          color: "text-muted-foreground",
          Icon: Clock,
          label: "В ожидании",
        };
    }
  };

  if (isLoading) {
    return <Skeleton className="w-full h-72" />;
  }

  if (user === null) {
    return <p>Загрузка пользователя</p>;
  }

  if (isError || !data) {
    return <p>Ошибка при загрузке, повторите попытку</p>;
  }

  const { color, Icon, label } = getStatusProps(data.status);

  console.log(data);

  return (
    <Card className="w-full shadow-sm border border-border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {data.internship_title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Студент:</span> {data.student}
        </p>

        <p className="text-sm text-foreground-accent">{data.motivation}</p>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className={color}>Статус: {label}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>
            Отправлено: {new Date(data.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="space-x-2">
          {user.role === "employer" && (
            <UpdateApplicationStatus
              applicationId={String(data.id)}
              prevStatus={data.status}
            />
          )}
          {user.role === "student" && (
            <div className="space-x-2">
              <UpdateApplicationForm
                applicationId={String(data.id)}
                initialMotivation={data.motivation}
              />
              <DeleteApplicationButton applicationId={String(data.id)} />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
