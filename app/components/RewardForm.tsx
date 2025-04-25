"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reward } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface RewardFormProps {
  onSubmit: (
    reward: Omit<
      Reward,
      "id" | "claimed" | "inProgress" | "startTime" | "endTime"
    >
  ) => void;
}

export function RewardForm({ onSubmit }: RewardFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !duration) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const durationNumber = parseInt(duration);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      toast({
        title: "Error",
        description: "Duration must be a positive number",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      title,
      description,
      duration: durationNumber,
      xpCost: durationNumber, // XP cost equals duration
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDuration("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Reward title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Reward description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Create Reward
      </Button>
    </form>
  );
}
