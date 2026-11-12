"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
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
    script: string;
    hideScript: string;
    showScript: string;
    language: string;
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
    script: "Script",
    hideScript: "Hide Script",
    showScript: "Show Script",
    language: "Language",
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
    script: "स्क्रिप्ट",
    hideScript: "स्क्रिप्ट छिपाएं",
    showScript: "स्क्रिप्ट देखें",
    language: "भाषा",
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
    script: "संवादः",
    hideScript: "संवादं गोपयतु",
    showScript: "संवादं दर्शयतु",
    language: "भाषा",
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
    script: "ಸ್ಕ್ರಿಪ್ಟ್",
    hideScript: "ಸ್ಕ್ರಿಪ್ಟ್ ಮರೆಮಾಡಿ",
    showScript: "ಸ್ಕ್ರಿಪ್ಟ್ ತೋರಿಸಿ",
    language: "ಭಾಷೆ",
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
    script: "உரை",
    hideScript: "உரையை மறை",
    showScript: "உரையைக் காட்டு",
    language: "மொழி",
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
    script: "స్క్రిప్ట్",
    hideScript: "స్క్రిప్ట్ దాచు",
    showScript: "స్క్రిప్ట్ చూపించు",
    language: "భాష",
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
    script: "സ്ക്രിപ്റ്റ്",
    hideScript: "സ്ക്രിപ്റ്റ് മറയ്ക്കുക",
    showScript: "സ്ക്രിപ്റ്റ് കാണിക്കുക",
    language: "ഭാഷ",
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
    script: "स्क्रिप्ट",
    hideScript: "स्क्रिप्ट लपवा",
    showScript: "स्क्रिप्ट दाखवा",
    language: "भाषा",
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
    script: "স্ক্রিপ্ট",
    hideScript: "স্ক্রিপ্ট লুকান",
    showScript: "স্ক্রিপ্ট দেখান",
    language: "ভাষা",
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
    script: "સ્ક્રિપ્ટ",
    hideScript: "સ્ક્રિપ્ટ છુપાવો",
    showScript: "સ્ક્રિપ્ટ બતાવો",
    language: "ભાષા",
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
    script: "ਸਕ੍ਰਿਪਟ",
    hideScript: "ਸਕ੍ਰਿਪਟ ਲੁਕਾਓ",
    showScript: "ਸਕ੍ਰਿਪਟ ਦਿਖਾਓ",
    language: "ਭਾਸ਼ਾ",
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
    script: "ସ୍କ୍ରିପ୍ଟ",
    hideScript: "ସ୍କ୍ରିପ୍ଟ ଲୁଚାନ୍ତୁ",
    showScript: "ସ୍କ୍ରିପ୍ଟ ଦେଖାନ୍ତୁ",
    language: "ଭାଷା",
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
      aria-label={`${isThisPlaying ? "Playing" : "Listen"} audio brief`}
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
          <span className="font-semibold tracking-wide">Playing</span>
        </>
      ) : isThisPaused ? (
        <>
          <svg className="w-3.5 h-3.5 text-amber-300 fill-current" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
          <span className="font-medium tracking-wide">Paused</span>
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
          <span className="tracking-wide">Listen</span>
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
  const pathname = usePathname();
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

  // If navigating into /projects/*, stop any active global tour audio and hide the global bottom bar
  useEffect(() => {
    if (pathname?.startsWith("/projects") && isPlaying) {
      stopAudio();
    }
  }, [pathname, isPlaying, stopAudio]);

  const { currentLanguage, languages, setLanguage } = useLanguage();
  const labels = UI_LABELS[currentLanguage] || UI_LABELS.en;

  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Floatable & Draggable position state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; elemX: number; elemY: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (clientX: number, clientY: number) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const currentX = rect.left;
    const currentY = rect.top;

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

      const minX = 12;
      const maxX = Math.max(12, window.innerWidth - panelWidth - 12);
      const minY = 64; // Below top masthead
      const maxY = Math.max(64, window.innerHeight - panelHeight - 12);

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

      const minX = 12;
      const maxX = Math.max(12, window.innerWidth - panelWidth - 12);
      const minY = 64;
      const maxY = Math.max(64, window.innerHeight - panelHeight - 12);

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
      const maxX = Math.max(12, window.innerWidth - panelWidth - 12);
      const maxY = Math.max(64, window.innerHeight - panelHeight - 12);

      setPosition((prev) => {
        if (!prev) return null;
        return {
          x: Math.min(Math.max(12, prev.x), maxX),
          y: Math.min(Math.max(64, prev.y), maxY),
        };
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [position]);

  const isNearTop = position !== null && position.y < 340;

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

  // On project showcase pages (/projects/*), do not render the global bottom tour player at all
  if (pathname?.startsWith("/projects")) {
    return null;
  }

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

  const selectedLangMeta = useMemo(() => {
    return languages.find((l) => l.code === currentLanguage);
  }, [currentLanguage, languages]);

  return (
    <aside
      ref={panelRef}
      aria-label="Audio Tour Player Bar"
      className={`fixed z-40 w-[96vw] max-w-4xl lg:max-w-5xl ${
        isDragging
          ? "cursor-grabbing select-none transition-none shadow-[0_25px_60px_rgba(0,0,0,0.9)] scale-[1.01]"
          : "transition-all duration-300"
      } ${
        position ? "" : "bottom-4 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-3"
      }`}
      style={
        position
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "none",
              bottom: "auto",
              right: "auto",
            }
          : undefined
      }
    >
      <div className="relative rounded-2xl border border-white/15 bg-[#0c0d12]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2.5 sm:px-4 sm:py-3 flex flex-col gap-2 text-[#edeae3]">
        {/* Row 1: Primary Controls, Section Title, and Dropdown Toolbars */}
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 cursor-grab active:cursor-grabbing select-none"
        >
          {/* Left: Drag Handle, Playback Controls & Active Section Info */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Visual Drag Grip Indicator */}
            <div
              id="audio-bar-drag-handle"
              data-drag-handle="true"
              onMouseDown={(e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                e.stopPropagation();
                handlePointerDown(e.clientX, e.clientY);
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                if (!touch) return;
                handlePointerDown(touch.clientX, touch.clientY);
              }}
              className="flex items-center gap-1 text-[#8c8f9a] hover:text-[#edeae3] px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all shrink-0 cursor-grab active:cursor-grabbing select-none"
              title="Click and drag to move audio bar"
            >
              <svg className="w-3.5 h-3.5 fill-current pointer-events-none" viewBox="0 0 24 24">
                <circle cx="8" cy="6" r="1.5" />
                <circle cx="16" cy="6" r="1.5" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <circle cx="8" cy="18" r="1.5" />
                <circle cx="16" cy="18" r="1.5" />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#edeae3] font-medium pointer-events-none hidden md:inline">
                {isDragging ? "Moving..." : "Drag"}
              </span>
            </div>

            {/* Transport Controls: Prev, Play/Pause, Next */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePrevTrack}
                title="Previous section"
                className="p-1.5 rounded-md hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="19 20 9 12 19 4 19 20" />
                  <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>

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
                className="w-8 h-8 rounded-full bg-[#edeae3] text-[#090a0d] flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
                title={isPlaying ? "Pause" : "Play"}
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

              <button
                type="button"
                onClick={handleNextTrack}
                title="Next section"
                className="p-1.5 rounded-md hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            {/* Current Section Title & State */}
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded font-medium shrink-0 ${
                  isPlaying
                    ? "bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/30"
                    : isPaused
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                    : "bg-white/5 text-[#8c8f9a] border border-white/10"
                }`}
              >
                {isPlaying ? labels.playing : isPaused ? labels.paused : labels.ready}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#edeae3] truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
                {activeBrief?.title}
              </span>
              <span className="font-mono text-[11px] text-[#555760] tabular-nums shrink-0">
                {activeIndex + 1}/{briefs.length}
              </span>
            </div>
          </div>

          {/* Right Toolbar: Language Dropdown, Speed, Script Toggle, Auto-Tour, Dock, Minimize */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Interactive Indic & English Language Selector Dropdown */}
            <div className="relative shrink-0" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowSpeedMenu(false);
                }}
                aria-haspopup="listbox"
                aria-expanded={showLangMenu}
                title="Select audio language (12 Indic & English languages)"
                className={`group flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
                  showLangMenu
                    ? "border-[#2dd4bf] bg-[#161822] text-white shadow-[0_0_12px_rgba(45,212,191,0.25)]"
                    : "border-white/25 hover:border-[#2dd4bf]/60 bg-[#12131a] hover:bg-[#181a24] text-[#edeae3]"
                }`}
              >
                <span className="text-xs text-[#2dd4bf] shrink-0">🌐</span>
                <span className="text-[10px] uppercase tracking-wider text-[#8c8f9a] font-semibold hidden md:inline">
                  {labels.language}:
                </span>
                <span className="font-semibold text-white truncate max-w-[85px] sm:max-w-[110px]">
                  {selectedLangMeta?.name || currentLanguage.toUpperCase()}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-[#2dd4bf] transition-transform duration-200 shrink-0 ${
                    showLangMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLangMenu && (
                <div
                  className={`absolute ${
                    isNearTop ? "top-full mt-2" : "bottom-full mb-2"
                  } right-0 sm:right-auto sm:left-0 w-64 sm:w-72 max-h-72 overflow-y-auto custom-scrollbar bg-[#0f1016]/98 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 z-50 flex flex-col gap-1 animate-in fade-in`}
                >
                  <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#8c8f9a] border-b border-white/10 mb-1 flex items-center justify-between">
                    <span>Select Audio Language</span>
                    <span className="text-[#2dd4bf] font-medium">12 Available</span>
                  </div>
                  {languages.map((lang) => {
                    const isSelected = currentLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/40 font-semibold shadow-sm"
                            : "text-[#edeae3] hover:bg-white/10 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] text-[#555760] font-mono shrink-0 uppercase w-5 text-left">
                            {lang.code}
                          </span>
                          <span className="truncate text-left">{lang.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-xs text-[#8c8f9a] font-sans">
                            {lang.nativeName}
                          </span>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Speed Selector */}
            <div className="relative shrink-0" ref={speedMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setShowSpeedMenu(!showSpeedMenu);
                  setShowLangMenu(false);
                }}
                title="Playback Speed"
                className="px-2 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-[#edeae3] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{speed}x</span>
                <svg className="w-2.5 h-2.5 text-[#8c8f9a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showSpeedMenu && (
                <div
                  className={`absolute ${
                    isNearTop ? "top-full mt-2" : "bottom-full mb-1"
                  } right-0 bg-[#14151c] border border-white/20 rounded-xl shadow-2xl p-1.5 flex gap-1 z-50`}
                >
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

            {/* Reading Script Toggle Button */}
            <button
              type="button"
              onClick={() => setShowScript((prev) => !prev)}
              title={showScript ? labels.hideScript : labels.showScript}
              className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                showScript
                  ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/15 text-[#2dd4bf] font-medium shadow-[0_0_10px_rgba(45,212,191,0.2)]"
                  : "border-white/15 bg-white/5 hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3]"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="hidden sm:inline">{labels.script}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${showScript ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

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
              className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                isTourActive
                  ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/15 text-[#2dd4bf] font-semibold"
                  : "border-white/15 bg-white/5 hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3]"
              }`}
              title={labels.autoTour}
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span className="hidden sm:inline">{labels.autoTour}</span>
            </button>

            {/* Re-dock button if user has floated the panel */}
            {position && (
              <button
                type="button"
                onClick={() => setPosition(null)}
                title="Dock audio bar back to bottom center"
                className="px-2 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                <svg className="w-3 h-3 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M4 20h16M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Dock</span>
              </button>
            )}

            {/* Reset / Stop */}
            <button
              type="button"
              onClick={stopAudio}
              title={labels.reset}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer shrink-0"
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
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#8c8f9a] hover:text-[#edeae3] transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth={2.5}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Row 2: Horizontal Quick-Jump Section Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#555760] shrink-0 mr-1 hidden sm:inline">
            {labels.sections}:
          </span>
          {briefs.map((brief, idx) => {
            const isThisCurrent = currentBriefId === brief.id || activeIndex === idx;
            return (
              <button
                key={brief.id}
                type="button"
                onClick={() => playSection(brief.id)}
                className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] whitespace-nowrap transition-all border cursor-pointer ${
                  isThisCurrent
                    ? "border-[#2dd4bf] bg-[#2dd4bf]/20 text-[#2dd4bf] font-semibold shadow-[0_0_8px_rgba(45,212,191,0.25)]"
                    : "border-white/10 bg-white/5 text-[#8c8f9a] hover:text-[#edeae3] hover:border-white/25"
                }`}
              >
                0{idx + 1} {brief.title}
              </button>
            );
          })}
        </div>

        {/* Row 3: Dedicated Live Reading Transcript Card (Collapsible, shown only when showScript is true) */}
        {showScript && (
          <div className="rounded-xl border border-[#2dd4bf]/25 bg-[#2dd4bf]/5 p-2.5 sm:p-3 text-[#edeae3] transition-all animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#2dd4bf] pb-1 border-b border-[#2dd4bf]/15 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                  {activeBrief?.title} · Reading Script
                </span>
                {isPlaying && <EqualizerIcon />}
              </div>
              <button
                type="button"
                onClick={() => setShowScript(false)}
                className="text-[#8c8f9a] hover:text-[#edeae3] p-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                title="Hide Reading Script"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#edeae3] max-h-20 overflow-y-auto custom-scrollbar">
              &ldquo;{currentBriefText || activeBrief?.text}&rdquo;
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
