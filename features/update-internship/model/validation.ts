import { z } from "zod";

export const updateInternshipSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2).max(250),
  location: z.string().min(2).max(50),
  status: z.enum(["open", "closed", "in_progress", "finished"]),
});

export type UpdateInternshipEmployer = z.infer<typeof updateInternshipSchema>;
