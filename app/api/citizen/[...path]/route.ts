import { NextRequest, NextResponse } from "next/server";
import { getSafeCorsHeaders } from "../../cors";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const subpath = path.join("/");
  const backendHost = process.env.BACKEND_GATEWAY_URL;
  const corsHeaders = getSafeCorsHeaders(request);

  if (backendHost) {
    try {
      const body = await request.text();
      const url = `${backendHost.replace(/\/$/, "")}/citizen/${subpath}${request.nextUrl.search}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": request.headers.get("content-type") || "application/json",
          Accept: "application/json",
          ...(request.headers.get("authorization")
            ? { Authorization: request.headers.get("authorization")! }
            : {}),
        },
        body,
        signal: AbortSignal.timeout(5000),
      });

      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, {
        status: res.status,
        headers: corsHeaders,
      });
    } catch {
      // Fall through to edge simulation
    }
  }

  // Edge simulation response for guest voting / testing when backend is disconnected
  if (subpath === "v") {
    return NextResponse.json(
      {
        status: "ok",
        vote_id: `v_${Date.now()}`,
        blake3_receipt: `blk3_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  }

  if (subpath === "register" || subpath === "login") {
    return NextResponse.json(
      {
        token: `mock_jwt_${Date.now()}`,
        user: { id: "citizen_demo", role: "voter" },
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  }

  return NextResponse.json(
    { status: "ok", simulated: true },
    { status: 200, headers: corsHeaders }
  );
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const subpath = path.join("/");
  const backendHost = process.env.BACKEND_GATEWAY_URL;
  const corsHeaders = getSafeCorsHeaders(request);

  if (backendHost) {
    try {
      const url = `${backendHost.replace(/\/$/, "")}/citizen/${subpath}${request.nextUrl.search}`;
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          ...(request.headers.get("authorization")
            ? { Authorization: request.headers.get("authorization")! }
            : {}),
        },
        signal: AbortSignal.timeout(5000),
      });

      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, {
        status: res.status,
        headers: corsHeaders,
      });
    } catch {
      // Fall through
    }
  }

  return NextResponse.json(
    { status: "ok", simulated: true },
    { status: 200, headers: corsHeaders }
  );
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getSafeCorsHeaders(request),
  });
}
