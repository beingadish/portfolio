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
  const body = await request.text();

  // Enforce citizen authentication gate: guests / anonymous visitors cannot vote
  if (subpath === "ballots/vote") {
    let voterToken: string | null = null;
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      voterToken = parsed.voter_token;
    } catch {}

    const authHeader = request.headers.get("authorization");
    if (!authHeader && (!voterToken || voterToken === "anon_citizen" || voterToken.trim().length === 0)) {
      return NextResponse.json(
        {
          error: "Unauthorized: You must be logged in as a verified citizen to cast a ballot.",
          code: "AUTH_REQUIRED",
        },
        { status: 401, headers: corsHeaders }
      );
    }
  }

  if (backendHost) {
    try {
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
        signal: AbortSignal.timeout(1500),
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

  // Edge resilient response for voting (enforces citizen authentication)
  if (subpath === "ballots/vote") {
    // Reject any unauthenticated attempt: must provide Authorization header or valid voter_token
    let voterToken: string | null = null;
    let choice = "agree";
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      voterToken = parsed.voter_token;
      if (parsed.choice) choice = parsed.choice;
    } catch {}

    const authHeader = request.headers.get("authorization");
    if (!authHeader && (!voterToken || voterToken === "anon_citizen" || voterToken.trim().length === 0)) {
      return NextResponse.json(
        {
          error: "Unauthorized: You must be logged in as a verified citizen to cast a ballot.",
          code: "AUTH_REQUIRED",
        },
        { status: 401, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        accepted: true,
        receipt_hash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
        choice,
        updated_tally: {
          agree_pct: choice === "agree" ? 100 : 0,
          oppose_pct: choice === "oppose" ? 100 : 0,
          neutral_pct: choice === "neutral" ? 100 : 0,
          agree_votes: choice === "agree" ? 1 : 0,
          oppose_votes: choice === "oppose" ? 1 : 0,
          neutral_votes: choice === "neutral" ? 1 : 0,
          total_ballots: 1,
          quorum_pct: 1,
        },
      },
      { status: 200, headers: corsHeaders }
    );
  }

  if (subpath.includes("comments") && !subpath.endsWith("upvote")) {
    return NextResponse.json(
      {
        accepted: true,
        comment: {
          id: `c-${Date.now()}`,
          ballot_id: "jmf-2026-01",
          author_name: "Aadarsh",
          author_handle: "beingadish",
          content: "Suggestion recorded",
          blake3_hash: `0x${Math.random().toString(16).slice(2)}`,
          upvotes: 0,
          created_at: new Date().toISOString(),
          reshare_count: 0,
        },
      },
      { status: 200, headers: corsHeaders }
    );
  }

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
        signal: AbortSignal.timeout(1500),
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
