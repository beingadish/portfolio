"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";

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

      if (delta <= 0) {
        // Any upward movement reveals the dock.
        setIsHidden(false);
      } else if (currentY > 24) {
        // Hide only when moving down away from the top.
        setIsHidden(true);
      }

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
