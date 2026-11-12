"use client";

import React, { useMemo } from "react";
import { useAudioTour } from "../context/audio-tour-context";
import { useLanguage } from "../context/language-context";
import type { LanguageCode } from "../data/translations";

const UI_LABELS: Record<
  LanguageCode,
  {
    listen: string;
    playing: string;
    paused: string;
    tour: string;
    autoTour: string;
    reset: string;
    close: string;
  }
> = {
  en: { listen: "Listen", playing: "Playing", paused: "Paused", tour: "Audio Tour", autoTour: "Auto-Tour", reset: "Reset", close: "Close" },
  hi: { listen: "सुनें", playing: "चल रहा है", paused: "रुका हुआ", tour: "ऑडियो टूर", autoTour: "ऑटो-टूर", reset: "रीसेट", close: "बंद करें" },
  sa: { listen: "शृण्वन्तु", playing: "प्रचलति", paused: "विरामः", tour: "ध्वनि-यात्रा", autoTour: "स्वयम्-यात्रा", reset: "पुनर्स्थापनम्", close: "पिधानम्" },
  kn: { listen: "ಕೇಳಿ", playing: "ಪ್ಲೇ ಆಗುತ್ತಿದೆ", paused: "ವಿರಾಮ", tour: "ಆಡಿಯೋ ಪ್ರವಾಸ", autoTour: "ಆಟೋ-ಟೂರ್", reset: "ಮರುಹೊಂದಿಸಿ", close: "ಮುಚ್ಚಿ" },
  ta: { listen: "கேளுங்கள்", playing: "ஒலிக்கிறது", paused: "இடைநிறுத்தம்", tour: "ஆடியோ பயணம்", autoTour: "தானியங்கி பயணம்", reset: "மீட்டமை", close: "மூடு" },
  te: { listen: "వినండి", playing: "ప్లే అవుతోంది", paused: "పాజ్ చేయబడింది", tour: "ఆడియో టూర్", autoTour: "ఆటో-టూర్", reset: "రీసెట్", close: "మూసివేయి" },
  ml: { listen: "കേൾക്കൂ", playing: "പ്ലേ ചെയ്യുന്നു", paused: "താൽക്കാലികമായി നിർത്തി", tour: "ഓഡിയോ ടൂർ", autoTour: "ഓട്ടോ-ടൂർ", reset: "റീസെറ്റ്", close: "അടയ്ക്കുക" },
  mr: { listen: "ऐका", playing: "सुरू आहे", paused: "थांबवले", tour: "ऑडिओ टूर", autoTour: "ऑटो-टूर", reset: "रीसेट", close: "बंद करा" },
  bn: { listen: "শুনুন", playing: "চলছে", paused: "স্থগিত", tour: "অডিও ট্যুর", autoTour: "অটো-ট্যুর", reset: "রিসেট", close: "বন্ধ করুন" },
  gu: { listen: "સાંભળો", playing: "ચાલી રહ્યું છે", paused: "અટકાવેલ", tour: "ઑડિયો ટૂર", autoTour: "ઑટો-ટૂર", reset: "રીસેટ", close: "બંધ કરો" },
  pa: { listen: "ਸੁਣੋ", playing: "ਚੱਲ ਰਿਹਾ ਹੈ", paused: "ਰੋਕਿਆ ਗਿਆ", tour: "ਆਡੀਓ ਟੂਰ", autoTour: "ਆਟੋ-ਟੂਰ", reset: "ਰੀਸੈੱਟ", close: "ਬੰਦ ਕਰੋ" },
  or: { listen: "ଶୁଣନ୍ତୁ", playing: "ଚାଲୁଛି", paused: "ବିରାମ", tour: "ଅଡିଓ ଟୁର୍", autoTour: "ଅଟୋ-ଟୁର୍", reset: "ରିସେଟ୍", close: "ବନ୍ଦ କରନ୍ତୁ" },
};

const SECTION_TO_BRIEF: Record<string, string> = {
  hero: "intro",
  intro: "intro",
  telemetry: "footprint",
  footprint: "footprint",
  doctrine: "mindset",
  mindset: "mindset",
  philosophy: "mindset",
  experience: "experience",
  projects: "projects",
  skills: "experience",
  writing: "projects",
  contact: "connect",
  connect: "connect",
};

/**
 * Animated Sound Wave Equalizer Icon
 */
