import { instance } from "@/shared/api/axios";

export const getUserInfo = async () => {
  try {
    const res = await instance.get("users/user-info/");

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const refreshToken = async () => {
  try {
    const res = await instance.post("users/refresh/");

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchUser = async () => {
  try {
    const res = await instance.get("users/user-info/");

    return res.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
