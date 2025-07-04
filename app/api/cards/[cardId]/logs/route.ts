export const dynamic = 'force-dynamic';


import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: {
          in: [ENTITY_TYPE.CARD, ENTITY_TYPE.MESSAGE],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
