"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PROJECT_AUDIO_TRACKS, type ProjectAudioTrack } from "../data/project-audio-scripts";

interface ProjectAudioBarProps {
  slug: string;
}

const SPEED_OPTIONS = [1.0, 1.2, 1.5, 1.8, 2.0] as const;

export function ProjectAudioBar({ slug }: ProjectAudioBarProps) {
  const track: ProjectAudioTrack | undefined = PROJECT_AUDIO_TRACKS[slug] || PROJECT_AUDIO_TRACKS.aroundu;

  const [mode, setMode] = useState<"brief" | "detailed">("brief");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTrack = mode === "brief" ? track.brief : track.detailed;

  // Initialize playback speed from localStorage if available
  useEffect(() => {
    try {
      const savedSpeed = localStorage.getItem("portfolio_audio_speed");
      if (savedSpeed) {
        const parsed = parseFloat(savedSpeed);
        if (SPEED_OPTIONS.includes(parsed as (typeof SPEED_OPTIONS)[number])) {
          setSpeed(parsed);
        }
      }
    } catch {
      // noop
    }
  }, []);

  // Update audio element speed when speed state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  // When slug changes, reset player
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [slug]);

  // Handle Play / Pause Toggle
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.playbackRate = speed;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play prevented:", err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, speed]);

  // Handle Mode Switch (Brief <-> Detailed)
  const handleModeSwitch = (newMode: "brief" | "detailed") => {
    if (newMode === mode) return;

    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setMode(newMode);
    setCurrentTime(0);

    // If was playing, auto-start new mode after source change
    if (wasPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.playbackRate = speed;
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }, 50);
    } else {
      setIsPlaying(false);
    }
  };

  // Format seconds into mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSpeedSelect = (newSpeed: number) => {
    setSpeed(newSpeed);
    setShowSpeedMenu(false);
    try {
      localStorage.setItem("portfolio_audio_speed", String(newSpeed));
    } catch {
      // noop
    }
  };

  return (
    <div className="w-full bg-[#0c0e14] border-b border-white/10 select-none transition-all">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={activeTrack.audioUrl}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || activeTrack.durationSeconds);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      {/* Main Minimized Top Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs">
        {/* Left: Mode Switcher & Project Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#8c8f9a] uppercase hidden lg:inline tracking-wider">
              Audio Overview:
            </span>
            {/* Toggle Group */}
            <div className="flex items-center bg-[#151722] p-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => handleModeSwitch("brief")}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${
                  mode === "brief"
                    ? "bg-[#2dd4bf] text-[#090a0d] font-semibold shadow-sm"
                    : "text-[#8c8f9a] hover:text-[#edeae3]"
                }`}
                title="Executive technical summary (~35s)"
              >
                <span>⚡</span>
                <span>Brief ({track.brief.duration})</span>
              </button>
              <button
                onClick={() => handleModeSwitch("detailed")}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${
                  mode === "detailed"
                    ? "bg-[#2dd4bf] text-[#090a0d] font-semibold shadow-sm"
                    : "text-[#8c8f9a] hover:text-[#edeae3]"
                }`}
                title="In-depth architectural walkthrough (~1.5m)"
              >
                <span>🔬</span>
                <span>Detailed ({track.detailed.duration})</span>
              </button>
            </div>
          </div>

          {/* Equalizer Waveform indicator */}
          <div className="flex items-center gap-0.5 h-4 px-2">
            <span
              className={`w-0.5 rounded-full bg-[#2dd4bf] transition-all ${
                isPlaying ? "h-3.5 animate-[pulse_0.6s_ease-in-out_infinite]" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-[#2dd4bf] transition-all ${
                isPlaying ? "h-4 animate-[pulse_0.4s_ease-in-out_infinite_0.15s]" : "h-2 opacity-40"
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-[#2dd4bf] transition-all ${
                isPlaying ? "h-2.5 animate-[pulse_0.5s_ease-in-out_infinite_0.3s]" : "h-1.5 opacity-40"
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-[#2dd4bf] transition-all ${
                isPlaying ? "h-3 animate-[pulse_0.45s_ease-in-out_infinite_0.45s]" : "h-1 opacity-40"
              }`}
            />
          </div>
        </div>

        {/* Center: Play/Pause, Scrubber & Timers */}
        <div className="flex items-center gap-3 w-full md:flex-1 md:max-w-md">
          {/* Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-[#090a0d] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm transition-transform active:scale-95"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <span className="text-[10px]">❚❚</span>
            ) : (
              <span className="text-[11px] translate-x-0.5">▶</span>
            )}
          </button>

          {/* Current Time */}
          <span className="text-[11px] text-[#8c8f9a] w-8 text-right shrink-0">
            {formatTime(currentTime)}
          </span>

          {/* Interactive Scrubber Bar */}
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || activeTrack.durationSeconds || 100}
              step={0.5}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#2dd4bf] focus:outline-none"
            />
          </div>

          {/* Duration */}
          <span className="text-[11px] text-[#8c8f9a] w-8 shrink-0">
            {formatTime(duration || activeTrack.durationSeconds)}
          </span>
        </div>

        {/* Right: Speed & Transcript Drawer Toggle */}
        <div className="flex items-center gap-2 justify-end w-full md:w-auto">
          {/* Speed Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="px-2 py-1 rounded bg-[#151722] hover:bg-white/10 border border-white/10 text-[11px] text-[#edeae3] flex items-center gap-1 transition-colors"
              title="Playback speed"
            >
              <span>{speed.toFixed(1)}x</span>
              <span className="text-[9px] text-[#8c8f9a]">▾</span>
            </button>

            {showSpeedMenu && (
              <div className="absolute right-0 mt-1 z-50 bg-[#12131a] border border-white/15 rounded-lg shadow-xl p-1 flex flex-col gap-0.5 min-w-[70px]">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeedSelect(s)}
                    className={`px-2 py-1 rounded text-[11px] text-left transition-colors ${
                      speed === s
                        ? "bg-[#2dd4bf]/20 text-[#2dd4bf] font-semibold"
                        : "text-[#8c8f9a] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {s.toFixed(1)}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Script Drawer Toggle */}
          <button
            onClick={() => setShowScript(!showScript)}
            className={`px-2.5 py-1 rounded border text-[11px] transition-colors flex items-center gap-1 ${
              showScript
                ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border-[#2dd4bf]/40 font-medium"
                : "bg-[#151722] text-[#8c8f9a] hover:text-[#edeae3] border-white/10"
            }`}
            title="Read transcript"
          >
            <span>📝</span>
            <span>{showScript ? "Hide Script" : "Script"}</span>
          </button>
        </div>
      </div>

      {/* Expandable Transcript Drawer */}
      {showScript && (
        <div className="border-t border-white/10 bg-[#0e1017] px-4 sm:px-6 py-3 max-w-7xl mx-auto animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-4xl">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#2dd4bf]">
                <span>AI VOICE BRIEF ({mode.toUpperCase()})</span>
                <span className="text-white/40">·</span>
                <span className="text-[#8c8f9a]">{track.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#edeae3] font-sans leading-relaxed">
                {activeTrack.text}
              </p>
            </div>
            <button
              onClick={() => setShowScript(false)}
              className="text-[#8c8f9a] hover:text-white text-xs font-mono p-1"
              title="Close script"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
