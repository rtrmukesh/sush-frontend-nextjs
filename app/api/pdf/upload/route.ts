import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import R2Service from "@/services/R2Service";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    // Parse multipart/form-data manually
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const size = formData.get("size") as string;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;

    // Upload to R2
    await R2Service.getClientConfig().send(
      new PutObjectCommand({
        Bucket: R2Service.getR2Config().bucket || "",
        Key: fileName,
        Body: Buffer.from(arrayBuffer),
        ContentType: "application/pdf",
      })
    );

    const createData = {
      name: name,
      description: description,
      size: size,
      category: category,
      file_path: fileName,
      object_name: "PDF"
    };

    await prisma.media.create({
      data: createData,
    });

    return NextResponse.json({
      success: true,
      fileName,
      fileUrl: fileName,
      message: "File uploaded successfully",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
