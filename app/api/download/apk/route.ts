import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.redirect("/AroundU.apk", { status: 302 });
}
