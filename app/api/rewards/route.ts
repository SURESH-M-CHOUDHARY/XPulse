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
    const { title, description, duration, xpCost } = body;

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

      const reward = await prisma.reward.create({
        data: {
          title,
          description,
          duration,
          xpCost,
          userId: newUser.id,
        },
      });

      return NextResponse.json(reward);
    }

    const reward = await prisma.reward.create({
      data: {
        title,
        description,
        duration,
        xpCost,
        userId: user.id,
      },
    });

    return NextResponse.json(reward);
  } catch (error) {
    console.error("[REWARDS_POST]", error);
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

    const rewards = await prisma.reward.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(rewards);
  } catch (error) {
    console.error("[REWARDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
