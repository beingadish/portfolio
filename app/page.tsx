import Image from "next/image";
import type { CSSProperties } from "react";
import { ShowcaseLiveContent } from "./components/showcase-live-content";
import { ThemeToggle } from "./components/theme-toggle";
import { portfolioData } from "./data/portfolio";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Showcase", href: "#showcase" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

type SemanticIconName = "code" | "cloud" | "network" | "layers" | "message" | "chip";

type TechIconSource =
  | {
      kind: "simple";
      slug: string;
      color: string;
    }
  | {
      kind: "semantic";
      icon: SemanticIconName;
      color?: string;
    };

const fallbackTechIcon: TechIconSource = {
  kind: "semantic",
  icon: "code",
};

const techIconSources: Record<string, TechIconSource> = {
  "C++": { kind: "simple", slug: "cplusplus", color: "00599C" },
  Java: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Python: { kind: "simple", slug: "python", color: "3776AB" },
  Dart: { kind: "simple", slug: "dart", color: "0175C2" },
  Kotlin: { kind: "simple", slug: "kotlin", color: "7F52FF" },
  "Spring Boot": { kind: "simple", slug: "springboot", color: "6DB33F" },
  Kafka: { kind: "simple", slug: "apachekafka", color: "231F20" },
  Redis: { kind: "simple", slug: "redis", color: "DC382D" },
  PostgreSQL: { kind: "simple", slug: "postgresql", color: "4169E1" },
  Hibernate: { kind: "simple", slug: "hibernate", color: "59666C" },
  Docker: { kind: "simple", slug: "docker", color: "2496ED" },
  AWS: { kind: "simple", slug: "amazonwebservices", color: "FF9900" },
  "Android Native": { kind: "simple", slug: "android", color: "3DDC84" },
  Flutter: { kind: "simple", slug: "flutter", color: "02569B" },
  Riverpod: { kind: "simple", slug: "flutter", color: "02569B" },
  Firebase: { kind: "simple", slug: "firebase", color: "FFCA28" },
  "REST APIs": { kind: "semantic", icon: "code" },
  "Node.js": { kind: "simple", slug: "nodedotjs", color: "5FA04E" },
  "Google Maps API": { kind: "simple", slug: "googlemaps", color: "4285F4" },
  Razorpay: { kind: "simple", slug: "razorpay", color: "0C2451" },
  JWT: { kind: "simple", slug: "jsonwebtokens", color: "000000" },
  MongoDB: { kind: "simple", slug: "mongodb", color: "47A248" },
  "gRPC": { kind: "simple", slug: "grpc", color: "0F6FFF" },
  LocalStack: { kind: "simple", slug: "amazonwebservices", color: "FF9900" },
  "AWS CDK": { kind: "simple", slug: "amazonwebservices", color: "FF9900" },
  "JUnit 5": { kind: "simple", slug: "junit5", color: "25A162" },
  LangChain: { kind: "simple", slug: "langchain", color: "1C3C3C" },
  FAISS: { kind: "semantic", icon: "network" },
  Gemini: { kind: "simple", slug: "googlegemini", color: "8E75B2" },
  RAG: { kind: "semantic", icon: "layers" },
  "Vector Embeddings": { kind: "semantic", icon: "network" },
  "Event Streaming": { kind: "semantic", icon: "network" },
  Microservices: { kind: "semantic", icon: "layers" },
  "System Reliability": { kind: "simple", slug: "prometheus", color: "E6522C" },
  "Android (Java/Kotlin)": { kind: "simple", slug: "android", color: "3DDC84" },
  MVVM: { kind: "semantic", icon: "layers" },
  Retrofit: { kind: "semantic", icon: "network" },
  "NFC/Hardware SDKs": { kind: "semantic", icon: "chip" },
  Jenkins: { kind: "simple", slug: "jenkins", color: "D24939" },
  "GitHub Actions": { kind: "simple", slug: "githubactions", color: "2088FF" },
  Maven: { kind: "simple", slug: "apachemaven", color: "C71A36" },
  JUnit: { kind: "simple", slug: "junit5", color: "25A162" },
  Prompting: { kind: "semantic", icon: "message" },
  "Vector Search Pipelines": { kind: "semantic", icon: "network" },
  "STL (Standard Template Library)": { kind: "simple", slug: "cplusplus", color: "00599C" },
  "Core Data Structures & Algorithms": { kind: "simple", slug: "cplusplus", color: "00599C" },
  "Java Collections Framework": { kind: "simple", slug: "openjdk", color: "ED8B00" },
  STL: { kind: "simple", slug: "cplusplus", color: "00599C" },
  "Collections Framework": { kind: "simple", slug: "openjdk", color: "ED8B00" },
};