function EqualizerIcon() {
  return (
    <span className="inline-flex items-center gap-[2px] h-3 w-3 shrink-0">
      <span className="w-[2.5px] bg-[#2dd4bf] rounded-full h-full animate-[bounce_0.8s_infinite_ease-in-out]" />
      <span className="w-[2.5px] bg-[#2dd4bf] rounded-full h-full animate-[bounce_1.1s_infinite_ease-in-out_0.2s]" />
      <span className="w-[2.5px] bg-[#2dd4bf] rounded-full h-full animate-[bounce_0.9s_infinite_ease-in-out_0.4s]" />
    </span>
  );
}

/**
 * Standalone Section Listen Button
 * Placed beside specimen section headers. Toggles between "Listen" and "Playing" / "Paused".
 */
export function SectionAudioButton({
  sectionId,
  className = "",
}: {
  sectionId: string;
  className?: string;
}) {
  const { currentBriefId, isPlaying, isPaused, playSection, pauseAudio, resumeAudio } = useAudioTour();
  const { currentLanguage } = useLanguage();

  const labels = UI_LABELS[currentLanguage] || UI_LABELS.en;
  const targetBriefId = SECTION_TO_BRIEF[sectionId] || "intro";
  const isThisSectionActive = currentBriefId === targetBriefId;
  const isThisPlaying = isThisSectionActive && isPlaying;
  const isThisPaused = isThisSectionActive && isPaused;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisPlaying) {
      pauseAudio();
    } else if (isThisPaused) {
      resumeAudio();
    } else {
      playSection(sectionId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${isThisPlaying ? labels.playing : labels.listen} audio brief`}
      className={`group inline-flex items-center gap-2 px-2.5 py-1 rounded border font-mono text-[11px] transition-all cursor-pointer ${
        isThisPlaying
          ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/10 text-[#2dd4bf] shadow-[0_0_12px_rgba(45,212,191,0.2)]"
          : isThisPaused
          ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
          : "border-white/10 bg-[#14151c]/70 text-[#8c8f9a] hover:text-[#edeae3] hover:border-white/20"
      } ${className}`}
    >
      {isThisPlaying ? (
        <>
          <EqualizerIcon />
          <span className="font-medium tracking-wide">{labels.playing}</span>
        </>
      ) : isThisPaused ? (
        <>
          <svg className="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
          <span className="font-medium tracking-wide">{labels.paused}</span>
        </>
      ) : (
        <>
          <svg
            className="w-3 h-3 text-[#8c8f9a] group-hover:text-[#edeae3] transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <span className="tracking-wide">{labels.listen}</span>
        </>
      )}
    </button>
  );
}

/**
 * Main Floating Audio Tour Player Bar
 * Sleek, minimal, modern audio controller with pre-rendered studio voices.
 * Strictly does NOT include duplicate language selector (language remains in header).
 */
export function PortfolioAudioTour() {
  const {
    isPlaying,
    isPaused,
    isTourActive,
    currentBriefId,
    currentBriefIndex,
    currentBriefText,
    speed,
    setSpeed,
    startTour,
    playSection,
    pauseAudio,
    resumeAudio,
    stopAudio,
    isPanelVisible,
    setIsPanelVisible,
    briefs,
  } = useAudioTour();

  const { currentLanguage, languages } = useLanguage();
  const labels = UI_LABELS[currentLanguage] || UI_LABELS.en;

  const currentLangLabel = useMemo(() => {
    const found = languages.find((l) => l.code === currentLanguage);
    return found ? `${found.name} (${found.nativeName})` : currentLanguage.toUpperCase();
  }, [currentLanguage, languages]);

  // Speed cycle: 1.0x -> 1.25x -> 0.9x -> 1.0x
  const handleNextSpeed = () => {
    if (speed === 1.0) setSpeed(1.25);
    else if (speed === 1.25) setSpeed(0.9);
    else setSpeed(1.0);
  };

  const handlePrevTrack = () => {
    if (briefs.length === 0) return;
    const prevIdx = currentBriefIndex <= 0 ? briefs.length - 1 : currentBriefIndex - 1;
    playSection(briefs[prevIdx].id);
  };

  const handleNextTrack = () => {
    if (briefs.length === 0) return;
    const nextIdx = currentBriefIndex >= briefs.length - 1 ? 0 : currentBriefIndex + 1;
    playSection(briefs[nextIdx].id);
  };

  // If panel is hidden / dismissed and not actively playing, show minimal floating button
  if (!isPanelVisible && !isPlaying && !isPaused) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setIsPanelVisible(true);
            startTour(0);
          }}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-white/15 bg-[#090a0d]/90 backdrop-blur-md shadow-xl hover:border-[#2dd4bf]/40 hover:bg-[#14151c] text-[#edeae3] transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
          <svg className="w-3.5 h-3.5 text-[#2dd4bf]" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span className="font-mono text-xs tracking-wider uppercase">{labels.tour}</span>
        </button>
      </div>
    );
  }

  const activeBrief = briefs[currentBriefIndex] || briefs[0];

  return (
    <div
      aria-label="Audio Tour Bar"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95vw] max-w-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="relative rounded-2xl border border-white/10 bg-[#0d0e12]/95 backdrop-blur-xl shadow-2xl p-3 sm:p-4 flex flex-col gap-3 text-[#edeae3]">
        {/* Header Row: Title, Language Indicator, Speed, Reset & Close */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying
                  ? "bg-[#2dd4bf] animate-pulse shadow-[0_0_8px_#2dd4bf]"
                  : isPaused
                  ? "bg-amber-400"
                  : "bg-white/30"
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#edeae3]">
              {labels.tour}
            </span>
            <span className="text-white/20 text-xs font-mono">•</span>
            {/* Informational language badge ONLY (no duplicate dropdown) */}
            <span className="font-mono text-[11px] text-[#8c8f9a] bg-white/5 border border-white/10 px-2 py-0.5 rounded">
              {currentLangLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Speed Toggle */}
            <button
              type="button"
              onClick={handleNextSpeed}
              title="Playback speed"
              className="px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
            >
              {speed}x
            </button>

            {/* Auto-tour / Sequence Play */}
            <button
              type="button"
              onClick={() => {
                if (isTourActive && isPlaying) {
                  pauseAudio();
                } else if (isTourActive && isPaused) {
                  resumeAudio();
                } else {
                  startTour(0);
                }
              }}
              className={`px-2.5 py-1 rounded border font-mono text-xs flex items-center gap-1.5 transition-all ${
                isTourActive
                  ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/10 text-[#2dd4bf]"
                  : "border-white/10 bg-white/5 hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3]"
              }`}
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{labels.autoTour}</span>
            </button>

            {/* Reset / Stop */}
            <button
              type="button"
              onClick={stopAudio}
              title={labels.reset}
              className="p-1.5 rounded hover:bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={() => {
                stopAudio();
                setIsPanelVisible(false);
              }}
              title={labels.close}
              className="p-1.5 rounded hover:bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
            >
              <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Playback Controls & Currently Playing Section Info */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              type="button"
              onClick={handlePrevTrack}
              title="Previous section"
              className="p-1.5 rounded hover:bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <polygon points="19 20 9 12 19 4 19 20" />
                <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => {
                if (isPlaying) {
                  pauseAudio();
                } else if (isPaused) {
                  resumeAudio();
                } else {
                  playSection(currentBriefId || "intro");
                }
              }}
              className="w-8 h-8 rounded-full bg-[#edeae3] text-[#090a0d] flex items-center justify-center hover:bg-white transition-all shadow-md"
            >
              {isPlaying ? (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={handleNextTrack}
              title="Next section"
              className="p-1.5 rounded hover:bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Current Track Label */}
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="font-mono text-xs text-[#2dd4bf] font-medium shrink-0">
              {isPlaying ? labels.playing : isPaused ? labels.paused : "Ready"}:
            </span>
            <span className="text-xs text-[#edeae3] truncate font-medium">
              {activeBrief?.title}
            </span>
          </div>

          <span className="font-mono text-[11px] text-[#555760] tabular-nums shrink-0">
            {currentBriefIndex >= 0 ? `${currentBriefIndex + 1} / ${briefs.length}` : `6 sections`}
          </span>
        </div>

        {/* Section Pills Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {briefs.map((brief, idx) => {
            const isThisCurrent = currentBriefId === brief.id;
            return (
              <button
                key={brief.id}
                type="button"
                onClick={() => playSection(brief.id)}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] whitespace-nowrap transition-all border ${
                  isThisCurrent
                    ? "border-[#2dd4bf] bg-[#2dd4bf]/15 text-[#2dd4bf] font-medium shadow-[0_0_8px_rgba(45,212,191,0.2)]"
                    : "border-white/10 bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] hover:border-white/20"
                }`}
              >
                0{idx + 1} {brief.title}
              </button>
            );
          })}
        </div>

        {/* Live Subtitle Transcript (Brief snippet) */}
        {currentBriefText && (
          <div className="pt-2 border-t border-white/5 text-xs text-[#8c8f9a] line-clamp-2 leading-relaxed font-sans italic">
            &ldquo;{currentBriefText}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
