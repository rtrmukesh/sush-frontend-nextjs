import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import InstagramService from "../instagram.service";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");

    const decoded = verifyToken(token);

    if (!decoded || typeof decoded === "string" || !("user_id" in decoded)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get Instagram integration from DB
    const integration = await prisma.integration.findFirst({
      where: { object_name: "INSTAGRAM", object_id: decoded.user_id },
    });

    if(integration?.insta_account_type == "PERSONAL"){
      return NextResponse.json(
        { success: false, error: "Please Connect a Business Account" },
        { status: 400 }
      );  
    }

    if (!integration) {
      return NextResponse.json(
        { success: false, error: "Integration not found" },
        { status: 404 }
      );
    }

    if (!integration?.insta_business_id || !integration?.access_token) {
      return NextResponse.json(
        { success: false, error: "Connect Your Instagram" },
        { status: 400 }
      );
    }

    const mediaList = await InstagramService.getMedia(
      integration?.insta_business_id,
      integration.access_token
    );

    return NextResponse.json({ success: true, data: mediaList.data || [] });
  } catch (err: any) {
    console.error("Error fetching Instagram media:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
