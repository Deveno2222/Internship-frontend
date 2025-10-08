export interface IApplication {
  id: number;
  internship: number;        // ID стажировки
  student: string;           // username студента
  internship_title: string;  // title стажировки
  motivation: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;        // ISO-строка даты
}