function SemanticIcon({
  icon,
  compact = false,
  color,
}: {
  icon: SemanticIconName;
  compact?: boolean;
  color?: string;
}) {
  const sizeClass = compact ? "h-3 w-3" : "h-3.5 w-3.5";
  const style = color ? ({ color } as CSSProperties) : undefined;

  if (icon === "cloud") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${sizeClass} shrink-0`} fill="none" style={style}>
        <path
          d="M8.5 18h8.2a3.3 3.3 0 0 0 .4-6.6 5.2 5.2 0 0 0-9.9-1.4 3.8 3.8 0 0 0 1.3 8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (icon === "network") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${sizeClass} shrink-0`} fill="none" style={style}>
        <circle cx="6" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8.4 10.6 15m4.8-6.6L12.8 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "layers") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${sizeClass} shrink-0`} fill="none" style={style}>
        <path d="m12 4 8 4-8 4-8-4 8-4Zm0 8 8 4-8 4-8-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "message") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${sizeClass} shrink-0`} fill="none" style={style}>
        <path
          d="M5 6.5h14v8H9.2L5 18V6.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (icon === "chip") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${sizeClass} shrink-0`} fill="none" style={style}>
        <rect x="7.2" y="7.2" width="9.6" height="9.6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 4v3M12 17v3M4 12h3m10 0h3M6.2 6.2l1.7 1.7m8.2 8.2 1.7 1.7M17.8 6.2l-1.7 1.7m-8.2 8.2-1.7 1.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${sizeClass} shrink-0`} fill="none" style={style}>
      <path
        d="M6 17.5h12M6 6.5h12M6 12h6m4.4 0h1.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TechIcon({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) {
  const source = techIconSources[label] ?? fallbackTechIcon;
  const sizeClass = compact ? "h-3 w-3" : "h-3.5 w-3.5";

  if (source.kind === "semantic") {
    return (
      <span className="tech-icon-shell">
        <SemanticIcon icon={source.icon} compact={compact} color={source.color} />
      </span>
    );
  }

  return (
    <span className="tech-icon-shell">
      <img
        src={`https://cdn.simpleicons.org/${source.slug}/${source.color}`}
        alt=""
        aria-hidden="true"
        className={`${sizeClass} block shrink-0`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </span>
  );
}

function TechChip({
  label,
  compactIcon = false,
}: {
  label: string;
  compactIcon?: boolean;
}) {
  return (
    <span className="chip text-xs gap-1.5">
      <TechIcon label={label} compact={compactIcon} />
      <span>{label}</span>
    </span>
  );
}

const ExternalIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5">
    <path
      d="M7 5h8v8m-8 2h8V7m-2.5 0L5 14.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

