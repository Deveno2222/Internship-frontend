import Link from "next/link";
import { IStudent } from "../model/types";

interface StudentItemProps {
  student: IStudent;
}

export function StudentItem({ student }: StudentItemProps) {
  return (
    <div
      className="flex items-center justify-between w-full h-[60px] px-5 border-b border-border hover:bg-accent transition-colors"
    >
      <div className="flex flex-col overflow-hidden">
        <Link
          href={`/students/${student.id}`}
          className="text-card-foreground font-medium hover:underline truncate"
        >
          {student.username}
        </Link>
        <p className="text-sm text-muted-foreground truncate">
          {student.email}
        </p>
      </div>

      <span className="text-xs text-muted-foreground uppercase tracking-wide">
        Student
      </span>
    </div>
  );
}
