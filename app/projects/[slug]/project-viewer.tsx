"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProjectShowcase } from "../../data/project-showcases";
import { ProjectAudioBar } from "../../components/project-audio-bar";
import { AwsArchitectureDiagramView } from "../../components/aws-architecture-diagram";

interface ProjectViewerProps {
  project: ProjectShowcase;
  allProjects: ProjectShowcase[];
}

export function ProjectViewer({ project, allProjects }: ProjectViewerProps) {
  const [activeTab, setActiveTab] = useState<"interface" | "architecture" | "api">("interface");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);

  const viewportWidthClass = {
    desktop: "w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[390px]",
  }[viewportMode];

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#edeae3] flex flex-col font-sans selection:bg-[#2dd4bf] selection:text-[#090a0d]">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-50 bg-[#0e0f14]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Back & Project Identity */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8c8f9a] hover:text-[#edeae3] px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shrink-0"
          >
            <span>←</span>
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <span className="text-white/20 font-mono hidden sm:inline">/</span>

          {/* Project Switcher Pill */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {allProjects.map((p) => {
              const isActive = p.slug === project.slug;
              return (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/40 font-medium"
                      : "text-[#8c8f9a] hover:text-[#edeae3] hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#2dd4bf]" : "bg-[#8c8f9a]"}`} />
                  <span>{p.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Center: Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#14151c] p-1 rounded-lg border border-white/10 font-mono text-xs">
          <button
            onClick={() => setActiveTab("interface")}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === "interface"
                ? "bg-[#2dd4bf]/20 text-[#2dd4bf] font-medium"
                : "text-[#8c8f9a] hover:text-[#edeae3]"
            }`}
          >
            Web Interface
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === "architecture"
                ? "bg-[#2dd4bf]/20 text-[#2dd4bf] font-medium"
                : "text-[#8c8f9a] hover:text-[#edeae3]"
            }`}
          >
            AWS Architecture
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === "api"
                ? "bg-[#2dd4bf]/20 text-[#2dd4bf] font-medium"
                : "text-[#8c8f9a] hover:text-[#edeae3]"
            }`}
          >
            API Endpoints
          </button>
        </nav>

        {/* Right: Repository and Live Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8c8f9a] hover:text-[#edeae3] px-3 py-1.5 rounded border border-white/10 hover:bg-white/5 transition-colors"
          >
            <span>GitHub</span>
            <span className="text-[11px]">↗</span>
          </a>

          {project.apkUrl && (
            <a
              href={project.apkUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#10b981]/15 text-[#10b981] hover:bg-[#10b981]/25 border border-[#10b981]/30 font-medium px-3 py-1.5 rounded transition-all shadow-sm"
              title="Download Android APK (Direct S3 Link)"
            >
              <span>📱 Download APK</span>
              <span className="text-[11px]">⬇</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#edeae3] text-[#090a0d] hover:bg-white font-medium px-3 py-1.5 rounded transition-all shadow-sm"
            >
              <span>Full Tab</span>
              <span className="text-[11px]">↗</span>
            </a>
          )}
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex items-center justify-around border-b border-white/10 bg-[#0e0f14] px-4 py-2 font-mono text-xs">
        <button
          onClick={() => setActiveTab("interface")}
          className={`pb-1 ${activeTab === "interface" ? "text-[#2dd4bf] border-b-2 border-[#2dd4bf] font-medium" : "text-[#8c8f9a]"}`}
        >
          Interface
        </button>
        <button
          onClick={() => setActiveTab("architecture")}
          className={`pb-1 ${activeTab === "architecture" ? "text-[#2dd4bf] border-b-2 border-[#2dd4bf] font-medium" : "text-[#8c8f9a]"}`}
        >
          Architecture
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`pb-1 ${activeTab === "api" ? "text-[#2dd4bf] border-b-2 border-[#2dd4bf] font-medium" : "text-[#8c8f9a]"}`}
        >
          Endpoints
        </button>
      </div>

      {/* Dedicated Minimized Top Project Audio Overview Strip (Brief vs Detailed) */}
      <div className="sticky top-16 z-40 shadow-md">
        <ProjectAudioBar slug={project.slug} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* TAB 1: Web Interface View */}
        {activeTab === "interface" && (
          <div className="flex-1 flex flex-col bg-[#0b0c10]">
            {/* Viewport Control Strip */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-white/10 bg-[#121318]/60 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-[#8c8f9a] hidden sm:inline">Path:</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#090a0d] border border-white/10 text-[#edeae3] text-[11px]">
                  <span className="text-[#2dd4bf]">https://beingadish.blog</span>
                  <span className="text-[#8c8f9a]">/projects/</span>
                  <span className="font-semibold text-white">{project.slug}</span>
                </div>

                <button
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="p-1 text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
                  title="Reload Interface"
                >
                  ↻
                </button>
              </div>

              {/* Viewport Width Toggles */}
              <div className="flex items-center gap-1 bg-[#090a0d] p-0.5 rounded border border-white/10">
                <button
                  onClick={() => setViewportMode("desktop")}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                    viewportMode === "desktop" ? "bg-[#2dd4bf]/20 text-[#2dd4bf]" : "text-[#8c8f9a]"
                  }`}
                  title="Desktop View"
                >
                  Desktop
                </button>
                <button
                  onClick={() => setViewportMode("tablet")}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                    viewportMode === "tablet" ? "bg-[#2dd4bf]/20 text-[#2dd4bf]" : "text-[#8c8f9a]"
                  }`}
                  title="Tablet View"
                >
                  Tablet
                </button>
                <button
                  onClick={() => setViewportMode("mobile")}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                    viewportMode === "mobile" ? "bg-[#2dd4bf]/20 text-[#2dd4bf]" : "text-[#8c8f9a]"
                  }`}
                  title="Mobile View"
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Embedded Screen Simulator / Live App Frame */}
            <div className="flex-1 p-3 sm:p-6 flex items-center justify-center overflow-auto">
              <div
                className={`${viewportWidthClass} h-[calc(100vh-13rem)] min-h-[500px] transition-all duration-300 rounded-xl border border-white/15 overflow-hidden shadow-2xl bg-[#121318] flex flex-col relative`}
              >
                {/* Browser-style Title Bar */}
                <div className="h-8 bg-[#181a22] border-b border-white/10 px-3 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                  </div>
                  <span className="text-[11px] font-mono text-[#8c8f9a] truncate max-w-[280px]">
                    {project.name} · {project.apkUrl ? "Live Console & S3 APK" : "Live App Preview"}
                  </span>
                  <div className="w-8" />
                </div>

                {/* If liveUrl is provided and status is live, render live iframe, else interactive deployment preview */}
                {project.status === "live" && project.liveUrl ? (
                  <div className="flex-1 w-full h-full relative bg-[#090a0d]">
                    <iframe
                      key={iframeKey}
                      src={project.liveUrl}
                      title={`${project.name} Live Application`}
                      className="w-full h-full border-0 bg-[#090a0d]"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                ) : (
                  <div className="flex-1 relative bg-[#090a0d] flex flex-col items-center justify-center p-6 text-center">
                    <div className="max-w-md flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 flex items-center justify-center text-[#2dd4bf] text-xl font-mono">
                        ⚡
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#edeae3]">{project.name} Interface</h3>
                        <p className="mt-1 text-xs text-[#8c8f9a] leading-relaxed">
                          Sprint target: Frontend hosted on Vercel, connected to backend microservices on AWS ({project.awsServices[0]}).
                        </p>
                      </div>

                      {/* Deployment Target Info Cards */}
                      <div className="w-full grid grid-cols-2 gap-2 text-left font-mono text-xs pt-2">
                        <div className="p-3 rounded-lg bg-[#14151c] border border-white/10 flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-[#8c8f9a]">Frontend Host</span>
                          <span className="text-[#2dd4bf] font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
                            Vercel
                          </span>
                          <span className="text-[10px] text-[#6e717d] truncate">{project.liveUrl}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#14151c] border border-white/10 flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-[#8c8f9a]">Backend Host</span>
                          <span className="text-[#f59e0b] font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                            AWS Cloud
                          </span>
                          <span className="text-[10px] text-[#6e717d] truncate">{project.backendApiUrl}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-lg bg-[#2dd4bf] text-[#090a0d] font-semibold text-xs font-mono hover:bg-[#2dd4bf]/90 transition-colors shadow-sm"
                          >
                            Launch Direct App ↗
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-[#edeae3] text-xs font-mono hover:bg-white/10 transition-colors"
                        >
                          GitHub Repository ↗
                        </a>
                        <button
                          onClick={() => setActiveTab("architecture")}
                          className="px-4 py-2 rounded-lg border border-[#2dd4bf]/40 bg-[#2dd4bf]/10 text-[#2dd4bf] text-xs font-mono hover:bg-[#2dd4bf]/20 transition-colors"
                        >
                          Inspect AWS Architecture Topology →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Architecture Topology & AWS Cloud Services */}
        {activeTab === "architecture" && (
          <div className="max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col gap-8">
            <div>
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider">
                System Design &amp; Cloud Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white mt-1">
                {project.name} AWS Architecture
              </h2>
              <p className="mt-2 text-sm text-[#9da1ad] max-w-3xl leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Performance & Deployment Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-xl bg-[#121318] border border-white/10 flex flex-col gap-1">
                  <span className="text-xs text-[#8c8f9a] uppercase">{m.label}</span>
                  <span className="text-lg font-semibold text-white">{m.value}</span>
                  {m.sublabel && <span className="text-[11px] text-[#2dd4bf]">{m.sublabel}</span>}
                </div>
              ))}
            </div>

            {/* Visual Interactive AWS Architecture Topology Diagram */}
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#8c8f9a] flex items-center gap-2">
                <span>Interactive Cloud Architecture Diagram</span>
                <span className="text-[#2dd4bf]">●</span>
                <span className="text-[11px] text-white/50 font-normal">AWS Verified Blueprint</span>
              </h3>
              <AwsArchitectureDiagramView slug={project.slug} />
            </div>

            {/* Architecture Highlights */}
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#8c8f9a]">
                Core Architecture Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.architectureHighlights.map((h, i) => (
                  <div
                    key={h.title}
                    className="p-5 rounded-xl bg-[#121318]/70 border border-white/10 flex flex-col gap-2"
                  >
                    <span className="font-mono text-xs text-[#2dd4bf]">0{i + 1} //</span>
                    <h4 className="text-base font-medium text-white">{h.title}</h4>
                    <p className="text-xs text-[#9da1ad] leading-relaxed font-sans">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack Badges */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#8c8f9a]">
                Full Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded bg-[#181a22] border border-white/10 text-xs font-mono text-[#9da1ad]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: API Endpoints & Contract */}
        {activeTab === "api" && (
          <div className="max-w-5xl w-full mx-auto p-6 sm:p-10 flex flex-col gap-8">
            <div>
              <span className="font-mono text-xs text-[#2dd4bf] uppercase tracking-wider">
                Service API Specification
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white mt-1">
                API Routes &amp; Event Channels
              </h2>
              <p className="mt-2 text-sm text-[#9da1ad] max-w-3xl leading-relaxed">
                Core RPC, REST, and streaming message contracts exposed by {project.name}.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#121318] divide-y divide-white/10 font-mono text-xs overflow-hidden">
              {project.endpoints.map((ep) => {
                const methodColor = {
                  GET: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30",
                  POST: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/30",
                  PUT: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30",
                  DELETE: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30",
                  gRPC: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/30",
                  KAFKA: "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/30",
                  ZK: "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/30",
                }[ep.method] || "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/30";

                return (
                  <div key={ep.path} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold tracking-wider ${methodColor}`}>
                        {ep.method}
                      </span>
                      <code className="text-white font-mono text-[13px]">{ep.path}</code>
                    </div>
                    <span className="text-[#9da1ad] font-sans text-xs">{ep.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
