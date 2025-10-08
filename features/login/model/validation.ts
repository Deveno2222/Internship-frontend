import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Неправильно указана почта"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export type LoginSchema = z.infer<typeof loginSchema>;