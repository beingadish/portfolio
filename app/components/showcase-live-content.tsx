import type { ShowcaseItem } from "../data/portfolio";

const LEETCODE_SNAPSHOT_SRC =
  "https://camo.githubusercontent.com/8840e640ce68faf599011b3b22f830d056f7eef2763e08c5ac12af31de84aefd/68747470733a2f2f6c656574636172642e6a61636f626c696e2e636f6f6c2f6178373737783f7468656d653d6461726b26666f6e743d4f70656e25323053616e73266578743d686561746d6170";

export function ShowcaseLiveContent({
  item,
  cta,
}: {
  item: ShowcaseItem;
  cta: React.ReactNode;
}) {
  const isGitHub = item.platform === "GitHub";
  const snapshotAlt = "LeetCode submission heatmap snapshot for ax777x";

  return (
    <>
      <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{item.heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.preview}</p>

      <div className="mt-3 min-h-[104px]">
        <div className="surface-subtle mx-auto w-full max-w-[771px] overflow-hidden rounded-md">
          <div className="h-full w-full aspect-[16/9]">
          {isGitHub ? (
            <a
              href="https://next.ossinsight.io/widgets/official/compose-user-dashboard-stats?user_id=61098642"
              target="_blank"
              rel="noreferrer"
              className="block h-full w-full"
              style={{ display: "block" }}
            >
              <picture className="block h-full w-full">
                <source
                  media="(prefers-color-scheme: dark)"
                  srcSet="https://next.ossinsight.io/widgets/official/compose-user-dashboard-stats/thumbnail.png?user_id=61098642&image_size=auto&color_scheme=dark"
                  width="771"
                />
                <img
                  alt="Dashboard stats of @beingadish"
                  src="https://next.ossinsight.io/widgets/official/compose-user-dashboard-stats/thumbnail.png?user_id=61098642&image_size=auto&color_scheme=light"
                  width="771"
                  className="block h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </picture>
            </a>
          ) : (
            <img
              src={LEETCODE_SNAPSHOT_SRC}
              alt={snapshotAlt}
              className="block h-full w-full object-contain"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          )}
          </div>
        </div>
      </div>
      {cta}
    </>
  );
}
