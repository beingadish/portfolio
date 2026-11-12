"use client";

import React, { useMemo, useState } from "react";
import { useAudioTour } from "../context/audio-tour-context";
import { useLanguage } from "../context/language-context";
import type { LanguageCode } from "../data/translations";

const SPEED_OPTIONS = [1.0, 1.2, 1.5, 1.8, 2.0] as const;

const UI_LABELS: Record<
  LanguageCode,
  {
    listen: string;
    playing: string;
    paused: string;
    ready: string;
    tour: string;
    autoTour: string;
    reset: string;
    minimize: string;
    sections: string;
    speed: string;
  }
> = {
  en: {
    listen: "Listen",
    playing: "Playing",
    paused: "Paused",
    ready: "Ready",
    tour: "Audio Tour",
    autoTour: "Auto-Tour",
    reset: "Reset",
    minimize: "Minimize",
    sections: "Sections",
    speed: "Speed",
  },
  hi: {
    listen: "सुनें",
    playing: "चल रहा है",
    paused: "रुका हुआ",
    ready: "तैयार",
    tour: "ऑडियो टूर",
    autoTour: "ऑटो-टूर",
    reset: "रीसेट",
    minimize: "छोटा करें",
    sections: "सेक्शन्स",
    speed: "गति",
  },
  sa: {
    listen: "शृण्वन्तु",
    playing: "प्रचलति",
    paused: "विरामः",
    ready: "सज्जम्",
    tour: "ध्वनि-यात्रा",
    autoTour: "स्वयम्-यात्रा",
    reset: "पुनर्स्थापनम्",
    minimize: "सङ्कुचयतु",
    sections: "विभागाः",
    speed: "गतिः",
  },
  kn: {
    listen: "ಕೇಳಿ",
    playing: "ಪ್ಲೇ ಆಗುತ್ತಿದೆ",
    paused: "ವಿರಾಮ",
    ready: "ಸಿದ್ಧ",
    tour: "ಆಡಿಯೋ ಪ್ರವಾಸ",
    autoTour: "ಆಟೋ-ಟೂರ್",
    reset: "ಮರುಹೊಂದಿಸಿ",
    minimize: "ಕುಗ್ಗಿಸಿ",
    sections: "ವಿಭಾಗಗಳು",
    speed: "ವೇಗ",
  },
  ta: {
    listen: "கேளுங்கள்",
    playing: "ஒலிக்கிறது",
    paused: "இடைநிறுத்தம்",
    ready: "தயார்",
    tour: "ஆடியோ பயணம்",
    autoTour: "தானியங்கி பயணம்",
    reset: "மீட்டமை",
    minimize: "சுருக்கு",
    sections: "பிரிவுகள்",
    speed: "வேகம்",
  },
  te: {
    listen: "వినండి",
    playing: "ప్లే అవుతోంది",
    paused: "పాజ్ చేయబడింది",
    ready: "సిద్ధం",
    tour: "ఆడియో టూర్",
    autoTour: "ఆటో-టూర్",
    reset: "రీసెట్",
    minimize: "కుదించు",
    sections: "విభాగాలు",
    speed: "వేగం",
  },
  ml: {
    listen: "കേൾക്കൂ",
    playing: "പ്ലേ ചെയ്യുന്നു",
    paused: "താൽക്കാലികമായി നിർത്തി",
    ready: "തയ്യാറാണ്",
    tour: "ഓഡിയോ ടൂർ",
    autoTour: "ഓട്ടോ-ടൂർ",
    reset: "റീസെറ്റ്",
    minimize: "ചെറുതാക്കുക",
    sections: "വിഭാഗങ്ങൾ",
    speed: "വേഗത",
  },
  mr: {
    listen: "ऐका",
    playing: "सुरू आहे",
    paused: "थांबवले",
    ready: "सज्ज",
    tour: "ऑडिओ टूर",
    autoTour: "ऑटो-टूर",
    reset: "रीसेट",
    minimize: "लहान करा",
    sections: "विभाग",
    speed: "गती",
  },
  bn: {
    listen: "শুনুন",
    playing: "চলছে",
    paused: "স্থগিত",
    ready: "প্রস্তুত",
    tour: "অডিও ট্যুর",
    autoTour: "অটো-ট্যুর",
    reset: "রিসেট",
    minimize: "ছোট করুন",
    sections: "বিভাগসমূহ",
    speed: "গতি",
  },
  gu: {
    listen: "સાંભળો",
    playing: "ચાલી રહ્યું છે",
    paused: "અટકાવેલ",
    ready: "તૈયાર",
    tour: "ઑડિયો ટૂર",
    autoTour: "ઑટો-ટૂર",
    reset: "રીસેટ",
    minimize: "નાનું કરો",
    sections: "વિભાગો",
    speed: "ઝડપ",
  },
  pa: {
    listen: "ਸੁਣੋ",
    playing: "ਚੱਲ ਰਿਹਾ ਹੈ",
    paused: "ਰੋਕਿਆ ਗਿਆ",
    ready: "ਤਿਆਰ",
    tour: "ਆਡੀਓ ਟੂਰ",
    autoTour: "ਆਟੋ-ਟੂਰ",
    reset: "ਰੀਸੈੱਟ",
    minimize: "ਛੋਟਾ ਕਰੋ",
    sections: "ਭਾਗ",
    speed: "ਗਤੀ",
  },
  or: {
    listen: "ଶୁଣନ୍ତୁ",
    playing: "ଚାଲୁଛି",
    paused: "ବିରାମ",
    ready: "ପ୍ରସ୍ତୁତ",
    tour: "ଅଡିଓ ଟୁର୍",
    autoTour: "ଅଟୋ-ଟୁର୍",
    reset: "ରିସେଟ୍",
    minimize: "ଛୋଟ କରନ୍ତୁ",
    sections: "ବିଭାଗ",
    speed: "ଗତି",
  },
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
    <span className="inline-flex items-center gap-[2.5px] h-3.5 w-3.5 shrink-0">
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
      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all cursor-pointer select-none ${
        isThisPlaying
          ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/10 text-[#2dd4bf] shadow-[0_0_12px_rgba(45,212,191,0.25)] font-semibold"
          : isThisPaused
          ? "border-amber-500/40 bg-amber-500/10 text-amber-300 font-medium"
          : "border-white/15 bg-[#14151c]/80 text-[#8c8f9a] hover:text-[#edeae3] hover:border-white/30"
      } ${className}`}
    >
      {isThisPlaying ? (
        <>
          <EqualizerIcon />
          <span className="font-semibold tracking-wide">{labels.playing}</span>
        </>
      ) : isThisPaused ? (
        <>
          <svg className="w-3.5 h-3.5 text-amber-300 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
          <span className="font-medium tracking-wide">{labels.paused}</span>
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5 text-[#8c8f9a] group-hover:text-[#edeae3] transition-colors"
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
 * Docked at the bottom, displays spoken text, controls, section pills, and speeds [1x, 1.2x, 1.5x, 1.8x, 2x].
 * Does NOT contain duplicate language switcher (language is controlled in top header).
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

  const [isSectionsExpanded, setIsSectionsExpanded] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const currentLangLabel = useMemo(() => {
    const found = languages.find((l) => l.code === currentLanguage);
    return found ? `${found.name} (${found.nativeName})` : currentLanguage.toUpperCase();
  }, [currentLanguage, languages]);

  const activeIndex = currentBriefIndex >= 0 && currentBriefIndex < briefs.length ? currentBriefIndex : 0;
  const activeBrief = briefs[activeIndex] || briefs[0];

  const handlePrevTrack = () => {
    if (briefs.length === 0) return;
    const prevIdx = activeIndex <= 0 ? briefs.length - 1 : activeIndex - 1;
    playSection(briefs[prevIdx].id);
  };

  const handleNextTrack = () => {
    if (briefs.length === 0) return;
    const nextIdx = activeIndex >= briefs.length - 1 ? 0 : activeIndex + 1;
    playSection(briefs[nextIdx].id);
  };

  // If user explicitly minimized the panel, show the compact pill button
  if (!isPanelVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-in fade-in">
        <button
          type="button"
          onClick={() => {
            setIsPanelVisible(true);
            if (!isPlaying && !isPaused) {
              startTour(0);
            }
          }}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/20 bg-[#090a0d]/95 backdrop-blur-xl shadow-2xl hover:border-[#2dd4bf]/40 hover:bg-[#14151c] text-[#edeae3] transition-all cursor-pointer"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isPlaying
                ? "bg-[#2dd4bf] animate-pulse shadow-[0_0_8px_#2dd4bf]"
                : isPaused
                ? "bg-amber-400"
                : "bg-[#2dd4bf]"
            }`}
          />
          <svg className="w-3.5 h-3.5 text-[#2dd4bf] fill-current" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span className="font-mono text-xs tracking-wider uppercase font-medium">{labels.tour}</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Audio Tour Player Bar"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95vw] max-w-2xl sm:max-w-3xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
    >
      <div className="relative rounded-2xl border border-white/15 bg-[#0c0d12]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 sm:p-5 flex flex-col gap-3.5 text-[#edeae3]">
        {/* Top Header Row: Status, Language Badge, Speed Selector, Auto-Tour, Reset, Minimize */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          {/* Brand & Language Badge */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                isPlaying
                  ? "bg-[#2dd4bf] animate-pulse shadow-[0_0_10px_#2dd4bf]"
                  : isPaused
                  ? "bg-amber-400"
                  : "bg-white/40"
              }`}
            />
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#edeae3] truncate">
              {labels.tour}
            </span>
            <span className="text-white/20 text-xs font-mono">•</span>
            {/* Informational Language Badge (NOT a dropdown) */}
            <span className="font-mono text-xs text-[#8c8f9a] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md truncate max-w-[140px] sm:max-w-none">
              {currentLangLabel}
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Speed Selector with requested options: 1x, 1.2x, 1.5x, 1.8x, 2x */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                title="Change speed: 1x, 1.2x, 1.5x, 1.8x, 2x"
                className="px-2.5 py-1 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-[#edeae3] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{speed}x</span>
                <span className="text-[9px] text-[#8c8f9a]">▾</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full mb-1 right-0 bg-[#14151c] border border-white/20 rounded-xl shadow-2xl p-1.5 flex gap-1 z-50">
                  {SPEED_OPTIONS.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        setSpeed(rate);
                        setShowSpeedMenu(false);
                      }}
                      className={`px-2 py-1 rounded-md font-mono text-xs transition-colors cursor-pointer ${
                        speed === rate
                          ? "bg-[#2dd4bf] text-[#090a0d] font-bold"
                          : "text-[#8c8f9a] hover:text-[#edeae3] hover:bg-white/10"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auto-Tour Toggle */}
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
              className={`px-3 py-1 rounded-md border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isTourActive
                  ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/15 text-[#2dd4bf] font-semibold"
                  : "border-white/15 bg-white/5 hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3]"
              }`}
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{labels.autoTour}</span>
            </button>

            {/* Sections Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsSectionsExpanded(!isSectionsExpanded)}
              title={labels.sections}
              className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                isSectionsExpanded
                  ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/10 text-[#2dd4bf]"
                  : "border-white/10 bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] hover:bg-white/10"
              }`}
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />
                <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="hidden sm:inline">{labels.sections}</span>
            </button>

            {/* Reset / Stop */}
            <button
              type="button"
              onClick={stopAudio}
              title={labels.reset}
              className="p-1.5 rounded-md hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            </button>

            {/* Minimize / Hide */}
            <button
              type="button"
              onClick={() => setIsPanelVisible(false)}
              title={labels.minimize}
              className="p-1.5 rounded-md hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Middle Controls Row: Prev, Play/Pause, Next, Track Info, Section Index */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Prev Track */}
            <button
              type="button"
              onClick={handlePrevTrack}
              title="Previous section"
              className="p-2 rounded-lg hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <polygon points="19 20 9 12 19 4 19 20" />
                <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {/* Main Play / Pause Button */}
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
              className="w-10 h-10 rounded-full bg-[#edeae3] text-[#090a0d] flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Next Track */}
            <button
              type="button"
              onClick={handleNextTrack}
              title="Next section"
              className="p-2 rounded-lg hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <polygon points="5 4 15 12 5 20 5 4" />
                <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Current Section Title & State */}
          <div className="flex-1 min-w-0 flex items-center gap-2.5">
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded font-medium shrink-0 ${
                isPlaying
                  ? "bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/30"
                  : isPaused
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                  : "bg-white/5 text-[#8c8f9a] border border-white/10"
              }`}
            >
              {isPlaying ? labels.playing : isPaused ? labels.paused : labels.ready}
            </span>
            <span className="text-sm sm:text-base text-[#edeae3] font-medium truncate">
              {activeBrief?.title}
            </span>
          </div>

          {/* Progress Indicator */}
          <span className="font-mono text-xs text-[#555760] tabular-nums shrink-0">
            {activeIndex + 1} / {briefs.length}
          </span>
        </div>

        {/* Dedicated Live Reading Transcript Card */}
        <div className="rounded-xl border border-[#2dd4bf]/25 bg-[#2dd4bf]/5 p-3.5 sm:p-4 text-[#edeae3] transition-all">
          <div className="flex items-center justify-between text-xs font-mono text-[#2dd4bf] pb-1.5 border-b border-[#2dd4bf]/15 mb-2">
            <span className="uppercase tracking-wider">
              {activeBrief?.title} · Reading Script
            </span>
            {isPlaying && <EqualizerIcon />}
          </div>
          <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[#edeae3] max-h-24 overflow-y-auto custom-scrollbar">
            &ldquo;{currentBriefText || activeBrief?.text}&rdquo;
          </p>
        </div>

        {/* Horizontal Quick-Jump Section Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
          {briefs.map((brief, idx) => {
            const isThisCurrent = currentBriefId === brief.id || activeIndex === idx;
            return (
              <button
                key={brief.id}
                type="button"
                onClick={() => playSection(brief.id)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs whitespace-nowrap transition-all border cursor-pointer ${
                  isThisCurrent
                    ? "border-[#2dd4bf] bg-[#2dd4bf]/20 text-[#2dd4bf] font-semibold shadow-[0_0_10px_rgba(45,212,191,0.25)]"
                    : "border-white/15 bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] hover:border-white/30"
                }`}
              >
                0{idx + 1} {brief.title}
              </button>
            );
          })}
        </div>

        {/* Expandable Sections Drawer */}
        {isSectionsExpanded && (
          <div className="border-t border-white/10 pt-3 space-y-2 max-h-56 overflow-y-auto custom-scrollbar animate-in fade-in">
            {briefs.map((brief, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={brief.id}
                  type="button"
                  onClick={() => {
                    playSection(brief.id);
                    setIsSectionsExpanded(false);
                  }}
                  className={`w-full text-left rounded-xl p-3 text-xs transition-all flex items-start gap-3 cursor-pointer ${
                    isCurrent
                      ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30"
                      : "bg-white/5 text-[#edeae3] hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <span className="font-mono text-xs text-[#555760] mt-0.5">0{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#edeae3]">{brief.title}</div>
                    <p className="text-xs text-[#8c8f9a] line-clamp-2 mt-1 leading-relaxed">{brief.text}</p>
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
