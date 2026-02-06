"use client";

import { track } from "@vercel/analytics";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

type AnalyticsProperty = string | number | boolean | null | undefined;

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName?: string;
  eventProperties?: Record<string, AnalyticsProperty>;
};

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (eventName) {
      track(eventName, eventProperties);
    }

    onClick?.(event);
  };

  return <a {...props} onClick={handleClick} />;
}
