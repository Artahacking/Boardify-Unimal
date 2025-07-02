export const dynamic = 'force-dynamic';


import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ Gunakan findMany karena MongoDB tidak support $queryRaw
    const result = await db.cardHasUsers.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching card members:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
