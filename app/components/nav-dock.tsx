"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 6;

export function NavDock({
  className = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"nav">) {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < SCROLL_THRESHOLD) {
        return;
      }

      // Requested behavior: scrolling up hides, scrolling down shows.
      setIsHidden(delta < 0);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibilityClass = isHidden ? "nav-dock-hidden" : "nav-dock-visible";

  return (
    <nav {...props} className={`${className} nav-dock ${visibilityClass}`.trim()}>
      {children}
    </nav>
  );
}
