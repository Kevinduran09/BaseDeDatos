import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme: theme });
      },
    }),
    {
      name: "themeState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
