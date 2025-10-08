import { instance } from "@/shared/api/axios";
import { ICreateInternship } from "../model/types";

export const createInternship = async (data: ICreateInternship) => {
  try {
    const res = await instance.post("internship/internships/", data);

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
