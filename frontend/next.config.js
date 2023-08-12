/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    BACKEND_URL: process.env.BACKEND_URL,
  },
  output: 'standalone',
}

module.exports = nextConfig
