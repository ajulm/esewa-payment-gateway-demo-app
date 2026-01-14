/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable webpack polling for file watching in Docker
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding once the first file changed
      }
    }
    return config
  },
}

module.exports = nextConfig
