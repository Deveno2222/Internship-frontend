import { instance } from "@/shared/api/axios";

export async function deleteApplication({ id }: { id: string }) {
  try {
    const res = await instance.delete(`internship/applications/${id}/`);

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
