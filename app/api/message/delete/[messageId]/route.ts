import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const message = await db.message.delete({
      where: { id: params.messageId },
    });

    return NextResponse.json(message);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
