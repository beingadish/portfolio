import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsClickTracker } from "./components/analytics-click-tracker";
import { LanguageProvider } from "./context/language-context";
import { AudioTourProvider } from "./context/audio-tour-context";
import { PortfolioAudioTour } from "./components/portfolio-audio-tour";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: "italic",
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
    <html
      lang="en"
      data-theme="dark"
      className={`${jetBrainsMono.variable} ${plusJakartaSans.variable} ${newsreader.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet" />
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
        <LanguageProvider>
          <AudioTourProvider>
            {children}
            <PortfolioAudioTour />
          </AudioTourProvider>
        </LanguageProvider>
        <AnalyticsClickTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
