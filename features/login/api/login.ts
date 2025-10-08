import { instance } from "@/shared/api/axios";

export async function Login(email: string, password: string) {
  try {
    const res = await instance.post("users/login/", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
}
