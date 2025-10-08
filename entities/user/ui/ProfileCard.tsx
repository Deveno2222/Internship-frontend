"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/api";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCard() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUser,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-start gap-4 p-6 rounded-2xl border bg-card shadow-sm max-w-md">
        {/* аватар */}
        <Skeleton className="h-20 w-20 rounded-full" />
        {/* имя */}
        <Skeleton className="h-6 w-40" />
        {/* email */}
        <Skeleton className="h-5 w-60" />
        {/* кнопка */}
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    );
  }

  if (isError || !user) {
    return <p className="text-red-500">Ошибка загрузки</p>;
  }

  return (
    <Card className="max-w-md rounded-2xl shadow-md">
      <CardHeader className="flex flex-col items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback>
            {user.username?.[0]?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl font-bold">{user.username}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Роль:</span> {user.role}
        </p>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button>Редактировать профиль</Button>
      </CardFooter>
    </Card>
  );
}
