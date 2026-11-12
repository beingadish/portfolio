"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/language-context";
import { LanguageSelector } from "./language-selector";

export function NinadaPlayer() {
  const {
    t,
    isPlaying,
    isPaused,
    isAutoBriefing,
    autoBriefIndex,
    currentSentenceText,
    voiceGender,
    setVoiceGender,
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
  const [showTranscript, setShowTranscript] = useState(false);

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
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-subtle)]/95 px-3.5 py-2 text-xs font-semibold text-[var(--teal)] shadow-2xl backdrop-blur-xl hover:border-[var(--teal)] transition active:scale-95 group"
        title="Open Ninada Audio Studio"
      >
        <span className="flex h-2 w-2 rounded-full bg-[var(--teal)] animate-pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
        <span>{t.audio.autoBriefBtn || t.audio.readAloud}</span>
        <span className="rounded bg-[var(--teal)]/15 px-1.5 py-0.5 text-[10px] font-mono text-[var(--teal)]">
          {t.meta.nativeName}
        </span>
      </button>
    );
  }

  return (
    <aside
      ref={panelRef}
      aria-label="Ninada Multilingual Audio Player"
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
              bottom: "1rem",
              transform: "translateX(-50%)",
            }
      }
      className={`fixed z-50 w-[calc(100%-2rem)] max-w-2xl pointer-events-auto transition-[box-shadow,border-color] ${
        isDragging ? "select-none cursor-grabbing opacity-95 shadow-2xl scale-[1.01]" : ""
      }`}
    >
      <div className="section-panel rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)]/95 shadow-2xl backdrop-blur-xl p-3 sm:p-4 text-[var(--ink)]">
        {/* Top Drag Handle Bar */}
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          className="w-full flex items-center justify-between pb-1.5 cursor-grab active:cursor-grabbing border-b border-[var(--line)]/50 mb-2 group/drag"
          title={t.audio.dragHandleTooltip || "Drag to reposition audio player"}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--muted)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3 w-3 text-[var(--teal)] shrink-0"
            >
              <path
                d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden xs:inline">Floatable Audio Studio</span>
          </div>

          {/* Center Drag Grip Pill */}
          <div className="flex items-center gap-1 py-0.5 px-3 rounded-full group-hover/drag:bg-[var(--teal)]/10 transition">
            <span className="h-1 w-9 rounded-full bg-[var(--line)] group-hover/drag:bg-[var(--teal)] transition" />
          </div>

          {/* Reset position button if user dragged the player */}
          {position !== null ? (
            <button
              type="button"
              onClick={() => setPosition(null)}
              className="text-[10px] font-medium text-[var(--muted)] hover:text-[var(--teal)] transition flex items-center gap-1 px-1.5 py-0.5 rounded border border-transparent hover:border-[var(--line)]"
              title={t.audio.resetPosition || "Reset position to bottom center"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-2.5 w-2.5">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{t.audio.resetPosition || "Reset"}</span>
            </button>
          ) : (
            <span className="text-[10px] text-[var(--muted)]/60">Drag anywhere</span>
          )}
        </div>

        {/* Main Controls Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Animated Soundwave / Voice Icon */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                isPlaying
                  ? "bg-[var(--teal)]/20 text-[var(--teal)] ring-1 ring-[var(--teal)]"
                  : "bg-[var(--surface)] text-[var(--muted)]"
              }`}
            >
              {isPlaying ? (
                <div className="flex items-center gap-0.5 h-4">
                  <span className="w-1 bg-[var(--teal)] rounded-full animate-bounce [animation-delay:0ms] h-3" />
                  <span className="w-1 bg-[var(--teal)] rounded-full animate-bounce [animation-delay:150ms] h-4" />
                  <span className="w-1 bg-[var(--teal)] rounded-full animate-bounce [animation-delay:300ms] h-2.5" />
                  <span className="w-1 bg-[var(--teal)] rounded-full animate-bounce [animation-delay:450ms] h-3.5" />
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-tight text-[var(--ink)] truncate">
                  {isPlaying ? t.audio.playing : isPaused ? t.audio.paused : t.audio.readAloud}
                </span>
                <a
                  href="https://h3manth.com/ai/ninada/"
                  target="_blank"
                  rel="noreferrer"
                  title="Ninada In-browser Neural TTS by Hemanth HM"
                  className="hidden sm:inline-flex items-center gap-1 rounded bg-[var(--teal)]/10 px-1.5 py-0.5 text-[10px] font-medium text-[var(--teal)] hover:underline"
                >
                  <span>Ninada TTS</span>
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path
                      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <p className="text-[11px] text-[var(--muted)] truncate">
                {isAutoBriefing && autoBriefIndex >= 0
                  ? `${t.audio.stepIndicator} ${autoBriefIndex + 1}/5: ${briefs[autoBriefIndex]?.title || ""}`
                  : `Language: ${t.meta.nativeName} (${t.meta.name})`}
              </p>
            </div>
          </div>

          {/* Controls: Auto-Brief, Play/Pause, Stop, Language Selector, Settings, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Prominent Auto-Brief Button */}
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
                isAutoBriefing
                  ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)] ring-2 ring-[var(--teal)]/30 font-bold"
                  : "bg-[var(--teal)]/15 border border-[var(--teal)]/40 text-[var(--teal)] hover:bg-[var(--teal)] hover:text-[var(--surface-base,#080f12)]"
              }`}
              title={t.audio.autoBriefTourTitle}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={isAutoBriefing ? "currentColor" : "none"}
                />
              </svg>
              <span>{t.audio.autoBriefBtn}</span>
            </button>

            {/* Play/Pause Button (if playing non-auto-brief audio) */}
            {!isAutoBriefing && (
              <>
                {!isPlaying && !isPaused ? (
                  <button
                    type="button"
                    onClick={() => startAutoBrief(0)}
                    className="flex items-center gap-1.5 rounded-full bg-[var(--surface)] border border-[var(--line)] px-2.5 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--teal)] hover:text-[var(--teal)] shadow-sm transition active:scale-95"
                    title={t.audio.readAloud}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[var(--teal)]">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                ) : isPlaying ? (
                  <button
                    type="button"
                    onClick={pauseAudio}
                    className="flex items-center gap-1.5 rounded-full bg-[var(--amber)] px-2.5 py-1.5 text-xs font-semibold text-[var(--surface-base,#080f12)] shadow hover:brightness-110 transition active:scale-95"
                    title="Pause audio"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resumeAudio}
                    className="flex items-center gap-1.5 rounded-full bg-[var(--teal)] px-2.5 py-1.5 text-xs font-semibold text-[var(--surface-base,#080f12)] shadow hover:brightness-110 transition active:scale-95"
                    title="Resume audio"
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
                className="rounded-full border border-[var(--line)] bg-[var(--surface)] p-1.5 text-[var(--muted)] hover:text-red-400 hover:border-red-400/50 transition"
                title="Stop audio"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <rect x="6" y="6" width="12" height="12" rx="1.5" />
                </svg>
              </button>
            )}

            {/* Language Selector Dropdown */}
            <LanguageSelector compact dropUp />

            {/* Settings / Options toggle button */}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-label="Toggle Ninada audio controls"
              className={`rounded-full border border-[var(--line)] bg-[var(--surface)] p-1.5 text-[var(--muted)] hover:text-[var(--teal)] transition ${
                isExpanded ? "border-[var(--teal)] text-[var(--teal)]" : ""
              }`}
              title="Voice settings and section briefs"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            {/* Close / Dismiss Audio Panel Button */}
            <button
              type="button"
              onClick={() => {
                stopAudio();
                setIsAudioPanelVisible(false);
              }}
              className="rounded-full border border-[var(--line)] bg-[var(--surface)] p-1.5 text-[var(--muted)] hover:text-red-400 hover:border-red-400/50 transition active:scale-95"
              title="Close audio panel"
              aria-label="Close audio panel"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* 5-Block Section Briefs Navigation & Progress Tour */}
        <div className="mt-2.5 pt-2 border-t border-[var(--line)]">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--teal)] truncate">
                {isAutoBriefing
                  ? `${t.audio.stepIndicator} ${autoBriefIndex + 1}/5: ${briefs[autoBriefIndex]?.title || ""}`
                  : t.audio.autoBriefTourTitle}
              </span>
            </div>

            {/* Previous / Next Skip Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={skipPrevBrief}
                disabled={autoBriefIndex <= 0}
                className="rounded border border-[var(--line)] bg-[var(--surface)] p-1 text-[var(--muted)] hover:text-[var(--teal)] disabled:opacity-30 disabled:pointer-events-none transition"
                title={t.audio.skipPrev}
                aria-label={t.audio.skipPrev}
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
                className="rounded border border-[var(--line)] bg-[var(--surface)] p-1 text-[var(--muted)] hover:text-[var(--teal)] disabled:opacity-30 disabled:pointer-events-none transition"
                title={t.audio.skipNext}
                aria-label={t.audio.skipNext}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Interactive 5 Brief Chips: Intro, Mindset, Experience, Projects, Connect */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {briefs.map((brief, idx) => {
              const isCurrent = (isAutoBriefing && autoBriefIndex === idx) || activeSection === brief.id;
              return (
                <button
                  key={brief.id}
                  type="button"
                  onClick={() => playBrief(idx)}
                  className={`shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-95 ${
                    isCurrent
                      ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)] font-semibold shadow"
                      : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--teal)]/40 border border-[var(--line)]"
                  }`}
                  title={brief.title}
                >
                  <span className="text-[9px] font-mono opacity-70">0{idx + 1}</span>
                  <span>{brief.title}</span>
                  {isCurrent && isPlaying && (
                    <span className="flex items-center gap-0.5 h-2">
                      <span className="w-0.5 bg-current rounded-full animate-bounce h-2" />
                      <span className="w-0.5 bg-current rounded-full animate-bounce [animation-delay:150ms] h-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Active Subtitle / Sentence display */}
        {isPlaying && currentSentenceText && (
          <div className="mt-2.5 rounded-xl border border-[var(--teal)]/30 bg-[var(--teal)]/10 px-3 py-2 text-xs leading-relaxed text-[var(--ink)] shadow-inner animate-in fade-in slide-in-from-bottom-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--teal)] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)] animate-ping" />
                Speaking Brief ({t.meta.nativeName}):
              </span>
              {isAutoBriefing && (
                <span className="text-[10px] font-mono text-[var(--muted)]">
                  {autoBriefIndex + 1} / 5
                </span>
              )}
            </div>
            <p className="font-normal italic text-[var(--ink)]">"{currentSentenceText}"</p>
          </div>
        )}

        {/* Expanded Options Drawer */}
        {isExpanded && (
          <div className="mt-3 border-t border-[var(--line)] pt-3 space-y-3 animate-in fade-in duration-200">
            {/* Voice and Speed settings */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Voice specialist */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--muted)]">{t.audio.voice}:</span>
                <div className="flex rounded-lg border border-[var(--line)] bg-[var(--surface)] p-0.5">
                  <button
                    type="button"
                    onClick={() => setVoiceGender("female")}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                      voiceGender === "female"
                        ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)] font-semibold"
                        : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {t.audio.female}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoiceGender("male")}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                      voiceGender === "male"
                        ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)] font-semibold"
                        : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {t.audio.male}
                  </button>
                </div>
              </div>

              {/* Speed rate selector */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--muted)]">{t.audio.speed}:</span>
                <div className="flex rounded-lg border border-[var(--line)] bg-[var(--surface)] p-0.5">
                  {[0.8, 1.0, 1.25].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setSpeed(rate)}
                      className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                        speed === rate
                          ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)] font-semibold"
                          : "text-[var(--muted)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle transcript button */}
              <button
                type="button"
                onClick={() => setShowTranscript((prev) => !prev)}
                className="text-[11px] font-semibold text-[var(--teal)] hover:underline inline-flex items-center gap-1"
              >
                <span>{showTranscript ? "Hide All Briefs" : "Show All Briefs"}</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-3 w-3 transition-transform ${showTranscript ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Interactive Section Briefs List */}
            {showTranscript && (
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                <p className="text-[10px] uppercase font-semibold text-[var(--muted)] tracking-wider">
                  Select a section brief to read aloud in {t.meta.nativeName}:
                </p>
                {briefs.map((brief, idx) => {
                  const isCurrent = (isAutoBriefing && autoBriefIndex === idx) || activeSection === brief.id;
                  return (
                    <button
                      key={brief.id}
                      type="button"
                      onClick={() => playBrief(idx)}
                      className={`w-full text-left rounded-lg p-2 text-xs leading-relaxed transition flex items-start gap-2.5 ${
                        isCurrent
                          ? "bg-[var(--teal)]/20 text-[var(--teal)] border border-[var(--teal)]/40 font-medium"
                          : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--teal)]/10 hover:text-[var(--teal)] border border-transparent"
                      }`}
                    >
                      <span className="text-[10px] font-mono shrink-0 mt-0.5 opacity-60">
                        0{idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[11px] text-[var(--ink)] mb-0.5">
                          {brief.title}
                        </div>
                        <p className="text-[11px] text-[var(--muted)] line-clamp-2">{brief.text}</p>
                      </div>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 shrink-0 mt-1 opacity-70">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Footer with Ninada documentation citation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[var(--line)] text-[10px] text-[var(--muted)]">
              <div>
                <span>{t.audio.poweredBy} • </span>
                <span className="text-[var(--teal)]">24 kHz Sub-second On-Device TTS</span>
              </div>
              <a
                href="https://h3manth.com/ai/ninada/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--teal)] hover:underline inline-flex items-center gap-1"
              >
                <span>{t.audio.ninadaStudioLink}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-2.5 w-2.5">
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
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

  const briefMapping: Record<string, string> = {
    hero: "intro",
    intro: "intro",
    about: "mindset",
    mindset: "mindset",
    experience: "experience",
    projects: "projects",
    contact: "connect",
    connect: "connect",
  };
  const targetBriefId = briefMapping[sectionKey];
  const isCurrentSection =
    isPlaying && (activeSection === sectionKey || activeSection === targetBriefId);

  return (
    <button
      type="button"
      onClick={() => playSection(sectionKey, text)}
      title={`${t.audio.listenSection} (${t.meta.nativeName})`}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)] hover:border-[var(--teal)] hover:text-[var(--teal)] transition shadow-sm active:scale-95 ${
        isCurrentSection ? "border-[var(--teal)] text-[var(--teal)] bg-[var(--teal)]/10 font-semibold" : ""
      } ${className}`}
    >
      {isCurrentSection ? (
        <span className="flex items-center gap-0.5 h-3">
          <span className="w-0.5 bg-[var(--teal)] rounded-full animate-bounce [animation-delay:0ms] h-2" />
          <span className="w-0.5 bg-[var(--teal)] rounded-full animate-bounce [animation-delay:150ms] h-3" />
          <span className="w-0.5 bg-[var(--teal)] rounded-full animate-bounce [animation-delay:300ms] h-2" />
        </span>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
      <span>{label || t.audio.listenSection}</span>
    </button>
  );
}
