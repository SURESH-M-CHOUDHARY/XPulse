"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer } from "@/components/Timer";

interface RewardCardProps {
  title: string;
  description: string;
  points: number;
  duration: number;
}

export function RewardCard({
  title,
  description,
  points,
  duration,
}: RewardCardProps) {
  const [isActive, setIsActive] = useState(false);

  const startReward = () => {
    setIsActive(true);
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  };

  const onTimerComplete = () => {
    setIsActive(false);
    // Show notification when timer completes
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Time's Up!", {
        body: `Your ${title} time has ended.`,
        icon: "/icons/icon-192x192.png",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal">-{points} XP</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {isActive && (
          <div className="mt-4">
            <Timer duration={duration} onComplete={onTimerComplete} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={startReward} disabled={isActive}>
          {isActive ? "In Progress..." : `Redeem (${points} XP)`}
        </Button>
      </CardFooter>
    </Card>
  );
}
