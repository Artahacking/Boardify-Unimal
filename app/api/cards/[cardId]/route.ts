import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
    try {
        const { userId, orgId } = auth();

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const card = await db.card.findUnique({
            where: {
                id: params.cardId,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
            include: {
                list: {
                    select: {
                        title: true,
                        boardId: true,
                    },
                },
                messages: {
                    select: {
                        id: true,
                        userId: true,
                        message: true,
                        sender: true,
                        time: true,
                    },
                    orderBy: {
                        time: "asc",
                    },
                },
                file: {
                    select: {
                        id: true,
                        name: true,
                        url: true,
                        type: true,
                    },
                },
            },
        });

        return NextResponse.json(card);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