function QuickLinkIcon({
  icon,
}: {
  icon: "github" | "linkedin" | "leetcode" | "medium" | "resume";
}) {
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.2 3.1.9.1-.7.3-1.2.6-1.5-2.2-.2-4.6-1.1-4.6-5.1 0-1.1.4-2 .9-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3.8 0 1.7.1 2.5.3 2-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7.9 1.6.9 2.7 0 3.9-2.4 4.8-4.7 5 .3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M6.9 8.3v9.8H3.7V8.3h3.2ZM5.3 3.8A1.9 1.9 0 1 1 5.3 7.7a1.9 1.9 0 0 1 0-3.9Zm5 4.5v1.3h.1c.5-.9 1.7-1.6 3.4-1.6 3.6 0 4.2 2.2 4.2 5.1v5h-3.2v-4.4c0-1.1 0-2.4-1.5-2.4s-1.7 1.2-1.7 2.3v4.5H8.4V8.3h2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === "leetcode") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M16.8 18.3c-1 1-2.2 1.5-3.8 1.5-3.3 0-6-2.7-6-6 0-1.6.6-3 1.7-4.1L13.6 5m3.2 3.5h-5.3m-.8 5.3h7.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (icon === "medium") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path d="M4 7.2h3.1l3.2 7.2 3.4-7.2H17l-4.7 9.5h-1.9L5.7 7.2Zm13.4 0H20v9.5h-2.6V7.2Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M12 4v11m0 0 4-4m-4 4-4-4M5 18h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-1 text-3xl sm:text-4xl">{title}</h2>
      <p className="section-copy mt-3">{copy}</p>
    </header>
  );
}

