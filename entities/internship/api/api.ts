import { instance } from "@/shared/api/axios";
import { IInternship } from "../model/types";

export async function fetchInternships(): Promise<IInternship[]> {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

  const res = await instance.get<IInternship[]>("internship/internships/");

  return res.data;
}

export async function fetchInternshipId(id: string): Promise<IInternship> {
  const res = await instance.get<IInternship>(`internship/internships/${id}`);

  return res.data;
}

export async function fetchMineInternships(): Promise<IInternship[]> {
  const res = await instance.get<IInternship[]>(
    "internship/internships/?mine=true"
  );

  return res.data;
}
