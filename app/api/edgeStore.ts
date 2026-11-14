// Shared edge state for JanMat consensus engine on Vercel Edge/Serverless

export interface AuthorMeta {
  name: string;
  role: string;
  verified: boolean;
  avatar_initials: string;
}

export interface BallotTally {
  agree_pct: number;
  oppose_pct: number;
  neutral_pct: number;
  agree_votes: number;
  oppose_votes: number;
  neutral_votes: number;
  total_ballots: number;
  quorum_pct: number;
}

export interface QuotedContext {
  comment_id: string;
  original_author: string;
  original_content: string;
  parent_ballot_id: string;
}

export interface CommentItem {
  id: string;
  ballot_id: string;
  author_name: string;
  author_handle: string;
  content: string;
  blake3_hash: string;
  upvotes: number;
  created_at: string;
  reshare_count: number;
}

export interface BallotItem {
  id: string;
  proposal_code: string;
  circle: string;
  circle_id: string;
  title: string;
  summary: string;
  author: AuthorMeta;
  status: "active" | "deliberation" | "passed" | "archived" | string;
  status_label: string;
  closes_in: string;
  category: string;
  tally: BallotTally;
  deliberation_count: number;
  blake3_hash: string;
  top_dissent?: {
    category: string;
    upvotes: number;
    quote: string;
  } | null;
  created_at: string;
  is_official?: boolean;
  quoted_comment?: QuotedContext | null;
  comments?: CommentItem[];
}

// Zero seeded fake data: starts completely clean for production public launch
export const EDGE_BALLOTS: BallotItem[] = [];
export const EDGE_RECEIPTS: Array<{
  tx_id: string;
  action: string;
  block: string;
  delta: string;
  time_ago: string;
}> = [];

export const edgeVotedBallots = new Map<string, string>(); // "ballot_id:voter_token" -> choice
export const edgeCommentEndorsers = new Map<string, Set<string>>(); // "comment_id" -> Set of voter_tokens
