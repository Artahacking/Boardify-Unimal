export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PUT(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const { userId, orgId, orgRole } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON payload:", error);
      return new NextResponse("Invalid JSON", { status: 400 });
    }

    const notification = await db.notifications.findUnique({
      where: { messageId: params.messageId },
      select: { userReadId: true },
    });

    if (!notification) {
      return new NextResponse("Notification not found", { status: 404 });
    }

    const isReadAdmin = orgRole?.toLowerCase().includes("member") ? 0 : 1;
    if (isReadAdmin === 1) {
      await db.message.update({
        where: { id: params.messageId },
        data: { isReadAdmin },
      });
    }

    let userReadId = notification.userReadId
      ? notification.userReadId.split(",")
      : [];

    if (!userReadId.includes(userId)) {
      userReadId.push(userId);

      const messageUpdate = await db.notifications.update({
        where: { messageId: params.messageId },
        data: { userReadId: userReadId.join(",") },
      });

      return NextResponse.json(messageUpdate);
    } else {
      return new NextResponse("User already read notification", {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error during message update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
