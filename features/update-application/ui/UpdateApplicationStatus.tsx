"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateApplicationStatus } from "../api/api";
import { toast } from "sonner";
import type { UpdateApplicationStatus } from "../model/types";

interface UpdateApplicationStatusProps {
  applicationId: string;
  prevStatus: "pending" | "approved" | "rejected";
}

export function UpdateApplicationStatus({
  applicationId,
  prevStatus,
}: UpdateApplicationStatusProps) {
  const [currStatus, setCurrStatus] = useState(prevStatus);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateApplicationStatus) =>
      updateApplicationStatus(applicationId, data),
    onSuccess: () => {
      toast.success("Статус заявки успешно обновлен");
      queryClient.invalidateQueries({
        queryKey: ["application", applicationId],
      });
      setOpen(false);
    },
  });

  const onSubmit = () => {
    mutation.mutate({ status: currStatus });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Изменить статус</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение статуса</DialogTitle>
          <DialogDescription>
            Выберите новый статус для этой заявки.
          </DialogDescription>
        </DialogHeader>

        <Select
          value={currStatus}
          onValueChange={(value) =>
            setCurrStatus(value as "pending" | "approved" | "rejected")
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Отправлена</SelectItem>
            <SelectItem value="approved">Принята</SelectItem>
            <SelectItem value="rejected">Отклонена</SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button onClick={onSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? "Сохранение..." : "Принять"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Отмена
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
