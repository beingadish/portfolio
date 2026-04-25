"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { MobileNav } from "./components/mobile-nav";
import { NavDock } from "./components/nav-dock";
import { LiquidGlassToggle } from "./components/liquid-glass-toggle";
import { ShowcaseLiveContent } from "./components/showcase-live-content";
import { ThemeToggle } from "./components/theme-toggle";
import { MobileArticleSlider } from "./components/mobile-article-slider";
import ExperienceTimeline from "./components/experience-timeline";
import { portfolioData, resumeQuickLink } from "./data/portfolio";
import {
  ANALYTICS_EVENTS,
  getProjectType,
  getShowcaseEventName,
} from "./lib/analytics";

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
    kind: "external";
    url: string;
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
  Resilience4j: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Bucket4j: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Micrometer: { kind: "simple", slug: "openjdk", color: "ED8B00" },
  Python: { kind: "simple", slug: "python", color: "3776AB" },
  Dart: { kind: "simple", slug: "dart", color: "0175C2" },
  Kotlin: { kind: "simple", slug: "kotlin", color: "7F52FF" },
  "Spring Boot": { kind: "simple", slug: "springboot", color: "6DB33F" },
  Kafka: { kind: "simple", slug: "apachekafka", color: "231F20" },
  Redis: { kind: "external", url: "https://api.iconify.design/logos:redis.svg"},
  PostgreSQL: { kind: "simple", slug: "postgresql", color: "4169E1" },
  Hibernate: { kind: "simple", slug: "hibernate", color: "59666C" },
  Docker: { kind: "simple", slug: "docker", color: "2496ED" },
  AWS: { kind: "external", url: "https://api.iconify.design/logos:aws.svg"},
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
  gRPC: { kind: "external", url: "https://api.iconify.design/logos:grpc.svg" },
  LocalStack:  { kind: "external", url: "https://api.iconify.design/logos:aws.svg" },
  "AWS CDK": { kind: "external", url: "https://api.iconify.design/logos:aws.svg" },
  "AWS (EC2, VPC)": { kind: "external", url: "https://api.iconify.design/logos:aws-ec2.svg" },
  "Material UI": { kind: "external", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMjU2IDE1MCI+PHBhdGggZmlsbD0iIzM0YTg1MyIgZD0iTTI1NS4yODUgMTQzLjQ3Yy0uMDg0LS41MjQtLjE2NC0xLjA0Mi0uMjUxLTEuNTZhMTI4LjEgMTI4LjEgMCAwIDAtMTIuNzk0LTM4LjI4OGExMjguOCAxMjguOCAwIDAgMC0yMy40NS0zMS44NmExMjkuMiAxMjkuMiAwIDAgMC0yMi43MTMtMTguMDA1Yy4wNDktLjA4LjA5LS4xNjguMTQtLjI1YzIuNTgyLTQuNDYxIDUuMTcyLTguOTE3IDcuNzU1LTEzLjM4bDcuNTc2LTEzLjA2OGMxLjgxOC0zLjEyNiAzLjYzMi02LjI2IDUuNDM4LTkuMzg2cS42NDMtMS4xMTUgMS4wMjMtMi4yOTdhMTEuNzggMTEuNzggMCAwIDAtLjM2LTguMTg4cS0uMzItLjc2LS43NDMtMS40NzJhMTEuNyAxMS43IDAgMCAwLTQuMDgtNC4wNjRhMTEuODUgMTEuODUgMCAwIDAtNS4wMDUtMS42MWExMiAxMiAwIDAgMC0yLjIxOC4wMnEtLjkxMi4wOTQtMS44MTQuMzNhMTEuNzQgMTEuNzQgMCAwIDAtNy4xNTQgNS40NjdjLTEuODE0IDMuMTI3LTMuNjI4IDYuMjYtNS40MzggOS4zODZsLTcuNTc2IDEzLjA2OWMtMi41ODMgNC40NjItNS4xNzMgOC45MTgtNy43NTUgMTMuMzhjLS4yODIuNDg3LS41NjcuOTczLS44NDggMS40NjdxLS41ODYtLjIzNy0xLjE3Mi0uNDYyYy0xNC4yNC01LjQzLTI5LjY4OC04LjQtNDUuODM2LTguNGMtLjQ0MiAwLS44NzkgMC0xLjMyNC4wMDZjLTE0LjM1Ny4xNDMtMjguMTUyIDIuNjQtNDEuMDIyIDcuMTJhMTE5IDExOSAwIDAgMC00LjQyIDEuNjQyYy0uMjYyLS40NTUtLjUzMi0uOTExLS43OS0xLjM2N2MtMi41ODMtNC40NjItNS4xNzMtOC45MTgtNy43NTUtMTMuMzhsLTcuNTc2LTEzLjA3YTM5MTUgMzkxNSAwIDAgMS01LjQzOS05LjM4NkExMS43NCAxMS43NCAwIDAgMCA0OC41LjA0OGExMS43IDExLjcgMCAwIDAtNS4wMSAxLjYxMmExMS43IDExLjcgMCAwIDAtNC4wNzcgNC4wNjNjLS4yODEuNDc0LS41MzIuOTY3LS43NDIgMS40NzNhMTEuOCAxMS44IDAgMCAwLS4zNjUgOC4xODhjLjI1OS43ODYuNTk0IDEuNTU0IDEuMDIzIDIuMjk2YTM5NzMgMzk3MyAwIDAgMSA1LjQzOSA5LjM4NnEzLjc5MyA2LjUzNSA3LjU4IDEzLjA2OWMyLjU4MiA0LjQ2MiA1LjE2OCA4LjkxOCA3Ljc1IDEzLjM4Yy4wMi4wMzguMDQ2LjA3NS4wNjUuMTEyQTEyOSAxMjkgMCAwIDAgNDUuMzIgNjQuMzhhMTI5LjcgMTI5LjcgMCAwIDAtMjIuMiAyNC4wMTVhMTI4IDEyOCAwIDAgMC05LjM0IDE1LjI0YTEyOC4yIDEyOC4yIDAgMCAwLTEwLjg0MyAyOC43NjRhMTMxIDEzMSAwIDAgMC0xLjk1MSA5LjUyNGMtLjA4Ny41MTgtLjE2NyAxLjA0Mi0uMjQ3IDEuNTZBMTI1IDEyNSAwIDAgMCAwIDE0OS4xMThoMjU2cS0uMzA3LTIuODM3LS43MzQtNS42MzZ6Ii8+PHBhdGggZmlsbD0iIzIwMjEyNCIgZD0iTTE5NC41OSAxMTMuNzEyYzUuMTIyLTMuNDEgNS44NjctMTEuMyAxLjY2MS0xNy42MmMtNC4yMDMtNi4zMjMtMTEuNzYzLTguNjgyLTE2Ljg4My01LjI3M2MtNS4xMjIgMy40MS01Ljg2OCAxMS4zLTEuNjYyIDE3LjYyMWM0LjIwMyA2LjMyMiAxMS43NjQgOC42ODIgMTYuODgzIDUuMjcybS0xMTYuMDcxLTUuMjVjNC4yMDYtNi4zMjEgMy40Ni0xNC4yMS0xLjY2Mi0xNy42MmMtNS4xMjMtMy40MS0xMi42OC0xLjA1LTE2Ljg4NiA1LjI3Yy00LjIwMyA2LjMyMy0zLjQ1OCAxNC4yMTIgMS42NjIgMTcuNjIyYzUuMTIyIDMuNDEgMTIuNjgzIDEuMDUgMTYuODg2LTUuMjcyIi8+PC9zdmc+" },
  "Kubernetes (k3s)": { kind: "external", url: "https://api.iconify.design/logos:kubernetes.svg" },
  "Autoscaling (HPA)": { kind: "external", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMiAyOEgxMnYtMmgxMFYxMEg2djEwSDRWMTBhMiAyIDAgMCAxIDItMmgxNmEyIDIgMCAwIDEgMiAydjE2YTIgMiAwIDAgMS0yIDIiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yOCAyMmgtMnYtMmgyVjRIMTJ2MmgtMlY0YTIgMiAwIDAgMSAyLTJoMTZhMiAyIDAgMCAxIDIgMnYxNmEyIDIgMCAwIDEtMiAyIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTAgMTR2Mmg0LjU4NkwzIDI3LjU4Nkw0LjQxNCAyOUwxNiAxNy40MTRWMjJoMnYtOHoiLz48L3N2Zz4=" },
  "NGINX Ingress": { kind: "external", url: "https://api.iconify.design/logos:nginx.svg" },
  "CI/CD": { kind: "external", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMy41MyAxOS44MWE3LjUgNy41IDAgMCAxLTEuNjUtLjE4YTEwLjUgMTAuNSAwIDAgMSAuNzIgMi4xM2guOTNhOS41IDkuNSAwIDAgMCAzLS40OWwtLjkzLTEuODFhNy43IDcuNyAwIDAgMS0yLjA3LjM1bS01LjE3LTEuOTRsLS4zNi0uMzhhNy40IDcuNCAwIDAgMS0yLjItNS45MmE3LjMgNy4zIDAgMCAxIDEuNTQtNEwxNy4yNiA5YTEgMSAwIDAgMCAuOTEgMWguMDlhMSAxIDAgMCAwIDEtLjkxTDE5LjYgNWExIDEgMCAwIDAtLjI5LS43OWExIDEgMCAwIDAtLjc5LS4yMWwtNC4wOS4zNWExIDEgMCAwIDAgLjE3IDJsMS4yOS0uMTFhOS40NSA5LjQ1IDAgMCAwLTIuMDUgNS4zMmE5LjI4IDkuMjggMCAwIDAgMi42NyA3LjI2bC4zMS4zN2E3LjMzIDcuMzMgMCAwIDEgMi4wNiA0LjkxYTcuNCA3LjQgMCAwIDEtLjI2IDIuNDdsMS44LjkxYTguOCA4LjggMCAwIDAgLjQ1LTMuNTFhOS4yOCA5LjI4IDAgMCAwLTIuNTEtNi4xbTE0LjA0LjA0bC0xLjIxLjA5YTkuNjUgOS42NSAwIDAgMC03LjY2LTE1LjU1YTkuMyA5LjMgMCAwIDAtMyAuNDlsLjkxIDEuOGE3LjY3IDcuNjcgMCAwIDEgOS43NiA3LjM5YTcuNTggNy41OCAwIDAgMS0xLjY1IDQuNzJsLjEtMS41NGExIDEgMCAxIDAtMi0uMTNsLS4yOCA0LjA4YTEgMSAwIDAgMCAuMzEuNzhhLjk0Ljk0IDAgMCAwIC42OS4yOGguMWw0LjA4LS40MmExIDEgMCAwIDAgLjktMS4xYTEgMSAwIDAgMC0xLjA1LS44OU00LjA3IDIwLjQ0aC4wOGw0LjA5LS4zNWExIDEgMCAxIDAtLjE3LTJsLTEuMzkuMTJhNy42MyA3LjYzIDAgMCAxIDQuNTItMS40OWE4IDggMCAwIDEgMS42My4xOGExMC4yIDEwLjIgMCAwIDEtLjcxLTIuMTNoLS45MmE5LjY2IDkuNjYgMCAwIDAtNS45IDJsLjEyLTEuMzFhMSAxIDAgMCAwLS45Mi0xLjA4YTEgMSAwIDAgMC0xLjA4LjkxbC0uMzUgNC4wOGExIDEgMCAwIDAgMSAxLjA4Wm0xNC4zNSA3Ljc5bC00LjA5LjI3YTEgMSAwIDAgMCAuMTMgMmwxLjU0LS4xMWE3LjcxIDcuNzEgMCAwIDEtMTIuNTQtNmE3LjYgNy42IDAgMCAxIC4yOS0yTDIgMjEuNDZhOS42IDkuNiAwIDAgMC0uNDcgMi45NUE5LjcgOS43IDAgMCAwIDE3LjE5IDMybC0uMTIgMS4xOGExIDEgMCAwIDAgLjg5IDEuMWguMTFhMSAxIDAgMCAwIDEtLjlsLjQyLTQuMDZhMSAxIDAgMCAwLTEuMDYtMS4xWiIvPjwvc3ZnPg==" },
  "System Monitoring": { kind: "external", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNjY5ZGY2IiBkPSJNMTAuODMgMTUuODRoMi4zM3YyLjY0aC0yLjMzeiIvPjxwYXRoIGZpbGw9IiM0Mjg1ZjQiIGQ9Ik0xOC40OCAxMy44N2EuNTYuNTYgMCAwIDEtLjQtLjE3TDE0IDkuNDdsLTIuNzQgMi44OWEuNTcuNTcgMCAwIDEtLjc2LjA1bC0yLjA4LTEuNjhsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMnYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzV2LTEuNzFaIi8+PHBhdGggZmlsbD0iIzY2OWRmNiIgZD0iTTUuNSAxMi43Nkw3Ljg4IDkuNmEuNTUuNTUgMCAwIDEgLjM3LS4yMmEuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MmwyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3YS41NC41NCAwIDAgMSAuNC4xN2w0LjMzIDQuNDhIMjJWNmEuNzQuNzQgMCAwIDAtLjc0LS43NEgyLjc0QS43NC43NCAwIDAgMCAyIDZ2Ni44MVoiLz48cmVjdCB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHg9IjguNjciIHk9IjE4LjE4IiBmaWxsPSIjNDI4NWY0IiByeD0iLjMiLz48L3N2Zz4=" },
  "JUnit 5": { kind: "simple", slug: "junit5", color: "25A162" },
  LangChain: { kind: "simple", slug: "langchain", color: "1C3C3C" },
  Prometheus: { kind: "external", url: "https://api.iconify.design/logos:prometheus.svg" },
  Grafana: { kind: "external", url: "https://api.iconify.design/logos:grafana.svg" },
  FAISS: { kind: "external", url: "https://api.iconify.design/logos:meta-icon.svg" },
  Gemini: { kind: "simple", slug: "googlegemini", color: "8E75B2" },
  Redisson: { kind: "simple", slug: "redis", color: "8E75B2" },
  RAG: { kind: "semantic", icon: "layers" },
  "Vector Embeddings": { kind: "external", url: "https://api.iconify.design/logos:chroma.svg" },
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
  const iconSize = compact ? 12 : 14;

  if (source.kind === "semantic") {
    return (
      <span className="tech-icon-shell">
        <SemanticIcon icon={source.icon} compact={compact} color={source.color} />
      </span>
    );
  }

  if (source.kind === "external") {
    return (
      <span className="tech-icon-shell">
        <Image
          src={source.url}
          alt=""
          aria-hidden="true"
          className={`${sizeClass} block shrink-0`}
          width={iconSize}
          height={iconSize}
          loading="lazy"
          fetchPriority="low"
          sizes={`${iconSize}px`}
          unoptimized
          referrerPolicy="no-referrer"
        />
      </span>
    );
  }

  return (
    <span className="tech-icon-shell">
      <Image
        src={`https://cdn.simpleicons.org/${source.slug}/${source.color}`}
        alt=""
        aria-hidden="true"
        className={`${sizeClass} block shrink-0`}
        width={iconSize}
        height={iconSize}
        loading="lazy"
        fetchPriority="low"
        sizes={`${iconSize}px`}
        unoptimized
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

const LocationPinIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3 w-3">
    <path
      d="M10 17s5-4.6 5-8a5 5 0 1 0-10 0c0 3.4 5 8 5 8Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <circle cx="10" cy="9" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
    <header>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-1 text-[1.95rem] leading-[1.16] sm:text-4xl">{title}</h2>
      <p className="section-copy mt-3">{copy}</p>
    </header>
  );
}

export default function Home() {
  const resumeLink = resumeQuickLink.href;
  const resumeDownload = resumeQuickLink.download ? true : undefined;
  const emailAddress = portfolioData.contact.email;
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  // Fix theme-switching bug: persist revealed state to prevent content-visibility from hiding elements
  useEffect(() => {
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "reveal-up") {
        const target = event.target as HTMLElement;
        target.classList.add("is-revealed");
      }
    };

    document.addEventListener("animationend", handleAnimationEnd);
    return () => document.removeEventListener("animationend", handleAnimationEnd);
  }, []);

  return (
    <div className="relative isolate overflow-x-clip pb-16">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-grid-pattern opacity-70" />
      <div className="pointer-events-none floating-orb fixed -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,#0f766e42_0%,transparent_68%)] blur-2xl" />
      <div className="pointer-events-none floating-orb fixed -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,#e67e2240_0%,transparent_72%)] blur-2xl [animation-delay:1.2s]" />

      <header className="mx-auto max-w-6xl px-5 pt-24 sm:px-10 sm:pt-28">
        <NavDock className="section-panel fixed left-1/2 top-4 z-40 w-[calc(100%-2.5rem)] max-w-6xl px-4 py-3 sm:w-[calc(100%-5rem)] sm:px-5 [animation-delay:70ms]">
          <MobileNav navItems={navItems} quickLinks={portfolioData.quickLinks} />

          <div className="hidden flex-wrap items-center gap-3 md:flex">
            <ul className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    className="nav-link"
                    href={item.href}
                    data-analytics-event={ANALYTICS_EVENTS.NAV_CLICK}
                    data-analytics-nav-item={item.label}
                    data-analytics-device="desktop"
                  >
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
              <div className="hidden lg:block">
                <LiquidGlassToggle />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </NavDock>

        <div className="h-5 sm:h-6" aria-hidden="true" />

        <section className="mt-4 grid items-stretch gap-5 md:gap-4 lg:auto-rows-fr lg:grid-cols-[1.1fr_0.9fr]">
          <article className="section-panel reveal flex h-full self-stretch flex-col p-5 sm:p-6 [animation-delay:120ms]">
            <div>
              <p className="eyebrow">Software Engineer Portfolio</p>
              <h1 className="display-font mt-2 text-[2.85rem] font-semibold leading-[1.06] tracking-tight text-[var(--ink)] sm:text-6xl">
                {portfolioData.name}
              </h1>
              <p className="mt-2 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">{portfolioData.role}</p>
              <p className="hero-meta mt-2 flex items-start gap-1.5">
                <span className="mt-1 shrink-0">
                  <LocationPinIcon />
                </span>
                <span>{portfolioData.location}</span>
              </p>
            </div>

            <div className="mt-3">
              <p className="hero-summary max-w-2xl">{portfolioData.summary}</p>
              <p className="hero-pitch mt-2 max-w-2xl">{portfolioData.pitch}</p>
            </div>

            <div className="mt-auto pt-5">
              <div className="flex flex-wrap gap-2">
                <span className="chip">Backend Engineering</span>
                <span className="chip">Distributed Systems</span>
                <span className="chip">Production Readiness</span>
              </div>

              <div className="hero-actions mt-3 flex flex-wrap items-center gap-3">
                <a
                  className="btn-primary px-6 py-3"
                  href={resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  download={resumeDownload}
                  data-analytics-event={ANALYTICS_EVENTS.RESUME_CLICK_HERO}
                  data-analytics-location="hero"
                  data-analytics-type="primary_cta"
                >
                  Download Resume
                </a>
                <a className="btn-secondary px-6 py-3" href="#projects">
                  View Projects
                </a>
              </div>
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
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={72}
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

      <main className="mx-auto mt-5 max-w-6xl space-y-6 px-5 sm:px-10 md:mt-6 md:space-y-5">
        <section id="about" className="section-panel reveal defer-render p-6 sm:p-8 [animation-delay:240ms]">
          <SectionHeader
            eyebrow="About"
            title="Building reliable products with a people-first engineering approach."
            copy={portfolioData.summary}
          />
          <div className="mt-7 grid gap-5 md:gap-4 lg:grid-cols-2">
            {portfolioData.highlights.map((item) => (
              <div key={item} className="surface-subtle rounded-2xl p-4">
                <p className="text-sm leading-relaxed text-[var(--ink)]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="showcase" className="section-panel reveal defer-render p-6 sm:p-8 [animation-delay:260ms]">
          <SectionHeader
            eyebrow="Showcase"
            title="Engineering profile snapshots"
            copy="Live public snapshots from pinned GitHub repositories and LeetCode activity."
          />
          <div className="mt-7 grid gap-5 md:gap-4 md:grid-cols-2">
            {portfolioData.staticShowcases.map((item) => {
              const showcaseEventName = getShowcaseEventName(item.platform);

              return (
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
                        data-analytics-event={showcaseEventName ?? undefined}
                        data-analytics-section={showcaseEventName ? "showcase" : undefined}
                      >
                        Open Profile
                        <ExternalIcon />
                      </a>
                    }
                  />
                </article>
              );
            })}
          </div>
        </section>

        <section id="experience" className="section-panel reveal defer-render p-6 sm:p-8 [animation-delay:300ms]">
          <SectionHeader
            eyebrow="Experience"
            title="Production engineering with measurable performance impact."
            copy="I work across backend APIs, data pipelines, Android integrations, and cloud delivery to ship resilient systems."
          />

          <ExperienceTimeline>
            <div className="experience-scroll">
              <div className="experience-scroll-inner">
                <ol className="experience-list mt-8">
                {portfolioData.experience.map((item) => {
                  const isCurrentRole = item.period.toLowerCase().includes("present");
                  return (
                    <li key={`${item.company}-${item.period}`} className="experience-item mb-8 last:mb-0">
                      <span className="timeline-marker" aria-hidden="true">
                        {isCurrentRole ? <span className="timeline-dot-ripple" /> : null}
                        <span className={`timeline-dot ${isCurrentRole ? "timeline-dot-current" : "timeline-dot-past"}`} />
                      </span>
                      <article className="surface-card rounded-2xl p-5">
                        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
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
              </div>
            </div>
          </ExperienceTimeline>
        </section>

        <section id="projects" className="section-panel reveal defer-render p-6 sm:p-8 [animation-delay:340ms]">
          <SectionHeader
            eyebrow="Projects"
            title="Systems and products built outside day-to-day work."
            copy="I build hands-on projects that mirror real production concerns: architecture, throughput, observability, and maintainability."
          />

          <div className="mt-8 grid gap-5 md:gap-4 md:grid-cols-2">
            {portfolioData.projects.map((project, index) => {
              const isOddLastCard =
                portfolioData.projects.length % 2 === 1 &&
                index === portfolioData.projects.length - 1;
              const wrapperClass = isOddLastCard ? "md:col-span-2 md:mx-auto md:max-w-[46rem]" : "";

              const cardContent = (
                <article className={`project-card flex h-full min-h-[24rem] min-w-0 flex-col ${project.href ? "cursor-pointer" : ""}`}>
                  <div>
                    <div className="flex flex-col items-start gap-2 md:flex-row md:items-start md:justify-between md:gap-3">
                      <h3 className="display-font min-w-0 break-words text-[2rem] leading-tight font-semibold text-[var(--ink)] sm:text-3xl">
                        {project.name}
                      </h3>
                      <span className="chip self-start shrink-0 text-xs">{project.timeline}</span>
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
                    className={`block h-full min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] ${wrapperClass}`}
                    data-analytics-event={ANALYTICS_EVENTS.PROJECT_CLICK}
                    data-analytics-project-name={project.name}
                    data-analytics-project-type={getProjectType(project.href)}
                    data-analytics-section="projects"
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <div key={project.name} className={`h-full min-w-0 ${wrapperClass}`}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </section>

        <section id="skills" className="section-panel reveal defer-render p-6 sm:p-8 [animation-delay:360ms]">
          <SectionHeader
            eyebrow="Skills"
            title="A practical toolkit for backend, mobile, and AI-driven features."
            copy="I focus on technologies that deliver measurable performance and reliable developer workflows."
          />

          <div className="mt-7 grid gap-5 md:gap-4 md:grid-cols-2">
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

        <section className="defer-render grid gap-6 lg:grid-cols-2">
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
                      <ExternalIcon className="h-4 w-4 shrink-0" />
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

        <section id="writing" className="section-panel reveal defer-render p-6 sm:p-8 [animation-delay:430ms]">
          <SectionHeader
            eyebrow="Writing"
            title="Medium Articles"
            copy="A selection of my published writing on backend engineering and system design."
          />
          
          {/* Mobile: Auto-slider */}
          <div className="md:hidden mt-7">
            <div className="mobile-article-slider-container">
              <MobileArticleSlider itemCount={portfolioData.writing.length}>
                {portfolioData.writing.map((entry) => (
                  <article key={entry.title} className="project-card mobile-article-card px-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--teal)]">
                      {entry.meta}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{entry.summary}</p>
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--teal)] underline decoration-transparent transition hover:decoration-current"
                      data-analytics-event={ANALYTICS_EVENTS.ARTICLE_CLICK}
                      data-analytics-article-title={entry.title}
                      data-analytics-platform="medium"
                    >
                      Read Article
                      <ExternalIcon />
                    </a>
                  </article>
                ))}
              </MobileArticleSlider>
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid mt-7 gap-5 md:gap-4 md:grid-cols-2">
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
                    data-analytics-event={ANALYTICS_EVENTS.ARTICLE_CLICK}
                    data-analytics-article-title={entry.title}
                    data-analytics-platform="medium"
                  >
                    Read Article
                    <ExternalIcon />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="section-panel reveal defer-render p-6 sm:p-8 [animation-delay:460ms]">
          <SectionHeader
            eyebrow="Contact"
            title="Let us build something meaningful."
            copy="Open to impactful software engineering opportunities across backend systems, distributed architecture, and product engineering."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="btn-primary px-6 py-3"
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              download={resumeDownload}
              data-analytics-event={ANALYTICS_EVENTS.RESUME_CLICK_FOOTER}
              data-analytics-location="footer"
            >
              Resume
            </a>
            <a
              className="btn-secondary px-6 py-3"
              href={gmailComposeLink}
              target="_blank"
              rel="noreferrer"
              data-analytics-event={ANALYTICS_EVENTS.EMAIL_CLICK}
              data-analytics-section="contact"
              data-analytics-method="gmail_compose"
            >
              Email
            </a>
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">{emailAddress}</p>
        </section>
      </main>
    </div>
  );
}
