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

// Map each language code to its TTS engine locale
const GOOGLE_TTS_LANG_MAP: Record<LanguageCode, string> = {
  en: "en",
  hi: "hi",
  sa: "hi", // Sanskrit phonemes map accurately to Hindi (Devanagari script)
  kn: "kn",
  ta: "ta",
  te: "te",
  ml: "ml",
  mr: "mr",
  bn: "bn",
  gu: "gu",
  pa: "pa",
  or: "hi", // Odia transliterated to Devanagari using ISCII/Unicode offset
};

// Transliterate Odia Unicode block (0x0B00-0x0B7F) to Devanagari (0x0900-0x097F)
function transliterateOdiaToDevanagari(text: string): string {
  return text.replace(/[\u0B00-\u0B7F]/g, (ch) => {
    const code = ch.charCodeAt(0) - 0x0B00 + 0x0900;
    return String.fromCharCode(code);
  });
}

/**
 * Sanitize text for TTS so that punctuation is never read literally (no "comma", "dash", etc.)
 */
function sanitizeSpeechText(text: string, lang: LanguageCode): string {
  let cleaned = text;

  if (lang === "or") {
    cleaned = transliterateOdiaToDevanagari(cleaned);
  }

  // Replace commas, dashes, colons, slashes with spaces to prevent literal "comma" pronunciation
  cleaned = cleaned
    .replace(/[,，]/g, " ")
    .replace(/[-—–_]/g, " ")
    .replace(/[:;]/g, " ")
    .replace(/[[\]{}()<>/\\|~^]/g, "")
    .replace(/[*#§@]/g, "")
    .replace(/["'“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned;
}

/**
 * Split long paragraphs into natural sentence-sized chunks for smooth streaming & caching
 */
function chunkSpeechText(text: string, maxLen = 140): string[] {
  if (!text || text.length <= maxLen) return [text.trim()];

  // Split on sentence boundaries (. ! ? ।)
  const rawSentences = text.split(/([.!?।]+)/);
  const chunks: string[] = [];
  let current = "";

  for (let i = 0; i < rawSentences.length; i += 2) {
    const sentence = (rawSentences[i] || "") + (rawSentences[i + 1] || "");
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (current.length + trimmed.length + 1 <= maxLen) {
      current = current ? `${current} ${trimmed}` : trimmed;
    } else {
      if (current) chunks.push(current);
      if (trimmed.length > maxLen) {
        // Break long sentence by words
        const words = trimmed.split(/\s+/);
        let subChunk = "";
        for (const word of words) {
          if (subChunk.length + word.length + 1 <= maxLen) {
            subChunk = subChunk ? `${subChunk} ${word}` : word;
          } else {
            if (subChunk) chunks.push(subChunk);
            subChunk = word;
          }
        }
        if (subChunk) current = subChunk;
        else current = "";
      } else {
        current = trimmed;
      }
    }
  }

  if (current) chunks.push(current);
  return chunks.filter((c) => c.trim().length > 0);
}

class NinadaAudioEngine {
  // In-memory audio element cache keyed by `${lang}:${sanitizedText}`
  private audioCache = new Map<string, HTMLAudioElement>();
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCancelled = false;
  private isPausedState = false;
  private sentenceQueue: string[] = [];
  private currentSentenceIndex = -1;
  private currentLang: LanguageCode = "en";
  private currentOptions: NinadaPlayOptions = {};

  /**
   * Preload an audio chunk into cache
   */
  public prefetch(text: string, lang: LanguageCode): void {
    if (typeof window === "undefined" || !text) return;
    const sanitized = sanitizeSpeechText(text, lang);
    if (!sanitized) return;

    const cacheKey = `${lang}:${sanitized}`;
    if (this.audioCache.has(cacheKey)) return;

    try {
      const tl = GOOGLE_TTS_LANG_MAP[lang] || "en";
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodeURIComponent(sanitized)}`;
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = url;
      this.audioCache.set(cacheKey, audio);
    } catch {
      // Ignore prefetch failures
    }
  }

  /**
   * Play an array of sentences sequentially with instant caching
   */
  public async speakSentences(
    sentences: string[],
    lang: LanguageCode,
    options: NinadaPlayOptions = {}
  ): Promise<void> {
    this.stop();
    this.isCancelled = false;
    this.isPausedState = false;
    this.sentenceQueue = sentences;
    this.currentSentenceIndex = 0;
    this.currentLang = lang;
    this.currentOptions = options;

    if (typeof window === "undefined" || sentences.length === 0) return;

    // Prefetch all remaining sentences in background
    for (let i = 0; i < sentences.length; i++) {
      this.prefetch(sentences[i], lang);
    }

    await this.playNextSentence();
  }

  private async playNextSentence(): Promise<void> {
    if (this.isCancelled) return;

    if (this.currentSentenceIndex >= this.sentenceQueue.length) {
      this.currentOptions.onFinish?.();
      return;
    }

    const rawText = this.sentenceQueue[this.currentSentenceIndex];
    const index = this.currentSentenceIndex;
    const lang = this.currentLang;

    this.currentOptions.onSentenceStart?.(index, rawText);

    // Prefetch next sentence in advance for 0ms transition
    if (this.currentSentenceIndex + 1 < this.sentenceQueue.length) {
      this.prefetch(this.sentenceQueue[this.currentSentenceIndex + 1], lang);
    }

    const sanitized = sanitizeSpeechText(rawText, lang);
    if (!sanitized) {
      this.currentSentenceIndex += 1;
      this.playNextSentence();
      return;
    }

    const chunks = chunkSpeechText(sanitized, 140);
    try {
      await this.playChunksSequentially(chunks, lang, this.currentOptions.rate ?? 1.0);
      if (!this.isCancelled) {
        this.currentOptions.onSentenceEnd?.(index);
        this.currentSentenceIndex += 1;
        // Natural 180ms breathing pause between sections
        setTimeout(() => {
          if (!this.isCancelled) this.playNextSentence();
        }, 180);
      }
    } catch {
      // Fallback: try Web Speech synthesis ONLY if native voice exists for this language
      this.fallbackWebSpeech(sanitized, lang);
    }
  }

  private playChunksSequentially(chunks: string[], lang: LanguageCode, rate: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let chunkIdx = 0;

      const playNextChunk = () => {
        if (this.isCancelled) {
          resolve();
          return;
        }

        if (chunkIdx >= chunks.length) {
          resolve();
          return;
        }

        const chunkText = chunks[chunkIdx];
        const cacheKey = `${lang}:${chunkText}`;
        let audio = this.audioCache.get(cacheKey);

        const tl = GOOGLE_TTS_LANG_MAP[lang] || "en";
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodeURIComponent(chunkText)}`;

        if (!audio) {
          audio = new Audio(url);
          this.audioCache.set(cacheKey, audio);
        } else if (audio.src !== url) {
          audio.src = url;
        }

        this.currentAudio = audio;
        audio.playbackRate = Math.min(2.0, Math.max(0.5, rate));

        audio.onended = () => {
          chunkIdx += 1;
          playNextChunk();
        };

        audio.onerror = () => {
          reject(new Error("Audio playback error"));
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            if (this.isCancelled) {
              resolve();
            } else {
              reject(err);
            }
          });
        }
      };

      playNextChunk();
    });
  }

  private fallbackWebSpeech(text: string, lang: LanguageCode): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      this.currentOptions.onFinish?.();
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    // Only use speech synthesis if a native voice for this language is actually present
    const langPrefix = lang.toLowerCase();
    const hasNativeVoice = voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix));

    if (!hasNativeVoice && lang !== "en") {
      // Do NOT fall back to an English voice for Indian languages (prevents the "comma comma" bug)
      this.currentOptions.onFinish?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      if (hasNativeVoice) {
        utterance.voice = hasNativeVoice;
        utterance.lang = hasNativeVoice.lang;
      } else {
        utterance.lang = "en-IN";
      }

      utterance.rate = this.currentOptions.rate ?? 1.0;

      utterance.onend = () => {
        if (!this.isCancelled) {
          this.currentSentenceIndex += 1;
          this.playNextSentence();
        }
      };

      utterance.onerror = () => {
        this.currentSentenceIndex += 1;
        this.playNextSentence();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.currentOptions.onFinish?.();
    }
  }

  /**
   * Speak a single sentence or section.
   */
  public async speakSingle(text: string, lang: LanguageCode, options: NinadaPlayOptions = {}): Promise<void> {
    await this.speakSentences([text], lang, options);
  }

  public pause(): void {
    this.isPausedState = true;
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume(): void {
    this.isPausedState = false;
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play().catch(() => {});
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }
  }

  public stop(): void {
    this.isCancelled = true;
    this.isPausedState = false;
    this.currentSentenceIndex = -1;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }

  public isSpeaking(): boolean {
    if (this.currentAudio && !this.currentAudio.paused && !this.currentAudio.ended) {
      return true;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }
}

export const ninadaEngine = new NinadaAudioEngine();
