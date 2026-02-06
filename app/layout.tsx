import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aadarsh Pandey | Software Engineer Portfolio",
  description:
    "Portfolio website of Aadarsh Pandey - backend software engineer focused on scalable systems, distributed architecture, and modern product engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
