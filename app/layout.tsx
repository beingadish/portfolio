import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsClickTracker } from "./components/analytics-click-tracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aadarsh Pandey | Software Engineer Portfolio",
  description:
    "Portfolio website of Aadarsh Pandey - backend software engineer focused on scalable systems, distributed architecture, and modern product engineering.",
  icons: {
    icon: [
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: [
      {
        url: "/favicon.ico",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <filter id="liquidGlassLens" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feComponentTransfer in="SourceAlpha" result="alpha">
              <feFuncA type="identity" />
            </feComponentTransfer>
            <feGaussianBlur in="alpha" stdDeviation="50" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" scale="42" xChannelSelector="A" yChannelSelector="A" />
          </filter>
        </svg>
        {children}
        <AnalyticsClickTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
