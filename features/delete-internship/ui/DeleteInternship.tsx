"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInternship } from "../api/api";
import { toast } from "sonner";

interface DeleteInternshipProps {
  id: string;
}

export function DeleteInternship({ id }: DeleteInternshipProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteInternship(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internships", "mine"],
      });
      toast.success("Вы успешно удалили стажировку!");
    },
    onError: () => {
      toast.error("Произошла ошибка!");
    },
  });

  return (
    <Button variant="destructive" onClick={() => mutation.mutate()}>
      Удалить
    </Button>
  );
}
