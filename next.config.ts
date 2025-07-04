import type { NextConfig } from "next";

// TODO: Remove this comment
// const nextConfig: NextConfig = {
//   /* config options here */
// };

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [new URL("https://images.unsplash.com/**")],
    domains: [
      "cdn-images-1.listennotes.com",
      "production.listennotes.com",
      "megaphone.imgix.net",
      "deow9bq0xqvbj.cloudfront.net",
      "images.unsplash.com",
      "cdn-images-3.listennotes.com",
    ],
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;

export default nextConfig;
