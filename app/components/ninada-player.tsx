"use client";

import { useState } from "react";
import { useLanguage } from "../context/language-context";
import { LanguageSelector } from "./language-selector";

export function NinadaPlayer() {
  const {
    currentLanguage,
    t,
    isPlaying,
    isPaused,
    currentSentenceIndex,
    currentSentenceText,
    voiceGender,
    setVoiceGender,
    speed,
    setSpeed,
    playAll,
    playSentence,
    pauseAudio,
    resumeAudio,
    stopAudio,
    activeSection,
  } = useLanguage();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const sentences = t.readOutSentences || [];
  const currentSentenceNum = currentSentenceIndex >= 0 ? currentSentenceIndex + 1 : 0;
  const totalSentences = sentences.length;

  return (
    <aside
      aria-label="Ninada Multilingual Audio Player"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl transition-all duration-300 pointer-events-auto"
    >
      <div className="section-panel rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)]/95 shadow-2xl backdrop-blur-xl p-3 sm:p-4 text-[var(--ink)]">
        {/* Top bar: Status, active indicator, language badge, and toggle */}
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <p className="text-[11px] text-[var(--muted)] truncate">
                {isPlaying && currentSentenceNum > 0
                  ? `Sentence ${currentSentenceNum} of ${totalSentences}`
                  : `Language: ${t.meta.nativeName} (${t.meta.name})`}
              </p>
            </div>
          </div>

          {/* Controls: Play, Pause, Stop, Language Selector, Expand */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Play/Pause Button */}
            {!isPlaying && !isPaused ? (
              <button
                type="button"
                onClick={playAll}
                className="flex items-center gap-1.5 rounded-full bg-[var(--teal)] px-3 py-1.5 text-xs font-semibold text-[var(--surface-base,#080f12)] shadow hover:brightness-110 transition active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="hidden sm:inline">{t.audio.readAloud}</span>
              </button>
            ) : isPlaying ? (
              <button
                type="button"
                onClick={pauseAudio}
                className="flex items-center gap-1.5 rounded-full bg-[var(--amber)] px-3 py-1.5 text-xs font-semibold text-[var(--surface-base,#080f12)] shadow hover:brightness-110 transition active:scale-95"
                title="Pause audio"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <span className="hidden sm:inline">Pause</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={resumeAudio}
                className="flex items-center gap-1.5 rounded-full bg-[var(--teal)] px-3 py-1.5 text-xs font-semibold text-[var(--surface-base,#080f12)] shadow hover:brightness-110 transition active:scale-95"
                title="Resume audio"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="hidden sm:inline">Resume</span>
              </button>
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

            {/* Language Selector in player */}
            <LanguageSelector compact />

            {/* Settings / Options toggle button */}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-label="Toggle Ninada audio controls"
              className={`rounded-full border border-[var(--line)] bg-[var(--surface)] p-1.5 text-[var(--muted)] hover:text-[var(--teal)] transition ${
                isExpanded ? "border-[var(--teal)] text-[var(--teal)]" : ""
              }`}
              title="Voice settings and transcript"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Live Active Subtitle / Sentence display */}
        {isPlaying && currentSentenceText && (
          <div className="mt-2.5 rounded-xl border border-[var(--teal)]/20 bg-[var(--teal)]/5 px-3 py-2 text-xs leading-relaxed text-[var(--ink)] animate-in fade-in slide-in-from-bottom-1">
            <span className="font-semibold text-[var(--teal)] mr-1.5">Speaking:</span>
            <span>{currentSentenceText}</span>
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
                        ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)]"
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
                        ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)]"
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
                          ? "bg-[var(--teal)] text-[var(--surface-base,#080f12)]"
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
                <span>{showTranscript ? "Hide Sentences" : "Show Sentences"}</span>
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

            {/* Interactive Sentences List */}
            {showTranscript && (
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                <p className="text-[10px] uppercase font-semibold text-[var(--muted)] tracking-wider">
                  Click any sentence to read it aloud in {t.meta.nativeName}:
                </p>
                {sentences.map((sent, idx) => {
                  const isCurrent = currentSentenceIndex === idx && activeSection === "full-intro";
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => playSentence(idx)}
                      className={`w-full text-left rounded-lg p-2 text-xs leading-relaxed transition flex items-start gap-2 ${
                        isCurrent
                          ? "bg-[var(--teal)]/20 text-[var(--teal)] border border-[var(--teal)]/40 font-medium"
                          : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--teal)]/10 hover:text-[var(--teal)] border border-transparent"
                      }`}
                    >
                      <span className="text-[10px] font-mono shrink-0 mt-0.5 opacity-60">
                        0{idx + 1}
                      </span>
                      <span className="flex-1">{sent}</span>
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
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
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
  text: string;
  label?: string;
  className?: string;
}) {
  const { playSection, activeSection, isPlaying, t } = useLanguage();
  const isCurrentSection = activeSection === sectionKey && isPlaying;

  return (
    <button
      type="button"
      onClick={() => playSection(sectionKey, text)}
      title={`${t.audio.listenSection} (${t.meta.nativeName})`}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)] hover:border-[var(--teal)] hover:text-[var(--teal)] transition shadow-sm active:scale-95 ${
        isCurrentSection ? "border-[var(--teal)] text-[var(--teal)] bg-[var(--teal)]/10" : ""
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
