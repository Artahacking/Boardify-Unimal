import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { userId, orgId, orgRole } = auth();

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let body;
        try {
            body = await req.json();
        } catch (error) {
            console.error("Invalid JSON:", error);
            return new NextResponse("Invalid JSON", { status: 400 });
        }

        const isReadAdmin = orgRole?.toLowerCase().includes("member") ? 0 : 1;
        const { cardId, sender, message, time, profileImageUrl } = body;

        const result = await db.message.create({
            data: {
                userId,
                cardId,
                sender,
                message,
                profileImageUrl,
                time,
                isReadAdmin,
            },
        });

        await createAuditLog({
            entityTitle: result.message,
            entityId: result.cardId,
            entityType: ENTITY_TYPE.MESSAGE,
            action: ACTION.CREATE,
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error creating message:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
