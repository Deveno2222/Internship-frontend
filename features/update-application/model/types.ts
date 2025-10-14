export interface IUpdateApplicationStudent {
  motivation: string;
}

export interface UpdateApplicationStatus {
  status: "pending" | "approved" | "rejected";
}
