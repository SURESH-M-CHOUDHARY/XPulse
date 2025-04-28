export type StatType =
    | "focus"
    | "creativity"
    | "physical"
    | "learning"
    | "social"
    | "wellness";

export interface Reward {
  id: string;
  title: string;
  description: string;
  duration: number;
  xpCost: number;
  claimed: boolean;
  inProgress: boolean;
  startTime?: Date;
  endTime?: Date;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: StatType;
  xp: number;
  completed: boolean;
  skipped: boolean;
  inProgress: boolean;
  startTime?: Date;
}
