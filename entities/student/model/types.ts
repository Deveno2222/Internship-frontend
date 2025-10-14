export interface IStudent {
  id: number;
  email: string;
  role: "student" | "teacher" | "employer";
  username: string;
}
