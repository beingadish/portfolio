"use client";

import type { LanguageCode } from "../data/translations";

export type AudioPlayOptions = {
  rate?: number;
  onTrackStart?: (index: number, briefId: string, text: string) => void;
  onTrackEnd?: (index: number, briefId: string) => void;
  onFinish?: () => void;
  onError?: (err: Error) => void;
};

export type AudioTrackItem = {
  id: string;
  title: string;
  text: string;
  targetElementId?: string;
};

const LOCAL_AUDIO_BASE = "/audio";
const S3_AUDIO_BASE = "https://beingadish-portfolio-audio.s3.ap-south-1.amazonaws.com/audio";

class PortfolioAudioPlayer {
  private currentAudio: HTMLAudioElement | null = null;
  private isCancelled = false;
  private isPausedState = false;
  private currentRate = 1.0;

  private trackQueue: AudioTrackItem[] = [];
  private currentTrackIndex = -1;
  private currentLang: LanguageCode = "en";
  private currentOptions: AudioPlayOptions = {};

  private audioCache = new Map<string, HTMLAudioElement>();

  public getAudioUrls(lang: LanguageCode, briefId: string): { local: string; s3: string } {
    return {
      local: `${LOCAL_AUDIO_BASE}/${lang}/${briefId}.wav`,
      s3: `${S3_AUDIO_BASE}/${lang}/${briefId}.wav`,
    };
  }

  public preload(lang: LanguageCode, briefId: string): void {
    if (typeof window === "undefined") return;
    const key = `${lang}:${briefId}`;
    if (this.audioCache.has(key)) return;

    try {
      const { local } = this.getAudioUrls(lang, briefId);
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = local;
      this.audioCache.set(key, audio);
    } catch {
      // ignore
    }
  }

  public stop(): void {
    this.isCancelled = true;
    this.isPausedState = false;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }

    this.trackQueue = [];
    this.currentTrackIndex = -1;
  }

  public pause(): void {
    this.isPausedState = true;
    if (this.currentAudio && !this.currentAudio.paused) {
      try {
        this.currentAudio.pause();
      } catch {
        // ignore
      }
    }
  }

  public resume(): void {
    this.isPausedState = false;
    if (this.currentAudio && this.currentAudio.paused) {
      try {
        this.currentAudio.play().catch(() => {});
      } catch {
        // ignore
      }
    }
  }

  public setRate(rate: number): void {
    this.currentRate = Math.min(2.0, Math.max(0.5, rate));
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.currentRate;
    }
  }

  public async playSequence(
    tracks: AudioTrackItem[],
    lang: LanguageCode,
    startIndex: number = 0,
    options: AudioPlayOptions = {}
  ): Promise<void> {
    this.stop();
    this.isCancelled = false;
    this.isPausedState = false;
    this.trackQueue = tracks;
    this.currentTrackIndex = startIndex;
    this.currentLang = lang;
    this.currentOptions = options;
    if (options.rate) {
      this.currentRate = options.rate;
    }

    if (typeof window === "undefined" || tracks.length === 0) return;

    // Preload next 2 tracks
    for (let i = startIndex; i < Math.min(tracks.length, startIndex + 2); i++) {
      this.preload(lang, tracks[i].id);
    }

    await this.playNextTrackInQueue();
  }

  private async playNextTrackInQueue(): Promise<void> {
    if (this.isCancelled) return;

    if (this.currentTrackIndex >= this.trackQueue.length) {
      this.currentOptions.onFinish?.();
      return;
    }

    const currentTrack = this.trackQueue[this.currentTrackIndex];
    const index = this.currentTrackIndex;
    const lang = this.currentLang;

    this.currentOptions.onTrackStart?.(index, currentTrack.id, currentTrack.text);

    // Preload next
    if (index + 1 < this.trackQueue.length) {
      this.preload(lang, this.trackQueue[index + 1].id);
    }

    try {
      await this.playAudioFile(currentTrack.id, lang);

      if (!this.isCancelled) {
        this.currentOptions.onTrackEnd?.(index, currentTrack.id);
        this.currentTrackIndex += 1;

        // 200ms breathing room between sections
        setTimeout(() => {
          if (!this.isCancelled && !this.isPausedState) {
            this.playNextTrackInQueue();
          }
        }, 200);
      }
    } catch (err) {
      console.warn(`[AudioPlayer] Track failed: ${lang}/${currentTrack.id}`, err);
      this.currentTrackIndex += 1;
      if (!this.isCancelled) {
        this.playNextTrackInQueue();
      }
    }
  }

  public async playSingle(
    briefId: string,
    text: string,
    lang: LanguageCode,
    options: AudioPlayOptions = {}
  ): Promise<void> {
    this.stop();
    this.isCancelled = false;
    this.isPausedState = false;
    this.currentLang = lang;
    this.currentOptions = options;
    if (options.rate) {
      this.currentRate = options.rate;
    }

    if (typeof window === "undefined") return;

    options.onTrackStart?.(0, briefId, text);

    try {
      await this.playAudioFile(briefId, lang);
      if (!this.isCancelled) {
        options.onTrackEnd?.(0, briefId);
        options.onFinish?.();
      }
    } catch (err) {
      console.warn(`[AudioPlayer] Error in playSingle:`, err);
      options.onError?.(err instanceof Error ? err : new Error(String(err)));
    }
  }

  private playAudioFile(briefId: string, lang: LanguageCode): Promise<void> {
    return new Promise((resolve, reject) => {
      const { local, s3 } = this.getAudioUrls(lang, briefId);
      const key = `${lang}:${briefId}`;

      let audio = this.audioCache.get(key);
      if (!audio) {
        audio = new Audio(local);
        this.audioCache.set(key, audio);
      } else {
        audio.currentTime = 0;
      }

      this.currentAudio = audio;
      audio.playbackRate = this.currentRate;

      let hasFallenBackToS3 = false;

      audio.onended = () => {
        audio.onended = null;
        audio.onerror = null;
        resolve();
      };

      audio.onerror = () => {
        if (!hasFallenBackToS3) {
          hasFallenBackToS3 = true;
          audio.src = s3;
          audio.load();
          audio.play().catch((err) => {
            audio.onended = null;
            audio.onerror = null;
            reject(err);
          });
        } else {
          audio.onended = null;
          audio.onerror = null;
          reject(new Error(`Could not load audio for ${lang}/${briefId}`));
        }
      };

      const p = audio.play();
      if (p !== undefined) {
        p.catch((err) => {
          if (!hasFallenBackToS3) {
            hasFallenBackToS3 = true;
            audio.src = s3;
            audio.load();
            audio.play().catch((innerErr) => reject(innerErr));
          } else {
            reject(err);
          }
        });
      }
    });
  }
}

export const portfolioAudioPlayer = new PortfolioAudioPlayer();
