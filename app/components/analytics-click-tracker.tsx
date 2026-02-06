"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

type AnalyticsValue = string | number | boolean | null | undefined;

function getEventProperties(target: HTMLElement): Record<string, AnalyticsValue> {
  const properties: Record<string, AnalyticsValue> = {};

  if (target.dataset.analyticsLocation) {
    properties.location = target.dataset.analyticsLocation;
  }
  if (target.dataset.analyticsType) {
    properties.type = target.dataset.analyticsType;
  }
  if (target.dataset.analyticsProjectName) {
    properties.project_name = target.dataset.analyticsProjectName;
  }
  if (target.dataset.analyticsProjectType) {
    properties.project_type = target.dataset.analyticsProjectType;
  }
  if (target.dataset.analyticsSection) {
    properties.section = target.dataset.analyticsSection;
  }
  if (target.dataset.analyticsArticleTitle) {
    properties.article_title = target.dataset.analyticsArticleTitle;
  }
  if (target.dataset.analyticsPlatform) {
    properties.platform = target.dataset.analyticsPlatform;
  }
  if (target.dataset.analyticsMethod) {
    properties.method = target.dataset.analyticsMethod;
  }
  if (target.dataset.analyticsNavItem) {
    properties.nav_item = target.dataset.analyticsNavItem;
  }
  if (target.dataset.analyticsDevice) {
    properties.device = target.dataset.analyticsDevice;
  }

  return properties;
}

export function AnalyticsClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-analytics-event]");
      if (!target) {
        return;
      }

      const eventName = target.dataset.analyticsEvent;
      if (!eventName) {
        return;
      }

      track(eventName, getEventProperties(target));
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
