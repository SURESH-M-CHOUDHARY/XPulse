"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { usePointsStore } from "@/lib/store";
import { Reward } from "@/lib/types";
import { RewardForm } from "@/app/components/RewardForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Sample default rewards
const defaultRewards: Reward[] = [
  {
    id: "1",
    title: "Social Media Break",
    description: "Take a short break to check social media",
    duration: 10,
    xpCost: 10,
    claimed: false,
    inProgress: false,
  },
  {
    id: "2",
    title: "Gaming Session",
    description: "Play your favorite game",
    duration: 30,
    xpCost: 30,
    claimed: false,
    inProgress: false,
  },
  {
    id: "3",
    title: "Movie Time",
    description: "Watch an episode of your favorite show",
    duration: 45,
    xpCost: 45,
    claimed: false,
    inProgress: false,
  },
];

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>(defaultRewards);
  const { points: xp, subtractPoints: subtractXP } = usePointsStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addReward = (
    newReward: Omit<
      Reward,
      "id" | "claimed" | "inProgress" | "startTime" | "endTime"
    >
  ) => {
    const reward: Reward = {
      ...newReward,
      id: Math.random().toString(36).substr(2, 9),
      claimed: false,
      inProgress: false,
    };

    setRewards([...rewards, reward]);
    setIsDialogOpen(false);
    toast({
      title: "Reward Added",
      description: "Your new reward has been created successfully.",
    });
  };

  const claimReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return;

    if (xp < reward.xpCost) {
      toast({
        title: "Not enough XP",
        description: `You need ${reward.xpCost} XP to claim this reward.`,
        variant: "destructive",
      });
      return;
    }

    subtractXP(reward.xpCost);
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + reward.duration * 60 * 1000);

    setRewards(
      rewards.map((r) => {
        if (r.id === rewardId) {
          return {
            ...r,
            claimed: true,
            inProgress: true,
            startTime,
            endTime,
          };
        }
        return r;
      })
    );

    toast({
      title: "Reward Claimed",
      description: `Timer started for ${reward.duration} minutes. Enjoy!`,
    });

    // Set timer to end reward
    setTimeout(() => {
      setRewards(
        rewards.map((r) => {
          if (r.id === rewardId) {
            toast({
              title: "Reward Ended",
              description: "Your reward time has ended.",
            });
            return {
              ...r,
              inProgress: false,
            };
          }
          return r;
        })
      );
    }, reward.duration * 60 * 1000);
  };

  return (
    <div className="container py-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Available Rewards
          </h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create New Reward</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Reward</DialogTitle>
              </DialogHeader>
              <RewardForm onSubmit={addReward} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {rewards.map((reward) => (
            <Card key={reward.id}>
              <CardHeader>
                <CardTitle>{reward.title}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {reward.xpCost} XP • {reward.duration} minutes
                    </span>
                  </div>
                  {reward.inProgress && (
                    <Progress
                      value={
                        ((new Date().getTime() -
                          (reward.startTime?.getTime() || 0)) /
                          (reward.duration * 60 * 1000)) *
                        100
                      }
                    />
                  )}
                  <div className="flex gap-2">
                    {!reward.claimed && !reward.inProgress && (
                      <Button
                        size="sm"
                        onClick={() => claimReward(reward.id)}
                        disabled={xp < reward.xpCost}
                      >
                        Claim ({reward.xpCost} XP)
                      </Button>
                    )}
                    {reward.inProgress && (
                      <span className="text-sm">Reward in progress...</span>
                    )}
                    {reward.claimed && !reward.inProgress && (
                      <span className="text-sm text-green-600">Claimed!</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
