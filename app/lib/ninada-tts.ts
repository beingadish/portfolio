"use client";

import type { LanguageCode } from "../data/translations";

export type NinadaVoiceGender = "male" | "female";
export type NinadaPlaybackState = "idle" | "loading" | "playing" | "paused";

export type NinadaPlayOptions = {
  voice?: NinadaVoiceGender;
  rate?: number;
  pitch?: number;
  onSentenceStart?: (index: number, text: string) => void;
  onSentenceEnd?: (index: number) => void;
  onBriefStart?: (index: number, briefId: string, text: string) => void;
  onBriefEnd?: (index: number, briefId: string) => void;
  onFinish?: () => void;
  onError?: (err: Error) => void;
};

export type SectionBriefItem = {
  id: string;
  title?: string;
  text: string;
  targetElementId?: string;
};

const LOCAL_AUDIO_BASE = "/audio";
const S3_AUDIO_BASE = "https://beingadish-portfolio-audio.s3.ap-south-1.amazonaws.com/audio";

class NinadaAudioEngine {
  private currentAudio: HTMLAudioElement | null = null;
  private isCancelled = false;
  private isPausedState = false;
  private currentRate = 1.0;

  // Queue of briefs for sequential playback
  private briefQueue: SectionBriefItem[] = [];
  private currentBriefIndex = -1;
  private currentLang: LanguageCode = "en";
  private currentOptions: NinadaPlayOptions = {};

  // Audio cache to avoid re-fetching previously loaded tracks
  private audioCache = new Map<string, HTMLAudioElement>();

  /**
   * Return primary and secondary URLs for a given language & briefId
   */
  public getAudioUrls(lang: LanguageCode, briefId: string): { local: string; s3: string } {
    return {
      local: `${LOCAL_AUDIO_BASE}/${lang}/${briefId}.wav`,
      s3: `${S3_AUDIO_BASE}/${lang}/${briefId}.wav`,
    };
  }

  /**
   * Preload an audio track into cache
   */
  public preloadBrief(lang: LanguageCode, briefId: string): void {
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
      // Ignore preload errors
    }
  }

  /**
   * Stop all playback and clear queues
   */
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

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }

    this.briefQueue = [];
    this.currentBriefIndex = -1;
  }

  /**
   * Pause current playback
   */
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

  /**
   * Resume playback
   */
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

  /**
   * Change playback speed in real-time
   */
  public setRate(rate: number): void {
    this.currentRate = Math.min(2.0, Math.max(0.5, rate));
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.currentRate;
    }
  }

  /**
   * Play a sequence of section briefs (for Auto-Brief Page)
   */
  public async playBriefSequence(
    briefs: SectionBriefItem[],
    lang: LanguageCode,
    startIndex: number = 0,
    options: NinadaPlayOptions = {}
  ): Promise<void> {
    this.stop();
    this.isCancelled = false;
    this.isPausedState = false;
    this.briefQueue = briefs;
    this.currentBriefIndex = startIndex;
    this.currentLang = lang;
    this.currentOptions = options;
    if (options.rate) {
      this.currentRate = options.rate;
    }

    if (typeof window === "undefined" || briefs.length === 0) return;

    // Preload next briefs
    for (let i = startIndex; i < Math.min(briefs.length, startIndex + 3); i++) {
      this.preloadBrief(lang, briefs[i].id);
    }

    await this.playCurrentBriefInQueue();
  }

  private async playCurrentBriefInQueue(): Promise<void> {
    if (this.isCancelled) return;

    if (this.currentBriefIndex >= this.briefQueue.length) {
      this.currentOptions.onFinish?.();
      return;
    }

    const currentBrief = this.briefQueue[this.currentBriefIndex];
    const index = this.currentBriefIndex;
    const lang = this.currentLang;

    // Fire start callbacks
    this.currentOptions.onBriefStart?.(index, currentBrief.id, currentBrief.text);
    this.currentOptions.onSentenceStart?.(index, currentBrief.text);

    // Preload next brief
    if (index + 1 < this.briefQueue.length) {
      this.preloadBrief(lang, this.briefQueue[index + 1].id);
    }

    try {
      await this.playAudioFile(currentBrief.id, lang);

      if (!this.isCancelled) {
        this.currentOptions.onBriefEnd?.(index, currentBrief.id);
        this.currentOptions.onSentenceEnd?.(index);
        this.currentBriefIndex += 1;

        // Natural 180ms pause between sections
        setTimeout(() => {
          if (!this.isCancelled && !this.isPausedState) {
            this.playCurrentBriefInQueue();
          }
        }, 180);
      }
    } catch (err) {
      console.warn(`[NinadaEngine] Error playing brief ${lang}/${currentBrief.id}:`, err);
      // Advance to next brief on error rather than stalling
      this.currentBriefIndex += 1;
      if (!this.isCancelled) {
        this.playCurrentBriefInQueue();
      }
    }
  }

  /**
   * Play an individual brief by its ID (e.g. "intro", "footprint", "mindset", etc.)
   */
  public async playSingleBrief(
    briefId: string,
    text: string,
    lang: LanguageCode,
    options: NinadaPlayOptions = {}
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

    options.onBriefStart?.(0, briefId, text);
    options.onSentenceStart?.(0, text);

    try {
      await this.playAudioFile(briefId, lang);
      if (!this.isCancelled) {
        options.onBriefEnd?.(0, briefId);
        options.onSentenceEnd?.(0);
        options.onFinish?.();
      }
    } catch (err) {
      console.warn(`[NinadaEngine] Error in playSingleBrief:`, err);
      options.onError?.(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Internal helper: plays /audio/{lang}/{briefId}.wav with S3 fallback
   */
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
          console.info(`[NinadaEngine] Local audio failed, falling back to S3 for ${lang}/${briefId}`);
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
          reject(new Error(`Failed to play audio for ${lang}/${briefId} from local and S3`));
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // May be autoplay restriction or not found; try S3 if not tried yet
          if (!hasFallenBackToS3) {
            hasFallenBackToS3 = true;
            audio.src = s3;
            audio.load();
            audio.play().catch((innerErr) => {
              reject(innerErr);
            });
          } else {
            reject(err);
          }
        });
      }
    });
  }

  /**
   * Backward-compatible helper for sentences
   */
  public async speakSentences(
    sentences: string[],
    lang: LanguageCode,
    options: NinadaPlayOptions = {}
  ): Promise<void> {
    // Map sentences to brief items if known
    const items: SectionBriefItem[] = sentences.map((text, idx) => {
      const briefIds = ["intro", "footprint", "mindset", "experience", "projects", "connect"];
      return {
        id: briefIds[idx] || `brief_${idx}`,
        text,
      };
    });
    return this.playBriefSequence(items, lang, 0, options);
  }

  /**
   * Backward-compatible helper for single text
   */
  public async speakSingle(
    text: string,
    lang: LanguageCode,
    options: NinadaPlayOptions = {}
  ): Promise<void> {
    return this.playSingleBrief("intro", text, lang, options);
  }
}

export const ninadaEngine = new NinadaAudioEngine();
