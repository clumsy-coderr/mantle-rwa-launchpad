/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack config (empty to silence warning - using webpack for now)
  turbopack: {},
  // Configure webpack to exclude problematic files from wagmi
  webpack: (config, { isServer }) => {
    // Exclude problematic Wagmi test files and dev dependencies
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

    // Add externals for problematic modules
    config.externals = config.externals || [];
    config.externals.push((context, request, callback) => {
      // Skip externalizing for problematic Wagmi test files
      if (request.match(/node_modules\/wagmi\/.*\/test\//) ||
          request.match(/^(tap|tape|desm|fastbench|pino-elasticsearch|why-is-node-running)$/)) {
        return callback(null, 'commonjs {}');
      }
      callback();
    });

    return config;
  },
};

module.exports = nextConfig;