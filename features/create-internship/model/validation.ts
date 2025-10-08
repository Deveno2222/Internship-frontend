import { z } from "zod";

export const createInternshipSchema = z.object({
  title: z.string().min(3, "Название слишком короткое"),
  description: z.string().min(10, "Описание слишком короткое"),
  location: z.string().min(2, "Укажите место стажировки"),
  status: z.enum(["open", "closed", "in_progress", "finished"]).optional(),
});

export type CreateInternshipForm = z.infer<typeof createInternshipSchema>;
