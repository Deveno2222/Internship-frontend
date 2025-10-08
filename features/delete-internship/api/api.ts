import { instance } from "@/shared/api/axios";

export const deleteInternship = async (id: string) => {
  try {
    const res = await instance.delete(`internship/internships/${id}/`);

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
