"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { IApplication } from "../model/types";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

interface ApplicationCardProps {
  application: IApplication;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusProps = (status: IApplication["status"]) => {
    switch (status) {
      case "approved":
        return { color: "text-green-600", Icon: CheckCircle };
      case "rejected":
        return { color: "text-destructive", Icon: XCircle };
      case "pending":
      default:
        return { color: "text-muted-foreground", Icon: Clock };
    }
  };

  const { color, Icon } = getStatusProps(application.status);

  return (
    <Link href={`/application/${application.id}`}>
      <Card className="hover:shadow-lg transition-shadow border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            {application.internship_title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Студент:</span> {application.student}
          </p>
          <p className="text-sm text-foreground-accent">
            <span className="text-muted-foreground">Мотивационное письмо:</span>{" "}
            {application.motivation}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className={color}>Статус: {application.status}</span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          Отправлено: {new Date(application.created_at).toLocaleDateString()}
        </CardFooter>
      </Card>
    </Link>
  );
}
