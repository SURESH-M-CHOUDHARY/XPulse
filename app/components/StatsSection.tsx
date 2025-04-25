"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Sample data - replace with real data from your backend
const statsData = [
  { stat: "Focus", value: 80, fullMark: 100 },
  { stat: "Creativity", value: 65, fullMark: 100 },
  { stat: "Physical", value: 70, fullMark: 100 },
  { stat: "Learning", value: 85, fullMark: 100 },
  { stat: "Social", value: 60, fullMark: 100 },
  { stat: "Wellness", value: 75, fullMark: 100 },
];

export function StatsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Character Stats</h2>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Stats Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={statsData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Stats"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
