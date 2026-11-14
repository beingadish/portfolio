import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Disallow direct access to static index.html entry points; redirect to clean route
  if (pathname.endsWith("/index.html")) {
    const cleanPath = pathname.replace(/\/index\.html$/, "");
    return NextResponse.redirect(new URL(cleanPath, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/janmat/index.html",
    "/talkingyt/index.html",
    "/clynic/index.html",
    "/aroundu/index.html",
  ],
};
