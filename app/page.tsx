import Image from "next/image";
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

  return (
    <div className="relative isolate overflow-x-clip pb-16">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-grid-pattern opacity-70" />
      <div className="pointer-events-none floating-orb fixed -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,#0f766e42_0%,transparent_68%)] blur-2xl" />
      <div className="pointer-events-none floating-orb fixed -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,#e67e2240_0%,transparent_72%)] blur-2xl [animation-delay:1.2s]" />

      <header className="mx-auto max-w-6xl px-5 pt-6 sm:px-10">
        <nav className="section-panel reveal sticky top-4 z-40 px-4 py-3 sm:px-5 [animation-delay:70ms]">
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
            title="Static profile previews"
            copy="These are static demo previews only. They are manually defined cards and not live embeds."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {portfolioData.staticShowcases.map((item) => (
              <article key={item.platform} className="project-card">
                <p className="eyebrow">{item.platform}</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{item.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.preview}</p>
                <a
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal)] underline decoration-transparent transition hover:decoration-current"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Demo
                  <ExternalIcon />
                </a>
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
            {portfolioData.experience.map((item) => (
              <li key={`${item.company}-${item.period}`} className="relative mb-8 last:mb-0">
                <span className="absolute -start-[33px] mt-1.5 h-4 w-4 rounded-full border-2 border-[var(--teal)] bg-[var(--bg)]" />
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
                      <span key={tech} className="chip text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
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

              return (
                <article
                  key={project.name}
                  className={`project-card ${isOddLastCard ? "md:col-span-2 md:mx-auto md:max-w-[46rem]" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="display-font text-3xl font-semibold text-[var(--ink)]">{project.name}</h3>
                    <span className="chip text-xs">{project.timeline}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--amber)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
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
                    <span key={item} className="chip text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
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
              {portfolioData.education.map((item) => (
                <div key={item.school} className="surface-card rounded-2xl p-4">
                  <h3 className="text-base font-semibold text-foreground">{item.school}</h3>
                  <p className="mt-1 text-sm text-(--muted)">{item.degree}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-(--muted)">
                    {item.period} • {item.location}
                  </p>
                </div>
              ))}
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
            <a className="btn-secondary px-6 py-3" href="mailto:aadarshpandey.pandey@gmail.com">
              Email 
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
