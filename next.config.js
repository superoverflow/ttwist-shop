/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ttwistbackup00.s3.eu-west-2.amazonaws.com']
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
