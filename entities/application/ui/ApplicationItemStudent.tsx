import { Badge } from "@/components/ui/badge";
import { IApplication } from "../model/types";

interface ApplicationItemStudentProps {
  application: IApplication;
}

export function ApplicationItemStudent({
  application,
}: ApplicationItemStudentProps) {
  const getStatusColor = (status: "approved" | "rejected" | "pending") => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-600";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-600";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-600";
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-[60px] px-5 border-b border-border bg-card hover:bg-accent/50 transition">
      <div className="flex items-center gap-6 w-full">
        <div className="font-medium text-card-foreground w-[35%] truncate">
          {application.internship_title}
        </div>
        <div className="text-sm text-card-foreground/70 w-[25%] truncate">
          {application.student}
        </div>
        <div className="text-sm text-card-foreground/50 w-[25%]">
          {new Date(application.created_at).toLocaleDateString("ru-RU")}
        </div>
      </div>

      <Badge
        className={`${getStatusColor(
          application.status
        )} text-xs font-medium px-3 py-1 rounded-full capitalize`}
      >
        {application.status}
      </Badge>
    </div>
  );
}
