export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // const { userId, orgId } = auth();

    // if (!userId || !orgId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON:", error);
      return new NextResponse("Invalid JSON", { status: 400 });
    }

    const { userReadId, messageId, cardId } = body;

    const result = await db.notifications.create({
      data: {
        userReadId,
        messageId,
        cardId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating notif:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
