
import { create } from "zustand";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  security_question: string;
  [key: string]: any;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
