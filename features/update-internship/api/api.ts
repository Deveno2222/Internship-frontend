import { instance } from "@/shared/api/axios";
import { UpdateInternshipEmployer } from "../model/types";

export async function UpdateInternship(
  internshipId: string,
  data: UpdateInternshipEmployer
) {
  try {
    const res = await instance.patch(
      `internship/internships/${internshipId}/`,
      data
    );

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
}
