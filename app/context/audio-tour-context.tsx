"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { portfolioAudioPlayer } from "../lib/audio-player";
import { AUDIO_TOURS, type AudioTourBrief } from "../data/audio-tour";
import { useLanguage } from "./language-context";

type AudioTourContextValue = {
  isPlaying: boolean;
  isPaused: boolean;
  isTourActive: boolean;
  currentBriefId: string | null;
  currentBriefIndex: number;
  currentBriefText: string;
  speed: number;
  setSpeed: (rate: number) => void;
  startTour: (fromIndex?: number) => void;
  playSection: (sectionId: string) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  isPanelVisible: boolean;
  setIsPanelVisible: (v: boolean) => void;
  briefs: AudioTourBrief[];
};

const AudioTourContext = createContext<AudioTourContextValue | null>(null);

export function AudioTourProvider({ children }: { children: ReactNode }) {
  const { currentLanguage } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentBriefId, setCurrentBriefId] = useState<string | null>(null);
  const [currentBriefIndex, setCurrentBriefIndex] = useState(-1);
  const [currentBriefText, setCurrentBriefText] = useState("");
  const [speed, setSpeedState] = useState(1.0);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const briefs = AUDIO_TOURS[currentLanguage] || AUDIO_TOURS.en;

  const scrollToTarget = (targetId?: string) => {
    if (typeof window === "undefined" || !targetId) return;
    const targetMap: Record<string, string> = {
      hero: "hero",
      intro: "hero",
      telemetry: "telemetry",
      footprint: "telemetry",
      doctrine: "doctrine",
      mindset: "doctrine",
      experience: "experience",
      projects: "projects",
      contact: "contact",
      connect: "contact",
    };
    const resolved = targetMap[targetId] || targetId;
    const el = document.getElementById(resolved);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stopAudio = useCallback(() => {
    portfolioAudioPlayer.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setIsTourActive(false);
    setCurrentBriefId(null);
    setCurrentBriefIndex(-1);
    setCurrentBriefText("");
  }, []);

  const pauseAudio = useCallback(() => {
    portfolioAudioPlayer.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const resumeAudio = useCallback(() => {
    portfolioAudioPlayer.resume();
    setIsPaused(false);
    setIsPlaying(true);
  }, []);

  const setSpeed = useCallback((rate: number) => {
    setSpeedState(rate);
    portfolioAudioPlayer.setRate(rate);
  }, []);

  // Stop playback when language changes
  useEffect(() => {
    stopAudio();
  }, [currentLanguage, stopAudio]);

  const startTour = useCallback(
    (fromIndex: number = 0) => {
      const activeBriefs = AUDIO_TOURS[currentLanguage] || AUDIO_TOURS.en;
      if (!activeBriefs || activeBriefs.length === 0) return;

      portfolioAudioPlayer.stop();
      const clamped = Math.max(0, Math.min(fromIndex, activeBriefs.length - 1));
      const sequence = activeBriefs.slice(clamped);

      setIsTourActive(true);
      setIsPlaying(true);
      setIsPaused(false);
      setIsPanelVisible(true);
      setCurrentBriefIndex(clamped);
      setCurrentBriefId(activeBriefs[clamped].id);
      setCurrentBriefText(activeBriefs[clamped].text);

      scrollToTarget(activeBriefs[clamped].targetElementId);

      portfolioAudioPlayer.playSequence(sequence, currentLanguage, 0, {
        rate: speed,
        onTrackStart: (relIdx: number, briefId: string, text: string) => {
          const globalIdx = clamped + relIdx;
          setCurrentBriefIndex(globalIdx);
          setCurrentBriefId(briefId);
          setCurrentBriefText(text);
          const currentItem = activeBriefs[globalIdx];
          if (currentItem) {
            scrollToTarget(currentItem.targetElementId);
          }
        },
        onFinish: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setIsTourActive(false);
          setCurrentBriefId(null);
          setCurrentBriefIndex(-1);
          setCurrentBriefText("");
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setIsTourActive(false);
        },
      });
    },
    [currentLanguage, speed]
  );

  const playSection = useCallback(
    (sectionId: string) => {
      const sectionMap: Record<string, "intro" | "footprint" | "mindset" | "experience" | "projects" | "connect"> = {
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

      const resolvedBriefId = sectionMap[sectionId] || "intro";

      // If already playing this section, toggle off
      if (isPlaying && currentBriefId === resolvedBriefId) {
        stopAudio();
        return;
      }

      const activeBriefs = AUDIO_TOURS[currentLanguage] || AUDIO_TOURS.en;
      const targetBrief = activeBriefs.find((b) => b.id === resolvedBriefId) || activeBriefs[0];
      const targetIndex = activeBriefs.findIndex((b) => b.id === resolvedBriefId);

      portfolioAudioPlayer.stop();
      setIsTourActive(false);
      setIsPlaying(true);
      setIsPaused(false);
      setIsPanelVisible(true);
      setCurrentBriefId(resolvedBriefId);
      setCurrentBriefIndex(targetIndex >= 0 ? targetIndex : 0);
      setCurrentBriefText(targetBrief.text);

      scrollToTarget(targetBrief.targetElementId || sectionId);

      portfolioAudioPlayer.playSingle(resolvedBriefId, targetBrief.text, currentLanguage, {
        rate: speed,
        onFinish: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentBriefId(null);
          setCurrentBriefIndex(-1);
          setCurrentBriefText("");
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentBriefId(null);
        },
      });
    },
    [currentLanguage, speed, isPlaying, currentBriefId, stopAudio]
  );

  return (
    <AudioTourContext.Provider
      value={{
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
      }}
    >
      {children}
    </AudioTourContext.Provider>
  );
}

export function useAudioTour(): AudioTourContextValue {
  const ctx = useContext(AudioTourContext);
  if (!ctx) {
    throw new Error("useAudioTour must be used within an AudioTourProvider");
  }
  return ctx;
}
