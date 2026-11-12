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
  onFinish?: () => void;
  onError?: (err: Error) => void;
};

// Map each language code to its standard BCP-47 locale tags and speech synthesis voice identifiers
const LANG_LOCALE_MAP: Record<LanguageCode, { bcp47: string[]; fallbackLocales: string[] }> = {
  en: { bcp47: ["en-IN", "en-GB", "en-US"], fallbackLocales: ["en"] },
  hi: { bcp47: ["hi-IN", "hi"], fallbackLocales: ["hi"] },
  sa: { bcp47: ["sa-IN", "hi-IN", "sa"], fallbackLocales: ["hi-IN", "hi"] }, // Sanskrit phonemes map accurately to Devanagari hi-IN
  kn: { bcp47: ["kn-IN", "kn"], fallbackLocales: ["kn"] },
  ta: { bcp47: ["ta-IN", "ta-LK", "ta"], fallbackLocales: ["ta"] },
  te: { bcp47: ["te-IN", "te"], fallbackLocales: ["te"] },
  ml: { bcp47: ["ml-IN", "ml"], fallbackLocales: ["ml"] },
  mr: { bcp47: ["mr-IN", "mr"], fallbackLocales: ["mr", "hi-IN"] },
  bn: { bcp47: ["bn-IN", "bn-BD", "bn"], fallbackLocales: ["bn"] },
  gu: { bcp47: ["gu-IN", "gu"], fallbackLocales: ["gu"] },
  pa: { bcp47: ["pa-IN", "pa-PK", "pa"], fallbackLocales: ["pa"] },
  or: { bcp47: ["or-IN", "or", "ory"], fallbackLocales: ["or", "hi-IN"] },
};

class NinadaAudioEngine {
  private audioContext: AudioContext | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCancelled = false;
  private isPaused = false;
  private sentenceQueue: string[] = [];
  private currentSentenceIndex = -1;
  private currentLang: LanguageCode = "en";
  private currentOptions: NinadaPlayOptions = {};

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx({ sampleRate: 24000 });
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
    return this.audioContext as AudioContext;
  }

  /**
   * Find the most suitable voice for the given language and gender.
   */
  private pickVoice(lang: LanguageCode, gender: NinadaVoiceGender): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return null;
    }
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const { bcp47, fallbackLocales } = LANG_LOCALE_MAP[lang];
    const candidateLocales = [...bcp47, ...fallbackLocales];

    // Priority 1: Match locale AND gender
    for (const locale of candidateLocales) {
      const exactMatch = voices.find((v) => {
        const matchesLocale = v.lang.toLowerCase().replace("_", "-").startsWith(locale.toLowerCase());
        if (!matchesLocale) return false;
        const nameLower = v.name.toLowerCase();
        if (gender === "female") {
          return nameLower.includes("female") || nameLower.includes("woman") || nameLower.includes("lekha") || nameLower.includes("veena");
        } else {
          return nameLower.includes("male") || nameLower.includes("man") || nameLower.includes("rishi") || nameLower.includes("anil");
        }
      });
      if (exactMatch) return exactMatch;
    }

    // Priority 2: Match locale
    for (const locale of candidateLocales) {
      const match = voices.find((v) => v.lang.toLowerCase().replace("_", "-").startsWith(locale.toLowerCase()));
      if (match) return match;
    }

    // Priority 3: Any Indian voice (often starts with en-IN or hi-IN)
    const indianVoice = voices.find((v) => v.lang.toLowerCase().includes("-in"));
    if (indianVoice) return indianVoice;

    return voices[0] || null;
  }

  /**
   * Play an array of sentences sequentially with callbacks for live highlighting.
   */
  public async speakSentences(
    sentences: string[],
    lang: LanguageCode,
    options: NinadaPlayOptions = {}
  ): Promise<void> {
    this.stop();
    this.isCancelled = false;
    this.isPaused = false;
    this.sentenceQueue = sentences;
    this.currentSentenceIndex = 0;
    this.currentLang = lang;
    this.currentOptions = options;

    if (typeof window === "undefined") return;

    // Wake AudioContext
    try {
      this.getAudioContext();
    } catch {
      // AudioContext optional if browser speech synthesis is used directly
    }

    await this.playNextSentence();
  }

  private async playNextSentence(): Promise<void> {
    if (this.isCancelled) return;

    if (this.currentSentenceIndex >= this.sentenceQueue.length) {
      this.currentOptions.onFinish?.();
      return;
    }

    const text = this.sentenceQueue[this.currentSentenceIndex];
    const index = this.currentSentenceIndex;

    this.currentOptions.onSentenceStart?.(index, text);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      const voice = this.pickVoice(this.currentLang, this.currentOptions.voice || "female");
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = LANG_LOCALE_MAP[this.currentLang].bcp47[0];
      }

      // Slightly tuned rate and pitch according to Ninada 24kHz specs
      utterance.rate = this.currentOptions.rate ?? 1.0;
      utterance.pitch = this.currentOptions.pitch ?? (this.currentOptions.voice === "male" ? 0.95 : 1.05);

      utterance.onend = () => {
        this.currentOptions.onSentenceEnd?.(index);
        this.currentSentenceIndex += 1;
        if (!this.isCancelled) {
          // Slight natural pause between sentences (200ms)
          setTimeout(() => {
            this.playNextSentence();
          }, 200);
        }
      };

      utterance.onerror = (e) => {
        if (e.error === "canceled" || e.error === "interrupted") return;
        this.currentOptions.onError?.(new Error(`Speech synthesis error: ${e.error}`));
        this.currentSentenceIndex += 1;
        this.playNextSentence();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Browser does not support speech synthesis
      this.currentOptions.onError?.(new Error("Browser speech synthesis is not supported on this device."));
    }
  }

  /**
   * Speak a single sentence or section.
   */
  public async speakSingle(text: string, lang: LanguageCode, options: NinadaPlayOptions = {}): Promise<void> {
    await this.speakSentences([text], lang, options);
  }

  public pause(): void {
    this.isPaused = true;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume(): void {
    this.isPaused = false;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }
  }

  public stop(): void {
    this.isCancelled = true;
    this.isPaused = false;
    this.currentSentenceIndex = -1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isSpeaking(): boolean {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }
}

export const ninadaEngine = new NinadaAudioEngine();
