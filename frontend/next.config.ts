/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  /* SEO */
  trailingSlash: true,

  /* Performance */
  compress: true,
  poweredByHeader: false,

  /* Images optimization */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],

    formats: ["image/avif", "image/webp"],

    deviceSizes: [
      640,
      750,
      828,
      1080,
      1200,
      1400,
      1600,
      1920,
    ],

    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384,
    ],
  },

  /* Security headers */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
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
        ],
      },
    ];
  },

  /* Redirect preview domain → production */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "inhaus-living.vercel.app",
          },
        ],
        destination: "inhaus-living.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;