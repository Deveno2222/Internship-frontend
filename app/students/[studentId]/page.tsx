import { ApplicationListStudent } from "@/entities/application/ui/ApplicationListStudent";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;

  return (
    <main className="container mx-auto px-4 py-6">
      <ApplicationListStudent studentId={studentId} />
    </main>
  );
}
