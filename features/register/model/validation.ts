import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email address"),
    username: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    role: z.enum(
      ["student", "teacher", "employer"],
      "Role must be one of user, teacher, or employer"
    ),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    password2: z.string().min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
