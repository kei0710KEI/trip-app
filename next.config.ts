import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['places.googleapis.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
