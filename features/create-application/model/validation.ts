import { z } from "zod";

export const internshipSchema = z.object({
  internship: z.number(),
  motivation: z.string().max(255),
});


export type InternshipSchema = z.infer<typeof internshipSchema>;