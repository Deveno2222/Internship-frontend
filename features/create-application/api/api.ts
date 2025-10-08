import { instance } from "@/shared/api/axios";
import { InternshipSchema } from "../model/validation";

export async function createApplication(data: InternshipSchema) {
  try {
    console.log(data)
    const res = await instance.post("internship/applications/", data);

    console.log(res);

    return res;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
