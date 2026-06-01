import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsClickTracker } from "./components/analytics-click-tracker";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600", "700", "800"],
});

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
    <html lang="en" className={jetBrainsMono.variable}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <filter id="liquidGlassLens" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="bg-blur" />
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015"
              numOctaves="1"
              seed="9"
              result="noise"
            />
            <feDisplacementMap
              in="bg-blur"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feComposite in="displaced" in2="SourceGraphic" operator="over" />
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
