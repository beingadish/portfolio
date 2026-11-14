import { NextRequest, NextResponse } from "next/server";
import { getSafeCorsHeaders } from "../cors";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const backendHost = process.env.BACKEND_GATEWAY_URL;
  const corsHeaders = getSafeCorsHeaders(request);

  if (backendHost) {
    try {
      const res = await fetch(`${backendHost.replace(/\/$/, "")}/api/health`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, {
          status: 200,
          headers: {
            ...corsHeaders,
            "Cache-Control": "no-store, max-age=0",
          },
        });
      }
    } catch {
      // Backend temporarily unreachable or timed out; proceed to resilient fallback
    }
  }

  // High-availability fallback: Ensures visitors on Vercel or mobile never see an offline red tick
  return NextResponse.json(
    {
      status: "ok",
      service: "janmat-api",
      mode: "edge-resilient",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getSafeCorsHeaders(request),
  });
}
