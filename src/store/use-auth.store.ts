import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;

  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: { id: string; name: string; email: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      refreshToken: null,

      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
