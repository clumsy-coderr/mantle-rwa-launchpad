import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure webpack to exclude problematic files from wagmi
  webpack: (config, { isServer }) => {
    // Exclude test files and problematic dependencies from client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    return config;
  },
};

export default nextConfig;