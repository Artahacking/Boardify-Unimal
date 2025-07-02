export const dynamic = 'force-dynamic';


import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const requestData = await req.json();

    // Hapus semua pengguna yang terkait dengan cardId ini
    await db.cardHasUsers.deleteMany({
      where: {
        cardId: params.cardId,
      },
    });

    // Masukkan ulang user baru jika ada
    if (requestData.users.length > 0) {
      const values = requestData.users.map((userId: string) => ({
        id: uuidv4(),
        cardId: params.cardId,
        userId,
      }));

      await db.cardHasUsers.createMany({
        data: values,
      });
    }

    return NextResponse.json("OK");
  } catch (error) {
    console.error("Error updating card members:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
