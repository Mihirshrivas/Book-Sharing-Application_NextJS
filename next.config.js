/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "bcrypt": false,
    }
    return config
  },
  output: 'standalone', reactStrictMode: true,
}

module.exports = nextConfig 
