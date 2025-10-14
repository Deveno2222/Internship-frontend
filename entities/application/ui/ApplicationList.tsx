"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "../api/api";
import { ApplicationCard } from "./ApplicationCard";

interface ApplicationListProps {
  limit?: number;
}

export function ApplicationList({ limit = 10 }: ApplicationListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (isError || !data) {
    return <p>Ошибка</p>;
  }

  const limitedData = data.slice(0, limit);

  return (
    <div className="grid grid-cols-1 gap-4">
      {limitedData.map((item) => (
        <ApplicationCard key={item.id} application={item} />
      ))}
      {data.length === 0 && (
        <p className="text-muted-foreground text-center">
          Стажировки отстутвтуют
        </p>
      )}
    </div>
  );
}
