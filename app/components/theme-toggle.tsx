"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "portfolio-theme-mode";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path
      d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66 5.66 1.42 1.42M4.92 4.92 6.34 6.34m11.32-1.42-1.42 1.42M6.34 17.66l-1.42 1.42M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3c.5 0 .68.66.33 1A7 7 0 0 0 20 12.46c.34-.34 1 .02 1 .33Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </svg>
);

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      const savedTheme = sessionStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
        return;
      }

      document.documentElement.dataset.theme = "light";
      sessionStorage.setItem(THEME_STORAGE_KEY, "light");
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    sessionStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [mounted, theme]);

  const toggleTheme = () => {
    if (!mounted) return;
    setIsAnimating(true);
    setTheme((previous) => (previous === "light" ? "dark" : "light"));
    window.setTimeout(() => setIsAnimating(false), 700);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        <MoonIcon />
        <span>Theme</span>
      </button>
    );
  }

  const ariaLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const textLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label={ariaLabel}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span>{textLabel}</span>
      </button>
      {isAnimating ? <span className="theme-wave" aria-hidden="true" /> : null}
    </>
  );
}
