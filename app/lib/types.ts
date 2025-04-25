export type StatType =
  | "focus"
  | "creativity"
  | "physical"
  | "learning"
  | "social"
  | "wellness";

export interface Quest {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: StatType;
  xp: number; // equal to duration
  completed: boolean;
  skipped: boolean;
  inProgress: boolean;
  startTime?: Date;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  xpCost: number; // equal to duration
  claimed: boolean;
  inProgress: boolean;
  startTime?: Date;
  endTime?: Date;
}
