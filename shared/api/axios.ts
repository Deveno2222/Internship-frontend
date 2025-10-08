import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


let isRefreshing = false;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // если уже пробуем refresh → сразу logout
      if (isRefreshing) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // пробуем обновить access-токен
        await instance.post("/users/refresh/");

        isRefreshing = false;
        // повторяем оригинальный запрос
        return instance(originalRequest);
      } catch (err) {
        // refresh тоже 401 → logout
        isRefreshing = false;
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);