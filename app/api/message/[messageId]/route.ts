export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const { userId, orgId } = auth();

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

    const { message } = body;
    if (!message || typeof message !== "string" || message.trim() === "") {
      return new NextResponse("Invalid message content", { status: 400 });
    }
    if (!params.messageId || typeof params.messageId !== "string") {
      return new NextResponse("Invalid message ID", { status: 400 });
    }

    const messageUpdate = await db.message.update({
      where: { id: params.messageId },
      data: { message: message.trim(), updatedAt: new Date().toISOString() },
    });

    await createAuditLog({
      entityTitle: messageUpdate.message,
      entityId: messageUpdate.cardId,
      entityType: ENTITY_TYPE.MESSAGE,
      action: ACTION.UPDATE,
    });

    return NextResponse.json(messageUpdate);
  } catch (error) {
    console.error("Error during message update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
