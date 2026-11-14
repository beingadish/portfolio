import { NextRequest, NextResponse } from "next/server";
import { getSafeCorsHeaders } from "../../cors";

export const dynamic = "force-dynamic";

// In-memory edge state for vote immutability & strictly 1 citizen = 1 endorsement
const edgeVotedBallots = new Map<string, string>(); // "ballot_id:voter_token" -> choice
const edgeCommentEndorsers = new Map<string, Set<string>>(); // "comment_id" -> Set of voter_tokens

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
    let ballotId: string | null = null;
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      voterToken = parsed.voter_token;
      ballotId = parsed.ballot_id;
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

    // Enforce vote immutability: Under the JanMat Constitution, votes cannot be changed or duplicated
    const voterId = voterToken || authHeader;
    const voterKey = `${ballotId || "default"}:${voterId}`;
    if (edgeVotedBallots.has(voterKey)) {
      return NextResponse.json(
        {
          error: "Duplicate vote rejected: You have already cast an immutable ballot on this proposal. Under the JanMat Constitution, votes cannot be changed or re-cast.",
          code: "VOTE_IMMUTABLE",
        },
        { status: 409, headers: corsHeaders }
      );
    }
  }

  // Enforce citizen endorsement gate: strictly One Person, One Endorsement (No Infinite Likes)
  if (subpath.includes("comments") && subpath.endsWith("upvote")) {
    let voterToken: string | null = null;
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      voterToken = parsed.voter_token;
    } catch {}
    const authHeader = request.headers.get("authorization");
    const citizenId = voterToken || (authHeader ? authHeader.replace(/^Bearer /, "") : null);

    if (!citizenId || citizenId === "anon_citizen" || citizenId.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Unauthorized: You must be logged in as a verified citizen to endorse suggestions.",
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

  // Edge resilient response for voting (enforces citizen authentication and vote immutability)
  if (subpath === "ballots/vote") {
    let voterToken: string | null = null;
    let ballotId = "default";
    let choice = "agree";
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      voterToken = parsed.voter_token;
      if (parsed.ballot_id) ballotId = parsed.ballot_id;
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

    const voterId = voterToken || authHeader;
    const voterKey = `${ballotId}:${voterId}`;
    if (edgeVotedBallots.has(voterKey)) {
      return NextResponse.json(
        {
          error: "Duplicate vote rejected: You have already cast an immutable ballot on this proposal. Under the JanMat Constitution, votes cannot be changed or re-cast.",
          code: "VOTE_IMMUTABLE",
        },
        { status: 409, headers: corsHeaders }
      );
    }

    edgeVotedBallots.set(voterKey, choice);

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

  // Edge resilient response for comment upvotes (strictly 1 Citizen = 1 Endorsement, toggles on/off, NO infinite likes!)
  if (subpath.includes("comments") && subpath.endsWith("upvote")) {
    let voterToken: string | null = null;
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      voterToken = parsed.voter_token;
    } catch {}
    const authHeader = request.headers.get("authorization");
    const citizenId = voterToken || (authHeader ? authHeader.replace(/^Bearer /, "") : null);

    const commentId = path[1] || "default";
    let endorsers = edgeCommentEndorsers.get(commentId);
    if (!endorsers) {
      endorsers = new Set();
      edgeCommentEndorsers.set(commentId, endorsers);
    }

    let upvoted = true;
    if (endorsers.has(citizenId!)) {
      endorsers.delete(citizenId!);
      upvoted = false;
    } else {
      endorsers.add(citizenId!);
      upvoted = true;
    }

    return NextResponse.json(
      {
        accepted: true,
        upvoted,
        upvotes: endorsers.size,
        comment_id: commentId,
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
