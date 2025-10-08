import { instance } from "@/shared/api/axios";
import { IApplication } from "../model/types";

export const fetchApplications = async () => {
  try {
    const res = await instance.get<IApplication[]>("internship/applications/");
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchApplicationById = async (id: string) => {
  try {
    const res = await instance.get(`internship/applications/${id}`);

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
