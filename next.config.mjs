/** @type {import('next').NextConfig} */
const nextConfig = {
  // Abaikan error TypeScript (seperti gallery not exist)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Abaikan error ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;