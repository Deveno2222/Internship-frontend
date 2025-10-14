import { instance } from "@/shared/api/axios";

export const fetchStudents = async () => {
  try {
    const res = await instance.get("users/students/");
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
