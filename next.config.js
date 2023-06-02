/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  },
  env: {
    API_AUTH: 'http://localhost:3000',
    API_CRUD: 'http://localhost:5000',
  }
}

module.exports = nextConfig
