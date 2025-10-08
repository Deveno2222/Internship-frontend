"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchInternships } from "../api/api";
import { InternshipCard } from "./InternshipCard";
import { IInternship } from "../model/types";
import { Skeleton } from "@/components/ui/skeleton";

export function InternshipList() {
  const { data, isLoading, isError } = useQuery<IInternship[]>({
    queryKey: ["internships"],
    queryFn: () => fetchInternships(),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...Array(6)].map((_, idx) => (
          <Skeleton key={idx} className="h-52" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <p>Ошибка загрузки стажировок</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {data?.map((item) => (
        <InternshipCard key={item.id} data={item} />
      ))}
    </div>
  );
}
