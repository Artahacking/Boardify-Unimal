export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email";
import { db } from "@/lib/db";

export async function POST(req: any, res: any) {
  try {
    const unreadMessages = await db.message.findMany({
      where: {
        isReadAdmin: 0,
        isSendEmail: {
          in: [0, 1],
        },
      },
      include: {
        card: {
          select: {
            title: true,
            list: {
              select: {
                board: {
                  select: {
                    id: true,
                    adminEmail: true, // Ambil email admin dari board
                  },
                },
              },
            },
          },
        },
      },
    });

    if (unreadMessages.length >= 1) {
      unreadMessages.forEach(async (unreadMessage) => {
        const { card } = unreadMessage;
        const { list } = card;
        const { board } = list;
        const { adminEmail, id } = board;

        const time = new Date(unreadMessage.time);
        time.setSeconds(0, 0);
	const timePlusOne = time.setMinutes(time.getHours() + 1);
        const timePlusEight = time.setHours(time.getHours() + 9);
        const currentTime = new Date();
        currentTime.setSeconds(0, 0);

        if (unreadMessage.isSendEmail === 0) {
          if (timePlusOne === currentTime.getTime()) {
            await db.message.update({
              where: {
                id: unreadMessage.id,
              },
              data: {
                isSendEmail: 1,
              },
            });

            sendEmail({
              to: adminEmail,
              subject: "Anda memiliki pesan belum terbaca (1 jam)",
              text: `Anda memiliki pesan yang belum dibaca di card "${card.title}" dari pengirim "${unreadMessage.sender}" pada "${unreadMessage.time}"`,
              link: `https://koperasicks.store/board/${id}`,
            });
            console.log("Email sent to", adminEmail);
          }
        } else if (unreadMessage.isSendEmail === 1) {
          if (timePlusEight === currentTime.getTime()) {
            await db.message.update({
              where: {
                id: unreadMessage.id,
              },
              data: {
                isSendEmail: 2,
              },
            });

            sendEmail({
              to: adminEmail,
              subject: "Anda memiliki pesan belum terbaca (8 jam)",
              text: `Anda memiliki pesan yang belum dibaca di card "${card.title}" dari pengirim "${unreadMessage.sender}" pada "${unreadMessage.time}"`,
              link: `https://koperasicks.store/board/${id}`,
            });
            console.log("Email sent to", adminEmail);
          }
        }
      });
    }

    return NextResponse.json({ message: unreadMessages });
    // return NextResponse.json(unreadMessages);
  } catch (error) {
    console.error("Error starting scheduler:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
