import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid';

interface Reward {
  id: string;
  title: string;
  description: string;
  duration: number;
  xpCost: number;
  userId: string;
  claimed: boolean;
}

// In-memory database for rewards
let rewards: Reward[] = [];


export async function POST(req: Request) {


  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }); // Corrected status code to 401 for unauthorized
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== 'object') {
        return new NextResponse("Invalid request body", { status: 400 });
      }
      
      const { title, description, duration, xpCost } = body as {
        title: string;
        description: string;
        duration: number;
        xpCost: number;
      };
  
    if (!title || !description || duration === undefined || xpCost === undefined) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create new reward
    const newReward: Reward = {
        id: uuidv4(),
        title,
        description,
        duration,
        xpCost,
        userId,
        claimed : false
    };

    rewards.push(newReward);
    return NextResponse.json(newReward);
    
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

    const userRewards = rewards.filter(reward => reward.userId === userId);
    return NextResponse.json(userRewards);

  } catch (error) {
    console.error("[REWARDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
    try {
      const { userId } = auth();
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const body: unknown = await req.json();
      if (!body || typeof body !== 'object') {
        return new NextResponse("Invalid request body", { status: 400 });
      }
  
      const { rewardId } = body as { rewardId: string };
      if (!rewardId) {
        return new NextResponse("Missing rewardId", { status: 400 });
      }
  
      const rewardIndex = rewards.findIndex(reward => reward.id === rewardId);
      if (rewardIndex === -1) {
        return new NextResponse("Reward not found", { status: 404 });
      }
  
      if(rewards[rewardIndex].userId != userId){
        return new NextResponse("Unauthorized", { status: 401 });
      }

      if (rewards[rewardIndex].claimed) {
          return new NextResponse("Reward already claimed", { status: 400 });
        }
      
      rewards[rewardIndex].claimed = true
      return NextResponse.json({ message: "Reward claimed successfully" });
  
    } catch (error) {
      console.error("[REWARDS_PATCH]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}

