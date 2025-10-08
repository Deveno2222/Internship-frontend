import { create } from "zustand";

type User = {
  id: number;
  email: string;
  username: string;
  role: string;
} | null;

interface AuthState {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null });
  },
}));
