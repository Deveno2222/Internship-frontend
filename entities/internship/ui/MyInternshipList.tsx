"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMineInternships } from "../api/api";
import { InternshipCard } from "./InternshipCard";
import { IInternship } from "../model/types";
import { Skeleton } from "@/components/ui/skeleton";

export function MyInternshipList() {
  const { data, isLoading, isError } = useQuery<IInternship[]>({
    queryKey: ["internships", "mine"],
    queryFn: () => fetchMineInternships(),
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
    <>
      <h3 className="text-2xl">Стажировки компании</h3>
      <div className="grid grid-cols-1 gap-6">
        {data?.map((item) => (
          <InternshipCard key={item.id} data={item} canDelete={true} />
        ))}
      </div>
    </>
  );
}
