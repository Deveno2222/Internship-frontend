"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteApplication } from "../api/api";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteApplicationButtonProps {
  applicationId: string;
}

export function DeleteApplicationButton({
  applicationId,
}: DeleteApplicationButtonProps) {
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: () => deleteApplication({ id: applicationId }),
    onSuccess: () => {
      toast.success("Заявка успешно удалена")
      route.push("/profile");
    },
  });

  return (
    // <Button
    //   variant={"destructive"}
    //   onClick={() => mutation.mutate()}
    //   disabled={mutation.isPending}
    // >
    //   {mutation.isPending ? "Удаляем..." : "Удалить"}
    // </Button>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          {mutation.isPending ? "Удаляем..." : "Удалить"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы действительно хотите удалить заявку?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие невозможно отменить. Это приведет к необратимому
            удалению вашей учетной записи и удалению ваших данных с наших
            серверов.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
