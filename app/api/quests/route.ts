import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import {v4 as uuidv4} from 'uuid'

const validQuestTypes = ["DAILY", "WEEKLY", "EVENT"];

interface Quest {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: string;
  xp: number;
  userId: string;
}

const quests: Quest[] = [];

export async function POST(req: Request) {
try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const body = await req.json() as {
      title: string;
      description: string;
      duration: number;
      type: string;
      xp: number;
    };
    const { title, description, duration, type, xp } = body;
    if (!validQuestTypes.includes(type.toUpperCase())) {
      return new NextResponse("Invalid quest type", { status: 400 });
    }

    const newQuest: Quest = {
      id: uuidv4(),
      title: title,
      description: description,
      duration: duration,
      type: type.toUpperCase(),
      xp: xp,
      userId: userId,
    };
    quests.push(newQuest);

    return NextResponse.json(newQuest);
  } catch (error) {
    console.error("[QUESTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userQuests = quests.filter((quest) => quest.userId === userId);

    return NextResponse.json(userQuests);
  } catch (error) {
    console.error("[QUESTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
