import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ignore app-files folder during build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/app-files/**', '**/public/app-files/**'],
    };
    return config;
  },
  // Exclude app-files from TypeScript type checking
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Server-side rendering configuration
  serverExternalPackages: [],
};

export default nextConfig;
