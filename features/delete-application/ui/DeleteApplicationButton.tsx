"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteApplication } from "../api/api";
import { useRouter } from "next/navigation";

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
      route.push("/profile");
    },
  });

  return (
    <Button
      variant={"destructive"}
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Удаляем..." : "Удалить"}
    </Button>
  );
}
