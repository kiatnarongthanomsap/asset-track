/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api-remote/:path*',
        destination: 'https://apps2.coop.ku.ac.th/assetpro_api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

