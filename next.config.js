const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*',
      },
    ];
  },
};


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
