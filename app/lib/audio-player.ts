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
  private masterAudio: HTMLAudioElement | null = null;
  private isCancelled = false;
  private isPausedState = false;
  private currentRate = 1.0;

  private trackQueue: AudioTrackItem[] = [];
  private currentTrackIndex = -1;
  private currentLang: LanguageCode = "en";
  private currentOptions: AudioPlayOptions = {};

  private getAudioElement(): HTMLAudioElement {
    if (!this.masterAudio && typeof window !== "undefined") {
      this.masterAudio = new Audio();
      this.masterAudio.id = "portfolio-master-audio";
      this.masterAudio.preload = "auto";
      if (!document.getElementById("portfolio-master-audio")) {
        this.masterAudio.style.display = "none";
        document.body.appendChild(this.masterAudio);
      }
      (window as unknown as { __portfolioAudio?: HTMLAudioElement }).__portfolioAudio = this.masterAudio;
    }
    return this.masterAudio!;
  }

  public getAudioUrls(lang: LanguageCode, briefId: string): { local: string; s3: string } {
    return {
      local: `${LOCAL_AUDIO_BASE}/${lang}/${briefId}.wav`,
      s3: `${S3_AUDIO_BASE}/${lang}/${briefId}.wav`,
    };
  }

  public preload(lang: LanguageCode, briefId: string): void {
    if (typeof window === "undefined") return;
    try {
      const { local } = this.getAudioUrls(lang, briefId);
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = local;
    } catch {
      // ignore
    }
  }

  public stop(): void {
    this.isCancelled = true;
    this.isPausedState = false;

    if (this.masterAudio) {
      try {
        this.masterAudio.pause();
        this.masterAudio.currentTime = 0;
        this.masterAudio.onended = null;
        this.masterAudio.onerror = null;
      } catch {
        // ignore
      }
    }

    this.trackQueue = [];
    this.currentTrackIndex = -1;
  }

  public pause(): void {
    this.isPausedState = true;
    if (this.masterAudio && !this.masterAudio.paused) {
      try {
        this.masterAudio.pause();
      } catch {
        // ignore
      }
    }
  }

  public resume(): void {
    this.isPausedState = false;
    if (this.masterAudio && this.masterAudio.paused) {
      try {
        this.masterAudio.play().catch(() => {});
      } catch {
        // ignore
      }
    }
  }

  public setRate(rate: number): void {
    this.currentRate = Math.min(2.0, Math.max(0.5, rate));
    if (this.masterAudio) {
      this.masterAudio.playbackRate = this.currentRate;
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

    // Preload next track
    if (startIndex + 1 < tracks.length) {
      this.preload(lang, tracks[startIndex + 1].id);
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

        if (this.currentTrackIndex < this.trackQueue.length) {
          // Seamless short gap (150ms) between sections
          setTimeout(() => {
            if (!this.isCancelled && !this.isPausedState) {
              this.playNextTrackInQueue();
            }
          }, 150);
        } else {
          // Finished all tracks in queue
          this.currentOptions.onFinish?.();
        }
      }
    } catch (err) {
      console.warn(`[AudioPlayer] Track failed: ${lang}/${currentTrack.id}`, err);
      this.currentTrackIndex += 1;
      if (!this.isCancelled && this.currentTrackIndex < this.trackQueue.length) {
        this.playNextTrackInQueue();
      } else {
        this.currentOptions.onFinish?.();
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
      if (typeof window === "undefined") {
        resolve();
        return;
      }

      const { local, s3 } = this.getAudioUrls(lang, briefId);
      const audio = this.getAudioElement();

      audio.pause();
      audio.currentTime = 0;
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

      audio.src = local;
      audio.load();

      const p = audio.play();
      if (p !== undefined) {
        p.catch((err) => {
          if (!hasFallenBackToS3) {
            hasFallenBackToS3 = true;
            audio.src = s3;
            audio.load();
            audio.play().catch((innerErr) => {
              audio.onended = null;
              audio.onerror = null;
              reject(innerErr);
            });
          } else {
            audio.onended = null;
            audio.onerror = null;
            reject(err);
          }
        });
      }
    });
  }
}

export const portfolioAudioPlayer = new PortfolioAudioPlayer();
