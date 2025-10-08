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
import { internshipSchema, InternshipSchema } from "../model/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApplication } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

interface IInternshipDialogFormProps {
  internshipId: number;
}

export function InternshipDialogForm({
  internshipId,
}: IInternshipDialogFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<InternshipSchema>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      internship: internshipId,
      motivation: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InternshipSchema) => createApplication(data),
    onError: () => {
      toast.error("Произошла ошибка");
    },
    onSuccess: () => {
      toast.success("Вы успешно отправили заявку!");
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = async (data: InternshipSchema) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Подать заявку</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Заявка</DialogTitle>
          <DialogDescription>
            Заполните форму, чтобы отправить заявку на стажировку
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <textarea
              {...form.register("motivation")}
              className="border p-2 w-full"
              placeholder="Почему вы хотите пройти стажировку?"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>
            <Button type="submit">Отправить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
