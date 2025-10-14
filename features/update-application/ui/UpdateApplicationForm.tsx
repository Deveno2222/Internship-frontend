"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateApplication } from "../api/api";
import { toast } from "sonner";

interface UpdateApplicationFormProps {
  applicationId: string;
  initialMotivation: string;
}

export function UpdateApplicationForm({
  applicationId,
  initialMotivation,
}: UpdateApplicationFormProps) {
  const [motivation, setMotivation] = useState(initialMotivation);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newMotivation: string) =>
      updateApplication(applicationId, { motivation: newMotivation }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["application", applicationId],
      });
      toast.success("Заявка успешно обновлена!")
    },
    onError: () => {
      toast.error("Произошла ошибка. Повторите попытку позже!")
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(motivation);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Редактировать</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать письмо</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-2 border rounded-lg"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            rows={5}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Сохраняем" : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
