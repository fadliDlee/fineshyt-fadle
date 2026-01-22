import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Abaikan error TypeScript saat build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Abaikan error ESLint saat build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;