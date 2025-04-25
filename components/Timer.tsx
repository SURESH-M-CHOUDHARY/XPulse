"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  duration: number; // in minutes
  onComplete: () => void;
}

export function Timer({ duration, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert to seconds
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        setProgress((newTime / (duration * 60)) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, duration, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-2">
      <Progress value={progress} />
      <p className="text-center text-sm">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
