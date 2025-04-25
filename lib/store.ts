import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PointsState {
  points: number;
  addPoints: (amount: number) => void;
  subtractPoints: (amount: number) => void;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set) => ({
      points: 0,
      addPoints: (amount) =>
        set((state) => ({ points: state.points + amount })),
      subtractPoints: (amount) =>
        set((state) => ({ points: state.points - amount })),
    }),
    {
      name: "points-storage",
    }
  )
);
