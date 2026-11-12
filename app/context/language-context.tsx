"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  type LanguageCode,
  type LanguageMeta,
  type TranslationDictionary,
  SUPPORTED_LANGUAGES,
  translations,
} from "../data/translations";
import { ninadaEngine, type NinadaVoiceGender } from "../lib/ninada-tts";

type LanguageContextValue = {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  languages: LanguageMeta[];
  // Audio state
  isPlaying: boolean;
  isPaused: boolean;
  isAutoBriefing: boolean;
  autoBriefIndex: number;
  currentSentenceIndex: number;
  currentSentenceText: string;
  voiceGender: NinadaVoiceGender;
  setVoiceGender: (v: NinadaVoiceGender) => void;
  speed: number;
  setSpeed: (s: number) => void;
  playAll: () => void;
  startAutoBrief: (fromIndex?: number) => void;
  skipNextBrief: () => void;
  skipPrevBrief: () => void;
  playBrief: (index: number) => void;
  playSentence: (index: number) => void;
  playText: (text: string, sectionKey?: string) => void;
  playSection: (sectionKey: string, text?: string) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  activeSection: string | null;
  isAudioPanelVisible: boolean;
  setIsAudioPanelVisible: (visible: boolean) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio_selected_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoBriefing, setIsAutoBriefing] = useState(false);
  const [autoBriefIndex, setAutoBriefIndex] = useState(-1);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const [currentSentenceText, setCurrentSentenceText] = useState("");
  const [voiceGender, setVoiceGender] = useState<NinadaVoiceGender>("female");
  const [speed, setSpeed] = useState(1.0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isAudioPanelVisible, setIsAudioPanelVisible] = useState(true);

  // Restore saved language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && translations[saved]) {
        setCurrentLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // Storage access blocked or SSR
    }
  }, []);

  const scrollToSection = (briefId: string, targetId: string) => {
    if (typeof window === "undefined") return;
    if (briefId === "intro") {
      const heroEl = document.getElementById("hero") || document.getElementById("about");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const setLanguage = useCallback((lang: LanguageCode) => {
    if (!translations[lang]) return;
    ninadaEngine.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setIsAutoBriefing(false);
    setAutoBriefIndex(-1);
    setCurrentSentenceIndex(-1);
    setCurrentSentenceText("");
    setActiveSection(null);

    setCurrentLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, []);

  const stopAudio = useCallback(() => {
    ninadaEngine.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setIsAutoBriefing(false);
    setAutoBriefIndex(-1);
    setCurrentSentenceIndex(-1);
    setCurrentSentenceText("");
    setActiveSection(null);
  }, []);

  const pauseAudio = useCallback(() => {
    ninadaEngine.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const resumeAudio = useCallback(() => {
    ninadaEngine.resume();
    setIsPaused(false);
    setIsPlaying(true);
  }, []);

  const startAutoBrief = useCallback(
    (fromIndex: number = 0) => {
      const briefs = translations[currentLanguage]?.sectionBriefs || translations.en.sectionBriefs;
      if (!briefs || briefs.length === 0) return;

      ninadaEngine.stop();
      const clampedIndex = Math.max(0, Math.min(fromIndex, briefs.length - 1));
      const briefsToPlay = briefs.slice(clampedIndex);
      const textsToPlay = briefsToPlay.map((b) => b.text);

      setIsAutoBriefing(true);
      setAutoBriefIndex(clampedIndex);
      setIsPlaying(true);
      setIsPaused(false);
      setIsAudioPanelVisible(true);

      const initialBrief = briefs[clampedIndex];
      setActiveSection(initialBrief.id);
      setCurrentSentenceIndex(clampedIndex);
      setCurrentSentenceText(initialBrief.text);

      scrollToSection(initialBrief.id, initialBrief.targetElementId);

      ninadaEngine.speakSentences(textsToPlay, currentLanguage, {
        voice: voiceGender,
        rate: speed,
        onSentenceStart: (relativeIndex: number, text: string) => {
          const globalIndex = clampedIndex + relativeIndex;
          const currentBrief = briefs[globalIndex];
          if (currentBrief) {
            setAutoBriefIndex(globalIndex);
            setCurrentSentenceIndex(globalIndex);
            setCurrentSentenceText(text || currentBrief.text);
            setActiveSection(currentBrief.id);
            scrollToSection(currentBrief.id, currentBrief.targetElementId);
          }
        },
        onFinish: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setIsAutoBriefing(false);
          setAutoBriefIndex(-1);
          setCurrentSentenceIndex(-1);
          setCurrentSentenceText("");
          setActiveSection(null);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setIsAutoBriefing(false);
          setAutoBriefIndex(-1);
        },
      });
    },
    [currentLanguage, voiceGender, speed]
  );

  const skipNextBrief = useCallback(() => {
    const briefs = translations[currentLanguage]?.sectionBriefs || translations.en.sectionBriefs;
    const nextIdx = autoBriefIndex + 1;
    if (nextIdx < briefs.length) {
      startAutoBrief(nextIdx);
    } else {
      stopAudio();
    }
  }, [autoBriefIndex, currentLanguage, startAutoBrief, stopAudio]);

  const skipPrevBrief = useCallback(() => {
    const prevIdx = Math.max(0, autoBriefIndex - 1);
    startAutoBrief(prevIdx);
  }, [autoBriefIndex, startAutoBrief]);

  const playBrief = useCallback(
    (index: number) => {
      startAutoBrief(index);
    },
    [startAutoBrief]
  );

  const playAll = useCallback(() => {
    startAutoBrief(0);
  }, [startAutoBrief]);

  const playSentence = useCallback(
    (index: number) => {
      const sentences = translations[currentLanguage].readOutSentences;
      if (index < 0 || index >= sentences.length) return;

      const sentenceToPlay = [sentences[index]];
      setIsPlaying(true);
      setIsPaused(false);
      setIsAutoBriefing(false);
      setAutoBriefIndex(-1);
      setIsAudioPanelVisible(true);
      setCurrentSentenceIndex(index);
      setCurrentSentenceText(sentences[index]);
      setActiveSection("full-intro");

      ninadaEngine.speakSentences(sentenceToPlay, currentLanguage, {
        voice: voiceGender,
        rate: speed,
        onSentenceStart: () => {
          setCurrentSentenceIndex(index);
          setCurrentSentenceText(sentences[index]);
        },
        onFinish: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentSentenceIndex(-1);
          setCurrentSentenceText("");
          setActiveSection(null);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
      });
    },
    [currentLanguage, voiceGender, speed]
  );

  const playText = useCallback(
    (text: string, sectionKey?: string) => {
      setIsPlaying(true);
      setIsPaused(false);
      setIsAutoBriefing(false);
      setAutoBriefIndex(-1);
      setIsAudioPanelVisible(true);
      setCurrentSentenceIndex(0);
      setCurrentSentenceText(text);
      setActiveSection(sectionKey || "custom");

      ninadaEngine.speakSingle(text, currentLanguage, {
        voice: voiceGender,
        rate: speed,
        onFinish: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentSentenceIndex(-1);
          setCurrentSentenceText("");
          setActiveSection(null);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
      });
    },
    [currentLanguage, voiceGender, speed]
  );

  const playSection = useCallback(
    (sectionKey: string, overrideText?: string) => {
      if (activeSection === sectionKey && isPlaying) {
        stopAudio();
        return;
      }

      const briefs = translations[currentLanguage]?.sectionBriefs || translations.en.sectionBriefs;
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
      const matchingBrief = targetBriefId ? briefs.find((b) => b.id === targetBriefId) : undefined;
      const speechText = matchingBrief?.text || overrideText;
      if (!speechText) return;

      ninadaEngine.stop();
      setIsPlaying(true);
      setIsPaused(false);
      setIsAutoBriefing(false);
      setAutoBriefIndex(-1);
      setIsAudioPanelVisible(true);
      setActiveSection(sectionKey);
      setCurrentSentenceIndex(0);
      setCurrentSentenceText(speechText);

      ninadaEngine.speakSingle(speechText, currentLanguage, {
        voice: voiceGender,
        rate: speed,
        onFinish: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentSentenceIndex(-1);
          setCurrentSentenceText("");
          setActiveSection(null);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setActiveSection(null);
        },
      });
    },
    [activeSection, isPlaying, currentLanguage, voiceGender, speed, stopAudio]
  );

  const t = translations[currentLanguage] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        isPlaying,
        isPaused,
        isAutoBriefing,
        autoBriefIndex,
        currentSentenceIndex,
        currentSentenceText,
        voiceGender,
        setVoiceGender,
        speed,
        setSpeed,
        playAll,
        startAutoBrief,
        skipNextBrief,
        skipPrevBrief,
        playBrief,
        playSentence,
        playText,
        playSection,
        pauseAudio,
        resumeAudio,
        stopAudio,
        activeSection,
        isAudioPanelVisible,
        setIsAudioPanelVisible,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
