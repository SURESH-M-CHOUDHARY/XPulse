import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

// In-memory database for users and points
interface User {
  id: string;
  points: number;
}

let users: { [key: string]: User } = {};

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user exists
    if (!users[userId]) {
      users[userId] = {
        id: userId,
        points: 0,
      }
      return NextResponse.json({ points: 0 });
    }

    return NextResponse.json({ points: users[userId].points });
  } catch (error) {
    console.error("[POINTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

type Operation = "add" | "subtract";

export async function PATCH(req: Request): Promise<NextResponse> {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

     // Check if user exists
     if (!users[userId]) {
      users[userId] = {
        id: userId,
        points: 0,
      }
    }


    const body = await req.json();
    const { points, operation } = body as { points: number; operation: Operation };

    const user = users[userId];

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (operation === "subtract" && user.points < points) {
        return new NextResponse("Insufficient points", { status: 400 });
    }

    if (operation === "add") {
        users[userId].points += points;
    } else {
      users[userId].points -= points;
    }

    return NextResponse.json({ points: users[userId].points });
  } catch (error) {
    console.error("[POINTS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
