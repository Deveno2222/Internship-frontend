import { ApplicationDetails } from "@/entities/application/ui/ApplicationDetails";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="container mx-auto px-4 py-6">
      <ApplicationDetails id={id} />
    </main>
  );
}
