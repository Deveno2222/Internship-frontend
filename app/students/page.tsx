import { StudentsList } from "@/entities/student/ui/StudentsList";

export default function StudentsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h2 className="text-center mb-6 text-2xl">Список студентов</h2>
      <StudentsList />
    </main>
  );
}
