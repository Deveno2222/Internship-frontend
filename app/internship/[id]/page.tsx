// import { fetchInternshipId } from "@/entities/internship/api/api";

import { InternshipDetails } from "@/entities/internship/ui/InternshipDetails";

export default async function InternshipPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  // const internship = await fetchInternshipId(id);

  // console.log(internship);

  return (
    <div className="container mx-auto px-4 py-6">
      <InternshipDetails id={id} />
    </div>
  );
}
