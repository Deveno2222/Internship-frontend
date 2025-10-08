"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "../api/api";
import { ApplicationCard } from "./ApplicationCard";

export function ApplicationList() {
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

  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((item) => (
        <ApplicationCard key={item.id} application={item} />
      ))}
      {data.length === 0 && <p className="text-muted-foreground text-center">Стажировки отстутвтуют</p>}
    </div>
  );
}
