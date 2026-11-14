import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Genesis constitution rules fallback in case backend is unreachable
const FALLBACK_CONSTITUTION = {
  version: 1,
  rules: [
    { key: "quorum.regular", value: "0.501", enacted_at_block: 0, enacted_by_proposal: "genesis" },
    { key: "quorum.constitutional", value: "0.67", enacted_at_block: 0, enacted_by_proposal: "genesis" },
    { key: "moderator.max_per_topic", value: "2", enacted_at_block: 0, enacted_by_proposal: "genesis" },
    { key: "moderator.term_blocks", value: "90", enacted_at_block: 0, enacted_by_proposal: "genesis" },
    { key: "recall.petition_ratio", value: "0.10", enacted_at_block: 0, enacted_by_proposal: "genesis" },
    { key: "referenda.support_ratio", value: "0.05", enacted_at_block: 0, enacted_by_proposal: "genesis" },
  ],
};

const FALLBACK_TOPICS = [
  {
    id: "infrastructure",
    slug: "infrastructure",
    name: "Civic Infrastructure",
    description: "Roads, power, civic grid, and public transit modernization",
    createdAt: "2026-06-01T00:00:00Z",
    subtopics: [{ id: "roads", slug: "roads" }, { id: "water", slug: "water" }],
  },
  {
    id: "transport",
    slug: "transport",
    name: "Public Transit & Mobility",
    description: "Metro connectivity, electric buses, and suburban safety",
    createdAt: "2026-06-05T00:00:00Z",
    subtopics: [{ id: "metro", slug: "metro" }, { id: "buses", slug: "buses" }],
  },
  {
    id: "environment",
    slug: "environment",
    name: "Clean Air & Ecology",
    description: "Urban tree canopy, waste segregation, and industrial emissions",
    createdAt: "2026-06-10T00:00:00Z",
    subtopics: [{ id: "air", slug: "air" }, { id: "green-cover", slug: "green-cover" }],
  },
];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const subpath = path.join("/");
  const backendHost = process.env.BACKEND_GATEWAY_URL;

  if (backendHost) {
    try {
      const url = `${backendHost.replace(/\/$/, "")}/pub/${subpath}${request.nextUrl.search}`;
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store, max-age=0",
          },
        });
      }
    } catch {
      // Proceed to resilient fallback below
    }
  }

  // Fallbacks by subpath
  if (subpath === "constitution") {
    return NextResponse.json(FALLBACK_CONSTITUTION, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  if (subpath === "t") {
    return NextResponse.json(FALLBACK_TOPICS, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  if (subpath === "proposals") {
    return NextResponse.json([], {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  return NextResponse.json(
    { error: "Not found", path: subpath },
    { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
