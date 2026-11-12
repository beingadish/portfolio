import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const downloadUrl = "https://beingadish-releases.s3.ap-south-1.amazonaws.com/AroundU.apk";
  return NextResponse.redirect(downloadUrl, {
    status: 302,
    headers: {
      "Content-Disposition": 'attachment; filename="AroundU.apk"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
