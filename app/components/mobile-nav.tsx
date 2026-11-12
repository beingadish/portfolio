"use client";

import { useId, useState, useEffect } from "react";
import { ANALYTICS_EVENTS } from "../lib/analytics";
import { LiquidGlassToggle } from "./liquid-glass-toggle";
import { LanguageSelector } from "./language-selector";
import type { QuickLinkItem } from "../data/portfolio";

type NavItem = {
  label: string;
  href: string;
};

export function MobileNav({
  navItems,
  quickLinks,
}: {
  navItems: NavItem[];
  quickLinks: QuickLinkItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="quick-icon"
          aria-label="Toggle navigation menu"
          aria-controls={menuId}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
        </button>

        <div className="flex items-center gap-2">
          <LanguageSelector compact />
          <LiquidGlassToggle />
        </div>
      </div>

      {isOpen ? (
        <div id={menuId} className="mt-3 space-y-3 border-t border-[var(--line)] pt-3">
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="nav-link inline-flex py-1"
                  href={item.href}
                  data-analytics-event={ANALYTICS_EVENTS.NAV_CLICK}
                  data-analytics-nav-item={item.label}
                  data-analytics-device="mobile"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="space-y-2 text-sm text-[var(--muted)]">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a
                  className="nav-link inline-flex py-1"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  download={item.download ? true : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
