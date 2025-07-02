import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const { userId, orgId, orgRole } = auth();
    if (!userId || !orgId) {
      console.error("Unauthorized");
    }

    const isReadAdmin = orgRole?.toLowerCase().includes("member") ? 0 : 1;
    if (isReadAdmin === 1) {
      await db.message.update({
        where: { id: params.messageId },
        data: { isReadAdmin },
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Error during message update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
