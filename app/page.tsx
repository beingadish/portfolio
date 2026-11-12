"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MobileNav } from "./components/mobile-nav";
import { NavDock } from "./components/nav-dock";
import { KineticNodeMesh } from "./components/kinetic-node-mesh";
import { SectionAudioButton } from "./components/portfolio-audio-tour";
import { useLanguage } from "./context/language-context";
import { portfolioData, resumeQuickLink } from "./data/portfolio";
import { ANALYTICS_EVENTS, getProjectType } from "./lib/analytics";

type SemanticIconName = "code" | "cloud" | "network" | "layers" | "message" | "chip";

type TechIconSource =
  | { kind: "simple"; slug: string; color: string }
  | { kind: "external"; url: string }
  | { kind: "semantic"; icon: SemanticIconName; color?: string };

const fallbackTechIcon: TechIconSource = { kind: "semantic", icon: "code" };

const techIconSources: Record<string, TechIconSource> = {
  "C++": { kind: "simple", slug: "cplusplus", color: "00599C" },
  Java: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  "Java 21": { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Resilience4j: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Bucket4j: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Micrometer: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Python: { kind: "simple", slug: "python", color: "3776AB" },
  Dart: { kind: "simple", slug: "dart", color: "0175C2" },
  Kotlin: { kind: "simple", slug: "kotlin", color: "7F52FF" },
  "Spring Boot": { kind: "simple", slug: "springboot", color: "6DB33F" },
  Kafka: { kind: "simple", slug: "apachekafka", color: "231F20" },
  Redis: { kind: "external", url: "https://api.iconify.design/logos:redis.svg" },
  PostgreSQL: { kind: "simple", slug: "postgresql", color: "4169E1" },
  Hibernate: { kind: "simple", slug: "hibernate", color: "59666C" },
  Docker: { kind: "simple", slug: "docker", color: "2496ED" },
  AWS: { kind: "external", url: "https://api.iconify.design/logos:aws.svg" },
  "Android Native": { kind: "simple", slug: "android", color: "3DDC84" },
  Flutter: { kind: "simple", slug: "flutter", color: "02569B" },
  Riverpod: { kind: "simple", slug: "flutter", color: "02569B" },
  Firebase: { kind: "simple", slug: "firebase", color: "FFCA28" },
  "REST APIs": { kind: "semantic", icon: "code" },
  "Node.js": { kind: "simple", slug: "nodedotjs", color: "5FA04E" },
  "Google Maps API": { kind: "simple", slug: "googlemaps", color: "4285F4" },
  Razorpay: { kind: "simple", slug: "razorpay", color: "0C2451" },
  DynamoDB: { kind: "external", url: "https://www.svgrepo.com/show/353450/aws-dynamodb.svg" },
  Kinesis: { kind: "external", url: "https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Analytics/Arch_64/Arch_Amazon-Kinesis-Data-Streams_64.svg" },
  SNS: { kind: "external", url: "https://www.svgrepo.com/show/353462/aws-sns.svg" },
  SQS: { kind: "external", url: "https://www.svgrepo.com/show/353463/aws-sqs.svg" },
  Lambda: { kind: "external", url: "https://cloud-icons.onemodel.app/aws/Resource-Icons_01312023/Res_Compute/Res_48_Light/Res_AWS-Lambda_Lambda-Function_48_Light.svg" },
  "ECS Fargate": { kind: "external", url: "https://cloud-icons.onemodel.app/aws/Resource-Icons_01312023/Res_Containers/Res_48_Light/Res_Amazon-Elastic-Container-Service_ECS-Anywhere_48_Light.svg" },
  JWT: { kind: "simple", slug: "jsonwebtokens", color: "000000" },
  MongoDB: { kind: "simple", slug: "mongodb", color: "47A248" },
  gRPC: { kind: "external", url: "https://api.iconify.design/logos:grpc.svg" },
  MQTT: { kind: "external", url: "https://images.seeklogo.com/logo-png/39/1/mqtt-logo-png_seeklogo-399397.png" },
  S3: { kind: "external", url: "https://www.svgrepo.com/show/448270/aws-s3.svg" },
  NGINX: { kind: "external", url: "https://api.iconify.design/logos:nginx.svg" },
  "Kubernetes (k3s)": { kind: "external", url: "https://api.iconify.design/logos:kubernetes.svg" },
  k3s: { kind: "external", url: "https://api.iconify.design/logos:kubernetes.svg" },
  Prometheus: { kind: "external", url: "https://api.iconify.design/logos:prometheus.svg" },
  Grafana: { kind: "external", url: "https://api.iconify.design/logos:grafana.svg" },
  Gemini: { kind: "simple", slug: "googlegemini", color: "8E75B2" },
  pgvector: { kind: "simple", slug: "postgresql", color: "4169E1" },
  Snowflake: { kind: "simple", slug: "snowflake", color: "29B5E8" },
  FastAPI: { kind: "simple", slug: "fastapi", color: "009688" },
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

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${sizeClass} shrink-0`} fill="none" style={style}>
      <path d="m8 9-5 3 5 3m8-6 5 3-5 3m-4-8-4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function TechChip({ label }: { label: string }) {
  const source = techIconSources[label] ?? fallbackTechIcon;

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-[#14151c]/80 text-[#8c8f9a] hover:text-[#edeae3] hover:border-white/20 transition-all font-mono text-xs">
      {source.kind === "semantic" ? (
        <SemanticIcon icon={source.icon} compact color={source.color} />
      ) : source.kind === "simple" ? (
        <span className="tech-icon-shell h-3 w-3 shrink-0">
          <img
            src={`https://cdn.simpleicons.org/${source.slug}/${source.color}`}
            alt=""
            loading="lazy"
            className="h-2.5 w-2.5"
          />
        </span>
      ) : (
        <span className="tech-icon-shell h-3 w-3 shrink-0">
          <img
            src={source.url}
            alt=""
            loading="lazy"
            className="h-2.5 w-2.5 object-contain"
          />
        </span>
      )}
      <span>{label}</span>
    </span>
  );
}

const ExternalIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      d="M14 5h5v5m-9 9H5v-5m14-9-9 9"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
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
        <circle cx="6.5" cy="12" r="4.5" fill="currentColor" />
        <ellipse cx="13.3" cy="12" rx="2.8" ry="4.5" fill="currentColor" />
        <ellipse cx="18.6" cy="12" rx="1.4" ry="4.5" fill="currentColor" />
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

function SpecimenSectionHeader({
  marker,
  subtitle,
  title,
  copy,
  sectionKey,
}: {
  marker: string;
  subtitle?: string;
  title: string;
  copy?: string;
  sectionKey?: string;
  listenText?: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 pb-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest uppercase text-[#8c8f9a]">
            {marker}
          </span>
          {subtitle && (
            <>
              <span className="h-px w-6 bg-white/15" />
              <span className="font-mono text-xs text-[#6e717d] uppercase hidden sm:inline">
                {subtitle}
              </span>
            </>
          )}
        </div>
        {sectionKey && <SectionAudioButton sectionId={sectionKey} />}
      </div>
      <h2 className="text-2xl sm:text-3xl font-light text-[#edeae3] tracking-tight">
        {title}
      </h2>
      {copy && (
        <p className="text-[15px] sm:text-base text-[#9da1ad] font-sans leading-relaxed max-w-3xl">
          {copy}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [liveTime, setLiveTime] = useState<string>("18:30:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format Bengaluru time (Asia/Kolkata)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setLiveTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "About", href: "#hero" },
    { label: "Work", href: "#telemetry" },
    { label: "Philosophy", href: "#doctrine" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ];

  const resumeLink = resumeQuickLink.href;
  const resumeDownload = resumeQuickLink.download ? "Aadarsh_Pandey_Resume.pdf" : undefined;
  const emailAddress = portfolioData.contact.email;
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  return (
    <div className="relative isolate min-h-screen text-[#edeae3] selection:bg-[#edeae3] selection:text-[#090a0d]">
      {/* Subtle background noise overlay */}
      <div className="fixed inset-0 pointer-events-none noise-bg z-0 opacity-80" />

      {/* Whole-page Interactive Kinetic Node Mesh with floating resume keywords */}
      <KineticNodeMesh />

      {/* Architectural Masthead */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#090a0d]/85 backdrop-blur-md border-b border-white/10 transition-colors">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 h-16 flex items-center justify-between gap-6">
          {/* Identity */}
          <div className="shrink-0 flex items-center">
            <a href="#hero" className="group flex items-baseline gap-2.5 whitespace-nowrap">
              <span className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-[#edeae3] font-semibold">
                Aadarsh Pandey
              </span>
              <span className="text-[#555760] font-mono text-xs">/</span>
              <span className="font-editorial-italic font-serif italic text-xs sm:text-[13px] text-[#8c8f9a] group-hover:text-white transition-colors">
                Software Engineer
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center justify-center gap-5 font-mono text-xs text-[#8c8f9a] whitespace-nowrap">
            {navItems.slice(0, 7).map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#edeae3] transition-colors"
                data-analytics-event={ANALYTICS_EVENTS.NAV_CLICK}
                data-analytics-nav-item={item.label}
              >
                <span className="text-[#555760] mr-1">0{idx + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Clock, Quick Links & Dispatch */}
          <div className="shrink-0 flex items-center gap-3">
            <div className="hidden 2xl:flex items-center gap-2.5 font-mono text-xs text-[#555760] border-r border-white/10 pr-3 whitespace-nowrap">
              <span>BLR · UTC+5:30</span>
              <span className="text-[#edeae3] tabular-nums font-medium">{liveTime}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              {portfolioData.quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  title={item.label}
                  download={item.download ? "Aadarsh_Pandey_Resume.pdf" : undefined}
                  className="p-1.5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors rounded hover:bg-white/5"
                >
                  <QuickLinkIcon icon={item.icon} />
                </a>
              ))}
            </div>

            <a
              href={gmailComposeLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono px-3.5 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-[#edeae3] transition-all hidden sm:inline-block whitespace-nowrap"
            >
              Inquire
            </a>

            {/* Mobile Nav Menu Drawer */}
            <div className="xl:hidden">
              <MobileNav navItems={navItems} quickLinks={portfolioData.quickLinks} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="relative z-10 pt-28 pb-24 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col gap-y-20 sm:gap-y-24">

        {/* Section 01: Hero: Name, Role & Architecture Highlights */}
        <section id="hero" className="pt-4 sm:pt-8 flex flex-col gap-8 max-w-5xl scroll-mt-28">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest uppercase text-[#8c8f9a]">
                Software Engineer
              </span>
              <span className="h-px w-8 bg-white/15" />
              <span className="font-mono text-xs text-[#6e717d] uppercase">
                Bengaluru, India
              </span>
            </div>
            <SectionAudioButton sectionId="hero" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.14] tracking-tight font-light text-[#edeae3]">
            Hi, I&apos;m <span className="font-editorial-italic font-serif italic text-white/95 font-light">Aadarsh Pandey</span>.
            <br className="hidden sm:inline" />
            {" "}I build <span className="font-editorial-italic font-serif italic text-white/95 font-light">scalable backends</span> and <span className="font-editorial-italic font-serif italic text-white/95 font-light">distributed systems</span>.
          </h1>

          <p className="text-lg sm:text-[20px] text-[#9da1ad] leading-relaxed font-light max-w-3xl">
            Software Engineer at Accenture in Bengaluru, engineering high-throughput backend microservices and IoT telemetry pipelines. Specialized in Java, Spring Boot, Kafka, and AWS cloud infrastructure, building systems that process millions of daily transactions with high reliability.
          </p>

          {/* Action Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-sm">
            <a
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#edeae3] text-[#090a0d] font-semibold hover:bg-white transition-all shadow-sm"
              href="#projects"
            >
              <span>See Projects</span>
              <span className="text-[13px]">↓</span>
            </a>
            <a
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-white/15 bg-[#121318]/60 hover:bg-[#1a1b22] hover:border-white/30 text-[#edeae3] transition-all"
              href="#doctrine"
            >
              <span>How I Work</span>
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
              href="https://github.com/beingadish"
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              download={resumeDownload}
            >
              <span>Resume [PDF]</span>
              <span className="text-[13px]">↓</span>
            </a>
          </div>

          {/* Key Production Architecture & Engineering Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 border-t border-white/10 font-mono text-xs">
            <div className="flex flex-col gap-1 p-3.5 rounded-lg bg-[#121318]/70 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-[#6e717d] uppercase tracking-wider">Role</span>
              <span className="text-[#edeae3] text-sm sm:text-[14px] font-medium">Accenture</span>
              <span className="text-[11px] text-[#2dd4bf]">Software Engineer</span>
            </div>
            <div className="flex flex-col gap-1 p-3.5 rounded-lg bg-[#121318]/70 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-[#6e717d] uppercase tracking-wider">Core Stack</span>
              <span className="text-[#edeae3] text-sm sm:text-[14px] font-medium">Java 21 / Spring</span>
              <span className="text-[11px] text-[#8c8f9a]">Microservices Arch</span>
            </div>
            <div className="flex flex-col gap-1 p-3.5 rounded-lg bg-[#121318]/70 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-[#6e717d] uppercase tracking-wider">Transit Volume</span>
              <span className="text-[#edeae3] text-sm sm:text-[14px] font-medium">1M+ TX / Day</span>
              <span className="text-[11px] text-[#2dd4bf]">-35% P99 Latency</span>
            </div>
            <div className="flex flex-col gap-1 p-3.5 rounded-lg bg-[#121318]/70 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-[#6e717d] uppercase tracking-wider">Event Streams</span>
              <span className="text-[#edeae3] text-sm sm:text-[14px] font-medium">Kafka &amp; Redis GEO</span>
              <span className="text-[11px] text-[#8c8f9a]">AWS IoT Core + MQTT</span>
            </div>
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-1 p-3.5 rounded-lg bg-[#121318]/70 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-[#6e717d] uppercase tracking-wider">Observability</span>
              <span className="text-[#edeae3] text-sm sm:text-[14px] font-medium">Prometheus &amp; Grafana</span>
              <span className="text-[11px] text-[#8c8f9a]">Micrometer Metrics</span>
            </div>
          </div>
        </section>

        {/* Section 02: Operational Systems Footprint */}
        <section id="telemetry" className="flex flex-col gap-8 scroll-mt-28">
          <SpecimenSectionHeader
            marker="At Work"
            subtitle="Accenture · Production Systems"
            title="What I&apos;ve Built in Production"
            copy="High-volume transit payment microservices, IoT fleet telemetry, and resilient event pipelines built for production scale."
            sectionKey="footprint"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            {/* Tile 01 */}
            <article className="p-5 rounded-xl border border-white/10 bg-[#121318]/70 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs text-[#2dd4bf] uppercase tracking-wider block mb-1">
                  01 // FLEET TELEMETRY
                </span>
                <h3 className="text-base font-semibold text-[#edeae3]">Heavy Machinery Ingest</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9da1ad] font-sans">
                  IoT telemetry processing for mining and construction machinery across AWS IoT Core, Lambda, Kinesis, DynamoDB, ECS Fargate, and Snowflake.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-[#6e717d] flex items-center justify-between">
                <span>Intermittent Flows</span>
                <span className="text-[#2dd4bf] font-medium">Production Live</span>
              </div>
            </article>

            {/* Tile 02 */}
            <article className="p-5 rounded-xl border border-white/10 bg-[#121318]/70 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs text-[#2dd4bf] uppercase tracking-wider block mb-1">
                  02 // TRANSIT SCALE
                </span>
                <h3 className="text-base font-semibold text-[#edeae3]">Transit Fare Microservices</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9da1ad] font-sans">
                  Spring Boot microservices processing 1M+ daily transit transactions across 10+ agencies, reducing payment latency by 35% through Redis caching and query tuning.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-[#6e717d] flex items-center justify-between">
                <span>Kafka Settlement</span>
                <span className="text-[#2dd4bf] font-medium">2M+ Ev/Day</span>
              </div>
            </article>

            {/* Tile 03 */}
            <article className="p-5 rounded-xl border border-white/10 bg-[#121318]/70 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs text-[#2dd4bf] uppercase tracking-wider block mb-1">
                  03 // MODULAR MONOLITH
                </span>
                <h3 className="text-base font-semibold text-[#edeae3]">AroundU Core Platform</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9da1ad] font-sans">
                  Java 21 modular monolith with Redis GEO spatial index, Resilience4j circuit breakers, and k3s container orchestration with NGINX Ingress.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-[#6e717d] flex items-center justify-between">
                <span>Orchestration</span>
                <span className="text-[#2dd4bf] font-medium">k3s + Ingress</span>
              </div>
            </article>

            {/* Tile 04 */}
            <article className="p-5 rounded-xl border border-white/10 bg-[#121318]/70 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs text-[#2dd4bf] uppercase tracking-wider block mb-1">
                  04 // SEMANTIC RETRIEVAL
                </span>
                <h3 className="text-base font-semibold text-[#edeae3]">TalkingYoutube RAG</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9da1ad] font-sans">
                  FastAPI transcript vector retrieval with Google Gemini embeddings, PostgreSQL + pgvector, and Docker Scout hardened containers.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-[#6e717d] flex items-center justify-between">
                <span>Vulnerability Profile</span>
                <span className="text-[#2dd4bf] font-medium">Docker Scout</span>
              </div>
            </article>
          </div>
        </section>

        {/* Section 03: Operating Doctrine / Core Principles */}
        <section id="doctrine" className="flex flex-col gap-8 scroll-mt-28">
          <SpecimenSectionHeader
            marker="How I Work"
            subtitle="Engineering Philosophy"
            title="Core Principles"
            copy="Engineering principles focused on deep observability, mechanical sympathy with hardware, and predictable simplicity."
            sectionKey="doctrine"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctrine 01 */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/60 p-7 flex flex-col justify-between gap-6 hover:border-white/20 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between font-mono text-sm text-[#555760]">
                  <span>01</span>
                  <span className="text-xs uppercase tracking-wider text-[#8c8f9a]">Telemetry</span>
                </div>
                <h3 className="text-2xl font-light text-[#edeae3]">
                  Deep <span className="font-editorial-italic font-serif italic text-white font-normal">Observability</span>
                </h3>
                <p className="text-[15px] text-[#9da1ad] leading-relaxed font-sans pt-1">
                  If runtime state cannot be introspected down to the microsecond, it cannot be trusted. System stability begins with granular Micrometer metrics, structured tracing, and transparent alerts over guesswork.
                </p>
              </div>
              <div className="font-mono text-xs text-[#6e717d] border-t border-white/5 pt-3">
                METRIC-DRIVEN RELIABILITY
              </div>
            </div>

            {/* Doctrine 02 */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/60 p-7 flex flex-col justify-between gap-6 hover:border-white/20 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between font-mono text-sm text-[#555760]">
                  <span>02</span>
                  <span className="text-xs uppercase tracking-wider text-[#8c8f9a]">Hardware</span>
                </div>
                <h3 className="text-2xl font-light text-[#edeae3]">
                  Mechanical <span className="font-editorial-italic font-serif italic text-white font-normal">Sympathy</span>
                </h3>
                <p className="text-[15px] text-[#9da1ad] leading-relaxed font-sans pt-1">
                  Software does not exist in an abstract vacuum. Knowledge of cache lines, NUMA zones, non-blocking asynchronous I/O, and partitioned event boundaries yields durable, sustainable architectures.
                </p>
              </div>
              <div className="font-mono text-xs text-[#6e717d] border-t border-white/5 pt-3">
                HARDWARE-AWARE ARCHITECTURE
              </div>
            </div>

            {/* Doctrine 03 */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/60 p-7 flex flex-col justify-between gap-6 hover:border-white/20 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between font-mono text-sm text-[#555760]">
                  <span>03</span>
                  <span className="text-xs uppercase tracking-wider text-[#8c8f9a]">Execution</span>
                </div>
                <h3 className="text-2xl font-light text-[#edeae3]">
                  Predictable <span className="font-editorial-italic font-serif italic text-white font-normal">Simplicity</span>
                </h3>
                <p className="text-[15px] text-[#9da1ad] leading-relaxed font-sans pt-1">
                  Clarity takes precedence over ornament. Predictable failure states, graceful circuit breaking, idempotent operations, and zero unexpected layout shifts are treated as essential functional requirements.
                </p>
              </div>
              <div className="font-mono text-xs text-[#6e717d] border-t border-white/5 pt-3">
                FAIL-SAFE BY DESIGN
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Selected Engineering Works / Projects */}
        <section id="projects" className="flex flex-col gap-8 scroll-mt-28">
          <SpecimenSectionHeader
            marker="Projects"
            subtitle="Selected Engineering Work"
            title="Things I&apos;ve Built"
            copy="Production systems and engineering projects, from distributed backends and containerized microservices to semantic AI pipelines."
            sectionKey="projects"
          />

          <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {portfolioData.projects.map((project, idx) => {
              const projectNum = String(idx + 1).padStart(2, "0");
              return (
                <article
                  key={project.name}
                  className="py-8 px-4 -mx-4 rounded-lg hover:bg-[#14151c]/60 transition-all duration-200 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Index & Timeline */}
                    <div className="lg:col-span-2 flex flex-col gap-1 font-mono">
                      <span className="text-sm text-[#555760] group-hover:text-[#2dd4bf] transition-colors font-medium">
                        /{projectNum}
                      </span>
                      <span className="text-xs text-[#8c8f9a]">{project.timeline}</span>
                    </div>

                    {/* Title & Stack */}
                    <div className="lg:col-span-5 flex flex-col gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-light text-[#edeae3] group-hover:text-white group-hover:translate-x-1 transition-all flex items-baseline gap-2">
                          <span>{project.name}</span>
                        </h3>
                        <p className="mt-1 text-sm text-[#9da1ad] font-sans leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.stack.slice(0, 6).map((tech) => (
                          <TechChip key={tech} label={tech} />
                        ))}
                      </div>
                    </div>

                    {/* Bullets & Technical Details */}
                    <div className="lg:col-span-4 flex flex-col gap-2 text-sm text-[#9da1ad] font-sans leading-relaxed">
                      {project.bullets.map((bullet) => (
                        <p key={bullet} className="flex gap-2">
                          <span className="text-[#2dd4bf] shrink-0 font-mono">▹</span>
                          <span>{bullet}</span>
                        </p>
                      ))}
                    </div>

                    {/* Link Action: Explore Project */}
                    <div className="lg:col-span-1 flex items-start lg:items-end pt-1">
                      <Link
                        href={project.demoUrl || project.href || "#"}
                        className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#090a0d] bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 px-3.5 py-1.5 rounded font-semibold transition-all shadow-sm hover:scale-105 whitespace-nowrap"
                        data-analytics-event={ANALYTICS_EVENTS.PROJECT_CLICK}
                        data-analytics-project-name={project.name}
                        data-analytics-project-type="explore"
                      >
                        <span>Explore</span>
                        <span className="text-xs">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 06: Career Registry / Experience */}
        <section id="experience" className="flex flex-col gap-8 scroll-mt-28">
          <SpecimenSectionHeader
            marker="Experience"
            subtitle="Professional History"
            title="Where I&apos;ve Worked"
            copy="Full-time software engineering and development internships delivering measurable performance and scale."
            sectionKey="experience"
          />

          <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {portfolioData.experience.map((item, idx) => {
              const isCurrent = item.period.toLowerCase().includes("present");
              return (
                <article
                  key={`${item.company}-${item.period}`}
                  className="py-8 px-4 -mx-4 rounded-lg hover:bg-[#14151c]/60 transition-all group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Period & Live Tag */}
                    <div className="lg:col-span-3 flex flex-col gap-2 font-mono">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-[#2dd4bf] animate-pulse" : "bg-[#555760]"}`} />
                        <span className="text-[#edeae3] text-sm sm:text-[15px] font-medium">{item.period}</span>
                      </div>
                      <span className="text-xs text-[#8c8f9a]">{item.location}</span>
                      {isCurrent && (
                        <span className="w-fit text-xs font-semibold text-[#2dd4bf] border border-[#2dd4bf]/30 bg-[#2dd4bf]/10 px-2.5 py-0.5 rounded">
                          CURRENT
                        </span>
                      )}
                    </div>

                    {/* Role & Company */}
                    <div className="lg:col-span-4 flex flex-col gap-2">
                      <div>
                        <h3 className="text-2xl font-light text-[#edeae3] group-hover:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm font-mono text-[#2dd4bf] mt-0.5">{item.company}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.stack.map((tech) => (
                          <TechChip key={tech} label={tech} />
                        ))}
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="lg:col-span-5 flex flex-col gap-2.5 text-sm sm:text-[15px] text-[#9da1ad] font-sans leading-relaxed">
                      {item.bullets.map((bullet) => (
                        <p key={bullet} className="flex gap-2">
                          <span className="text-[#2dd4bf] shrink-0 font-mono">▹</span>
                          <span>{bullet}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 07: Capabilities Registry / Tooling Matrix */}
        <section id="skills" className="flex flex-col gap-8 scroll-mt-28">
          <SpecimenSectionHeader
            marker="Skills"
            subtitle="Tech Stack"
            title="My Technical Toolkit"
            copy="Core technical competencies across backend engineering, cloud infrastructure, container orchestration, and mobile systems."
            sectionKey="skills"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Group: Backend & Distributed */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/70 p-5 flex flex-col gap-3">
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider font-semibold">
                01 // Distributed Systems &amp; Streams
              </span>
              <p className="text-sm text-[#9da1ad] font-sans leading-relaxed">
                Apache Kafka, Redis Cluster, Spring Boot, MQTT, gRPC, Event Streaming, Microservices, System Reliability.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Spring Boot", "Kafka", "Redis", "MQTT", "gRPC", "REST APIs"].map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Group: Core Languages */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/70 p-5 flex flex-col gap-3">
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider font-semibold">
                02 // Languages &amp; Foundations
              </span>
              <p className="text-sm text-[#9da1ad] font-sans leading-relaxed">
                Java 21, Modern C++ (20/23), Python, Dart, Kotlin, SQL, 600+ DSA LeetCode solutions, STL, Collections.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Java 21", "C++", "Python", "Dart", "Kotlin", "PostgreSQL"].map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Group: Cloud & Infrastructure */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/70 p-5 flex flex-col gap-3">
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider font-semibold">
                03 // Cloud &amp; Container Orchestration
              </span>
              <p className="text-sm text-[#9da1ad] font-sans leading-relaxed">
                AWS (IoT Core, ECS Fargate, Kinesis, DynamoDB, Lambda), Docker, Kubernetes (k3s), NGINX Ingress, HPA.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["AWS", "Docker", "Kubernetes (k3s)", "NGINX", "DynamoDB", "Lambda"].map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Group: Observability & Resilience */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/70 p-5 flex flex-col gap-3">
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider font-semibold">
                04 // Observability &amp; Resilience
              </span>
              <p className="text-sm text-[#9da1ad] font-sans leading-relaxed">
                Prometheus, Grafana, Micrometer, Resilience4j Circuit Breakers, Bucket4j, JUnit 5, Mockito.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Prometheus", "Grafana", "Micrometer", "Resilience4j", "Bucket4j"].map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Group: Storage & Gen AI */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/70 p-5 flex flex-col gap-3">
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider font-semibold">
                05 // Storage &amp; Vector Search
              </span>
              <p className="text-sm text-[#9da1ad] font-sans leading-relaxed">
                PostgreSQL, pgvector, Snowflake, Redis GEO, MongoDB, Google Gemini Embeddings, RAG Pipelines.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["PostgreSQL", "pgvector", "Redis", "Snowflake", "Gemini", "MongoDB"].map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Group: Mobile & Client */}
            <div className="rounded-xl border border-white/10 bg-[#121318]/70 p-5 flex flex-col gap-3">
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider font-semibold">
                06 // Mobile &amp; Integration
              </span>
              <p className="text-sm text-[#9da1ad] font-sans leading-relaxed">
                Android Native, MVVM architecture, Flutter, Riverpod, Retrofit, NFC &amp; Hardware SDKs.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Android Native", "Flutter", "Riverpod", "Firebase", "JWT"].map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Technical Writing & Editorial Publications */}
        <section id="writing" className="flex flex-col gap-8 scroll-mt-28">
          <SpecimenSectionHeader
            marker="Writing"
            subtitle="Technical Articles on Medium"
            title="Things I&apos;ve Written"
            copy="Deep-dive articles on rate limiters, consistent hashing, security, and high-concurrency system design with 300+ claps on Medium."
            sectionKey="writing"
          />

          <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {portfolioData.writing.map((entry, idx) => {
              const entryNum = String(idx + 1).padStart(2, "0");
              return (
                <article
                  key={entry.title}
                  className="py-6 px-4 -mx-4 rounded-lg hover:bg-[#14151c]/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-1.5 max-w-3xl">
                    <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-[#555760]">
                      <span className="group-hover:text-[#2dd4bf] transition-colors font-medium">
                        {entryNum}
                      </span>
                      <span>•</span>
                      <span className="text-[#8c8f9a]">{entry.meta}</span>
                    </div>
                    <h3 className="text-xl font-light text-[#edeae3] group-hover:text-white group-hover:translate-x-1 transition-all">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-[#9da1ad] font-sans leading-relaxed line-clamp-2">
                      {entry.summary}
                    </p>
                  </div>

                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#8c8f9a] hover:text-[#edeae3] transition-colors border border-white/10 px-3.5 py-2 rounded bg-white/5 hover:bg-white/10 shrink-0 self-start md:self-center"
                    data-analytics-event={ANALYTICS_EVENTS.ARTICLE_CLICK}
                    data-analytics-article-title={entry.title}
                    data-analytics-platform="medium"
                  >
                    <span>Read Article</span>
                    <ExternalIcon className="h-3.5 w-3.5" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 09: Credentials, Honors & Education */}
        <section id="credentials" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-28">
          {/* Achievements & Certifications */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SpecimenSectionHeader
              marker="Achievements"
              title="Recognitions &amp; Certifications"
              sectionKey="achievements"
            />
            <div className="flex flex-col gap-3 font-sans text-[15px]">
              {portfolioData.achievements.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl border border-white/10 bg-[#121318]/50 flex items-start gap-3 hover:border-white/20 transition-all"
                >
                  <span className="text-[#2dd4bf] font-mono text-xs mt-0.5 shrink-0">▹</span>
                  <div className="flex-1">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#edeae3] hover:text-white underline decoration-white/20 hover:decoration-white underline-offset-4 inline-flex items-center gap-1.5"
                      >
                        <span>{item.title}</span>
                        <ExternalIcon className="h-3.5 w-3.5 text-[#8c8f9a]" />
                      </a>
                    ) : (
                      <span className="text-[#edeae3]">{item.title}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SpecimenSectionHeader
              marker="Education"
              title="Education"
              sectionKey="education"
            />
            <div className="flex flex-col gap-3">
              {portfolioData.education.map((item) => (
                <div
                  key={item.school}
                  className="p-5 rounded-xl border border-white/10 bg-[#121318]/50 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-[#6e717d]">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-lg font-light text-[#edeae3]">{item.school}</h3>
                  <p className="text-sm text-[#9da1ad] font-sans">{item.degree}</p>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 text-xs sm:text-sm font-mono text-[#2dd4bf] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Institution Profile</span>
                      <ExternalIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 10: Dispatch / Direct Inquiry */}
        <section
          id="contact"
          className="p-8 sm:p-12 rounded-xl border border-white/15 bg-[#121318]/90 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden scroll-mt-28"
        >
          <div className="flex flex-col gap-2.5 max-w-xl">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#2dd4bf]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
                <span className="uppercase tracking-wider">Get in Touch</span>
              </div>
              <SectionAudioButton sectionId="contact" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-light text-[#edeae3] tracking-tight">
              Let&apos;s work on something <span className="font-editorial-italic font-serif italic text-white">interesting</span> together.
            </h3>
            <p className="text-base text-[#9da1ad] font-sans leading-relaxed">
              Open to software engineering roles, backend architecture, and technical advisory. Drop me a line and let&apos;s talk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
            <a
              className="px-5 py-3 rounded bg-[#edeae3] text-[#090a0d] font-semibold hover:bg-white transition-all shadow-sm flex items-center gap-2"
              href={gmailComposeLink}
              target="_blank"
              rel="noreferrer"
              data-analytics-event={ANALYTICS_EVENTS.EMAIL_CLICK}
              data-analytics-section="contact"
            >
              <span>Say Hello</span>
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
            <a
              className="px-4 py-3 rounded border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-[#edeae3] transition-all flex items-center gap-2"
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              download={resumeDownload}
              data-analytics-event={ANALYTICS_EVENTS.RESUME_CLICK_FOOTER}
            >
              <span>Download CV [PDF]</span>
              <span className="text-[13px]">↓</span>
            </a>
          </div>
        </section>

      </main>

      {/* Refined Architectural Colophon Footer */}
      <footer className="w-full bg-[#07080a] border-t border-white/10 py-10 font-mono text-xs sm:text-sm text-[#8c8f9a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm sm:text-base font-semibold text-[#edeae3]">
              Aadarsh Pandey
            </span>
            <span className="text-[#555760]">/</span>
            <span className="text-[#6e717d]">Bengaluru, India · UTC+5:30</span>
            <span className="text-[#555760]">/</span>
            <span className="text-[#edeae3] tabular-nums">{liveTime}</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#6e717d]">
            <a
              href="#hero"
              className="hover:text-[#edeae3] transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
