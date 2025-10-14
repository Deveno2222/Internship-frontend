import { instance } from "@/shared/api/axios";
import {
  IUpdateApplicationStudent,
  UpdateApplicationStatus,
} from "../model/types";

export const updateApplication = async (
  applicationId: string,
  data: IUpdateApplicationStudent
) => {
  try {
    const res = await instance.patch(
      `internship/applications/${applicationId}/`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const updateApplicationStatus = async (
  applicationId: string,
  data: UpdateApplicationStatus
) => {
  try {
    const res = await instance.patch(
      `internship/applications/${applicationId}/`,
      data
    );

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
