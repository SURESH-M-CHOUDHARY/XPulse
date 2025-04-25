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
import { Progress } from "@/components/ui/progress";

interface TaskCardProps {
  title: string;
  description: string;
  points: number;
  timeLimit: number;
}

export function TaskCard({
  title,
  description,
  points,
  timeLimit,
}: TaskCardProps) {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTask = () => {
    setIsRunning(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 100 / (timeLimit * 60);
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal">+{points} XP</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 space-y-2">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">
            Time Limit: {timeLimit} minutes
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={startTask} disabled={isRunning}>
          {isRunning ? "In Progress..." : "Start Task"}
        </Button>
      </CardFooter>
    </Card>
  );
}
