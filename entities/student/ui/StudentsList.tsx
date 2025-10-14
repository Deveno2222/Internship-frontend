"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "../api/api";
import { Loader2 } from "lucide-react";
import { IStudent } from "../model/types";
import { StudentItem } from "./StudentItem";

interface StudentsListProps {
  limit?: number;
}

export function StudentsList({ limit = 5 }: StudentsListProps) {
  const { data, isLoading, isError } = useQuery<IStudent[]>({
    queryKey: ["students"],
    queryFn: () => fetchStudents(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center py-6">
        <p className="text-2xl text-destructive">Произошла ошибка!</p>
      </div>
    );
  }

  const filteredData = data.slice(0, limit);

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden bg-card">
      {filteredData.map((item) => (
        <StudentItem key={item.id} student={item} />
      ))}
    </div>
  );
}
