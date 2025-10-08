import { instance } from "@/shared/api/axios";

export async function Logout() {
  try {
    const res = await instance.post("users/logout/");

    return res.data;
  } catch (error) {
    throw new Error(`Logout failed with error: ${error}`);
  }
}
