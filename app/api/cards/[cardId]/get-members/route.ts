export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const result = await db.cardHasUsers.findMany({
      where: {
        cardId: params.cardId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching card members:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
