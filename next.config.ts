import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* -------------------------------------------------------
     Image Optimization
     ------------------------------------------------------- */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  /* -------------------------------------------------------
     Redirects - Old Squarespace paths to new routes
     ------------------------------------------------------- */
  async redirects() {
    return [
      {
        source: "/new-page",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/new-page-1",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/new-page-2",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/new-page-3",
        destination: "/locations",
        permanent: true,
      },
      // Catch-all for any /blog/ paths from Squarespace
      {
        source: "/blog/:slug",
        destination: "/insights/:slug",
        permanent: true,
      },
    ];
  },

  /* -------------------------------------------------------
     Security Headers
     ------------------------------------------------------- */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://images.squarespace-cdn.com https://images.unsplash.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
