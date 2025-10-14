"use client";

import { useForm } from "react-hook-form";
import {
  UpdateInternshipEmployer,
  updateInternshipSchema,
} from "../model/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateInternship } from "../api/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface UpdateInternshipEmployerProps {
  internshipId: string;
  defaultValues: UpdateInternshipEmployer;
}

export function UpdateInternshipForm({
  internshipId,
  defaultValues,
}: UpdateInternshipEmployerProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<UpdateInternshipEmployer>({
    resolver: zodResolver(updateInternshipSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateInternshipEmployer) =>
      UpdateInternship(String(internshipId), data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internship", internshipId],
      });
      toast.success("Стажировка успешно обновлена!");
      setOpen(false);
    },
    onError: () => {
      toast.error("Произошла ошибка. Повторите попытку позже!");
    },
  });

  const onSubmit = (data: UpdateInternshipEmployer) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Редактировать</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать стажировку</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Описание" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Расположение</FormLabel>
                  <FormControl>
                    <Input placeholder="Город" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Статус</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="open">Открыта</option>
                      <option value="closed">Закрыта</option>
                      <option value="in_progress">В процессе</option>
                      <option value="finished">Завершена</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Отмена
                </Button>
              </DialogClose>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Сохраняем..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
