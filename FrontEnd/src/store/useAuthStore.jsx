import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: true,
      token: "",
      currentUser: { admin: true },
      setToken: (token) => set({ token: token }),
      setCurrentUser: (current) => set({ currentUser: current }),
      setIsAuth: () => set({ isAuthenticated: true }),
      clearAuth: () =>
        set({ isAuthenticated: false, token: "", currentUser: {} }),
    }),
    { name: "authState", storage: createJSONStorage(() => localStorage) }
  )
);
