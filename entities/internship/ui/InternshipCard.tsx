import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IInternship } from "../model/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { DeleteInternship } from "@/features/delete-internship/ui/DeleteInternship";

interface InternshipCardProps {
  data: IInternship;
  canDelete?: boolean;
}

export function InternshipCard({
  data,
  canDelete = false,
}: InternshipCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>Работодатель: {data.employer}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Создана - {formatDate(data.created_at)}
        </p>
        <p className="text-sm mt-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {data.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Link href={`/internship/${data.id}`}>
          <Button variant="default" size="lg">
            Подробнее
          </Button>
        </Link>
        {canDelete && <DeleteInternship id={String(data.id)} />}
      </CardFooter>
    </Card>
  );
}
