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
import { UserButton } from "@clerk/nextjs";
import { Quest } from "@/lib/types";
import { QuestForm } from "@/app/components/QuestForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Sample default quests
const defaultQuests: Quest[] = [
  {
    id: "1",
    title: "Morning Exercise",
    description: "Complete your morning workout routine",
    duration: 30,
    type: "physical",
    xp: 30,
    completed: false,
    skipped: false,
    inProgress: false,
  },
  {
    id: "2",
    title: "Study Session",
    description: "Focus on learning something new",
    duration: 45,
    type: "learning",
    xp: 45,
    completed: false,
    skipped: false,
    inProgress: false,
  },
  {
    id: "3",
    title: "Meditation",
    description: "Practice mindfulness",
    duration: 15,
    type: "wellness",
    xp: 15,
    completed: false,
    skipped: false,
    inProgress: false,
  },
];

export default function DashboardPage() {
  const [quests, setQuests] = useState<Quest[]>(defaultQuests);
  const { points: xp, addPoints: addXP } = usePointsStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addQuest = (
    newQuest: Omit<
      Quest,
      "id" | "completed" | "skipped" | "inProgress" | "startTime"
    >
  ) => {
    const quest: Quest = {
      ...newQuest,
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
      skipped: false,
      inProgress: false,
    };

    setQuests([...quests, quest]);
    setIsDialogOpen(false);
    toast({
      title: "Quest Added",
      description: "Your new quest has been created successfully.",
    });
  };

  const startQuest = (questId: string) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId) {
          return {
            ...quest,
            inProgress: true,
            startTime: new Date(),
          };
        }
        return quest;
      })
    );

    toast({
      title: "Quest Started",
      description: `Timer started for ${
        quests.find((q) => q.id === questId)?.duration
      } minutes`,
    });

    // Set timer to complete quest
    const foundQuest = quests.find((q) => q.id === questId);
    if(foundQuest){
        setTimeout(() => {
          completeQuest(questId);
        }, foundQuest.duration * 60 * 1000);
    }
  };




  const completeQuest = (questId: string) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId && !quest.completed) {
          addXP(quest.xp);
          toast({
            title: "Quest Completed",
            description: `You earned ${quest.xp} XP!`,
          });
          return {
            ...quest,
            completed: true,
            inProgress: false,
          };
        }
        return quest;
      })
    );

  };

  const skipQuest = (questId: string) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId) {
          toast({
            title: "Quest Skipped",
            description: "No XP earned for this quest.",
          });
          return {
            ...quest,
            skipped: true,
            inProgress: false,
          };
        }
        return quest;
      })
    );
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">XPulse</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/dashboard"
              >
                Dashboard
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/dashboard/rewards"
              >
                Rewards
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/dashboard/stats"
              >
                Stats
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="text-sm text-muted-foreground">XP: {xp}</div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <main className="container py-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Daily Quests</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Create New Quest</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Quest</DialogTitle>
                </DialogHeader>
                <QuestForm onSubmit={addQuest} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {quests.map((quest) => (
              <Card key={quest.id}>
                <CardHeader>
                  <CardTitle>{quest.title}</CardTitle>
                  <CardDescription>{quest.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {quest.xp} XP • {quest.type} • {quest.duration} minutes
                      </span>
                    </div>
                    {quest.inProgress && (
                      <Progress 
                        value={(() => {
                          if (quest.duration === 0) return 0;
                          const elapsedTime = quest.startTime ? new Date().getTime() - quest.startTime.getTime() : 0;
                          let progress = (elapsedTime / (quest.duration * 60 * 1000)) * 100;
                          if (progress < 0) progress = 0;
                          if (progress > 100) progress = 100;
                          return progress;
                        })()} />
                    )}

                    <div className="flex gap-2">
                      {!quest.completed &&
                        !quest.skipped &&
                        !quest.inProgress && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => startQuest(quest.id)}
                            >
                              Start
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => completeQuest(quest.id)}
                            >
                              Mark Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => skipQuest(quest.id)}
                            >
                              Skip
                            </Button>
                          </>
                        )}
                      {quest.inProgress && (
                        <span className="text-sm">Quest in progress...</span>
                      )}
                      {quest.completed && (
                        <span className="text-sm text-green-600">
                          Completed!
                        </span>
                      )}
                      {quest.skipped && (
                        <span className="text-sm text-yellow-600">Skipped</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

