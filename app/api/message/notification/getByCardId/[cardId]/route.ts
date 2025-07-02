import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    // const { userId, orgId } = auth();

    // if (!userId || !orgId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const notification = await db.notifications.findMany({
      where: { cardId: params.cardId },
      select: { userReadId: true, messageId: true, cardId: true, id: true },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error("Error during message update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
