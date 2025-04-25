"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StatType, Quest } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface QuestFormProps {
  onSubmit: (
    quest: Omit<
      Quest,
      "id" | "completed" | "skipped" | "inProgress" | "startTime"
    >
  ) => void;
}

export function QuestForm({ onSubmit }: QuestFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState<StatType>("focus");
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
      type,
      xp: durationNumber, // XP equals duration
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDuration("");
    setType("focus");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Quest title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Quest description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Select
            value={type}
            onValueChange={(value: StatType) => setType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="focus">Focus</SelectItem>
              <SelectItem value="creativity">Creativity</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Create Quest
      </Button>
    </form>
  );
}
