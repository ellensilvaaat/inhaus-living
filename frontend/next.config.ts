/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;