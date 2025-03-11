/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.prod.website-files.com',
      // Add any other domains you need to load images from
    ],
  },
}

module.exports = nextConfig