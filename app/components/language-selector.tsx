"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/language-context";
import type { LanguageCode } from "../data/translations";

export function LanguageSelector({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMeta = languages.find((l) => l.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={t.audio.switchLangNote}
        className={`group flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--ink)] shadow-sm backdrop-blur transition hover:border-[var(--teal)] hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] ${
          compact ? "h-8 px-2" : "h-9"
        }`}
      >
        {/* Globe icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 text-[var(--teal)]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>

        <span className="font-semibold text-[var(--teal)]">{currentMeta.nativeName}</span>
        {!compact && (
          <span className="hidden text-[10px] text-[var(--muted)] sm:inline">
            ({currentMeta.name})
          </span>
        )}

        {/* Chevron icon */}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-3 w-3 text-[var(--muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Language selection"
          className="absolute right-0 top-full z-50 mt-1.5 w-56 rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--line)] mb-1">
            Ninada Multilingual ({languages.length} Languages)
          </div>
          <div className="max-h-72 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
            {languages.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                    isSelected
                      ? "bg-[var(--teal)]/15 font-semibold text-[var(--teal)]"
                      : "text-[var(--ink)] hover:bg-[var(--surface)] hover:text-[var(--teal)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-5 text-center text-[10px] font-mono uppercase text-[var(--muted)]">
                      {lang.code}
                    </span>
                    <span className="font-medium text-[var(--ink)]">{lang.nativeName}</span>
                  </div>
                  <span className="text-[11px] text-[var(--muted)]">{lang.name}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-1.5 border-t border-[var(--line)] pt-1 px-2 text-[10px] text-[var(--muted)] flex items-center justify-between">
            <span>Powered by Ninada</span>
            <span className="text-[var(--teal)]">24 kHz TTS</span>
          </div>
        </div>
      )}
    </div>
  );
}
