"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/language-context";

export function NinadaPlayer() {
  const {
    t,
    isPlaying,
    isPaused,
    isAutoBriefing,
    autoBriefIndex,
    currentSentenceText,
    speed,
    setSpeed,
    startAutoBrief,
    skipNextBrief,
    skipPrevBrief,
    playBrief,
    pauseAudio,
    resumeAudio,
    stopAudio,
    activeSection,
    isAudioPanelVisible,
    setIsAudioPanelVisible,
  } = useLanguage();

  const [isExpanded, setIsExpanded] = useState(false);

  // Floatable & Draggable position state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; elemX: number; elemY: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const briefs = t.sectionBriefs || [];

  const handlePointerDown = (clientX: number, clientY: number) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const currentX = position ? position.x : rect.left;
    const currentY = position ? position.y : rect.top;

    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      elemX: currentX,
      elemY: currentY,
    };
    setIsDragging(true);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, select, [role='listbox'], [role='menu']")) return;
    e.preventDefault();
    handlePointerDown(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, select, [role='listbox'], [role='menu']")) return;
    const touch = e.touches[0];
    if (!touch) return;
    handlePointerDown(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current || !panelRef.current) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      const panelWidth = panelRef.current.offsetWidth;
      const panelHeight = panelRef.current.offsetHeight;

      const minX = 8;
      const maxX = Math.max(8, window.innerWidth - panelWidth - 8);
      const minY = 8;
      const maxY = Math.max(8, window.innerHeight - panelHeight - 8);

      const nextX = Math.min(Math.max(minX, dragStartRef.current.elemX + dx), maxX);
      const nextY = Math.min(Math.max(minY, dragStartRef.current.elemY + dy), maxY);

      setPosition({ x: nextX, y: nextY });
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragStartRef.current || !panelRef.current) return;
      const touch = e.touches[0];
      if (!touch) return;
      e.preventDefault();

      const dx = touch.clientX - dragStartRef.current.mouseX;
      const dy = touch.clientY - dragStartRef.current.mouseY;

      const panelWidth = panelRef.current.offsetWidth;
      const panelHeight = panelRef.current.offsetHeight;

      const minX = 8;
      const maxX = Math.max(8, window.innerWidth - panelWidth - 8);
      const minY = 8;
      const maxY = Math.max(8, window.innerHeight - panelHeight - 8);

      const nextX = Math.min(Math.max(minX, dragStartRef.current.elemX + dx), maxX);
      const nextY = Math.min(Math.max(minY, dragStartRef.current.elemY + dy), maxY);

      setPosition({ x: nextX, y: nextY });
    };

    const onEnd = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [isDragging]);

  // Keep clamped on window resize
  useEffect(() => {
    const onResize = () => {
      if (!position || !panelRef.current) return;
      const panelWidth = panelRef.current.offsetWidth;
      const panelHeight = panelRef.current.offsetHeight;
      const maxX = Math.max(8, window.innerWidth - panelWidth - 8);
      const maxY = Math.max(8, window.innerHeight - panelHeight - 8);
      setPosition((prev) =>
        prev
          ? {
              x: Math.min(Math.max(8, prev.x), maxX),
              y: Math.min(Math.max(8, prev.y), maxY),
            }
          : null
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [position]);

  // Collapsed bottom-right launcher button
  if (!isAudioPanelVisible) {
    return (
      <button
        type="button"
        onClick={() => setIsAudioPanelVisible(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-[#121318]/95 px-4 py-2 text-xs font-semibold text-[#2dd4bf] shadow-2xl backdrop-blur-xl hover:border-[#2dd4bf]/40 transition active:scale-95 group"
        title="Open Audio Tour"
      >
        <span className="flex h-2 w-2 rounded-full bg-[#2dd4bf] animate-pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
        <span>{t.audio.autoBriefBtn || "Audio Brief"}</span>
        <span className="rounded bg-[#2dd4bf]/15 px-1.5 py-0.5 text-[10px] font-mono text-[#2dd4bf]">
          {t.meta.nativeName}
        </span>
      </button>
    );
  }

  const currentBriefTitle =
    isAutoBriefing && autoBriefIndex >= 0 ? briefs[autoBriefIndex]?.title : "";

  return (
    <aside
      ref={panelRef}
      aria-label="Audio Portfolio Brief"
      style={
        position
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              bottom: "auto",
              transform: "none",
            }
          : {
              left: "50%",
              bottom: "1.25rem",
              transform: "translateX(-50%)",
            }
      }
      className={`fixed z-50 w-[calc(100%-2rem)] max-w-xl pointer-events-auto transition-[box-shadow,border-color] ${
        isDragging ? "select-none cursor-grabbing opacity-95 shadow-2xl scale-[1.01]" : ""
      }`}
    >
      <div className="rounded-2xl border border-white/15 bg-[#0e1015]/95 shadow-2xl backdrop-blur-2xl p-3 sm:p-3.5 text-[#edeae3]">
        {/* Top Drag Handle Bar */}
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          className="w-full flex items-center justify-between pb-1.5 cursor-grab active:cursor-grabbing border-b border-white/10 mb-2 group/drag"
          title="Drag to reposition"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8c8f9a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
            <span className="text-[#edeae3] font-medium">Audio Brief</span>
            <span className="text-[#555760]">·</span>
            <span className="text-[#2dd4bf]">{t.meta.nativeName}</span>
          </div>

          {/* Center Drag Grip Pill */}
          <div className="flex items-center py-0.5 px-3 rounded-full group-hover/drag:bg-white/5 transition">
            <span className="h-1 w-8 rounded-full bg-white/20 group-hover/drag:bg-[#2dd4bf] transition" />
          </div>

          {/* Reset position button if dragged */}
          {position !== null ? (
            <button
              type="button"
              onClick={() => setPosition(null)}
              className="text-[10px] font-mono text-[#8c8f9a] hover:text-[#edeae3] transition flex items-center gap-1"
              title="Reset position"
            >
              Reset
            </button>
          ) : (
            <span className="text-[10px] text-[#555760] font-mono">drag</span>
          )}
        </div>

        {/* Main Controls Row */}
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Animated Soundwave / Speaker Icon */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                isPlaying
                  ? "bg-[#2dd4bf]/20 text-[#2dd4bf] ring-1 ring-[#2dd4bf]"
                  : "bg-white/5 text-[#8c8f9a]"
              }`}
            >
              {isPlaying ? (
                <div className="flex items-center gap-0.5 h-4">
                  <span className="w-1 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:0ms] h-3" />
                  <span className="w-1 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:150ms] h-4" />
                  <span className="w-1 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:300ms] h-2.5" />
                  <span className="w-1 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:450ms] h-3.5" />
                </div>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#edeae3] truncate">
                {isPlaying ? (
                  isAutoBriefing && currentBriefTitle ? (
                    <span>Auto-Brief: {currentBriefTitle}</span>
                  ) : (
                    <span>Playing Audio</span>
                  )
                ) : isPaused ? (
                  <span className="text-[#f59e0b]">Paused</span>
                ) : (
                  <span>Audio Tour</span>
                )}
              </div>
              <p className="text-[11px] text-[#8c8f9a] truncate font-mono">
                {isAutoBriefing && autoBriefIndex >= 0
                  ? `Section ${autoBriefIndex + 1} of ${briefs.length}`
                  : `Language: ${t.meta.name}`}
              </p>
            </div>
          </div>

          {/* Controls: Auto-Brief, Play/Pause, Stop, Options, Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Auto-Brief Button */}
            <button
              type="button"
              onClick={() => {
                if (isAutoBriefing && isPlaying) {
                  pauseAudio();
                } else if (isAutoBriefing && isPaused) {
                  resumeAudio();
                } else {
                  startAutoBrief(0);
                }
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow transition active:scale-95 ${
                isAutoBriefing && isPlaying
                  ? "bg-[#2dd4bf] text-[#090a0d] font-bold"
                  : "bg-[#2dd4bf]/15 border border-[#2dd4bf]/40 text-[#2dd4bf] hover:bg-[#2dd4bf] hover:text-[#090a0d]"
              }`}
              title="Tour the whole page with audio"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <polygon points="5 3 19 12 5 21 5 3" fill={isAutoBriefing && isPlaying ? "currentColor" : "none"} />
              </svg>
              <span>{isAutoBriefing && isPlaying ? "Pause Tour" : t.audio.autoBriefBtn || "Auto-Brief"}</span>
            </button>

            {/* Play/Pause Button (if not in auto-brief mode) */}
            {!isAutoBriefing && (
              <>
                {!isPlaying && !isPaused ? (
                  <button
                    type="button"
                    onClick={() => startAutoBrief(0)}
                    className="p-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[#edeae3] transition active:scale-95"
                    title="Play"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#2dd4bf]">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                ) : isPlaying ? (
                  <button
                    type="button"
                    onClick={pauseAudio}
                    className="p-1.5 rounded-full bg-[#f59e0b] text-[#090a0d] hover:brightness-110 transition active:scale-95"
                    title="Pause"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resumeAudio}
                    className="p-1.5 rounded-full bg-[#2dd4bf] text-[#090a0d] hover:brightness-110 transition active:scale-95"
                    title="Resume"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}
              </>
            )}

            {/* Stop Button */}
            {(isPlaying || isPaused) && (
              <button
                type="button"
                onClick={stopAudio}
                className="p-1.5 rounded-full border border-white/10 bg-white/5 hover:border-red-500/40 hover:text-red-400 text-[#8c8f9a] transition active:scale-95"
                title="Stop"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <rect x="6" y="6" width="12" height="12" rx="1.5" />
                </svg>
              </button>
            )}

            {/* Speed toggle */}
            <button
              type="button"
              onClick={() => {
                const rates = [0.9, 1.0, 1.25];
                const nextRate = rates[(rates.indexOf(speed) + 1) % rates.length] || 1.0;
                setSpeed(nextRate);
              }}
              className="px-2 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-[#8c8f9a] hover:text-[#edeae3] transition"
              title="Change audio speed"
            >
              {speed}x
            </button>

            {/* Toggle sections pills */}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label="Toggle section selection"
              className={`p-1.5 rounded-full border border-white/10 bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] transition ${
                isExpanded ? "border-[#2dd4bf] text-[#2dd4bf]" : ""
              }`}
              title="Select section"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Close Audio Panel */}
            <button
              type="button"
              onClick={() => {
                stopAudio();
                setIsAudioPanelVisible(false);
              }}
              className="p-1.5 rounded-full border border-white/10 bg-white/5 text-[#8c8f9a] hover:text-red-400 hover:border-red-500/40 transition active:scale-95"
              title="Close"
              aria-label="Close audio player"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Section Brief Chips Row */}
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          {/* Previous / Next Skip Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={skipPrevBrief}
              disabled={autoBriefIndex <= 0}
              className="p-1 rounded border border-white/10 bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] disabled:opacity-20 disabled:pointer-events-none transition"
              title="Previous"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                <polygon points="19 20 9 12 19 4 19 20" />
                <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={skipNextBrief}
              disabled={autoBriefIndex >= briefs.length - 1}
              className="p-1 rounded border border-white/10 bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] disabled:opacity-20 disabled:pointer-events-none transition"
              title="Next"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 custom-scrollbar flex-1 min-w-0">
            {briefs.map((brief, idx) => {
              const isCurrent =
                (isAutoBriefing && autoBriefIndex === idx) ||
                activeSection === brief.id ||
                (brief.id === "intro" && activeSection === "hero") ||
                (brief.id === "mindset" && activeSection === "doctrine") ||
                (brief.id === "connect" && activeSection === "contact");

              return (
                <button
                  key={brief.id}
                  type="button"
                  onClick={() => playBrief(idx)}
                  className={`shrink-0 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-mono transition active:scale-95 ${
                    isCurrent
                      ? "bg-[#2dd4bf] text-[#090a0d] font-semibold shadow"
                      : "bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] hover:border-white/20 border border-white/10"
                  }`}
                  title={brief.title}
                >
                  <span className="opacity-70">0{idx + 1}</span>
                  <span>{brief.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Active Subtitle / Text quote display */}
        {isPlaying && currentSentenceText && (
          <div className="mt-2 rounded-xl border border-[#2dd4bf]/20 bg-[#2dd4bf]/5 px-3 py-2 text-xs leading-relaxed text-[#edeae3] animate-in fade-in">
            <p className="font-sans italic line-clamp-2">"{currentSentenceText}"</p>
          </div>
        )}

        {/* Expanded section drawer */}
        {isExpanded && (
          <div className="mt-2.5 border-t border-white/10 pt-2.5 space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in">
            {briefs.map((brief, idx) => {
              const isCurrent = (isAutoBriefing && autoBriefIndex === idx) || activeSection === brief.id;
              return (
                <button
                  key={brief.id}
                  type="button"
                  onClick={() => {
                    playBrief(idx);
                    setIsExpanded(false);
                  }}
                  className={`w-full text-left rounded-lg p-2 text-xs transition flex items-start gap-2.5 ${
                    isCurrent
                      ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30"
                      : "bg-white/5 text-[#edeae3] hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#555760] mt-0.5">0{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[11px] text-[#edeae3]">{brief.title}</div>
                    <p className="text-[11px] text-[#8c8f9a] line-clamp-1">{brief.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

export function SectionListenButton({
  sectionKey,
  text,
  label,
  className = "",
}: {
  sectionKey: string;
  text?: string;
  label?: string;
  className?: string;
}) {
  const { playSection, activeSection, isPlaying, t } = useLanguage();

  const isCurrentSection =
    isPlaying &&
    (activeSection === sectionKey ||
      (sectionKey === "hero" && (activeSection === "intro" || activeSection === "hero")) ||
      (sectionKey === "intro" && (activeSection === "hero" || activeSection === "intro")) ||
      (sectionKey === "telemetry" && (activeSection === "footprint" || activeSection === "telemetry")) ||
      (sectionKey === "footprint" && (activeSection === "footprint" || activeSection === "telemetry")) ||
      (sectionKey === "doctrine" && (activeSection === "mindset" || activeSection === "doctrine")) ||
      (sectionKey === "mindset" && (activeSection === "mindset" || activeSection === "doctrine")) ||
      (sectionKey === "experience" && activeSection === "experience") ||
      (sectionKey === "projects" && activeSection === "projects") ||
      (sectionKey === "skills" && (activeSection === "skills" || activeSection === "experience")) ||
      (sectionKey === "writing" && (activeSection === "writing" || activeSection === "projects")) ||
      (sectionKey === "contact" && (activeSection === "connect" || activeSection === "contact")) ||
      (sectionKey === "connect" && (activeSection === "connect" || activeSection === "contact")));

  const playingLabel = t.audio.playing || "Playing";
  const idleLabel = label || t.audio.listenSection || "Listen";

  return (
    <button
      type="button"
      onClick={() => playSection(sectionKey, text)}
      title={isCurrentSection ? "Pause/Stop" : `${idleLabel} (${t.meta.nativeName})`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono transition shadow-sm active:scale-95 ${
        isCurrentSection
          ? "border-[#2dd4bf] text-[#2dd4bf] bg-[#2dd4bf]/10 font-semibold"
          : "border-white/10 bg-[#121318]/70 text-[#8c8f9a] hover:border-white/20 hover:text-[#edeae3]"
      } ${className}`}
    >
      {isCurrentSection ? (
        <>
          <span className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:0ms] h-2.5" />
            <span className="w-0.5 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:150ms] h-3.5" />
            <span className="w-0.5 bg-[#2dd4bf] rounded-full animate-bounce [animation-delay:300ms] h-2" />
          </span>
          <span className="text-[#2dd4bf] font-semibold">{playingLabel}</span>
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <span>{idleLabel}</span>
        </>
      )}
    </button>
  );
}
