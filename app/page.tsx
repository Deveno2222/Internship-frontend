import { InternshipList } from "@/entities/internship/ui/InternshipList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-medium mb-6">Список стажировок</h2>
      <InternshipList />
    </div>
  );
}
