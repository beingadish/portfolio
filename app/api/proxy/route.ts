import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BACKEND_HOST = process.env.BACKEND_GATEWAY_URL || "";

const SERVICE_PATH_MAP: Record<string, string> = {
  aroundu: "/aroundu-api",
  clynic: "/clynic-api",
  janmat: "",
  talkingyt: "/talkingyt-api",
};

export async function GET(request: NextRequest) {
  return forwardRequest(request);
}

export async function POST(request: NextRequest) {
  return forwardRequest(request);
}

export async function PUT(request: NextRequest) {
  return forwardRequest(request);
}

export async function DELETE(request: NextRequest) {
  return forwardRequest(request);
}

async function forwardRequest(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service") || "janmat";
  const path = searchParams.get("path") || "/api/health";

  if (!BACKEND_HOST) {
    // If backend host is not configured, return mock/sandbox response for safety
    return NextResponse.json(
      {
        status: "simulated_success",
        message: "Endpoint live test executed via secure portfolio gateway sandbox.",
        service,
        path,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }

  const prefix = SERVICE_PATH_MAP[service] ?? "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const targetUrl = `${BACKEND_HOST.replace(/\/$/, "")}${prefix}${normalizedPath}`;

  try {
    const headers = new Headers();
    const contentType = request.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);
    headers.set("accept", "application/json");

    let body: string | undefined;
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      try {
        body = await request.text();
      } catch {
        // body empty or already consumed
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body && body.length > 0 ? body : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const rawText = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { raw: rawText };
    }

    return NextResponse.json(data, {
      status: res.status,
      headers: {
        "x-proxied-by": "portfolio-gateway",
      },
    });
  } catch {
    return NextResponse.json(
      {
        status: "gateway_timeout",
        message: "Backend service probe timed out or gateway is temporarily unreachable.",
        service,
        path,
      },
      { status: 504 }
    );
  }
}
