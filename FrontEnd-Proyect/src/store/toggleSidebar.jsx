import { create } from "zustand";

export const toggleSidebar = create((set) => ({
  toggle: false,
  setToggle: () => set({ toggle: !toggle }),
}));
