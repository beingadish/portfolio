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
  currentSentenceIndex: number;
  currentSentenceText: string;
  voiceGender: NinadaVoiceGender;
  setVoiceGender: (v: NinadaVoiceGender) => void;
  speed: number;
  setSpeed: (s: number) => void;
  playAll: () => void;
  playSentence: (index: number) => void;
  playText: (text: string, sectionKey?: string) => void;
  playSection: (sectionKey: string, text: string) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  activeSection: string | null;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio_selected_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const [currentSentenceText, setCurrentSentenceText] = useState("");
  const [voiceGender, setVoiceGender] = useState<NinadaVoiceGender>("female");
  const [speed, setSpeed] = useState(1.0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

  const setLanguage = useCallback((lang: LanguageCode) => {
    if (!translations[lang]) return;
    // If playing, stop current audio
    ninadaEngine.stop();
    setIsPlaying(false);
    setIsPaused(false);
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

  const playSentence = useCallback(
    (index: number) => {
      const sentences = translations[currentLanguage].readOutSentences;
      if (index < 0 || index >= sentences.length) return;

      const sentenceToPlay = [sentences[index]];
      setIsPlaying(true);
      setIsPaused(false);
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

  const playAll = useCallback(() => {
    const sentences = translations[currentLanguage].readOutSentences;
    setIsPlaying(true);
    setIsPaused(false);
    setActiveSection("full-intro");

    ninadaEngine.speakSentences(sentences, currentLanguage, {
      voice: voiceGender,
      rate: speed,
      onSentenceStart: (index, text) => {
        setCurrentSentenceIndex(index);
        setCurrentSentenceText(text);
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
  }, [currentLanguage, voiceGender, speed]);

  const playText = useCallback(
    (text: string, sectionKey?: string) => {
      setIsPlaying(true);
      setIsPaused(false);
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
    (sectionKey: string, text: string) => {
      if (activeSection === sectionKey && isPlaying) {
        stopAudio();
      } else {
        playText(text, sectionKey);
      }
    },
    [activeSection, isPlaying, playText, stopAudio]
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
        currentSentenceIndex,
        currentSentenceText,
        voiceGender,
        setVoiceGender,
        speed,
        setSpeed,
        playAll,
        playSentence,
        playText,
        playSection,
        pauseAudio,
        resumeAudio,
        stopAudio,
        activeSection,
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
