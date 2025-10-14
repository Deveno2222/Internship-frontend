"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApplicationByStudent } from "../api/api";
import { Loader2 } from "lucide-react";
import { IApplication } from "../model/types";
import { ApplicationItemStudent } from "./ApplicationItemStudent";

interface ApplicationListStudentProps {
  studentId: string;
}

export function ApplicationListStudent({
  studentId,
}: ApplicationListStudentProps) {
  const { data, isLoading, isError } = useQuery<IApplication[]>({
    queryKey: ["applicationStudents", studentId],
    queryFn: () => fetchApplicationByStudent(studentId),
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

  console.log(data);

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden bg-card">
      {data.map((item) => (
        <ApplicationItemStudent key={item.id} application={item} />
      ))}
    </div>
  );
}
