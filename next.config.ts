import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536],
    qualities: [72, 75],
  },
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Improve FCP with optimized compilation
  experimental: {
    optimizePackageImports: ['@vercel/analytics', '@vercel/speed-insights'],
  },
  // Support for reverse-proxying project interfaces hosted on Vercel under
  // the main portfolio domain (e.g. beingadish.blog/projects/clynic)
  async rewrites() {
    const rewritesList = [];

    // Optional environment variable overrides for direct Vercel multi-zone proxying
    if (process.env.CLYNIC_VERCEL_REWRITE_URL) {
      rewritesList.push(
        {
          source: "/projects/clynic",
          destination: process.env.CLYNIC_VERCEL_REWRITE_URL,
        },
        {
          source: "/projects/clynic/:path*",
          destination: `${process.env.CLYNIC_VERCEL_REWRITE_URL}/:path*`,
        }
      );
    }

    if (process.env.TALKINGYT_VERCEL_REWRITE_URL) {
      rewritesList.push(
        {
          source: "/projects/talkingyt",
          destination: process.env.TALKINGYT_VERCEL_REWRITE_URL,
        },
        {
          source: "/projects/talkingyt/:path*",
          destination: `${process.env.TALKINGYT_VERCEL_REWRITE_URL}/:path*`,
        }
      );
    }

    if (process.env.AROUNDU_VERCEL_REWRITE_URL) {
      rewritesList.push(
        {
          source: "/projects/aroundu",
          destination: process.env.AROUNDU_VERCEL_REWRITE_URL,
        },
        {
          source: "/projects/aroundu/:path*",
          destination: `${process.env.AROUNDU_VERCEL_REWRITE_URL}/:path*`,
        }
      );
    }

    if (process.env.JANMAT_VERCEL_REWRITE_URL) {
      rewritesList.push(
        {
          source: "/projects/janmat",
          destination: process.env.JANMAT_VERCEL_REWRITE_URL,
        },
        {
          source: "/projects/janmat/:path*",
          destination: `${process.env.JANMAT_VERCEL_REWRITE_URL}/:path*`,
        }
      );
    }

    // Server-side backend gateway rewrites (keeps Elastic IP completely hidden)
    const backendGateway = process.env.BACKEND_GATEWAY_URL;
    if (backendGateway) {
      rewritesList.push(
        {
          source: "/live/aroundu",
          destination: `${backendGateway}/aroundu/`,
        },
        {
          source: "/live/aroundu/:path*",
          destination: `${backendGateway}/aroundu/:path*`,
        },
        {
          source: "/live/clynic",
          destination: `${backendGateway}/clynic/`,
        },
        {
          source: "/live/clynic/:path*",
          destination: `${backendGateway}/clynic/:path*`,
        },
        {
          source: "/live/janmat",
          destination: `${backendGateway}/`,
        },
        {
          source: "/live/janmat/:path*",
          destination: `${backendGateway}/:path*`,
        }
      );
    }

    return rewritesList;
  },
};

export default nextConfig;
