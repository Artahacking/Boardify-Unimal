import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import _ from "lodash";

export async function POST(req: Request) {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
    return new NextResponse("Content-Type must be multipart/form-data", {
      status: 400,
    });
  }

  let body;
  try {
    body = await req.formData();
  } catch (error) {
    console.error("Invalid JSON:", error);
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const name = body.get("name") as string;
  const url = body.get("url") as File;
  const type = body.get("type") as string;
  const cardId = body.get("cardId") as string;

  if (!name || !url || !type || !cardId) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const buffer = Buffer.from(await url.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  try {
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      const uploadDir = join(process.cwd(), "public", relativeUploadDir);
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${url.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(url.type)}`;
    await writeFile(`${uploadDir}/${filename}`, new Uint8Array(buffer));
    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Save to database
    const result = await db.file.create({
      data: {
        name: name,
        type: type,
        cardId: cardId,
        url: fileUrl,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating message:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
