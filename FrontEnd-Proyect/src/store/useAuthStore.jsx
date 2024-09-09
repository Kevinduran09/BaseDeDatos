import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      currentUser: "",
      token: "",
      setToken: (token) => set({ token: token }),
      setIsAuth: () => set({ isAuthenticated: true }),
      setCurrentUser: (currentUser) => set({ currentUser: currentUser }),
      clear: () => set({ isAuthenticated: false, token: "", currentUser: "" }),
    }),
    {
      name: "auth-storage",
      getStorage: () => createJSONStorage(() => sessionStorage),
    }
  )
);
