import { NextRequest } from "next/server";

const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/(?:[a-zA-Z0-9-]+\.)*beingadish\.blog(?::\d+)?$/,
  /^https?:\/\/(?:[a-zA-Z0-9-]+\.)*vercel\.app(?::\d+)?$/,
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/,
];

export function getSafeCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get("origin");
  const headers: Record<string, string> = {
    Vary: "Origin",
  };

  if (origin && ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin))) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Headers"] =
      "Content-Type, Authorization, X-Google-API-Key, Accept";
    headers["Access-Control-Max-Age"] = "86400";
  }

  return headers;
}
