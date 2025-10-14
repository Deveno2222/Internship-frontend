export interface UpdateInternshipEmployer {
  title?: string;
  description?: string;
  location?: string;
  status?: "open" | "closed" | "in_progress" | "finished";
}
