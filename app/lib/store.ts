import { create } from "zustand";
import { persist } from "zustand/middleware";

interface XPStore {
  xp: number;
  addXP: (amount: number) => void;
  subtractXP: (amount: number) => void;
}

export const usePointsStore = create<XPStore>()(
  persist(
    (set) => ({
      xp: 0,
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      subtractXP: (amount) => set((state) => ({ xp: state.xp - amount })),
    }),
    {
      name: "xp-storage",
    }
  )
);
