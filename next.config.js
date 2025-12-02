const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/agi-prod-file-upload-public-main-use1\.s3\.amazonaws\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'buratino-images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['agi-prod-file-upload-public-main-use1.s3.amazonaws.com'],
    formats: ['image/webp'],
  },
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
}

module.exports = withPWA(nextConfig);
