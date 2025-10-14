export interface IInternship {
  id: number;
  title: string;
  description: string;
  location: string;
  status: "open" | "closed" | "in_progress" | "finished";
  created_at: string;
  employer: number;
}
