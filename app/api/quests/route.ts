import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, duration, type, xp } = body;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      // Create user if they don't exist
      const newUser = await prisma.user.create({
        data: {
          clerkId: userId,
        },
      });

      const quest = await prisma.quest.create({
        data: {
          title,
          description,
          duration,
          type: type.toUpperCase(),
          xp,
          userId: newUser.id,
        },
      });

      return NextResponse.json(quest);
    }

    const quest = await prisma.quest.create({
      data: {
        title,
        description,
        duration,
        type: type.toUpperCase(),
        xp,
        userId: user.id,
      },
    });

    return NextResponse.json(quest);
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

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    const quests = await prisma.quest.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(quests);
  } catch (error) {
    console.error("[QUESTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
