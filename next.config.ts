import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['places.googleapis.com', 'images.unsplash.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};

export default nextConfig;
