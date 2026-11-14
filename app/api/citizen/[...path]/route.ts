import { NextRequest, NextResponse } from "next/server";
import { getSafeCorsHeaders } from "../../cors";
import {
  EDGE_BALLOTS,
  EDGE_RECEIPTS,
  edgeVotedBallots,
  edgeCommentEndorsers,
  BallotItem,
  CommentItem,
} from "../../edgeStore";

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

    const targetBallot = EDGE_BALLOTS.find((b) => b.id === ballotId || b.proposal_code === ballotId);
    let updatedTally = {
      agree_pct: choice === "agree" ? 100 : 0,
      oppose_pct: choice === "oppose" ? 100 : 0,
      neutral_pct: choice === "neutral" ? 100 : 0,
      agree_votes: choice === "agree" ? 1 : 0,
      oppose_votes: choice === "oppose" ? 1 : 0,
      neutral_votes: choice === "neutral" ? 1 : 0,
      total_ballots: 1,
      quorum_pct: 1,
    };

    if (targetBallot) {
      if (choice === "agree") targetBallot.tally.agree_votes += 1;
      else if (choice === "oppose") targetBallot.tally.oppose_votes += 1;
      else if (choice === "neutral") targetBallot.tally.neutral_votes += 1;
      targetBallot.tally.total_ballots =
        targetBallot.tally.agree_votes + targetBallot.tally.oppose_votes + targetBallot.tally.neutral_votes;
      const total = targetBallot.tally.total_ballots;
      if (total > 0) {
        targetBallot.tally.agree_pct = Math.round((targetBallot.tally.agree_votes / total) * 100);
        targetBallot.tally.oppose_pct = Math.round((targetBallot.tally.oppose_votes / total) * 100);
        targetBallot.tally.neutral_pct = 100 - targetBallot.tally.agree_pct - targetBallot.tally.oppose_pct;
      }
      updatedTally = { ...targetBallot.tally };
    }

    const voteReceiptSeq = EDGE_RECEIPTS.length + 1;
    EDGE_RECEIPTS.unshift({
      tx_id: `#${voteReceiptSeq}`,
      action: `Vote Cast: ${choice.toUpperCase()} on ${ballotId}`,
      block: `0x${Math.random().toString(16).slice(2, 10)}`,
      delta: `Choice: ${choice}`,
      time_ago: "just now",
      timestamp: Date.now(),
    });

    return NextResponse.json(
      {
        accepted: true,
        receipt_hash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
        choice,
        updated_tally: updatedTally,
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

  // Edge draft motion handler
  if (subpath === "ballots/draft") {
    let title = "";
    let summary = "";
    let circleId = "transit";
    let authorName = "Citizen Sponsor";
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      if (parsed.title) title = parsed.title;
      if (parsed.summary) summary = parsed.summary;
      if (parsed.circle_id) circleId = parsed.circle_id;
      if (parsed.author_name) authorName = parsed.author_name;
    } catch {}

    const seq = EDGE_BALLOTS.length + 1;
    const code = `JMF-2026-${String(seq).padStart(2, "0")}`;
    const id = `jmf-2026-${String(seq).padStart(2, "0")}`;
    const initials = authorName.slice(0, 2).toUpperCase();

    const circleMap: Record<string, string> = {
      transit: "Transit Council",
      "it-ethics": "Municipal IT & AI Ethics",
      infrastructure: "Civic Infrastructure",
      energy: "Clean Energy & Water",
      healthcare: "Healthcare Mandates",
      governance: "JanMat Foundation",
    };

    const newBallot: BallotItem = {
      id,
      proposal_code: code,
      circle: circleMap[circleId] || "Civic Deliberation",
      circle_id: circleId,
      title: title || "New Motion",
      summary: summary || "",
      author: {
        name: authorName,
        role: "Citizen Sponsor",
        verified: true,
        avatar_initials: initials || "CS",
      },
      status: "active",
      status_label: "Active Ballot",
      closes_in: "72h",
      category: "civic",
      tally: {
        agree_pct: 0,
        oppose_pct: 0,
        neutral_pct: 0,
        agree_votes: 0,
        oppose_votes: 0,
        neutral_votes: 0,
        total_ballots: 0,
        quorum_pct: 0,
      },
      deliberation_count: 0,
      blake3_hash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      created_at: new Date().toISOString(),
      comments: [],
    };

    EDGE_BALLOTS.unshift(newBallot);
    const draftSeq = EDGE_RECEIPTS.length + 1;
    EDGE_RECEIPTS.unshift({
      tx_id: `#${draftSeq}`,
      action: `Motion Submitted: ${newBallot.title.slice(0, 32)}...`,
      block: `0x${newBallot.blake3_hash.slice(2, 10)}`,
      delta: "+1 Motion",
      time_ago: "just now",
      timestamp: Date.now(),
    });

    return NextResponse.json(
      {
        accepted: true,
        ballot: newBallot,
        receipt_hash: newBallot.blake3_hash,
      },
      { status: 200, headers: corsHeaders }
    );
  }

  // Edge reshare spinoff motion handler (Clean: no boilerplate summary, sleek status label)
  if (subpath === "ballots/reshare") {
    let commentId = "";
    let question = "";
    let authorName = "Citizen Sponsor";
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      if (parsed.comment_id) commentId = parsed.comment_id;
      if (parsed.question) question = parsed.question;
      if (parsed.author_name) authorName = parsed.author_name;
    } catch {}

    let originalComment: CommentItem | null = null;
    for (const b of EDGE_BALLOTS) {
      const c = b.comments?.find((cm) => cm.id === commentId);
      if (c) {
        originalComment = c;
        break;
      }
    }

    const seq = EDGE_BALLOTS.length + 1;
    const code = `SPIN-2026-${String(seq).padStart(2, "0")}`;
    const id = `spin-2026-${String(seq).padStart(2, "0")}`;
    const initials = authorName.slice(0, 2).toUpperCase();

    const newBallot: BallotItem = {
      id,
      proposal_code: code,
      circle: "Community Deliberations",
      circle_id: "civic",
      title: question || "Community Poll",
      summary: "", // Clean: no duplicate boilerplate
      author: {
        name: authorName,
        role: "Citizen Contributor",
        verified: true,
        avatar_initials: initials || "CC",
      },
      status: "active",
      status_label: "Closes in 48h", // Clean: no "Spun-off Community Motion •"
      closes_in: "48h",
      category: "civic",
      tally: {
        agree_pct: 0,
        oppose_pct: 0,
        neutral_pct: 0,
        agree_votes: 0,
        oppose_votes: 0,
        neutral_votes: 0,
        total_ballots: 0,
        quorum_pct: 0,
      },
      deliberation_count: 0,
      blake3_hash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      created_at: new Date().toISOString(),
      quoted_comment: originalComment
        ? {
            comment_id: originalComment.id,
            original_author: originalComment.author_name,
            original_content: originalComment.content,
            parent_ballot_id: originalComment.ballot_id,
          }
        : null,
      comments: [],
    };

    EDGE_BALLOTS.unshift(newBallot);
    const reshareSeq = EDGE_RECEIPTS.length + 1;
    EDGE_RECEIPTS.unshift({
      tx_id: `#${reshareSeq}`,
      action: `Spun-off Motion: ${newBallot.title.slice(0, 32)}...`,
      block: `0x${newBallot.blake3_hash.slice(2, 10)}`,
      delta: "+1 Spinoff",
      time_ago: "just now",
      timestamp: Date.now(),
    });

    return NextResponse.json(
      {
        accepted: true,
        new_ballot: newBallot,
      },
      { status: 200, headers: corsHeaders }
    );
  }

  if (subpath.includes("comments") && !subpath.endsWith("upvote")) {
    let content = "";
    let authorName = "Citizen";
    let authorHandle = "citizen";
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      if (parsed.content) content = parsed.content;
      if (parsed.author_name) authorName = parsed.author_name;
      if (parsed.author_handle) authorHandle = parsed.author_handle;
    } catch {}

    const ballotId = path[1] || "";
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      ballot_id: ballotId,
      author_name: authorName,
      author_handle: authorHandle,
      content,
      blake3_hash: `0x${Math.random().toString(16).slice(2)}`,
      upvotes: 0,
      created_at: new Date().toISOString(),
      reshare_count: 0,
    };

    const targetBallot = EDGE_BALLOTS.find((b) => b.id === ballotId);
    if (targetBallot) {
      if (!targetBallot.comments) targetBallot.comments = [];
      targetBallot.comments.push(newComment);
      targetBallot.deliberation_count = targetBallot.comments.length;
    }

    const commentSeq = EDGE_RECEIPTS.length + 1;
    EDGE_RECEIPTS.unshift({
      tx_id: `#${commentSeq}`,
      action: `Deliberation on ${targetBallot?.proposal_code || ballotId}`,
      block: `0x${newComment.blake3_hash.slice(2, 10)}`,
      delta: "Suggestion Hash",
      time_ago: "just now",
      timestamp: Date.now(),
    });

    return NextResponse.json(
      {
        accepted: true,
        comment: newComment,
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

  if (subpath === "register") {
    let username = "citizen";
    let pan = "ABCDE1234F";
    let aadhaar = "123456789012";
    let phone = "9876543210";
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      if (parsed.username) username = parsed.username;
      if (parsed.pan) pan = parsed.pan;
      if (parsed.aadhaar) aadhaar = parsed.aadhaar;
      if (parsed.phone) phone = parsed.phone;
    } catch {}

    const uid = `uid_${Math.random().toString(36).substring(2, 12)}`;
    // generate 16-char password formatted as XXXX-XXXX-XXXX-XXXX
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let pass = "";
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) pass += "-";
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    return NextResponse.json(
      {
        success: true,
        username,
        uid,
        nullifier_seed_commitment: `nullifier_${uid}`,
        password: pass,
        password_expires_at_ms: Date.now() + 24 * 60 * 60 * 1000,
        login_count: 1,
        citizenship_country: "IN",
        masked_aadhaar: `XXXX-XXXX-${aadhaar.slice(-4)}`,
        masked_pan: `${pan.slice(0, 2)}XXX${pan.slice(-2)}`,
        masked_phone: `XXXXXX${phone.slice(-4)}`,
        phone_verified: true,
      },
      { status: 200, headers: corsHeaders }
    );
  }

  if (subpath === "login") {
    let password = "";
    try {
      const parsed = typeof body === "string" ? JSON.parse(body || "{}") : {};
      if (parsed.password) password = parsed.password;
    } catch {}

    const uid = `uid_${Math.random().toString(36).substring(2, 12)}`;
    return NextResponse.json(
      {
        success: true,
        username: "aadarsh",
        uid,
        prev_uid: `uid_prev`,
        login_count: 2,
        expires_at_ms: Date.now() + 24 * 60 * 60 * 1000,
        citizenship_country: "IN",
      },
      { status: 200, headers: corsHeaders }
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

  if (subpath.startsWith("username/")) {
    const uname = subpath.replace("username/", "");
    return NextResponse.json(
      { username: uname, available: true, reason: null },
      { status: 200, headers: corsHeaders }
    );
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
