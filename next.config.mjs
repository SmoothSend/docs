/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smoothsend.xyz',
      },
      {
        protocol: 'https',
        hostname: 'docs.smoothsend.xyz',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply X-Robots-Tag to all pages — tells all crawlers to index & follow
        source: '/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'all' },
        ],
      },
      {
        // Long-lived cache for static assets (images, fonts, etc.)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache public assets (logos, OG image, llms files) for 1 day
        source: '/(.*\\.(png|jpg|jpeg|svg|ico|webp|txt))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
};

export default nextConfig;

