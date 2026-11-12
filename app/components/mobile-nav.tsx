"use client";

import { useId, useState, useEffect } from "react";
import { ANALYTICS_EVENTS } from "../lib/analytics";
import { LiquidGlassToggle } from "./liquid-glass-toggle";
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
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-1.5 text-[#8c8f9a] hover:text-[#edeae3] transition-colors rounded border border-white/10 hover:bg-white/5"
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

        <LiquidGlassToggle />
      </div>

      {isOpen ? (
        <div
          id={menuId}
          className="absolute top-full right-0 mt-3 w-56 rounded-lg border border-white/15 bg-[#090a0d]/95 backdrop-blur-xl p-4 shadow-2xl z-50 flex flex-col gap-3 font-mono text-xs text-[#8c8f9a]"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#555760] font-semibold">Navigation</span>
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#edeae3] transition-colors py-1 flex items-center justify-between"
                data-analytics-event={ANALYTICS_EVENTS.NAV_CLICK}
                data-analytics-nav-item={item.label}
                data-analytics-device="mobile"
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                <span className="text-[#555760] text-[10px]">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#555760] font-semibold">Connect</span>
            <div className="flex flex-col gap-1.5">
              {quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  download={item.download ? true : undefined}
                  className="hover:text-[#edeae3] transition-colors py-0.5"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
