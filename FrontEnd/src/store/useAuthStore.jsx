import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: "",
      currentUser: { admin: false },
      perfil:null,
      login: (user, token) =>
        set({
          isAuthenticated: true,
          currentUser: user,
          token: token,
        }),
      setPerfil: (perfil) => set({ perfil }),
      logout: () =>
        set({
          isAuthenticated: false,
          currentUser: null,
          token: null,
        }),
    }),
    { name: "auth-State", storage: createJSONStorage(() => localStorage) }
  )
);
