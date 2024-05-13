/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