export default function Home() {
  const resumeLink =
    portfolioData.quickLinks.find((item) => item.icon === "resume")?.href ??
    "https://drive.google.com/file/d/1OC4Hwo1x_KQg2HIOpmyf_1vB4FqCu0Qm/view?usp=sharing";
  const emailAddress = portfolioData.contact.email;
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  return (
    <div className="relative isolate overflow-x-clip pb-16">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-grid-pattern opacity-70" />
      <div className="pointer-events-none floating-orb fixed -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,#0f766e42_0%,transparent_68%)] blur-2xl" />
      <div className="pointer-events-none floating-orb fixed -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,#e67e2240_0%,transparent_72%)] blur-2xl [animation-delay:1.2s]" />

      <header className="mx-auto max-w-6xl px-5 pt-28 sm:px-10">
        <nav className="section-panel reveal fixed left-1/2 top-4 z-40 w-[calc(100%-2.5rem)] max-w-6xl -translate-x-1/2 px-4 py-3 sm:w-[calc(100%-5rem)] sm:px-5 [animation-delay:70ms]">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="display-font text-2xl font-bold tracking-tight text-[var(--ink)]">
              AP
            </a>

            <ul className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className="nav-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="ms-auto flex items-center gap-2">
              {portfolioData.quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  title={item.label}
                  aria-label={item.label}
                  download={item.download ? true : undefined}
                  className={`quick-icon ${item.icon === "resume" ? "quick-icon-resume" : ""}`}
                >
                  <QuickLinkIcon icon={item.icon} />
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <section className="mt-4 grid items-stretch gap-4 lg:auto-rows-fr lg:grid-cols-[1.1fr_0.9fr]">
          <article className="section-panel reveal flex h-full self-stretch flex-col justify-between p-6 sm:p-7 [animation-delay:120ms]">
            <p className="eyebrow">Software Engineer Portfolio</p>
            <h1 className="display-font mt-2 text-5xl font-semibold leading-[1.02] tracking-tight text-[var(--ink)] sm:text-6xl">
              {portfolioData.name}
            </h1>
            <p className="mt-3 text-xl text-[var(--muted)]">{portfolioData.role}</p>
            <p className="section-copy mt-3 max-w-2xl">{portfolioData.pitch}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip">Backend Engineering</span>
              <span className="chip">Distributed Systems</span>
              <span className="chip">Production Readiness</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a className="btn-primary px-6 py-3" href={resumeLink} target="_blank" rel="noreferrer" download>
                Download Resume
              </a>
              <a className="btn-secondary px-6 py-3" href="#projects">
                View Projects
              </a>
            </div>
          </article>

          <aside className="section-panel reveal flex h-full flex-col p-6 sm:p-7 [animation-delay:200ms]">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Profile</p>
              <span className="chip text-xs">Developer Snapshot</span>
            </div>

            <div className="surface-card mt-4 overflow-hidden rounded-2xl">
              <Image
                src={portfolioData.profilePhoto}
                alt="Demo profile placeholder"
                width={640}
                height={640}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </aside>
        </section>

        <section className="section-panel reveal mt-4 p-5 sm:p-6 [animation-delay:220ms]">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {portfolioData.focusInsights.map((insight) => (
              <article key={insight.title} className="surface-subtle rounded-xl p-3">
                <h2 className="text-sm font-semibold text-[var(--ink)]">{insight.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{insight.description}</p>
              </article>
            ))}
          </div>
        </section>
      </header>

      <main className="mx-auto mt-6 max-w-6xl space-y-5 px-5 sm:px-10">
        <section id="about" className="section-panel reveal p-6 sm:p-8 [animation-delay:240ms]">
          <SectionHeader
            eyebrow="About"
            title="Building reliable products with a people-first engineering approach."
            copy={portfolioData.summary}
          />
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {portfolioData.highlights.map((item) => (
              <div key={item} className="surface-subtle rounded-2xl p-4">
                <p className="text-sm leading-relaxed text-[var(--ink)]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="showcase" className="section-panel reveal p-6 sm:p-8 [animation-delay:260ms]">
          <SectionHeader
            eyebrow="Showcase"
            title="Engineering profile snapshots"
            copy="Live public snapshots from pinned GitHub repositories and LeetCode activity."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {portfolioData.staticShowcases.map((item) => (
              <article key={item.platform} className="project-card">
                <p className="eyebrow">{item.platform}</p>
                <ShowcaseLiveContent
                  item={item}
                  cta={
                    <a
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal)] underline decoration-transparent transition hover:decoration-current"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Profile
                      <ExternalIcon />
                    </a>
                  }
                />
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-panel reveal p-6 sm:p-8 [animation-delay:300ms]">
          <SectionHeader
            eyebrow="Experience"
            title="Production engineering with measurable performance impact."
            copy="I work across backend APIs, data pipelines, Android integrations, and cloud delivery to ship resilient systems."
          />

          <ol className="mt-8 border-s border-[var(--line)] ps-6">
            {portfolioData.experience.map((item) => {
              const isCurrentRole = item.period.toLowerCase().includes("present");

              return (
                <li key={`${item.company}-${item.period}`} className="relative mb-8 last:mb-0">
                  <span className="timeline-marker" aria-hidden="true">
                    {isCurrentRole ? <span className="timeline-dot-ripple" /> : null}
                    <span className={`timeline-dot ${isCurrentRole ? "timeline-dot-current" : "timeline-dot-past"}`} />
                  </span>
                  <article className="surface-card rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
                      <span className="chip text-xs">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[var(--muted)]">
                      {item.company} • {item.location}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--ink)]">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <TechChip key={tech} label={tech} />
                      ))}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <section id="projects" className="section-panel reveal p-6 sm:p-8 [animation-delay:340ms]">
          <SectionHeader
            eyebrow="Projects"
            title="Systems and products built outside day-to-day work."
            copy="I build hands-on projects that mirror real production concerns: architecture, throughput, observability, and maintainability."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {portfolioData.projects.map((project, index) => {
              const isOddLastCard =
                portfolioData.projects.length % 2 === 1 &&
                index === portfolioData.projects.length - 1;
              const wrapperClass = isOddLastCard ? "md:col-span-2 md:mx-auto md:max-w-[46rem]" : "";

              const cardContent = (
                <article className={`project-card flex h-full min-h-[24rem] flex-col ${project.href ? "cursor-pointer" : ""}`}>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="display-font text-3xl font-semibold text-[var(--ink)]">{project.name}</h3>
                      <span className="chip text-xs">{project.timeline}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.summary}</p>
                  </div>

                  <div className="mt-4 flex-1">
                    <ul className="space-y-2 text-sm text-[var(--ink)]">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--amber)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <TechChip key={tech} label={tech} />
                    ))}
                  </div>
                </article>
              );

              if (project.href) {
                return (
                  <a
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open project: ${project.name}`}
                    className={`block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] ${wrapperClass}`}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <div key={project.name} className={`h-full ${wrapperClass}`}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </section>

        <section id="skills" className="section-panel reveal p-6 sm:p-8 [animation-delay:360ms]">
          <SectionHeader
            eyebrow="Skills"
            title="A practical toolkit for backend, mobile, and AI-driven features."
            copy="I focus on technologies that deliver measurable performance and reliable developer workflows."
          />

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {portfolioData.skillGroups.map((group) => (
              <article key={group.category} className="surface-card rounded-2xl p-5">
                <h3 className="text-base font-semibold text-[var(--ink)]">{group.category}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechChip key={item} label={item} />
                  ))}
                </div>
              </article>
            ))}
            <article className="surface-card rounded-2xl p-5">
              <h3 className="text-base font-semibold text-[var(--ink)]">Language & Collections</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["C++", "STL", "Java", "Collections Framework", "Python", "Dart"].map((item) => (
                  <TechChip key={item} label={item} />
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="section-panel reveal p-6 sm:p-8 [animation-delay:380ms]">
            <SectionHeader
              eyebrow="Achievements"
              title="Milestones"
              copy="Selected certifications and outcomes that reflect consistency in learning and execution."
            />
            <ul className="mt-6 space-y-3">
              {portfolioData.achievements.map((achievement) => (
                <li key={achievement.title} className="flex gap-3 text-sm text-foreground">
                  <span className="mt-1.75 h-2 w-2 rounded-full bg-(--teal)" />
                  {achievement.link ? (
                    <a
                      className="inline-flex items-center gap-1 font-medium underline decoration-transparent transition hover:decoration-current"
                      href={achievement.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{achievement.title}</span>
                      <ExternalIcon />
                    </a>
                  ) : (
                    <span>{achievement.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </article>

          <article className="section-panel reveal p-6 sm:p-8 [animation-delay:410ms]">
            <SectionHeader
              eyebrow="Education"
              title="Academic Foundation"
              copy="Core computer science fundamentals and practical problem-solving through engineering coursework."
            />
            <div className="mt-6 space-y-4">
              {portfolioData.education.map((item) => {
                const educationContent = (
                  <div className={`surface-card rounded-2xl p-4 ${item.href ? "cursor-pointer transition-shadow hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]" : ""}`}>
                    <h3 className="text-base font-semibold text-foreground">{item.school}</h3>
                    <p className="mt-1 text-sm text-(--muted)">{item.degree}</p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-(--muted)">
                      {item.period} • {item.location}
                    </p>
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.school}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open education website: ${item.school}`}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
                    >
                      {educationContent}
                    </a>
                  );
                }

                return <div key={item.school}>{educationContent}</div>;
              })}
            </div>
          </article>
        </section>

        <section id="writing" className="section-panel reveal p-6 sm:p-8 [animation-delay:430ms]">
          <SectionHeader
            eyebrow="Writing"
            title="Medium Articles"
            copy="Selected demo articles listed as published reading entries."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {portfolioData.writing.map((entry, index) => {
              const isOddLastCard =
                portfolioData.writing.length % 2 === 1 &&
                index === portfolioData.writing.length - 1;

              return (
                <article
                  key={entry.title}
                  className={`project-card ${isOddLastCard ? "md:col-span-2 md:mx-auto md:max-w-[46rem]" : ""}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--teal)]">
                    {entry.meta}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{entry.summary}</p>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal)] underline decoration-transparent transition hover:decoration-current"
                  >
                    Read Article
                    <ExternalIcon />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="section-panel reveal p-6 sm:p-8 [animation-delay:460ms]">
          <SectionHeader
            eyebrow="Contact"
            title="Let us build something meaningful."
            copy="Open to impactful software engineering opportunities across backend systems, distributed architecture, and product engineering."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn-primary px-6 py-3" href={resumeLink} target="_blank" rel="noreferrer" download>
              Resume
            </a>
            <a className="btn-secondary px-6 py-3" href={gmailComposeLink} target="_blank" rel="noreferrer">
              Email 
            </a>
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">{emailAddress}</p>
        </section>
      </main>
    </div>
  );
}
