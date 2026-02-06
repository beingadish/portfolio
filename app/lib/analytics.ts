export const ANALYTICS_EVENTS = {
  RESUME_CLICK_HERO: "resume_click_hero",
  PROJECT_CLICK: "project_click",
  GITHUB_PROFILE_CLICK: "github_profile_click",
  LEETCODE_PROFILE_CLICK: "leetcode_profile_click",
  ARTICLE_CLICK: "article_click",
  EMAIL_CLICK: "email_click",
  RESUME_CLICK_FOOTER: "resume_click_footer",
  NAV_CLICK: "nav_click",
} as const;

export function getProjectType(href: string): "deployed" | "github" {
  return href.includes("github.com") ? "github" : "deployed";
}

export function getShowcaseEventName(platform: string): string | null {
  if (platform === "GitHub") {
    return ANALYTICS_EVENTS.GITHUB_PROFILE_CLICK;
  }

  if (platform === "LeetCode") {
    return ANALYTICS_EVENTS.LEETCODE_PROFILE_CLICK;
  }

  return null;
}
