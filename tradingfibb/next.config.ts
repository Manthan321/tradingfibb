import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  },
  transpilePackages: ['next-sanity'],
}

export default nextConfig
