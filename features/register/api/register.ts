import { instance } from "@/shared/api/axios";

export async function Register(
  email: string,
  username: string,
  role: string,
  password: string,
  password2: string
) {
  try {
    const res = await instance.post("users/register/", {
      email,
      username,
      role,
      password,
      password2,
    });

    return res.data;
  } catch (error) {
    throw new Error(`Register failed: ${error}`);
  }
}
